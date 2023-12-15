import "./style.css";
import h from "hyperscript";
const YES = (children?: any) =>
  h("div.col-span-1.bg-yellow-200.min-h-16.min-w-16", children);
const NO = () => h("div.col-span-1");

const twoDoors = (name: string) =>
  h("div.flex.flex-row.w-24.h-32.border.border-black", [
    h(
      "div.col-span-1.h-full.w-20.flex.justify-center.items-center",
      h("span.inline-block", name)
    ),
    h("div.col-span-1.h-full.w-4.grid.grid-rows-5.grid-cols-1", [
      h("div.col-span-1.row-span-1"),
      h("div.col-span-1.row-span-1.border.border-black.border-r-0.box-border"),
      h("div.col-span-1.row-span-1"),
      h("div.col-span-1.row-span-1.border.border-black.border-r-0.box-border"),
      h("div.col-span-1.row-span-1"),
    ]),
  ]);

const twoRooms = (room1: string, room2: string) =>
  h("div.col-span-1.h-32.w-24.grid.grid-rows-2.grid-cols-1", [
    h(
      "div.row-span-1.border.border-black.flex.items-center.justify-center",
      h("span.inline-block", room1)
    ),
    h(
      "div.row-span-1.border.border-black.border-t-0.flex.items-center.justify-center",
      h("span.inline-block", room2)
    ),
  ]);

const topRightLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.mr-1.pb-5", [
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2",
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        h("span.inline-block.rotate-90", "LIFT")
      )
    ),
    h("div.col-span-1.row-span-1"),
  ]);

const bottomRightLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.mr-1.pt-5", [
    h("div.col-span-1.row-span-1"),
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2",
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        h("span.inline-block.rotate-90", "LIFT")
      )
    ),
  ]);

const classroom = (name: string) =>
  h(
    "div.w-20.h-15.border.border-black.flex.justify-center.items-center",
    h("span.inline-block", name)
  );
const rowOfClassrooms = () =>
  h(
    "div.grid.grid-cols-6.grid-rows-2.gap-x-2.gap-y-5",
    Array.from({ length: 12 }, () => classroom("A6.111"))
  );

const stairs = () =>
  h(
    "div.p-1.col-span-1.row-span-1.flex",
    h("div.border.border-black.w-full.h-full.text-center", "STAIRS")
  );

const root = document.querySelector<HTMLDivElement>("#app")!;
root.appendChild(
  h(
    "div.grid.grid-cols-5.grid-rows-5.w-fit",
    {
      style:
        "grid-template-rows:repeat(5,auto);grid-template-columns:repeat(6,auto)",
    },
    [
      [NO(), stairs(), NO(), stairs(), NO(), NO()],
      [
        YES(twoDoors("A9.100")),
        topRightLift(),
        rowOfClassrooms(),
        YES(),
        YES(),
        YES(),
      ],
      [YES(), NO(), NO(), NO(), NO(), NO()],
      [
        YES(twoRooms("A6.222", "A1.999")),
        bottomRightLift(),
        YES(),
        YES(),
        YES(),
        YES(),
      ],
      [NO(), stairs(), NO(), stairs(), NO(), NO()],
    ]
  )
);
