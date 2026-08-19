export default function buildClassName(...classes: (string | null | undefined)[]) {
  return classes.filter(x => !!x && typeof x === "string" && x.length > 0).join(" ");
}
