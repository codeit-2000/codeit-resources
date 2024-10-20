import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const DropdownContext = createContext({
  isOpen: false,
  selectedValue: "",
  toggleDropdown: () => {},
  closeDropdown: () => {},
  selectItem: (value: string) => {},
});

export default function Dropdown({
  children,
  selectedValue,
  onSelect,
}: {
  children: React.ReactNode;
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const selectItem = useCallback(
    (value: string) => {
      onSelect(value);
      closeDropdown();
    },
    [onSelect, closeDropdown],
  );

  const contextProviderValue = useMemo(
    () => ({
      isOpen,
      selectedValue,
      toggleDropdown,
      closeDropdown,
      selectItem,
    }),
    [isOpen, selectedValue, toggleDropdown, closeDropdown, selectItem],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDropdown]);

  return (
    <DropdownContext.Provider value={contextProviderValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const { toggleDropdown, selectedValue } = useContext(DropdownContext);

  return (
    <button type="button" onClick={toggleDropdown}>
      {selectedValue || <div>{children}</div>}
    </button>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropdownContext);

  return <div>{isOpen ? <div>{children}</div> : null}</div>;
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
