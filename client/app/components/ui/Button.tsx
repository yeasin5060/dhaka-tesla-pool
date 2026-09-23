"use client";

import type {
  ButtonHTMLAttributes,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        bg-black
        px-5
        py-3
        text-sm
        font-medium
        text-white
        transition
        hover:bg-gray-800
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {loading
        ? "Please wait..."
        : children}
    </button>
  );
}