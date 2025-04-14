// src/components/ui/Button.jsx
export function Button({ children, className = "", ...props }) {
    return (
      <button className={`btn btn-primary ${className}`} {...props}>
        {children}
      </button>
    );
  }
  