'use client';

import { sortType } from '@/app/products/components/ProductList';
import React from 'react';

const options: sortType[] = ['최신순', '가나다순', '가격 낮은순', '가격 높은순'];

export default function SortToggle({ selected, setSelected }: { selected: sortType; setSelected: (option: sortType) => void }) {
  return (
    <div className="w-full flex gap-2 mb-3 justify-between sm:justify-start">
      {options.map(option => (
        <label key={option} className="flex-1 sm:flex-none cursor-pointer">
          <input type="radio" name="sort" value={option} checked={selected === option} onChange={() => setSelected(option)} className="sr-only" />
          <span
            className={`block px-1 sm:px-4 py-1.5 rounded text-center text-sm sm:text-xs transition whitespace-nowrap
              ${selected === option ? 'bg-primary text-white' : 'bg-accent text-gray-600'}`}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === ' ') {
                e.preventDefault();
                setSelected(option);
              }
              if (e.key === 'Enter') setSelected(option);
            }}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}
