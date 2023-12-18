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
      YES(twoRooms("O2.602", "A2.601")),
      topRightLift(),
      classrooms([
        [
          occupy(),
          classroom("O2.603"),
          classroom("O2.604"),
          classroom("O2.605"),
          classroom("O2.606"),
          occupy(),
        ],
        [
          classroom("LA2.614"),
          classroom("LA2.613"),
          classroom("O2.612"),
          classroom("O2.611"),
          classroom("O2.610"),
          classroom("O2.609"),
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoRooms("O2.607", "A2.608")),
    ],
    [YES(library("")), YES(), NO(), NO(), NO(), NO()],
    [
      YES(twoRooms("LA1.602", "LA1.601")),
      bottomRightLift(),
      classrooms([
        [
          classroom("O1.603"),
          classroom("LA1.604"),
          classroom("LA1.605"),
          classroom("LA1.606"),
          classroom("LA1.607"),
          classroom("LA1.608"),
        ],
        [
          occupy(),
          classroom("A1.614"),
          classroom("A1.613"),
          classroom("LA1.612"),
          classroom("O1.611"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom(),
      YES(twoRooms("A1.609", "A1.610")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
