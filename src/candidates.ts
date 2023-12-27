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