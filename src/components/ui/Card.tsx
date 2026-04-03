import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ children, padding = 'lg', className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-card shadow-card ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
