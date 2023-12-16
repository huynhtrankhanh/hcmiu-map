import h from "hyperscript";
import {
  NO,
  YES,
  stairs,
  twoDoors,
  topRightLift,
  classrooms,
  classroom,
  occupy,
  topLeftLift,
  notRoom,
  library,
  twoRooms,
  bottomRightLift,
  bottomLeftLift,
  twoDoorsRight,
} from "./mapPrimitives";

export const element = h(
  "div.grid.grid-cols-5.grid-rows-5.w-fit",
  {
    style:
      "grid-template-rows:repeat(5,auto);grid-template-columns:repeat(6,auto)",
  },
  [
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
    [
      YES(twoRooms("O2.702", "O2.701")),
      topRightLift(),
      classrooms([
        [
          occupy(),
          classroom("O2.703"),
          classroom("O2.704"),
          classroom("O2.705"),
          classroom("O2.706"),
          classroom("O2.707"),
        ],
        [
          occupy(),
          classroom("O2.713"),
          classroom("O2.712"),
          classroom("O2.711"),
          classroom("O2.710"),
          occupy(),
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoRooms("O2.708", "O2.709")),
    ],
    [YES(library("")), YES(), NO(), NO(), NO(), NO()],
    [
      YES(twoRooms("LA1.702", "LA1.701")),
      bottomRightLift(),
      classrooms([
        [
          classroom("LA1.703"),
          classroom("LA1.704"),
          classroom("O1.705"),
          classroom("O1.706"),
          classroom("O1.707"),
          classroom("O1.708"),
        ],
        [
          occupy(),
          classroom("O1.714"),
          classroom("O1.713"),
          classroom("O1.712"),
          classroom("O1.711"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom(),
      YES(twoRooms("LA1.709", "LA1.710")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
