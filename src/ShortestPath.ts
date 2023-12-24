import h from "hyperscript";
import { generateRandomString } from "./generateRandomString";

export function ShortestPath() {
  const fromFieldId = generateRandomString();
  const toFieldId = generateRandomString();

  const element = h(
    "div.flex.flex-col.items-center.justify-center",
    h("h1.text-xl.mb-4", "Shortest Path"),
    h(
      "form.w-full.max-w-lg.space-y-6",
      h(
        "div.flex.flex-col",
        h("label.font-roboto.mb-2.text-lg", { for: fromFieldId }, "From"),
        h(
          "input.w-full.p-2.border-2.border-gray-300.rounded-md.focus:outline-none.focus:border-blue-500",
          { type: "text", id: fromFieldId, name: "from" }
        ),
        h(
          "div.flex.items-center.justify-center.my-2",
          h("div.flex-grow.border-t.border-gray-300"),
          h("span.px-3.font-roboto.text-sm", "or"),
          h(
            "button.bg-blue-500.text-white.font-roboto.px-4.py-1.rounded",
            { type: "button" },
            "Choose on Map"
          )
        )
      ),
      h(
        "div.flex.flex-col",
        h("label.font-roboto.mb-2.text-lg", { for: toFieldId }, "To"),
        h(
          "input.w-full.p-2.border-2.border-gray-300.rounded-md.focus:outline-none.focus:border-blue-500",
          { type: "text", id: toFieldId, name: "to" }
        ),
        h(
          "div.flex.items-center.justify-center.my-2",
          h("div.flex-grow.border-t.border-gray-300"),
          h("span.px-3.text-sm]", "or"),
          h(
            "button.bg-blue-500.text-white.px-4.py-1.rounded",
            { type: "button" },
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
  return { element };
}
