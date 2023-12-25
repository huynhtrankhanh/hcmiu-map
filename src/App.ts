import h from "hyperscript";
import { MapView } from "./MapView";
import { ShortestPathForm } from "./ShortestPathForm";

const MapViewPage = (onExit?: () => void) => {
  const element = h(
    "div.flex.flex-col.items-center.justify-center.h-screen",
    { style: "background:#F3F4F6" },
    h(
      "div.bg-white.p-8.rounded-lg.shadow-md.w-full",
      { style: "max-width:72rem" },
      h(
        "button.bg-red-500.text-white.px-4.py-2.rounded.w-full.mb-3",
        {
          onclick: () => {
            if (onExit !== undefined) onExit();
          },
        },
        "Exit"
      ),
      MapView().element
    )
  );
  return { element };
};

const ShortestPathPage = (onExit?: () => void) => {
  let fromField = "";
  let toField = "";

  let currentStage:
    | "form"
    | "choose source on map"
    | "choose destination on map"
    | "show shortest path" = "form";

  const root = h("div");

  const transition = (): null => {
    root.innerHTML = "";
    switch (currentStage) {
      case "form": {
        const shortestPathComponent = ShortestPathForm(
          fromField,
          toField,
          (from, to) => {
            (fromField = from), (toField = to);
          },
          () => {
            shortestPathComponent.cleanup();
            currentStage = "choose source on map";
            transition();
          },
          () => {
            shortestPathComponent.cleanup();
            currentStage = "choose destination on map";
            transition();
          }
        );
        const element = h(
          "div.flex.flex-col.items-center.justify-center.h-screen",
          { style: "background:#F3F4F6" },
          h(
            "div.bg-white.p-8.rounded-lg.shadow-md.w-full.max-w-md",
            h(
              "button.bg-red-500.text-white.px-4.py-2.rounded.w-full.mb-3",
              {
                onclick: () => {
                  if (onExit !== undefined) {
                    shortestPathComponent.cleanup();
                    onExit();
                  }
                },
              },
              "Exit"
            ),
            shortestPathComponent.element
          )
        );
        root.appendChild(element);
        return null;
      }
      case "choose source on map":
      case "choose destination on map": {
        let currentlyChosen: string | undefined;

        const cancelButton = h(
          "button.bg-red-500.text-white.px-4.py-2.rounded.w-full.mt-3",
          {
            onclick: () => {
              currentStage = "form";
              transition();
            },
          },
          "Cancel"
        );

        const confirmButton = h(
          "button.bg-blue-500.text-white.px-4.py-2.rounded.w-full",
          { style: "display:none" },
          {
            onclick: () => {
              if (currentStage === "choose source on map") {
                fromField = currentlyChosen!;
              } else {
                toField = currentlyChosen!;
              }
              currentStage = "form";
              transition();
            },
          },
          "Confirm"
        );

        const mapView = MapView({
          type: "choose on map",
          onChoose: (x) => {
            currentlyChosen = x;
            (confirmButton as HTMLButtonElement).style.display = "block";
          },
        });
        const element = h(
          "div.flex.flex-col.items-center.justify-center.h-screen",
          { style: "background:#F3F4F6" },
          h(
            "div.bg-white.p-8.rounded-lg.shadow-md.w-full",
            { style: "max-width:72rem" },
            mapView.element,
            h("div.mb-3"),
            confirmButton,
            cancelButton
          )
        );
        root.appendChild(element);
        return null;
      }
      case "show shortest path": {
        return null;
      }
    }
  };

  transition();
  return { element: root };
};

const LandingPage = (
  onClickViewMap?: () => void,
  onClickFindShortestPath?: () => void,
  onClickSolveTravelingSalesman?: () => void
) => {
  const element = h(
    "div.flex.flex-col.items-center.justify-center.h-screen",
    { style: "background:#F3F4F6" },
    h(
      "div.bg-white.p-8.rounded-lg.shadow-md.w-full.max-w-md",
      h("h1.text-xl.mb-4.text-center", "HCMIU Map"),
      h(
        "button.bg-blue-500.text-white.px-4.py-2.rounded.w-full.mb-3",
        {
          onclick: () => {
            if (onClickViewMap !== undefined) onClickViewMap();
          },
        },
        "View Map"
      ),
      h(
        "button.bg-blue-500.text-white.px-4.py-2.rounded.w-full.mb-3",
        {
          onclick: () => {
            if (onClickFindShortestPath !== undefined)
              onClickFindShortestPath();
          },
        },
        "Find Shortest Path"
      ),
      h(
        "button.bg-blue-500.text-white.px-4.py-2.rounded.w-full",
        {
          onclick: () => {
            if (onClickSolveTravelingSalesman !== undefined)
              onClickSolveTravelingSalesman();
          },
        },
        "Solve Traveling Salesman"
      )
    )
  );
  return { element };
};

export const App = () => {
  let currentPage:
    | "landing"
    | "map view"
    | "shortest path"
    | "traveling salesman" = "landing";
  const element = h("div");
  const transition = (): null => {
    const exit = () => {
      currentPage = "landing";
      transition();
    };

    element.innerHTML = "";
    switch (currentPage) {
      case "landing": {
        element.appendChild(
          LandingPage(
            () => {
              currentPage = "map view";
              transition();
            },
            () => {
              currentPage = "shortest path";
              transition();
            },
            () => {
              currentPage = "traveling salesman";
              transition();
            }
          ).element
        );
        return null;
      }
      case "map view": {
        element.appendChild(MapViewPage(exit).element);
        return null;
      }
      case "shortest path": {
        element.appendChild(ShortestPathPage(exit).element);
        return null;
      }
      case "traveling salesman": {
        return null;
      }
    }
  };
  transition();
  return { element };
};
