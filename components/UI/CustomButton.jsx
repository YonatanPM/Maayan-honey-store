import css from "styled-jsx/css";

export default function CustomButton({
  children,
  textOnly,
  className,
  ...props
}) {
  let cssClasses = textOnly ? "text-button" : "button";
  (cssClasses += " "), className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
