"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface IFormSubmitButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function FormSubmitButton({
  children,
  className,
  ...props
}: IFormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={`btn-primary btn ${className}`}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
