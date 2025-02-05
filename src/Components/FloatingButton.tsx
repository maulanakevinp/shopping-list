import React from "react";

type FloatingButtonType = {
  children: React.ReactNode;
  className: string;
  handleButtonAddItem: () => void;
};

export default function FloatingButton(props: FloatingButtonType) {
  const { children, className, handleButtonAddItem } = props;
  return (
    <button
      className={`fixed w-16 h-16 ${className} text-white rounded-full cursor-pointer flex items-center justify-center`}
      type="button"
      onClick={handleButtonAddItem}
    >
      {children}
    </button>
  );
}
