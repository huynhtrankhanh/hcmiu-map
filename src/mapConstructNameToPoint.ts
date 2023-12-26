import { mapPointToConstructName } from "./mapPointToConstructName";

export const mapConstructNameToPoint = mapPointToConstructName.map((map) => {
  const inverse: Record<string, number> = {};
  for (const key of Object.keys(map)) {
    inverse[map[Number(key)]] = Number(key);
  }
  return inverse;
});
