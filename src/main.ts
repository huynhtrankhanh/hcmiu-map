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

const a2LiftLeft = 4;
const a2LiftRight = 27;
const a1LiftLeft = 8;
const a1LiftRight = 36;

const floors = [floor1, floor2, floor3, floor4, floor5, floor6, floor7];

const root = document.querySelector<HTMLDivElement>("#app")!;
floors.forEach((floor) => {
  const outer = h(
    "div.relative",
    { style: "width:953.31px;height:452px" },
    floor.element
  );
  points.forEach((x) => outer.appendChild(dotAt(...x)));
  points.forEach((x, index) => outer.appendChild(labelAt(...x, String(index))));

  // const path = shortestPath(floor.graph, 24, 43);
  // for (let i = 1; i < path.length; i++) outer.appendChild(createLine(...points[path[i-1]], ...points[path[i]]))
  root.appendChild(outer);
});

const constructs = document.querySelectorAll("[data-isconstruct]");
const labels = document.querySelectorAll(
  "[style^='background: white; border-radius: 2.5px; position: absolute;']"
);
const mapPositionToNode = (() => {
  const map = new Map<string, Element>();
  for (const x of constructs) {
    const { top, left, bottom, right } = x.getBoundingClientRect();
    map.set(
      JSON.stringify([
        Math.trunc((left + right) / 2),
        Math.trunc((top + bottom) / 2),
      ]),
      x
    );
  }
  return (x: number, y: number) =>
    map.get(JSON.stringify([Math.trunc(x), Math.trunc(y)]));
})();

for (const label of labels) {
  const { top: y, left: x } = label.getBoundingClientRect();
  const constructNode = mapPositionToNode(x, y)
  if (constructNode === undefined) {
    (label as HTMLElement).style.display = "none"
    continue
  }
}