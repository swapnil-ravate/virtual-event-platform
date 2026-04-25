import './Button.css';

export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) {
    const buttonClass = `btn btn-${variant} btn-${size} ${loading ? 'loading' : ''} ${className}`;

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            {...props}
        >
            {loading ? (
                <span className="btn-spinner"></span>
            ) : (
                children
            )}
        </button>
    );
}
