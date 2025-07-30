'use client';

import React, { useState } from 'react';

const options = ['가나다순', '등록일순', '가격순'];

export default function CategoryToggle() {
  const [selected, setSelected] = useState('가격순');

  return (
    <div className="flex gap-2 mb-3">
      {options.map(option => (
        <label key={option} className="cursor-pointer">
          <input type="radio" name="sort" value={option} checked={selected === option} onChange={() => setSelected(option)} className="sr-only" />
          <div
            className={`px-4 py-1.5 rounded text-sm transition
              ${selected === option ? 'bg-primary text-white' : 'bg-accent text-gray-600'}`}
          >
            {option}
          </div>
        </label>
      ))}
    </div>
  );
}
