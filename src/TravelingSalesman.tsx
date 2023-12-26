import * as React from "react";
import ReactDOM from "react-dom";

function MainComponent() {
  const [locations, setLocations] = React.useState([""]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const addLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index + 1, 0, "");
    setLocations(newLocations);
    // Timeout set to give enough time for input to be rendered
    setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
  };
  const deleteLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
    // Focus the previous item if it exists
    if (index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
    }
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
      locations[index] === "" &&
      locations.length > 1
    ) {
      deleteLocation(index);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="text-lg text-center mb-8 text-[#121212]">
          Traveling Salesman
        </div>
        {locations.map((location, index) => (
          <div key={index} className="flex flex-col">
            <input
              autoFocus={index === 0}
              autoComplete="off"
              type="text"
              name={`location${index}`}
              value={location}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              onChange={(e) => {
                const newLocations = [...locations];
                newLocations[index] = e.target.value;
                setLocations(newLocations);
              }}
              onKeyDown={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          </div>
        ))}
        <button className="w-full p-3 bg-[#22c55e] text-white rounded-lg">
          Find Path
        </button>
      </div>
    </div>
  );
}

export function TravelingSalesman(): { element: HTMLDivElement } {
  const element = document.createElement("div");
  ReactDOM.render(<MainComponent />, element);
  return { element };
}
