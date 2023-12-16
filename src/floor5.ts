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
      YES(twoRooms("LA2.502", "A2.501")),
      topRightLift(),
      classrooms([
        [
          occupy(),
          classroom("O2.503"),
          classroom("A2.504"),
          classroom("A2.505"),
          classroom("O2.506"),
          occupy()
        ],
        [
            classroom("A2.514"),
          classroom("A2.513"),
          classroom("A2.512"),
          classroom("A2.511"),
          classroom("A2.510"),
          classroom("A2.509")
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoRooms("A2.507","A2.508")),
    ],
    [YES(library("")), YES(), NO(), NO(), NO(), NO()],
    [
      YES(twoRooms("LA1.502", "LA1.501")),
      bottomRightLift(),
      classrooms([
        [
          classroom("A1.503"),
          classroom("LA1.504"),
          classroom("LA1.505"),
          classroom("O1.506"),
          classroom("LA1.507"),
          classroom("LA1.508"),
        ],
        [
          classroom("O1.514"),
          classroom("O1.513"),
          classroom("O1.512a"),
          classroom("O1.512b"),
          classroom("O1.511"),
          occupy(),
        ],
      ]),
      bottomLeftLift(),
      notRoom(),
      YES(twoRooms("LA1.509", "O1.510")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);
