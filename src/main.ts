import * as floor1 from "./floor1";
import * as floor2 from "./floor2";
import * as floor3 from "./floor3";
import * as floor4 from "./floor4";
import * as floor5 from "./floor5";
import * as floor6 from "./floor6";
import * as floor7 from "./floor7";
import "./superimpose";
import "./style.css";
import { createLine, dotAt, labelAt } from "./superimpose";
import { shortestPath } from "./shortestPath";
import { points } from "./points";
import h from "hyperscript";
import { MapView } from "./MapView"

const a2LiftLeft = 4;
const a2LiftRight = 27;
const a1LiftLeft = 8;
const a1LiftRight = 36;

const floors = [floor1, floor2, floor3, floor4, floor5, floor6, floor7];

const root = document.querySelector<HTMLDivElement>("#app")!;
root.appendChild(MapView().element)
