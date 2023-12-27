import h from "hyperscript";
import { floors } from "./floors";
import { createLine, labelAt } from "./superimpose";
import { points } from "./points";

export const MapView = (
  config?:
    | {
        type: "choose on map";
        onChoose: (constructName: string) => void;
      }
    | {
        type: "display path";
        legs: { floor: number; path: number[] }[];
        changeLegHook: (legChanger: (x: number) => void) => void;
      }
) => {
  let currentFloor: number = 0;

  const mapElement = h("div.relative", {
    style: "width:953.31px;height:452px",
  });

  const renderCurrentFloor = () => {
    mapElement.innerHTML = "";
    mapElement.appendChild(floors[currentFloor].element());
    if (config?.type === "choose on map") {
      mapElement
        .querySelectorAll("[data-isstairs]")
        .forEach((node) => ((node as HTMLDivElement).style.opacity = "30%"));
      mapElement.querySelectorAll("[data-isconstruct]").forEach((construct) => {
        construct.addEventListener("click", () => {
          config.onChoose(
            "Floor " +
              (currentFloor + 1) +
              ": " +
              construct.getAttribute("data-constructname")!
          );
          mapElement
            .querySelectorAll("[data-constructselected]")
            .forEach((x) => {
              x.removeAttribute("data-constructselected");
              (x as HTMLDivElement).style.fontWeight = "";
              (x as HTMLDivElement).style.textDecoration = "";
            });
          construct.setAttribute("data-constructselected", "");
          (construct as HTMLDivElement).style.fontWeight = "bold";
          (construct as HTMLDivElement).style.textDecoration = "underline";
        });
      });
    }
  };

  renderCurrentFloor();

  if (config?.type === "display path") {
    const legs = config.legs;

    config.changeLegHook((leg) => {
      currentFloor = legs[leg].floor;
      renderCurrentFloor();

      const path = legs[leg].path;

      if (path.length === 1) {
        const label = labelAt(...points[path[0]], "X");
        mapElement.appendChild(label);
        // https://stackoverflow.com/a/52835382
        setTimeout(
          () =>
            label.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            }),
          0
        );
      }
      let firstLine: HTMLDivElement | undefined;
      for (let i = 1; i < path.length; i++) {
        const line = createLine(...points[path[i - 1]], ...points[path[i]]);
        if (!firstLine) firstLine = line;
        mapElement.appendChild(line);
      }
      // https://stackoverflow.com/a/52835382
      setTimeout(
        () =>
          firstLine?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          }),
        0
      );
    });
  }

  let currentScale = 100;

  const applyScale = () => {
    (mapElement as HTMLDivElement).style.transform =
      "scale(" + currentScale / 100 + ")";
    (mapElement as HTMLDivElement).style.transformOrigin = "top left";
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
          style:
            config?.type === "display path" ? "display:none" : "display:block",
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
