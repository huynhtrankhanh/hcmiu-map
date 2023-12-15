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
      YES(twoDoors("O2.101")),
      topRightLift(),
      classrooms([
        [
          classroom("A2.102"),
          occupy(),
          occupy(),
          occupy(),
          occupy(),
          classroom("O2.103"),
        ],
        [
          classroom("LA2.109"),
          classroom("O2.108"),
          classroom("O2.107"),
          classroom("O2.106"),
          classroom("LA2.105"),
          classroom("LA2.105"),
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoDoors("A2.104")),
    ],
    [YES(library("1ST FLOOR LIBRARY")), YES(), NO(), NO(), NO(), NO()],
    [
      YES(twoRooms("LA1.102", "LA1.101")),
      bottomRightLift(),
      classrooms([
        [
          classroom("LA1.103"),
          classroom("LA1.104"),
          classroom("O1.105"),
          classroom("O1.106"),
          classroom("O1.107"),
          classroom("A1.108"),
        ],
        [
          classroom("O1.111"),
          occupy(),
          occupy(),
          occupy(),
          classroom("O1.110"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom(),
      YES(twoDoors("A1.109")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
