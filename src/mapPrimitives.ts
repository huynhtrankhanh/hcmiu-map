import h from "hyperscript";

export const YES = (children?: any) =>
  h("div.col-span-1.bg-yellow-200", children);
export const NO = () => h("div.col-span-1");

export const twoDoors = (name: string) =>
  h(
    "div.flex.flex-row.w-24.h-32.border.border-black",
    { "data-isconstruct": true, "data-constructname": name },
    [
      h(
        "div.col-span-1.h-full.w-20.flex.justify-center.items-center",
        h("span.inline-block", name)
      ),
      h("div.col-span-1.h-full.w-4.grid.grid-rows-5.grid-cols-1", [
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.border-r-0.box-border"
        ),
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.border-r-0.box-border"
        ),
        h("div.col-span-1.row-span-1"),
      ]),
    ]
  );

export const twoDoorsRight = (name: string) =>
  h(
    "div.flex.flex-row.w-24.h-32.border.border-black",
    { "data-isconstruct": true, "data-constructname": name },
    [
      h("div.col-span-1.h-full.w-4.grid.grid-rows-5.grid-cols-1", [
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.border-l-0.box-border"
        ),
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.border-l-0.box-border"
        ),
        h("div.col-span-1.row-span-1"),
      ]),
      h(
        "div.col-span-1.h-full.w-20.flex.justify-center.items-center",
        h("span.inline-block", name)
      ),
    ]
  );

export const oneBottomDoorRight = (name: string) =>
  h(
    "div.flex.flex-row.w-24.h-32.border.border-black",
    { "data-isconstruct": true, "data-constructname": name },
    [
      h("div.col-span-1.h-full.w-4.grid.grid-rows-5.grid-cols-1", [
        h("div.col-span-1.row-span-1"),
        h("div.col-span-1.row-span-1"),
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.border-l-0.box-border"
        ),
        h("div.col-span-1.row-span-1"),
      ]),
      h(
        "div.col-span-1.h-full.w-20.flex.justify-center.items-center",
        h("span.inline-block", name)
      ),
    ]
  );

export const twoRooms = (room1: string, room2: string) =>
  h("div.col-span-1.h-32.w-24.grid.grid-rows-2.grid-cols-1", [
    h(
      "div.row-span-1.border.border-black.flex.items-center.justify-center",
      { "data-isconstruct": true, "data-constructname": room1 },
      h("span.inline-block", room1)
    ),
    h(
      "div.row-span-1.border.border-black.border-t-0.flex.items-center.justify-center",
      { "data-isconstruct": true, "data-constructname": room2 },
      h("span.inline-block", room2)
    ),
  ]);

export const topRightLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pr-1",
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        { "data-isconstruct": true, "data-constructname": "LIFT (A2, left)" },
        h("span.inline-block.rotate-90", "LIFT")
      )
    ),
    h("div.col-span-1.row-span-1"),
  ]);

export const notRoom = (name?: string, consumeHalf: boolean = false) => {
  if (name === undefined) {
    return h("div.col-span-1.row-span-1.w-24.h-32.bg-yellow-200");
  }
  return h(
    "div.col-span-1.row-span-1.w-24.h-32.bg-yellow-200.box-border.p-2.flex.justify-center" +
      (consumeHalf ? "" : ".items-center"),
    h(
      "div.w-full.h-full.border.border-black.flex.items-center.justify-center.text-center",
      {
        style: consumeHalf ? "height:50%" : "",
        "data-isconstruct": true,
        "data-constructname": name,
      },
      h("span.inline-block", name)
    )
  );
};

export const bottomRightLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h("div.col-span-1.row-span-1"),
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pr-1",
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        { "data-isconstruct": true, "data-constructname": "LIFT (A1, left)" },
        h("span.inline-block.rotate-90", "LIFT")
      )
    ),
  ]);

export const topLeftLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pl-1",
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        { "data-isconstruct": true, "data-constructname": "LIFT (A2, right)" },
        h("span.inline-block.rotate-90", "LIFT")
      ),
      h("div.col-span-1.row-span-1")
    ),
    h("div.col-span-1.row-span-1"),
  ]);

export const bottomLeftLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h("div.col-span-1.row-span-1"),
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pl-1",
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        { "data-isconstruct": true, "data-constructname": "LIFT (A1, right)" },
        h("span.inline-block.rotate-90", "LIFT")
      ),
      h("div.col-span-1.row-span-1")
    ),
  ]);

export const classroom = (name: string, constructName: string = name) =>
  h(
    "div.w-20.h-15.border.border-black.flex.justify-center.items-center",
    { "data-isconstruct": true, "data-constructname": constructName },
    h("span.inline-block", name)
  );
export const occupy = () => h("div.w-20.h-15");
export const classrooms = (rooms: any[]) =>
  h("div.grid.grid-cols-6.grid-rows-2.gap-x-2.gap-y-5.bg-yellow-200", rooms);

export const stairs = () =>
  h(
    "div.p-1.col-span-1.row-span-1.flex.bg-yellow-200",
    { "data-isstairs": "" },
    h("div.border.border-black.w-full.h-full.text-center", "STAIRS")
  );

export const library = (name: string) =>
  h(
    "div.border.border-black.border-t-0.border-b-0.flex.w-24.h-32.items-center.justify-center.p-2.box-border",
    name === "" ? {} : { "data-isconstruct": true, "data-constructname": name },
    h("span.inline-block.text-center", name)
  );
