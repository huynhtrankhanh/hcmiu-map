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
          classroom("O2.206", "O2.206 left"),
          classroom("O2.206", "O2.206 right"),
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
    [NO(), stairs(), NO(), stairs(), NO(), NO()],
  ]
);

export const graph: [number, number][] = [
  [5, 32],
  [5, 60],
  [5, 4],
  [5, 11],
  [11, 14],
  [14, 17],
  [17, 20],
  [20, 23],
  [23, 26],
  [26, 28],
  [28, 30],
  [30, 29],
  [11, 9],
  [10, 11],
  [14, 12],
  [17, 16],
  [20, 19],
  [23, 22],
  [26, 25],
  [27, 28],
  [5, 6],
  [6, 1],
  [6, 7],
  [7, 8],
  [7, 2],
  [7, 3],
  [7, 39],
  [39, 42],
  [42, 45],
  [45, 48],
  [48, 51],
  [51, 54],
  [54, 35],
  [35, 34],
  [34, 55],
  [37, 39],
  [39, 38],
  [40, 42],
  [43, 45],
  [46, 48],
  [49, 51],
  [51, 50],
  [54, 52],
  [35, 36],
];
