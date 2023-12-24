import h from "hyperscript";
import * as floor1 from "./floor1";
import * as floor2 from "./floor2";
import * as floor3 from "./floor3";
import * as floor4 from "./floor4";
import * as floor5 from "./floor5";
import * as floor6 from "./floor6";
import * as floor7 from "./floor7";

const floors = [floor1, floor2, floor3, floor4, floor5, floor6, floor7];

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
    "div.flex.flex-col.items-center.justify-center.h-screen.bg-[#F3F4F6]",
    h(
      "div.bg-white.p-8.rounded-lg.shadow-md.w-full",
      { style: "max-width:72rem" },
      h(
        "div.mb-6",

        h(
          "select.block.appearance-none.w-full.bg-[#FFFFFF].border.border-[#D1D5DB].text-[#121212].py-3.px-4.pr-8.rounded.leading-tight.focus:outline-none.focus:bg-white.focus:border-[#6B7280]",
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
    )
  );
  return { element };
};
