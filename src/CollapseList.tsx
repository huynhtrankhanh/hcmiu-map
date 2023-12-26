import * as React from "react";
import ReactDOM from "react-dom";

function MainComponent({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (index: number) => void;
}) {
  const [selectedItem, setSelectedItem] = React.useState<number | null>(
    items.length > 0 ? 0 : null
  );
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const itemList = (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <li
          key={item}
          className={`px-6 py-4 flex items-center cursor-pointer ${
            selectedItem === index
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-900"
          }`}
          onClick={() => {
            onSelect(index);
            setSelectedItem(index);
          }}
        >
          <span className="mr-4 font-semibold">{index + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
  const selectedItemList = selectedItem !== null && (
    <ul className="divide-y divide-gray-200">
      <li className="px-6 py-4 flex items-center bg-blue-500 text-white">
        <span className="mr-4 font-semibold">{selectedItem + 1}.</span>
        <span>{items[selectedItem]}</span>
      </li>
    </ul>
  );
  return (
    <div className="w-screen max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        <li
          className={`px-6 py-2 flex items-center cursor-pointer bg-white text-gray-900`}
          onClick={toggleCollapse}
        >
          <span>{isCollapsed ? "Expand" : "Collapse"}</span>
        </li>
        {isCollapsed ? selectedItemList : itemList}
      </ul>
    </div>
  );
}

export function CollapseList(
  items: string[],
  onSelect: (index: number) => void
): { element: HTMLDivElement } {
  const element = document.createElement("div");
  ReactDOM.render(<MainComponent items={items} onSelect={onSelect} />, element);
  return { element };
}
