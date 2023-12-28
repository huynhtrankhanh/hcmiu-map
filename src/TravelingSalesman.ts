import h from "hyperscript";
import { generateRandomString } from "./generateRandomString";
import { SuggestBox } from "./SuggestBox";
import { candidates, candidateSet } from "./candidates";

type Location = { id: string; value: string };

export function TravelingSalesman(
  locations: Location[],
  onChange?: (id: string, value: string) => void,
  onChooseOnMap?: (id: string) => void,
  onDelete?: (id: string) => void,
  onAdd?: (id: string) => void,
  onSubmit?: () => void
) {
  const compound = (id: string, defaultValue?: string) => {
    const suggestBox = SuggestBox(
      candidates,
      id,
      (input) => {
        onChange && onChange(id, input);
      },
      defaultValue
    );
    const compound = h(
      "div.flex.flex-col",
      suggestBox.element,
      h(
        "div.flex.items-center.justify-center.my-2",
        h("div.flex-grow.border-t.border-gray-300"),
        h(
          "button.text-red-500.px-4.py-1.rounded",
          {
            type: "button",
            onclick: () => {
              suggestBox.cleanup();
              compound.parentNode!.removeChild(compound);
              const index = locations.findIndex(
                ({ id: currentId }) => currentId === id
              );
              locations.splice(index, 1);
              compounds.splice(index, 1);
              onDelete && onDelete(id);
            },
          },
          "Delete"
        ),
        h(
          "button.bg-blue-500.text-white.px-4.py-1.rounded",
          {
            type: "button",
            onclick: () => {
              onChooseOnMap && onChooseOnMap(id);
            },
          },
          "Choose on Map"
        )
      )
    );
    return { element: compound, cleanup: suggestBox.cleanup };
  };

  const compounds = locations.map(({ id, value }) => compound(id, value));
  const compoundContainer = h("div", compounds.map(({ element }) => element));

  const element = h(
    "div.flex.flex-col.items-center.justify-center",
    h("h1.text-xl.mb-4", "Traveling Salesman"),
    h(
      "form.w-full.max-w-lg.space-y-6",
      {
        onsubmit: (event: Event) => {
          event.preventDefault();
        },
      },
      compoundContainer,
      h(
        "div.flex.items-center.justify-center.my-2",
        h("div.flex-grow.border-t.border-gray-300"),
        h(
          "button.text-green-500.px-4.py-1.rounded.border-gray-300.border",
          {
            type: "button",
            onclick: () => {
              const location = { id: generateRandomString(), value: "" };
              locations.push(location);
              const element = compound(location.id, location.value);
              compounds.push(element);
              compoundContainer.appendChild(element.element);
              onAdd && onAdd(location.id);
            },
          },
          "Add Location"
        ),
        h("div.flex-grow.border-t.border-gray-300")
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
      compounds.forEach((x) => x.cleanup());
    },
  };
}
