'use client';

import { sortType } from '@/app/products/components/ProductList';
import React from 'react';

const options: sortType[] = ['최신순', '가나다순', '가격 낮은순', '가격 높은순'];

export default function SortToggle({ selected, setSelected }: { selected: sortType; setSelected: (option: sortType) => void }) {
  return (
    <div className="flex gap-2 mb-3 flex-wrap">
      {options.map(option => (
        <label key={option} className="cursor-pointer">
          <input type="radio" name="sort" value={option} checked={selected === option} onChange={() => setSelected(option)} className="sr-only" />
          <div
            className={`px-4 py-1.5 rounded text-[14px] transition
              ${selected === option ? 'bg-primary text-white' : 'bg-accent text-gray-600'}`}
            tabIndex={0}
            onKeyDown={e => {
              e.preventDefault();
              if (e.key === 'Enter' || e.key === ' ') setSelected(option);
            }}
          >
            {option}
          </div>
        </label>
      ))}
    </div>
  );
}
