import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  error?: boolean;
  errorMessage?: string;
}

function Textarea({ id, name, error = false, errorMessage, disabled, placeholder, ...props }: TextareaProps) {
  const errorStyle = error ? 'placeholder:text-negative' : 'placeholder:text-gray-400';
  const disabledStyle = disabled ? 'bg-disabled' : ' ';

  return (
    <textarea
      id={id}
      name={name}
      className={`w-full px-4 py-2.5 border-lightgray border rounded-md focus:outline focus:border-primary min-h-36 ${errorStyle} ${disabledStyle}`}
      placeholder={error ? errorMessage || placeholder : placeholder}
      {...props}
    ></textarea>
  );
}

export default Textarea;
