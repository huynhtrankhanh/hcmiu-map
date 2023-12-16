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
      YES(twoRooms("LA2.202", "LA2.201")),
      topRightLift(),
      classrooms([
        [
          classroom("A2.203"),
          occupy(),
          occupy(),
          occupy(),
          classroom("O2.204"),
          occupy(),
        ],
        [
          classroom("LA2.210"),
          classroom("LA2.209"),
          classroom("LA2.208"),
          classroom("LA2.207"),
          classroom("O2.206"),
          classroom("O2.206"),
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoDoorsRight("A2.205")),
    ],
    [YES(library("2ND FLOOR LIBRARY")), YES(), NO(), NO(), NO(), NO()],
    [
      YES(twoRooms("A1.202", "A1.201")),
      bottomRightLift(),
      classrooms([
        [
          classroom("A1.203"),
          classroom("A1.204"),
          classroom("A1.205"),
          classroom("A1.206"),
          classroom("A1.207a"),
          classroom("A1.207b"),
        ],
        [
          classroom("O1.210"),
          occupy(),
          occupy(),
          occupy(),
          classroom("O1.209"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom("FORESTA"),
      YES(twoDoorsRight("A1.208")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
