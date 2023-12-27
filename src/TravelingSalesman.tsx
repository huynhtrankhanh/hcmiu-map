import * as React from "react";
import ReactDOM from "react-dom";
import { generateRandomString } from "./generateRandomString";

type Location = {
  value: string;
  id: string;
};

function MainComponent() {
  const [locations, setLocations] = React.useState<Location[]>([
    { value: "", id: generateRandomString() },
  ]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const addLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index + 1, 0, {
      value: "",
      id: generateRandomString(),
    });
    setLocations(newLocations);
    // Timeout set to give enough time for input to be rendered
    setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
  };
  const deleteLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
    setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
  };
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      addLocation(index);
    }
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      locations[index].value === "" &&
      locations.length > 1
    ) {
      deleteLocation(index);
    }
  };
  return (
    <>
      <div className="text-xl text-center mb-8 text-[#121212]">
        Traveling Salesman
      </div>
      {locations.map((location, index) => (
        <form
          key={location.id}
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            autoComplete="off"
            type="text"
            value={location.value}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              const newLocations = [...locations];
              newLocations[index] = {
                ...newLocations[index],
                value: e.target.value,
              };
              setLocations(newLocations);
            }}
            onKeyDown={(e) => handleKeyPress(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
          <div className="flex items-center justify-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-sm">or</span>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              type="button"
              onClick={() => {}}
            >
              Choose on Map
            </button>
          </div>
        </form>
      ))}
      <button className="w-full p-2 bg-[#22c55e] text-white rounded mt-3">
        Find Path
      </button>
    </>
  );
}

export function TravelingSalesman(): { element: HTMLDivElement } {
  const element = document.createElement("div");
  ReactDOM.render(<MainComponent />, element);
  return { element };
}
