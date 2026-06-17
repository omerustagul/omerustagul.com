import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** "box" = bordered field; "underline" = editorial single-line. */
  variant?: "box" | "underline";
  /** Render a textarea instead of an input. */
  as?: "input" | "textarea";
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children?: React.ReactNode;
}

/** Labelled text input / textarea. */
export function Input(props: InputProps): JSX.Element;
/** Native select styled with a custom chevron. */
export function Select(props: SelectProps): JSX.Element;
