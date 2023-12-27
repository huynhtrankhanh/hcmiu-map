import { mapPointToConstructName } from "./mapPointToConstructName";
import { liftPositionsReverseMap } from "./liftPositions";

const emptyArray: string[] = [];

export const candidates = emptyArray.concat(
  ...mapPointToConstructName.map((map, index) =>
    Object.values({ ...map, ...liftPositionsReverseMap }).map(
      (x) => "Floor " + (index + 1) + ": " + x
    )
  )
);

export const candidateSet = new Set(candidates);

export const getFloor = (x: string): number => {
  if (/^Floor 1/.test(x)) return 0;
  if (/^Floor 2/.test(x)) return 1;
  if (/^Floor 3/.test(x)) return 2;
  if (/^Floor 4/.test(x)) return 3;
  if (/^Floor 5/.test(x)) return 4;
  if (/^Floor 6/.test(x)) return 5;
  if (/^Floor 7/.test(x)) return 6;
  return 7; // not a real floor
};

export const stripFloor = (x: string): string => x.replace(/^Floor \d: /, "");
