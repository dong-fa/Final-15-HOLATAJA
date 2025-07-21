import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  showLabel?: boolean;
  options: string[];
  id: string;
  name: string;
  selectedValue: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'medium' | 'small';
  placeholder?: string;
}

function Select({
  label,
  showLabel,
  options,
  id,
  name,
  selectedValue,
  // error = false,
  disabled,
  size = 'medium',
  placeholder,
  className,
  ...props
}: SelectProps) {
  const disabledStyle = disabled ? 'bg-disabled' : '';

  return (
    <div className="flex justify-between items-center gap-4">
      {label && (
        <label className={showLabel ? 'shrink-0 label-m' : 'sr-only'} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={selectedValue}
        className={`w-full px-4 ${size === 'medium' ? 'py-2.5' : 'py-1.5'} bg-white border-lightgray border rounded-md focus:outline focus:border-primary ${disabledStyle} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
