const TEXT_COLORS = {
  LOW: "font-semibold text-yellow-900",
  HIGH: "font-semibold text-red-900",
  NORMAL: "font-semibold text-green-900",
};

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "N/A";

const formatRange = (obs) => {
  const range = obs.referenceRange?.[0];
  const unit = obs.valueQuantity?.unit ?? "";
  const low = range?.low?.value;
  const high = range?.high?.value;

  if (!low && !high) return "N/A";
  if (low && !high) return `${low} ${unit} to N/A`;
  if (!low && high) return `N/A to ${high} ${unit}`;
  return `${low} ${unit} - ${high} ${unit}`;
};

const getValueColor = (obs) => {
  const value = obs.valueQuantity?.value;
  const range = obs.referenceRange?.[0];
  const low = range?.low?.value;
  const high = range?.high?.value;

  if (value == null) return TEXT_COLORS.NORMAL;
  if (low != null && value < low) return TEXT_COLORS.LOW;
  if (high != null && value > high) return TEXT_COLORS.HIGH;
  return TEXT_COLORS.NORMAL;
};

export default function ResourceDetails({ resource, observations }) {
  const codeText = resource.code?.text ?? "N/A";
  const performerName = resource.performer?.[0]?.display ?? "N/A";
  const reportDate = formatDate(resource.effectiveDateTime);

  const reportName = `🩸 ${codeText}`;
  const performer = `💉 ${performerName}`;
  const displayDate = `📅 ${reportDate}`;

  return (
    <section className="mt-6 p-6" aria-labelledby="report-title">
      <h2 id="report-title" className="text-2xl font-bold mb-4">{codeText}</h2>

      <dl className="grid gap-4 md:grid-cols-3">
        <InfoBlock label="Report Name" value={reportName} />
        <InfoBlock label="Test Performer" value={performer} />
        <InfoBlock label="Result Date & Time" value={displayDate} />
      </dl>

      <div className="border-t my-6" />

      <div className="grid gap-4 md:grid-cols-3" role="list">
        {observations.map((obs, idx) => {
          const value = obs.valueQuantity?.value ?? "N/A";
          const unit = obs.valueQuantity?.unit ?? "N/A";
          const labelId = `obs-title-${idx}`;

          return (
            <div
              key={idx}
              role="listitem"
              className="p-4 text-sm rounded-lg border-2 shadow-sm"
              aria-labelledby={labelId}
            >
              <div id={labelId} className="text-base font-semibold text-black">
                {obs.code?.text ?? "Unknown Test"}
              </div>
              <div>
                <span className="font-semibold">Result: </span>
                <span className={getValueColor(obs)}>{value}</span>
                <span> {unit}</span>
              </div>
              <div>
                <span className="font-semibold">Normal Range: </span>
                {formatRange(obs)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <dt className="font-semibold">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
