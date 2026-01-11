import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { timer } from "d3-timer";

const presets = {
  "acid-base-neutralization": {
    left: "#5e9bff",
    right: "#ff7b7b",
    product: "#7fdb91"
  },
  "oxygen-preparation": {
    left: "#9b7bff",
    right: "#ffc857",
    product: "#75d5ff"
  },
  "copper-sulfate-crystallization": {
    left: "#3b82f6",
    right: "#60a5fa",
    product: "#2563eb"
  }
};

const ExperimentVisual = ({ experimentId }) => {
  const svgRef = useRef(null);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 360;
    const height = 220;
    const palette = presets[experimentId] ?? presets["acid-base-neutralization"];

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    svg
      .append("rect")
      .attr("x", 20)
      .attr("y", 40)
      .attr("width", 140)
      .attr("height", 140)
      .attr("rx", 18)
      .attr("fill", "#f3f5f9")
      .attr("stroke", "#d9e0ee");

    svg
      .append("rect")
      .attr("x", 200)
      .attr("y", 40)
      .attr("width", 140)
      .attr("height", 140)
      .attr("rx", 18)
      .attr("fill", "#f3f5f9")
      .attr("stroke", "#d9e0ee");

    const particles = Array.from({ length: 18 }).map((_, index) => ({
      id: index,
      x: 60 + Math.random() * 80,
      y: 60 + Math.random() * 120,
      targetX: 240 + Math.random() * 80,
      targetY: 60 + Math.random() * 120
    }));

    const nodes = svg
      .selectAll("circle")
      .data(particles)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 6)
      .attr("fill", (d) => (d.id % 2 === 0 ? palette.left : palette.right))
      .attr("opacity", 0.9);

    const animation = timer((elapsed) => {
      const t = Math.min(elapsed / 2400, 1);
      nodes
        .attr("cx", (d) => d.x + (d.targetX - d.x) * t)
        .attr("cy", (d) => d.y + (d.targetY - d.y) * t)
        .attr("fill", (d) => (t > 0.8 ? palette.product : d.id % 2 === 0 ? palette.left : palette.right));

      if (t >= 1) {
        animation.stop();
      }
    });

    return () => animation.stop();
  }, [experimentId, seed]);

  return (
    <div className="visual" onClick={() => setSeed((value) => value + 1)}>
      <svg ref={svgRef} role="img" aria-label="实验可视化" />
    </div>
  );
};

export default ExperimentVisual;
