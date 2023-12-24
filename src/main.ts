import "./style.css";
import { App } from "./App";
import { SuggestBox } from "./SuggestBox";

const root = document.querySelector<HTMLDivElement>("#app")!;
root.appendChild(
  SuggestBox([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grapes",
    "Honeydew",
    "Icaco",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tomato",
  ]).element
);
