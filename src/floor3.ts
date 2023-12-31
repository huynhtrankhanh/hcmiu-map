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
  oneBottomDoorRight,
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
      notRoom("UNIMART", true),
      YES(oneBottomDoorRight("A1.309")),
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
  [14, 13],
  [17, 16],
  [17, 15],
  [20, 18],
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
  [35, 31],
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
