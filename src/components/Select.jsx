import React from "react";

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options,
  defaultOption,
  error,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defaultOption && (
          <option value="" hidden>
            Select category
          </option>
        )}

        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
