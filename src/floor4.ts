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

export const element = () => h(
  "div.grid.grid-cols-5.grid-rows-5.w-fit",
  {
    style:
      "grid-template-rows:repeat(5,auto);grid-template-columns:repeat(6,auto)",
  },
  [
    [NO(), stairs(), NO(), stairs(), NO(), NO()],
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
    [NO(), stairs(), NO(), stairs(), NO(), NO()],
  ]
);

export const graph: [number, number][] = [
    [32, 5],
    [60, 5],
    [4, 5],
    [5, 11],
    [11, 14],
    [14, 17],
    [17, 20],
    [20, 23],
    [23, 26],
    [26, 28],
    [28, 30],
    [30, 29],
    [11, 10],
    [14, 12],
    [17, 16],
    [17, 15],
    [20, 18],
    [14, 13],
    [20, 19],
    [21, 23],
    [22, 23],
    [25, 26],
    [27, 28],
    [5, 6],
    [6, 7],
    [7, 8],
    [7, 3],
    [7, 2],
    [7, 39],
    [39, 42],
    [42, 45],
    [45, 48],
    [51, 54],
    [54, 35],
    [35, 34],
    [34, 55],
    [48, 51],
    [37, 39],
    [42, 40],
    [42, 41],
    [45, 43],
    [45, 44],
    [48, 47],
    [48, 46],
    [51, 49],
    [51, 50],
    [54, 52],
    [35, 36],
  ];
  