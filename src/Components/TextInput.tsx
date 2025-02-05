import React from "react";

type TextInputProps = {
  id: string;
  title: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { id, title, value, onChange, className } = props;
  return (
    <div className={`${className} dark:text-white`}>
      <label htmlFor={id}>{title}</label>
      <input
        type="text"
        id={id}
        ref={ref}
        className={`mt-1 block w-full ${typeof value === "number" ? "text-right" : ""} rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:bg-gray-700 py-2 px-3`}
        placeholder={`Masukan ${title}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default TextInput;

