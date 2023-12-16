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
      YES(twoRooms("LA2.302", "A2.301")),
      topRightLift(),
      classrooms([
        [
          occupy(),
          classroom("O2.303"),
          classroom("O2.304"),
          classroom("O2.305"),
          classroom("O2.306"),
          occupy(),
        ],
        [
          classroom("A2.313"),
          classroom("A2.312"),
          classroom("A2.311"),
          classroom("A2.310"),
          classroom("A2.309"),
          classroom("A2.308"),
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoDoorsRight("A2.307")),
    ],
    [YES(library("")), YES(), NO(), YES(), YES(), YES()],
    [
      YES(twoRooms("LA1.302", "LA1.301")),
      bottomRightLift(),
      classrooms([
        [
          classroom("A1.303"),
          classroom("O1.304"),
          classroom("O1.305"),
          classroom("O1.306"),
          classroom("O1.307"),
          classroom("O1.308"),
        ],
        [
          occupy(),
          classroom("O1.313"),
          classroom("A1.312"),
          classroom("O1.311"),
          classroom("O1.310"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom("UNIMART"),
      YES(twoDoorsRight("A1.309")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
