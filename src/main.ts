import "./style.css";
import { App } from "./App";

const root = document.querySelector<HTMLDivElement>("#app")!;
root.appendChild(App().element);
