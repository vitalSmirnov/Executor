type InputTypes = number | string

interface InputProps<T extends InputTypes> {
  label?: string
  step?: number
  value: T
  onChange: (value: T) => void
}
export const Input = <T extends InputTypes>({ label, value, onChange, step = 100 }: InputProps<T>) => {
  return (
    <div className={'form-group cs1 ce12'}>
      <label>{label}</label>
      <input
        step={step}
        type={typeof value}
        className={'input'}
        value={value}
        onChange={e => onChange(e.currentTarget.value as T)}
      />
    </div>
  )
}
