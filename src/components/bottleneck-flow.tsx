const stages = [
  "Unclear ownership",
  "Repeated escalation",
  "Slower decisions",
  "Leadership overload",
  "Less capacity for growth",
] as const;

export function BottleneckFlow() {
  return (
    <div
      className="bottleneck-flow"
      aria-label={`One possible pattern: ${stages.join(" can contribute to ")}`}
    >
      {stages.map((stage, index) => (
        <div className="bottleneck-flow__stage" key={stage}>
          <span className="bottleneck-flow__number">0{index + 1}</span>
          <strong>{stage}</strong>
          {index < stages.length - 1 ? (
            <span className="bottleneck-flow__line" aria-hidden="true">
              <span />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
