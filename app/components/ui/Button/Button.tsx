import * as React from "react";
type ButtonVariant = "gradient" | "blue" | "white" | "transparent";
import styles from "./ButtonStyles.module.css"

interface ButtonProps // we are doing this to make that the Button.tsx component receive all the HTML button attributes 
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}




export function Button({
    children, // defines what will be inside the button e.g <Button> Click me </Button>
    variant = "gradient",
    className = "",
    ...props //all the other attributes of a normal HTML document 
}: ButtonProps) {


    const variantClass =
        variant === "gradient"
            ? styles.gradient
            : variant === "blue"
                ? styles.blue
                : variant === "white"
                    ? styles.white
                    : styles.transparent;

    return (
        <button
            className={`${styles.base} ${variantClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}