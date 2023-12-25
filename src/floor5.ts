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

export const element = () => h(
  "div.grid.grid-cols-5.grid-rows-5.w-fit",
  {
    style:
      "grid-template-rows:repeat(5,auto);grid-template-columns:repeat(6,auto)",
  },
  [
    [NO(), stairs(), NO(), stairs(), NO(), NO()],
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
          occupy(),
        ],
        [
          classroom("A2.514"),
          classroom("A2.513"),
          classroom("A2.512"),
          classroom("A2.511"),
          classroom("A2.510"),
          classroom("A2.509"),
        ],
      ]),
      topLeftLift(),
      notRoom(),
      YES(twoRooms("A2.507", "A2.508")),
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
    [NO(), stairs(), NO(), stairs(), NO(), NO()],
  ]
);

export const graph: [number, number][] = [
  [5, 32],
  [5, 60],
  [5, 4],
  [5, 6],
  [6, 7],
  [7, 8],
  [7, 2],
  [7, 3],
  [5, 11],
  [11, 14],
  [14, 17],
  [17, 20],
  [20, 23],
  [23, 26],
  [26, 28],
  [28, 30],
  [30, 56],
  [30, 57],
  [11, 10],
  [13, 14],
  [12, 14],
  [17, 15],
  [17, 16],
  [18, 20],
  [19, 20],
  [21, 23],
  [23, 22],
  [25, 26],
  [27, 28],
  [39, 42],
  [42, 45],
  [45, 48],
  [48, 51],
  [51, 54],
  [54, 35],
  [35, 34],
  [34, 58],
  [34, 59],
  [37, 39],
  [38, 39],
  [40, 42],
  [41, 42],
  [44, 45],
  [45, 43],
  [46, 48],
  [47, 48],
  [50, 51],
  [49, 51],
  [52, 54],
  [35, 36],
  [7, 39],
];
