import * as floor1 from "./floor1";
import * as floor2 from "./floor2";
import * as floor3 from "./floor3";
import * as floor4 from "./floor4";
import "./style.css";

const root = document.querySelector<HTMLDivElement>("#app")!;
root.appendChild(floor1.element);
root.appendChild(floor2.element);
root.appendChild(floor3.element);
root.appendChild(floor4.element);