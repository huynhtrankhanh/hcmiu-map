import "./style.css";
import h from "hyperscript";
const YES = (children?: any) =>
  h("div.col-span-1.bg-yellow-200.min-h-16.min-w-16", children);
const NO = () => h("div.col-span-1");

const twoDoors = (name: string) =>
  h("div.flex.flex-row.w-fit.border.border-black", [
    h(
      "div.col-span-1.h-32.w-20.flex.justify-center.items-center",
      h("span.inline-block", name)
    ),
    h("div.col-span-1.h-32.w-4.grid.grid-rows-5.grid-cols-1", [
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

const withTopRightLift = (construction: Element) =>
  h("div.flex.flex-row", [
    construction,
    h("div.grid.grid-cols-1.grid-rows-2.h-32.w-16", [
      h(
        "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2",
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
          h("span.inline-block.rotate-90", "LIFT")
        )
      ),
      h("div.col-span-1.row-span-1"),
    ]),
  ]);

const withBottomRightLift = (construction: Element) =>
  h("div.flex.flex-row", [
    construction,
    h("div.grid.grid-cols-1.grid-rows-2.h-32.w-16", [
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2",
        h("div.col-span-1.row-span-1"),
        h(
          "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
          h("span.inline-block.rotate-90", "LIFT")
        )
      ),
    ]),
  ]);

const classroom = (name: string) =>
  h(
    "div.w-20.h-16.border.border-black.flex.justify-center.items-center",
    h("span.inline-block", name)
  );
const rowOfClassrooms = () =>
  h(
    "div.grid.grid-cols-6.grid-rows-2.gap-x-2.gap-y-5",
    Array.from({ length: 12 }, () => classroom("A6.111"))
  );

const root = document.querySelector<HTMLDivElement>("#app")!;
root.appendChild(
  h(
    "div.grid.grid-cols-5.grid-rows-5.w-fit",
    {
      style:
        "grid-template-rows:repeat(5,auto);grid-template-columns:repeat(5,auto)",
    },
    [
      [YES("STAIRS"), NO(), YES("STAIRS"), NO(), NO()],
      [
        YES(withTopRightLift(twoDoors("A9.100"))),
        rowOfClassrooms(),
        YES(),
        YES(),
        YES(),
      ],
      [YES(), NO(), NO(), NO(), NO()],
      [
        YES(withBottomRightLift(twoRooms("A6.222", "A1.999"))),
        YES(),
        YES(),
        YES(),
        YES(),
      ],
      [YES("STAIRS"), NO(), YES("STAIRS"), NO(), NO()],
    ]
  )
);
