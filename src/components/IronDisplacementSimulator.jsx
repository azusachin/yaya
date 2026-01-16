import { useEffect, useMemo, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const mixColor = (start, end, ratio) => {
  const parse = (hex) => {
    const normalized = hex.replace("#", "");
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16)
    };
  };
  const from = parse(start);
  const to = parse(end);
  const t = clamp(ratio);
  const blend = (a, b) => Math.round(a + (b - a) * t);
  return `rgb(${blend(from.r, to.r)}, ${blend(from.g, to.g)}, ${blend(from.b, to.b)})`;
};

const defaultMessage = "拖拽硫酸铜粉末进入烧杯开始实验。";

const IronDisplacementSimulator = () => {
  const [powderAdded, setPowderAdded] = useState(false);
  const [dissolveProgress, setDissolveProgress] = useState(0);
  const [ironAdded, setIronAdded] = useState(false);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [message, setMessage] = useState(defaultMessage);
  const [stirring, setStirring] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const reset = () => {
    clearTimers();
    setPowderAdded(false);
    setDissolveProgress(0);
    setIronAdded(false);
    setReactionProgress(0);
    setMessage(defaultMessage);
    setStirring(false);
    setAutoMode(false);
  };

  const queueStep = (callback, delay) => {
    const timer = setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  const startAuto = () => {
    reset();
    setAutoMode(true);
    setMessage("自动演示：加入硫酸铜粉末，溶液开始变蓝。");
    setPowderAdded(true);
    queueStep(() => {
      setMessage("使用玻璃棒搅拌，加速溶解。");
      setDissolveProgress(0.5);
      setStirring(true);
      queueStep(() => setStirring(false), 400);
    }, 1200);
    queueStep(() => {
      setMessage("溶液呈浅蓝色，准备投入铁棒。");
      setDissolveProgress(1);
    }, 2400);
    queueStep(() => {
      setMessage("放入铁棒，观察置换反应与铜析出。");
      setIronAdded(true);
    }, 3200);
    queueStep(() => {
      setMessage("反应完成：溶液变浅绿，铁棒表面覆盖铜层。");
      setReactionProgress(1);
      setAutoMode(false);
    }, 6600);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (!powderAdded || dissolveProgress >= 1) {
      return;
    }
    const interval = setInterval(() => {
      setDissolveProgress((prev) => clamp(prev + 0.02));
    }, 260);
    return () => clearInterval(interval);
  }, [powderAdded, dissolveProgress]);

  useEffect(() => {
    if (!ironAdded || reactionProgress >= 1) {
      return;
    }
    const interval = setInterval(() => {
      setReactionProgress((prev) => clamp(prev + 0.03));
    }, 280);
    return () => clearInterval(interval);
  }, [ironAdded, reactionProgress]);

  const handleDrop = (event) => {
    event.preventDefault();
    if (autoMode) {
      return;
    }
    const payload = event.dataTransfer.getData("text/plain");
    if (payload === "powder") {
      if (!powderAdded) {
        setPowderAdded(true);
        setMessage("硫酸铜粉末溶解中，溶液变为浅蓝色。");
      }
      return;
    }
    if (payload === "iron") {
      if (!powderAdded || dissolveProgress < 0.6) {
        setMessage("请先让硫酸铜充分溶解，再放入铁棒。");
        return;
      }
      if (!ironAdded) {
        setIronAdded(true);
        setMessage("铁棒表面开始生成红色铜层，溶液逐渐变浅绿。");
      }
    }
  };

  const handleStir = () => {
    if (autoMode) {
      return;
    }
    if (!powderAdded) {
      setMessage("先加入硫酸铜粉末，再搅拌溶解。");
      return;
    }
    if (dissolveProgress >= 1) {
      setMessage("硫酸铜已溶解，可以放入铁棒。");
      return;
    }
    setStirring(true);
    setDissolveProgress((prev) => clamp(prev + 0.18));
    setMessage("搅拌加速溶解，溶液颜色逐渐加深。");
    queueStep(() => setStirring(false), 380);
  };

  const solutionColor = useMemo(() => {
    if (!powderAdded) {
      return "rgba(255, 255, 255, 0.1)";
    }
    if (ironAdded) {
      return mixColor("#8abff9", "#b5e7c0", reactionProgress);
    }
    return mixColor("#f8fbff", "#8abff9", dissolveProgress);
  }, [powderAdded, dissolveProgress, ironAdded, reactionProgress]);

  const colorLabel = useMemo(() => {
    if (!powderAdded) {
      return "无色透明";
    }
    if (!ironAdded) {
      return dissolveProgress >= 0.9 ? "浅蓝色" : "浅蓝渐变";
    }
    return reactionProgress >= 0.9 ? "浅绿色" : "蓝色转浅绿";
  }, [powderAdded, dissolveProgress, ironAdded, reactionProgress]);

  const powderLabel = useMemo(() => {
    if (!powderAdded) {
      return "未加入";
    }
    return dissolveProgress >= 1 ? "已溶解" : "溶解中";
  }, [powderAdded, dissolveProgress]);

  const ironLabel = useMemo(() => {
    if (!ironAdded) {
      return "未加入";
    }
    return reactionProgress >= 0.85 ? "表面覆盖铜层" : "析铜进行中";
  }, [ironAdded, reactionProgress]);

  return (
    <div className="simulator">
      <div className="simulator__stage">
        <div
          className="simulator__beaker-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="beaker">
            <div className="beaker__liquid" style={{ background: solutionColor }} />
            {powderAdded && dissolveProgress < 0.95 && (
              <div className="beaker__powder">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={`powder-${index}`} style={{ left: `${10 + index * 7}%` }} />
                ))}
              </div>
            )}
            {ironAdded && (
              <div className="beaker__iron">
                <div className="iron-rod">
                  <span
                    className="iron-rod__copper"
                    style={{ height: `${Math.max(12, reactionProgress * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {stirring && <div className="beaker__swirl" />}
            <div className="beaker__label">烧杯（蒸馏水）</div>
          </div>
          <div className="simulator__hint">拖拽试剂到烧杯内</div>
        </div>
        <div className="simulator__bench">
          <div className="simulator__tools">
            <div className={`tool ${autoMode ? "tool--disabled" : ""}`} draggable={!autoMode}>
              <div
                className="tool__powder"
                draggable={!autoMode}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", "powder")}
              >
                CuSO₄ 粉末
              </div>
            </div>
            <div className={`tool ${autoMode ? "tool--disabled" : ""}`} draggable={!autoMode}>
              <div
                className="tool__rod"
                draggable={!autoMode}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", "iron")}
              >
                铁棒 Fe
              </div>
            </div>
            <button
              className={`tool__stir ${stirring ? "tool__stir--active" : ""}`}
              type="button"
              onClick={handleStir}
              disabled={autoMode}
            >
              玻璃搅拌棒
            </button>
          </div>
          <div className="simulator__panel">
            <h4>实验状态</h4>
            <div className="status-grid">
              <div className="status-card">
                <span>溶液颜色</span>
                <strong>{colorLabel}</strong>
              </div>
              <div className="status-card">
                <span>硫酸铜</span>
                <strong>{powderLabel}</strong>
              </div>
              <div className="status-card">
                <span>铁棒表面</span>
                <strong>{ironLabel}</strong>
              </div>
              <div className="status-card">
                <span>反应进度</span>
                <strong>{Math.round(reactionProgress * 100)}%</strong>
              </div>
            </div>
            <div className="simulator__message">
              <span>步骤提示：</span>
              <p>{message}</p>
            </div>
            <div className="simulator__actions">
              <button className="button" type="button" onClick={startAuto} disabled={autoMode}>
                自动执行
              </button>
              <button className="button button--ghost" type="button" onClick={reset}>
                重置实验
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="simulator__principle">
        <strong>实验原理：</strong>
        Fe + CuSO₄ → FeSO₄ + Cu。铁的活泼性强于铜，可置换出铜单质。
      </div>
    </div>
  );
};

export default IronDisplacementSimulator;
