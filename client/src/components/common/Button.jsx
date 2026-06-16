const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger:
      'bg-red-600/90 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-red-500 active:scale-[0.98] transition-all duration-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: '',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center justify-center gap-2
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
