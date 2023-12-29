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
        const index = locations.findIndex(
          ({ id: currentId }) => id === currentId
        )!;
        locations[index].value = input;
        hideError();
        onChange && onChange(id, input);
      },
      defaultValue
    );
    const errorDiv = h("div.text-red-500.mt-2", { style: "display:none" });
    const compound = h(
      "div.flex.flex-col",
      suggestBox.element,
      errorDiv,
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
              if (locations.length === 0)
                (findPathButton as HTMLButtonElement).style.display = "none";
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

    const hideError = () => {
      (errorDiv as HTMLDivElement).style.display = "none";
    };

    return {
      element: compound,
      cleanup: suggestBox.cleanup,
      showError: (error: string) => {
        (errorDiv as HTMLDivElement).style.display = "block";
        errorDiv.textContent = error;
      },
      hideError,
    };
  };

  const compounds = locations.map(({ id, value }) => compound(id, value));
  const compoundContainer = h(
    "div",
    compounds.map(({ element }) => element)
  );

  const findPathButton = h(
    "button.bg-green-500.text-white.px-4.py-2.rounded.w-full",
    { type: "submit" },
    "Find Path"
  );

  const element = h(
    "div.flex.flex-col.items-center.justify-center",
    h("h1.text-xl.mb-4", "Traveling Salesman"),
    h(
      "form.w-full.max-w-lg.space-y-6",
      {
        onsubmit: (event: Event) => {
          event.preventDefault();
          compounds.forEach((x) => x.hideError());
          let hasError = false;
          compounds.forEach((x, index) => {
            if (!candidateSet.has(locations[index].value)) {
              x.showError("Please choose a valid place");
              hasError = true;
            }
          });
          const mapInputToIndex = new Map<string, number[]>();
          locations.forEach((x, index) => {
            const list = mapInputToIndex.get(x.value) || [];
            list.push(index);
            mapInputToIndex.set(x.value, list);
          });
          for (const [key, value] of mapInputToIndex) {
            if (!candidateSet.has(key)) continue;
            if (value.length > 1)
              value.forEach((x) =>
                compounds[x].showError("Duplicate location")
              ),
                (hasError = true);
          }
          if (!hasError && onSubmit) {
            compounds.forEach((x) => x.cleanup());
            onSubmit();
          }
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
              (findPathButton as HTMLButtonElement).style.display = "block";
              onAdd && onAdd(location.id);
            },
          },
          "Add Location"
        ),
        h("div.flex-grow.border-t.border-gray-300")
      ),
      findPathButton
    )
  );
  return {
    element,
    cleanup: () => {
      compounds.forEach((x) => x.cleanup());
    },
  };
}
