import h from "hyperscript";
import { MapView } from "./MapView";
import { ShortestPathForm } from "./ShortestPathForm";
import { CollapseList } from "./CollapseList";
import { interfloorShortestPath, shortestPath } from "./getShortestPath";
import { floors } from "./floors";
import { mapConstructNameToPoint } from "./mapConstructNameToPoint";
import { mapPointToConstructName } from "./mapPointToConstructName";
import { liftPositions, liftPositionsReverseMap } from "./liftPositions";

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
          },
          () => {
            shortestPathComponent.cleanup();
            currentStage = "show shortest path";
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
        const element = h(
          "div.flex.flex-col.items-center.justify-center.min-h-screen",
          { style: "background:#F3F4F6" }
        );
        root.appendChild(element);

        const getFloor = (x: string): number => {
          if (/^Floor 1/.test(x)) return 0;
          if (/^Floor 2/.test(x)) return 1;
          if (/^Floor 3/.test(x)) return 2;
          if (/^Floor 4/.test(x)) return 3;
          if (/^Floor 5/.test(x)) return 4;
          if (/^Floor 6/.test(x)) return 5;
          if (/^Floor 7/.test(x)) return 6;
          return 7; // not a real floor
        };

        const stripFloor = (x: string): string => x.replace(/^Floor \d: /, "");

        let legs: { path: number[]; floor: number }[] = [];

        if (getFloor(fromField) === getFloor(toField)) {
          const floor = getFloor(fromField);
          const point1 =
            mapConstructNameToPoint[floor][stripFloor(fromField)] !== undefined
              ? mapConstructNameToPoint[floor][stripFloor(fromField)]
              : liftPositions[stripFloor(fromField)];
          const point2 =
            mapConstructNameToPoint[floor][stripFloor(toField)] !== undefined
              ? mapConstructNameToPoint[floor][stripFloor(toField)]
              : liftPositions[stripFloor(toField)];
          legs = [
            { floor, path: shortestPath(floors[floor].graph, point1, point2) },
          ];
        } else {
          const floor1 = getFloor(fromField);
          const floor2 = getFloor(toField);
          const point1 =
            mapConstructNameToPoint[floor1][stripFloor(fromField)] !== undefined
              ? mapConstructNameToPoint[floor1][stripFloor(fromField)]
              : liftPositions[stripFloor(fromField)];
          const point2 =
            mapConstructNameToPoint[floor2][stripFloor(toField)] !== undefined
              ? mapConstructNameToPoint[floor2][stripFloor(toField)]
              : liftPositions[stripFloor(toField)];
          const computed = interfloorShortestPath(
            floors[floor1].graph,
            floors[floor2].graph,
            point1,
            point2
          );
          if (computed !== undefined) {
            const [leg1, leg2] = computed;
            legs = [
              { path: leg1, floor: floor1 },
              { path: leg2, floor: floor2 },
            ];
          }
        }

        const mapView = MapView({
          type: "display path",
          legs,
          changeLegHook: (changeLeg) => {
            changeLeg(0);
            const list = CollapseList(
              legs.map(({ path, floor }) => {
                if (path.length === 1) {
                  return (
                    "Floor " +
                    (floor + 1) +
                    ": " +
                    (mapPointToConstructName[floor][path[0]] ||
                      liftPositionsReverseMap[path[0]])
                  );
                }
                return (
                  "Floor " +
                  (floor + 1) +
                  ": " +
                  (mapPointToConstructName[floor][path[0]] ||
                    liftPositionsReverseMap[path[0]]) +
                  " to " +
                  (mapPointToConstructName[floor][path[path.length - 1]] ||
                    liftPositionsReverseMap[path[path.length - 1]])
                );
              }),
              (leg) => {
                changeLeg(leg);
              }
            );

            element.appendChild(list.element);
            element.appendChild(h("div.mb-3"));
          },
        });
        element.appendChild(
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
            mapView.element
          )
        );
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
