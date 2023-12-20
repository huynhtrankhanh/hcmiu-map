import * as floor1 from "./floor1";
import * as floor2 from "./floor2";
import * as floor3 from "./floor3";
import * as floor4 from "./floor4";
import * as floor5 from "./floor5";
import * as floor6 from "./floor6";
import * as floor7 from "./floor7";
import "./superimpose";
import "./style.css";
import { createLine, dotAt } from "./superimpose";
import { points } from "./points";
import h from "hyperscript";

const root = document.querySelector<HTMLDivElement>("#app")!;
[floor1,floor2,floor3,floor4,floor5,floor6,floor7].forEach(floor => {
  const outer = h("div.relative", floor.element);
  points.forEach(x => outer.appendChild(dotAt(...x)))
  floor.graph.forEach(([u,v]) => outer.appendChild(createLine(...points[u], ...points[v])))
  document.body.appendChild(outer)
})
