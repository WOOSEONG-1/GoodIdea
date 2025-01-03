import React, { useMemo, useState } from "react";

const SelectOption = ({ value = "", active = false, updateValue, icon }) => {
  const handleChange = (e) => {
    e.preventDefault();
    updateValue(value);
  };

  if (!icon) {
    icon = (
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    );
  }

  return (
    <li
      className="text-gray-900 cursor-pointer hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
      onClick={handleChange}
    >
      <div className="flex items-center">
        <span className="ml-3 block font-normal truncate">{value}</span>
      </div>
      {active && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          {icon}
        </span>
      )}
    </li>
  );
};

const Select = ({
  name = "선택하세요",
  state,
  setState,
  options = [],
  icon,
}) => {
  const handleClick = (e) => {
    e.preventDefault();

    setState((p) => ({ ...p, showOptions: !state.showOptions }));
  };

  const updateValue = (value) => {
    if (value === state.value) {
      setState((p) => ({ ...p, showOptions: false }));
      return;
    }
    setState((p) => ({ ...p, showOptions: false, value }));
  };

  if (!icon) {
    icon = (
      <svg
        className={
          state.showOptions ? "h-5 w-5 text-gray-800" : "h-5 w-5 text-gray-400"
        }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    );
  }

  return (
    <div className="w-32 relative border  rounded-md mt-1 ">
      {/* <input type="hidden" name={name} value={state.value} /> */}
      <button
        type="button"
        className={
          state.showOptions
            ? "transition-all relative w-full bg-white rounded-md shadow-md pl-2 pr-10 py-2 text-left cursor-pointer outline-none ring-1 ring-indigo-500 border-indigo-500 sm:text-sm"
            : "transition-all relative w-full bg-white rounded-md shadow-md pl-2 pr-10 py-2 text-left cursor-pointer sm:text-sm"
        }
        onClick={handleClick}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">{state.value}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {icon}
        </span>
      </button>
      {state.showOptions && (
        <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
          <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option, idx) => (
              <SelectOption
                key={option + idx}
                value={option}
                active={state.value === option}
                updateValue={updateValue}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
