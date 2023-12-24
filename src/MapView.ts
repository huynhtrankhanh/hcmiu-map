import h from "hyperscript";
import { floors } from "./floors"

export const MapView = () => {
  let currentFloor: number = 0;

  const mapElement = h("div", { style: "width:953.31px;height:452px" });

  const renderCurrentFloor = () => {
    mapElement.innerHTML = "";
    mapElement.appendChild(floors[currentFloor].element());
  };

  renderCurrentFloor();

  let currentScale = 100;

  const applyScale = () => {
    mapElement.style.transform = "scale(" + currentScale / 100 + ")";
    mapElement.style.transformOrigin = "top left";
  };

  applyScale();

  const element = h(
    "div",
    h(
      "div.mb-6",

      h(
        "select.block.appearance-none.w-full.border.py-3.px-4.pr-8.rounded.leading-tight.focus:outline-none.focus:bg-white.focus:border-[#6B7280]",
        {
          name: "floor",
          onchange: (event: Event) => {
            currentFloor = Number((event.target as HTMLSelectElement).value);
            renderCurrentFloor();
          },
        },
        h("option", { value: "0" }, "Floor 1"),
        h("option", { value: "1" }, "Floor 2"),
        h("option", { value: "2" }, "Floor 3"),
        h("option", { value: "3" }, "Floor 4"),
        h("option", { value: "4" }, "Floor 5"),
        h("option", { value: "5" }, "Floor 6"),
        h("option", { value: "6" }, "Floor 7")
      )
    ),
    h(
      "input.mb-6.w-full.h-2.bg-[#D1D5DB].rounded.outline-none.opacity-50.transition-opacity.duration-200.hover:opacity-100",
      {
        min: "50",
        max: "200",
        type: "range",
        value: "100",
        oninput: (event: Event) => {
          const scale = Number((event.target as HTMLInputElement).value);
          currentScale = scale;
          applyScale();
        },
      }
    ),
    h("div.overflow-auto", mapElement)
  );

  return { element };
};
