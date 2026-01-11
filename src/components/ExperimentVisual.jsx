import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { timer } from "d3-timer";

const presets = {
  "acid-base-neutralization": {
    left: "#5e9bff",
    right: "#ff7b7b",
    product: "#7fdb91",
    title: { zh: "酸碱中和", en: "Neutralization" },
    labels: {
      zh: ["盐酸", "氢氧化钠", "混合后溶液"],
      en: ["HCl", "NaOH", "Mixture"]
    }
  },
  "oxygen-preparation": {
    left: "#9b7bff",
    right: "#ffc857",
    product: "#75d5ff",
    title: { zh: "过氧化氢制氧气", en: "Oxygen Prep" },
    labels: {
      zh: ["反应瓶", "导管", "集气瓶"],
      en: ["Flask", "Tube", "Gas jar"]
    }
  },
  "copper-sulfate-crystallization": {
    left: "#3b82f6",
    right: "#60a5fa",
    product: "#2563eb",
    title: { zh: "硫酸铜结晶", en: "Crystallization" },
    labels: {
      zh: ["烧杯", "漏斗", "滤纸"],
      en: ["Beaker", "Funnel", "Filter"]
    }
  }
};

const ExperimentVisual = ({ experimentId, language = "zh" }) => {
  const svgRef = useRef(null);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 360;
    const height = 220;
    const palette = presets[experimentId] ?? presets["acid-base-neutralization"];

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const title = language === "zh" ? palette.title.zh : palette.title.en;
    svg
      .append("text")
      .attr("x", 20)
      .attr("y", 26)
      .attr("fill", "#1f2937")
      .attr("font-size", 14)
      .attr("font-weight", 600)
      .text(title);

    const drawBeaker = ({ x, y, color, label }) => {
      const group = svg.append("g").attr("transform", `translate(${x}, ${y})`);
      group
        .append("rect")
        .attr("width", 110)
        .attr("height", 110)
        .attr("rx", 16)
        .attr("fill", "#ffffff")
        .attr("stroke", "#d9e0ee");
      group
        .append("rect")
        .attr("x", 6)
        .attr("y", 60)
        .attr("width", 98)
        .attr("height", 42)
        .attr("rx", 12)
        .attr("fill", color)
        .attr("opacity", 0.85);
      group
        .append("text")
        .attr("x", 55)
        .attr("y", 130)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(label);
      return group;
    };

    const drawGasJar = ({ x, y, label }) => {
      const group = svg.append("g").attr("transform", `translate(${x}, ${y})`);
      group
        .append("rect")
        .attr("width", 90)
        .attr("height", 120)
        .attr("rx", 12)
        .attr("fill", "#ffffff")
        .attr("stroke", "#d9e0ee");
      group
        .append("rect")
        .attr("x", 10)
        .attr("y", 70)
        .attr("width", 70)
        .attr("height", 40)
        .attr("rx", 10)
        .attr("fill", palette.product)
        .attr("opacity", 0.75);
      group
        .append("text")
        .attr("x", 45)
        .attr("y", 138)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(label);
      return group;
    };

    const drawFlask = ({ x, y, label }) => {
      const group = svg.append("g").attr("transform", `translate(${x}, ${y})`);
      group
        .append("path")
        .attr("d", "M40 0 L50 0 L50 30 L70 70 Q40 120 10 70 L30 30 L30 0 Z")
        .attr("fill", "#ffffff")
        .attr("stroke", "#d9e0ee");
      group
        .append("path")
        .attr("d", "M20 70 Q40 105 60 70 Z")
        .attr("fill", palette.left)
        .attr("opacity", 0.8);
      group
        .append("text")
        .attr("x", 40)
        .attr("y", 138)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(label);
      return group;
    };

    const drawFunnel = ({ x, y, label }) => {
      const group = svg.append("g").attr("transform", `translate(${x}, ${y})`);
      group
        .append("path")
        .attr("d", "M0 0 H80 L50 40 H30 Z")
        .attr("fill", "#ffffff")
        .attr("stroke", "#d9e0ee");
      group
        .append("rect")
        .attr("x", 35)
        .attr("y", 40)
        .attr("width", 10)
        .attr("height", 40)
        .attr("fill", "#ffffff")
        .attr("stroke", "#d9e0ee");
      group
        .append("text")
        .attr("x", 40)
        .attr("y", 96)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(label);
      return group;
    };

    const bubbles = Array.from({ length: 8 }).map(() => ({
      x: 150 + Math.random() * 60,
      y: 150 + Math.random() * 20,
      r: 2 + Math.random() * 3
    }));

    const bubbleNodes = svg
      .selectAll(".bubble")
      .data(bubbles)
      .join("circle")
      .attr("class", "bubble")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .attr("fill", "#ffffff")
      .attr("opacity", 0.7);

    if (experimentId === "oxygen-preparation") {
      drawFlask({ x: 35, y: 40, label: palette.labels[language][0] });
      svg
        .append("path")
        .attr("d", "M110 80 H170 Q180 80 185 90 L200 110")
        .attr("fill", "none")
        .attr("stroke", "#94a3b8")
        .attr("stroke-width", 3);
      svg
        .append("text")
        .attr("x", 150)
        .attr("y", 70)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(palette.labels[language][1]);
      drawGasJar({ x: 210, y: 40, label: palette.labels[language][2] });
    } else if (experimentId === "copper-sulfate-crystallization") {
      drawBeaker({ x: 40, y: 50, color: palette.left, label: palette.labels[language][0] });
      drawFunnel({ x: 170, y: 65, label: palette.labels[language][1] });
      svg
        .append("rect")
        .attr("x", 195)
        .attr("y", 115)
        .attr("width", 20)
        .attr("height", 10)
        .attr("rx", 4)
        .attr("fill", "#e2e8f0")
        .attr("stroke", "#cbd5f5");
      svg
        .append("text")
        .attr("x", 210)
        .attr("y", 145)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(palette.labels[language][2]);
    } else {
      drawBeaker({ x: 30, y: 50, color: palette.left, label: palette.labels[language][0] });
      drawBeaker({ x: 220, y: 50, color: palette.right, label: palette.labels[language][1] });
      const mix = svg.append("g").attr("transform", "translate(130, 150)");
      mix
        .append("rect")
        .attr("width", 100)
        .attr("height", 50)
        .attr("rx", 12)
        .attr("fill", "#ffffff")
        .attr("stroke", "#d9e0ee");
      mix
        .append("rect")
        .attr("x", 6)
        .attr("y", 18)
        .attr("width", 88)
        .attr("height", 26)
        .attr("rx", 8)
        .attr("fill", palette.product)
        .attr("opacity", 0.9);
      mix
        .append("text")
        .attr("x", 50)
        .attr("y", 44)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", "#475569")
        .text(palette.labels[language][2]);
    }

    const animation = timer((elapsed) => {
      const t = (elapsed / 1200) % 1;
      bubbleNodes.attr("cy", (d) => d.y - t * 14).attr("opacity", 0.4 + t * 0.4);
    });

    return () => animation.stop();
  }, [experimentId, seed, language]);

  return (
    <div className="visual" onClick={() => setSeed((value) => value + 1)}>
      <svg
        ref={svgRef}
        role="img"
        aria-label={language === "zh" ? "实验可视化" : "Experiment visualization"}
      />
    </div>
  );
};

export default ExperimentVisual;
