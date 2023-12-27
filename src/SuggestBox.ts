import h from "hyperscript";

export function SuggestBox(
  candidates: string[],
  inputId?: string,
  onChange?: (x: string) => void,
  searchTerm: string = ""
) {
  let suggestions: string[] = [];

  const handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    searchTerm = value;

    suggestions = candidates.filter((candidate) =>
      candidate.toLowerCase().includes(value.toLowerCase())
    );

    updateSuggestions();
  };

  const handleClickSuggestion = (suggestion: string) => {
    searchTerm = suggestion;
    suggestions = [];
    updateSuggestions();
    (inputElement as HTMLInputElement).value = suggestion;
    if (onChange) onChange(suggestion);
  };

  const highlightMatch = (text: string) => {
    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    const beforeMatch = text.substring(0, index);
    const match = text.substring(index, index + searchTerm.length);
    const afterMatch = text.substring(index + searchTerm.length);

    return [
      beforeMatch,
      h("strong", { style: { backgroundColor: "#ffeb3b" } }, match),
      afterMatch,
    ];
  };

  const updateSuggestions = () => {
    const suggestionElements = suggestions.map((suggestion) =>
      h(
        "div.px-4.py-2.border-b.border-gray-300.cursor-pointer.hover:bg-gray-100",
        {
          onclick: (event: Event) => {
            event.preventDefault();
            handleClickSuggestion(suggestion);
          },
        },
        highlightMatch(suggestion)
      )
    );

    if (suggestions.length > 0) {
      suggestionsContainer.classList.remove("invisible");
    } else {
      suggestionsContainer.classList.add("invisible");
    }

    suggestionsContainer.innerHTML = "";
    suggestionElements.forEach((element) => {
      suggestionsContainer.appendChild(element);
    });
  };

  const inputElement = h(
    "input.block.w-full.px-4.py-2.border.border-gray-300.rounded-md.shadow-sm.placeholder-gray-400",
    {
      type: "text",
      placeholder: "Search…",
      autocomplete: "off",
      value: searchTerm,
      oninput: (event: Event) => {
        if (onChange) onChange((inputElement as HTMLInputElement).value);
        handleChange(event);
      },
      onfocus: handleChange,
      id: inputId,
      onblur: (event: any) => {
        if (event.relatedTarget === document.body) return;
        if (suggestionsContainer.contains(event.relatedTarget)) return;
        if (event.relatedTarget === null) return;
        suggestions = [];
        updateSuggestions();
      },
    }
  );

  const suggestionsContainer = h(
    "div.absolute.w-full.mt-1.rounded-md.bg-white.shadow-lg.max-h-60.overflow-auto.invisible",
    { style: "z-index:100000" }
  );

  const containerElement = h("div.relative.w-full.max-w-md", [
    inputElement,
    suggestionsContainer,
  ]);

  const documentClickHandler = (event: MouseEvent) => {
    if (event.target === inputElement) return;
    if (suggestionsContainer.contains(event.target as unknown as any)) return;
    suggestions = [];
    updateSuggestions();
  };

  document.addEventListener("click", documentClickHandler);

  return {
    element: containerElement,
    getInput: () => (inputElement as HTMLInputElement).value,
    cleanup: () => document.removeEventListener("click", documentClickHandler),
  };
}
