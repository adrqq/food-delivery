import React, { FC } from 'react';
import s from './FilterSelect.module.scss';

interface FilterSelectProps {
  title: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: any) => void;
  width?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
  width,
}) => {
  return (
    <div
      className={s.filter_select}
      style={{ width }}
    >
      <p className={s.filter_select__title}>
        {title}
      </p>

      <select
        className={s.filter_select__select}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
