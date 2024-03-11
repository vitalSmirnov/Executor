type InputTypes = number | string

interface InputProps<T extends InputTypes> {
  label?: string
  value: T
  onChange: (value: T) => void
}
export const Input = <T extends InputTypes>({ label, value, onChange }: InputProps<T>) => {
  return (
    <div className={'form-group cs1 ce12'}>
      <label>{label}</label>
      <input
        type={typeof value}
        className={'input'}
        value={value}
        onChange={e => onChange(e.currentTarget.value as T)}
      />
    </div>
  )
}
