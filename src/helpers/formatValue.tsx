export const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    return value.map(item => formatValue(item)).join(", ");
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);

    if (entries.length === 0) return "";

    const allSimple = entries.every(
      //eslint-disable-next-line
      ([_, val]) => typeof val === "string" || typeof val === "number" || typeof val === "boolean",
    );

    if (allSimple) {
      //eslint-disable-next-line
      return entries.map(([_, val]) => formatValue(val)).join(", ");
    }

    try {
      return "";
    } catch {
      return String(value);
    }
  }

  return String(value);
};
