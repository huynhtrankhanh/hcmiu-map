import './style.css'
import h from 'hyperscript'
document.querySelector<HTMLDivElement>('#app')?.appendChild(
  h('div.grid.grid-cols-4.grid-rows-4.gap-4.w-fit', [
    h('div.col-span-2.row-span-2.bg-red-500.h-36.w-36'),
    h('div.col-span-1.bg-yellow-500.h-16.w-16'),
    h('div.col-span-1.bg-pink-500.h-16.w-16'),
    h('div.col-span-1.bg-purple-500.h-16.w-16'),
    h('div.col-span-1.bg-cyan-500.h-16.w-16'),
    h('div.col-span-1.bg-lime-500.h-16.w-16'),
    h('div.col-span-1.bg-gray-500.h-16.w-16'),
    h('div.col-span-1.bg-blue-500.h-16.w-16'),
    h('div.col-span-1.bg-green-500.h-16.w-16'),
    h('div.col-span-1.bg-lime-500.h-16.w-16'),
    h('div.col-span-1.bg-gray-500.h-16.w-16'),
    h('div.col-span-1.bg-blue-500.h-16.w-16'),
    h('div.col-span-1.bg-green-500.h-16.w-16')
  ])
);
