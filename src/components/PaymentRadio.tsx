// components/PaymentRadio.tsx
'use client';

import Image from 'next/image';
import { PaymentOption } from '../types/payment';

type PaymentRadioProps = {
  options: PaymentOption[];
  selected: string;
  onSelectOption: (id: string) => void;
};

const PaymentRadio = ({ options, selected, onSelectOption }: PaymentRadioProps) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map(option => (
        <label key={option.id} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="payment"
            value={option.id}
            checked={selected === option.id}
            onChange={() => onSelectOption(option.id)}
            className={`
              appearance-none
              w-5 h-5
              border-2 border-gray-400
              rounded-full
              relative
              mr-2
              transition-colors
              checked:border-[var(--color-primary)]
              before:content-['']
              before:w-2.5 before:h-2.5
              before:rounded-full
              before:bg-transparent
              before:absolute
              before:top-1/2
              before:left-1/2
              before:-translate-x-1/2
              before:-translate-y-1/2
              checked:before:bg-[var(--color-primary)]
            `}
          />
          <div className="flex items-center gap-2">
            <Image src={option.logo} alt={option.label} width={50} height={20} />
            <span className="label-m text-[var(--color-primary)]">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default PaymentRadio;
