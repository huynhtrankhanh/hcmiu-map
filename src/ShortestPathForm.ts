import h from "hyperscript";
import { generateRandomString } from "./generateRandomString";
import { SuggestBox } from "./SuggestBox";
import { candidates, candidateSet } from "./candidates";

export function ShortestPathForm(
  defaultFrom: string = "",
  defaultTo: string = "",
  onChange?: (from: string, to: string) => void,
  onChooseSourceOnMap?: () => void,
  onChooseDestinationOnMap?: () => void,
  onSubmit?: () => void
) {
  const fromFieldId = generateRandomString();
  const toFieldId = generateRandomString();

  const fromField = SuggestBox(
    candidates,
    fromFieldId,
    () => {
      (fromFieldError as HTMLDivElement).style.display = "none";
      (samePlacesError as HTMLDivElement).style.display = "none";
      onChange && onChange(fromField.getInput(), toField.getInput());
    },
    defaultFrom
  );
  const toField = SuggestBox(
    candidates,
    toFieldId,
    () => {
      (toFieldError as HTMLDivElement).style.display = "none";
      (samePlacesError as HTMLDivElement).style.display = "none";
      onChange && onChange(fromField.getInput(), toField.getInput());
    },
    defaultTo
  );

  const fromFieldError = h(
    "div.text-red-500.mt-2",
    { style: "display:none" },
    "Please choose a valid starting point"
  );
  const toFieldError = h(
    "div.text-red-500.mt-2",
    { style: "display:none" },
    "Please choose a valid destination"
  );

  const samePlacesError = h(
    "div.text-red-500",
    { style: "display:none" },
    "Please choose different places for starting point and destination"
  );

  const element = h(
    "div.flex.flex-col.items-center.justify-center",
    h("h1.text-xl.mb-4", "Shortest Path"),
    h(
      "form.w-full.max-w-lg.space-y-6",
      {
        onsubmit: (event: Event) => {
          event.preventDefault();
          (fromFieldError as HTMLDivElement).style.display = "none";
          (toFieldError as HTMLDivElement).style.display = "none";
          (samePlacesError as HTMLDivElement).style.display = "none";

          let bothValid = true;
          if (!candidateSet.has(fromField.getInput())) {
            bothValid = false;
            (fromFieldError as HTMLDivElement).style.display = "block";
          }
          if (!candidateSet.has(toField.getInput())) {
            bothValid = false;
            (toFieldError as HTMLDivElement).style.display = "block";
          }
          if (bothValid && fromField.getInput() === toField.getInput()) {
            (samePlacesError as HTMLDivElement).style.display = "block";
            bothValid = false;
          }
          if (bothValid && onSubmit) onSubmit();
        },
      },
      h(
        "div.flex.flex-col",
        h("label.mb-2.text-lg", { for: fromFieldId }, "From"),
        fromField.element,
        fromFieldError,
        h(
          "div.flex.items-center.justify-center.my-2",
          h("div.flex-grow.border-t.border-gray-300"),
          h("span.px-3.text-sm", "or"),
          h(
            "button.bg-blue-500.text-white.px-4.py-1.rounded",
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
        h("label.mb-2.text-lg", { for: toFieldId }, "To"),
        toField.element,
        toFieldError,
        h(
          "div.flex.items-center.justify-center.my-2",
          h("div.flex-grow.border-t.border-gray-300"),
          h("span.px-3.text-sm", "or"),
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
      samePlacesError,
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
