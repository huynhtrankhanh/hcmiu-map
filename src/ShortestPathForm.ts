import h from "hyperscript";
import { generateRandomString } from "./generateRandomString";
import { SuggestBox } from "./SuggestBox";
import { mapPointToConstructName } from "./mapPointToConstructName";
import { liftPositionsReverseMap } from "./liftPositions";

const emptyArray: string[] = [];

const candidates = emptyArray.concat(
  ...mapPointToConstructName.map((map, index) =>
    Object.values({ ...map, ...liftPositionsReverseMap }).map(
      (x) => "Floor " + (index + 1) + ": " + x
    )
  )
);

export function ShortestPathForm(
  defaultFrom: string = "",
  defaultTo: string = "",
  onChange?: (from: string, to: string) => void,
  onChooseSourceOnMap?: () => void,
  onChooseDestinationOnMap?: () => void
) {
  const fromFieldId = generateRandomString();
  const toFieldId = generateRandomString();

  const fromField = SuggestBox(
    candidates,
    fromFieldId,
    () => {
      onChange && onChange(fromField.getInput(), toField.getInput());
    },
    defaultFrom
  );
  const toField = SuggestBox(
    candidates,
    toFieldId,
    () => {
      onChange && onChange(fromField.getInput(), toField.getInput());
    },
    defaultTo
  );

  const element = h(
    "div.flex.flex-col.items-center.justify-center",
    h("h1.text-xl.mb-4", "Shortest Path"),
    h(
      "form.w-full.max-w-lg.space-y-6",
      h(
        "div.flex.flex-col",
        h("label.font-roboto.mb-2.text-lg", { for: fromFieldId }, "From"),
        fromField.element,
        h(
          "div.flex.items-center.justify-center.my-2",
          h("div.flex-grow.border-t.border-gray-300"),
          h("span.px-3.font-roboto.text-sm", "or"),
          h(
            "button.bg-blue-500.text-white.font-roboto.px-4.py-1.rounded",
            {
              type: "button",
              onclick: () => {
                onChooseSourceOnMap && onChooseSourceOnMap();
              },
            },
            "Choose on Map"
          )
        )
      ),
      h(
        "div.flex.flex-col",
        h("label.font-roboto.mb-2.text-lg", { for: toFieldId }, "To"),
        toField.element,
        h(
          "div.flex.items-center.justify-center.my-2",
          h("div.flex-grow.border-t.border-gray-300"),
          h("span.px-3.text-sm]", "or"),
          h(
            "button.bg-blue-500.text-white.px-4.py-1.rounded",
            {
              type: "button",
              onclick: () => {
                onChooseDestinationOnMap && onChooseDestinationOnMap();
              },
            },
            "Choose on Map"
          )
        )
      ),
      h(
        "button.bg-green-500.text-white.px-4.py-2.rounded.w-full",
        { type: "submit" },
        "Find Path"
      )
    )
  );
  return {
    element,
    cleanup: () => {
      fromField.cleanup();
      toField.cleanup();
    },
  };
}