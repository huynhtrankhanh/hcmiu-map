import h from "hyperscript";
import {
  NO,
  YES,
  stairs,
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
      YES(twoRooms("A2.402", "A2.401")),
      topRightLift(),
      classrooms([
        [
          occupy(),
          classroom("A2.403"),
          classroom("A2.404"),
          classroom("A2.405"),
          classroom("O2.406"),
          occupy(),
        ],
        [
          classroom("A2.413"),
          classroom("A2.412"),
          classroom("A2.411"),
          classroom("A2.410"),
          classroom("A2.409"),
          classroom("A2.408"),
        ],
      ]),
      topLeftLift(),
      notRoom("COFFEE STORY"),
      YES(twoDoorsRight("A2.407")),
    ],
    [YES(library("")), YES(), NO(), YES(), YES(), YES()],
    [
      YES(twoRooms("LA1.402", "LA1.401")),
      bottomRightLift(),
      classrooms([
        [
          classroom("LA1.403"),
          classroom("LA1.404"),
          classroom("O1.405"),
          classroom("LA1.406"),
          classroom("LA1.407"),
          classroom("LA1.408"),
        ],
        [
          occupy(),
          classroom("O1.413"),
          classroom("LA1.412"),
          classroom("O1.411"),
          classroom("O1.410"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom(),
      YES(twoDoorsRight("A1.409")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
