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
import { midpoint } from "./midpoint";
import { dotAt, labelAt } from "./superimpose";

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

const pointsArray: [number, number][] = [
  [48, 98],
  [48, 226],
  [48, 322],
  [48, 386],
  [147.4921875, 61],
  [132.328125, 98],
  [132.328125, 226],
  [132.328125, 354],
  [147.4921875, 391],
  [208.65625, 61],
  [208.65625, 135],
  [208.65625, 98],
  [296.65625, 135],
  [296.65625, 61],
  [296.65625, 98],
  [384.65625, 61],
  [384.65625, 135],
  [384.65625, 98],
  [472.65625, 61],
  [472.65625, 135],
  [472.65625, 98],
  [560.65625, 61],
  [560.65625, 135],
  [560.65625, 98],
  [648.65625, 61],
  [648.65625, 135],
  [648.65625, 98],
  [709.8203125, 61],
  [724.984375, 98],
  [905.3125, 98],
  [809.3125, 98],
  [809.3125, 326],
  [48, 66],
  [48, 354],
  [809.3125, 354],
  [724.984375, 354],
  [709.8203125, 391],
  [208.65625, 317],
  [208.65625, 391],
  [208.65625,351],
  [296.65625,317],
  [296.65625,391],
  [296.65625,351],
  [384.65625,317],
  [384.65625,391],
  [384.65625,351],
  [472.65625,317],
  [472.65625,391],
  [472.65625,351],
  [560.65625,317],
  [560.65625,391],
  [560.65625,351],
  [648.65625,317],
  [648.65625,391],
  [648.65625,351],
  [905.3125,354],
  [905.3125,66],
  [905.3125,130]
  ,[905.3125,322],
  [905.3125,386]
];
pointsArray.forEach((point, index) =>
  document.body.appendChild(labelAt(...point, index + ""))
);
pointsArray.forEach((point) => document.body.appendChild(dotAt(...point)));
