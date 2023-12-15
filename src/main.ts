import "./style.css";
import h from "hyperscript";
const YES = (children?: any) => h("div.col-span-1.bg-yellow-200", children);
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
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pr-1",
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        h("span.inline-block.rotate-90", "LIFT")
      )
    ),
    h("div.col-span-1.row-span-1"),
  ]);

const notRoom = (name?: string) => {
  if (name === undefined) {
    return h("div.col-span-1.row-span-1.w-24.h-32.bg-yellow-200");
  }
  return h(
    "div.col-span-1.row-span-1.w-24.h-32.bg-yellow-200.box-border.p-2.flex.items-center.justify-center",
    h(
      "div.w-full.h-full.border.border-black.flex.items-center.justify-center.text-center",
      h("span.inline-block", name)
    )
  );
};

const bottomRightLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h("div.col-span-1.row-span-1"),
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pr-1",
      h("div.col-span-1.row-span-1"),
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        h("span.inline-block.rotate-90", "LIFT")
      )
    ),
  ]);

const topLeftLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pl-1",
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        h("span.inline-block.rotate-90", "LIFT")
      ),
      h("div.col-span-1.row-span-1")
    ),
    h("div.col-span-1.row-span-1"),
  ]);

const bottomLeftLift = () =>
  h("div.grid.grid-cols-1.grid-rows-2.bg-yellow-200.gap-y-5", [
    h("div.col-span-1.row-span-1"),
    h(
      "div.col-span-1.row-span-1.grid.grid-rows-1.grid-cols-2.pl-1",
      h(
        "div.col-span-1.row-span-1.border.border-black.flex.justify-center.items-center",
        h("span.inline-block.rotate-90", "LIFT")
      ),
      h("div.col-span-1.row-span-1")
    ),
  ]);

const classroom = (name: string) =>
  h(
    "div.w-20.h-15.border.border-black.flex.justify-center.items-center",
    h("span.inline-block", name)
  );
const occupy = () => h("div.w-20.h-15");
const classrooms = (rooms: any[]) =>
  h("div.grid.grid-cols-6.grid-rows-2.gap-x-2.gap-y-5.bg-yellow-200", rooms);

const stairs = () =>
  h(
    "div.p-1.col-span-1.row-span-1.flex",
    h("div.border.border-black.w-full.h-full.text-center", "STAIRS")
  );

const library = (name: string) =>
  h(
    "div.border.border-black.border-t-0.border-b-0.flex.w-24.h-32.items-center.justify-center.p-2.box-border",
    h("span.inline-block.text-center", name)
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
      [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
      [
        YES(twoDoors("O2.101")),
        topRightLift(),
        classrooms([
          [
            classroom("A2.102"),
            occupy(),
            occupy(),
            occupy(),
            occupy(),
            classroom("O2.103"),
          ],
          [
            classroom("LA2.109"),
            classroom("O2.108"),
            classroom("O2.107"),
            classroom("O2.106"),
            classroom("LA2.105"),
            classroom("LA2.105"),
          ],
        ]),
        topLeftLift(),
        notRoom(),
        YES(twoDoors("A2.104")),
      ],
      [YES(library("1ST FLOOR LIBRARY")), YES(), NO(), NO(), NO(), NO()],
      [
        YES(twoRooms("LA1.102", "LA1.101")),
        bottomRightLift(),
        classrooms([
          [
            classroom("LA1.103"),
            classroom("LA1.104"),
            classroom("O1.105"),
            classroom("O1.106"),
            classroom("O1.107"),
            classroom("A1.108"),
          ],
          [
            classroom("O1.111"),
            occupy(),
            occupy(),
            occupy(),
            classroom("O1.110"),
            occupy(),
          ],
        ]),
        bottomLeftLift(),
        notRoom(),
        YES(twoDoors("A1.109")),
      ],
      [NO(), YES(stairs()), NO(), YES(stairs()), NO(), NO()],
    ]
  )
);
