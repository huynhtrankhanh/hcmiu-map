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
import { createLine, dotAt, labelAt } from "./superimpose";
import { points } from "./points"

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
      YES(twoDoorsRight("A2.104")),
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
      YES(twoDoorsRight("A1.109")),
    ],
    [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
  ]
);


points.forEach((point, index) =>
  document.body.appendChild(labelAt(...point, index + ""))
);
points.forEach((point) => document.body.appendChild(dotAt(...point)));
export const graph: [number, number][] = [
  [0, 5],
  [5, 4],
  [5, 6],
  [6, 7],
  [7, 8],
  [6, 1],
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
  [30, 29],
  [11, 9],
  [11, 10],
  [14, 12],
  [17, 16],
  [20, 19],
  [23, 22],
  [26, 24],
  [26, 25],
  [27, 28],
  [37, 39],
  [38, 39],
  [39, 42],
  [40, 42],
  [42, 45],
  [43, 45],
  [45, 48],
  [7, 39],
  [46, 48],
  [48, 51],
  [49, 51],
  [51, 54],
  [54, 35],
  [35, 34],
  [34, 55],
  [35, 36],
  [51, 50],
  [54, 52],
];

graph.forEach((edge) =>
  document.body.appendChild(createLine(...points[edge[0]], ...points[edge[1]]))
);
