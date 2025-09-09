import React from "react";
import { cn } from "../../utils/cn";
import Icon from "../AppIcon";

const Input = React.forwardRef(({
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    iconName,
    iconPosition = "left",
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Base input classes
    const baseInputClasses = "flex h-12 w-full rounded-lg border-2 border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50";
    
    // Adjust padding based on icon position
    const getInputClasses = () => {
        let paddingClasses = "px-3 py-4";
        if (iconName) {
            if (iconPosition === "left") {
                paddingClasses = "pl-10 pr-3 py-4";
            } else if (iconPosition === "right") {
                paddingClasses = "pl-3 pr-10 py-4";
            }
        }
        return `${baseInputClasses} ${paddingClasses}`;
    };

    // Checkbox-specific styles
    if (type === "checkbox") {
        return (
            <input
                type="checkbox"
                className={cn(
                    "h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />
        );
    }

    // Radio button-specific styles
    if (type === "radio") {
        return (
            <input
                type="radio"
                className={cn(
                    "h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />
        );
    }

    // For regular inputs with wrapper structure
    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {iconName && iconPosition === "left" && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon name={iconName} size={16} />
                    </div>
                )}
                
                <input
                    type={type}
                    className={cn(
                        getInputClasses(),
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    ref={ref}
                    id={inputId}
                    {...props}
                />
                
                {iconName && iconPosition === "right" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon name={iconName} size={16} />
                    </div>
                )}
            </div>

            {description && !error && (
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;