import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  children: ReactNode
}

const variantClasses = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-btn',
  secondary: 'border-2 border-surface-border text-text-primary hover:bg-surface-input',
  ghost: 'bg-surface-input text-primary hover:bg-surface-border',
}

const sizeClasses = {
  sm: 'h-10 px-6 text-sm rounded-chip',
  md: 'h-12 px-8 text-base rounded-btn',
  lg: 'h-14 px-10 text-lg rounded-btn',
}

export function Button({
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-body font-normal flex items-center justify-center gap-3 transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  )
}
