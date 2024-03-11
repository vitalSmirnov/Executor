import { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  severity?: 'primary' | 'secondary'
  disabled?: boolean
}
export const Button = ({ onClick, title, severity = 'primary', disabled }: ButtonProps) => {
  return (
    <div className={'cs1 ce12'}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`button button-${severity}`}
      >
        {title}
      </button>
    </div>
  )
}
