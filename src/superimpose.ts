export const dotAt = (x: number, y: number) => {
  const element = document.createElement("div");
  element.style.width = "5px";
  element.style.height = "5px";
  element.style.background = "black";
  element.style.borderRadius = "2.5px";
  element.style.position = "absolute";
  element.style.top = y - 2.5 + "px";
  element.style.left = x - 2.5 + "px";
  return element;
};

export const labelAt = (x: number, y: number, label: string) => {
  const element = document.createElement("div");
  element.style.background = "white";
  element.style.borderRadius = "2.5px";
  element.style.position = "absolute";
  element.style.top = y + "px";
  element.style.left = x + "px";
  element.textContent = label;
  return element;
};

export const createLine = (x1: number, y1: number, x2: number, y2: number) => {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const lineDiv = document.createElement("div");
  lineDiv.className = "line";

  lineDiv.style.position = "absolute";
  lineDiv.style.left = `${x1}px`;
  lineDiv.style.top = `${y1}px`;
  lineDiv.style.width = `${length}px`;
  lineDiv.style.border = "1px solid black";
  lineDiv.style.transformOrigin = "0 100%";
  lineDiv.style.transform = `rotate(${angle}rad)`;

  return lineDiv;
};
