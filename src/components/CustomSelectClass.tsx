import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const classSeat: string[] = ['Economy', 'Premium Economy', 'Business', 'First Class']

const CustomSelectClass: React.FC<{ value: string; onChange: (option: string) => void }> = ({ value, onChange }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleSelectLocationClick = () => {
    setIsActive(!isActive)
  }

  const handleCloseClick = () => {
    setIsActive(false)
  };

  const handleOptionClick = (option: string) => {
    onChange(option)
    setIsActive(false)
  }

  return (
    <div className='wrapper'>
      <div
        className={`select-btn cursor-pointer shadow-sm focus:outline-none relative ${isActive ? 'active' : ''}`}
        onClick={handleSelectLocationClick}
      >
        <span className='font-medium text-base leading-6 text-slate-700'>{value || 'Pilih Kelas'}</span>
      </div>
      {isActive && (
        <div className='content absolute z-50 bg-white rounded-md shadow p-2'>
          <div className='flex justify-end items-center border-b-2'>
            <FontAwesomeIcon
              icon={faXmark}
              className='mr-3 py-2 cursor-pointer text-red-600'
              onClick={handleCloseClick}
            />
          </div>
          <ul className='classSeat'>
            {classSeat.map((classSeatOption) => (
              <li
                key={classSeatOption}
                onClick={() => handleOptionClick(classSeatOption)}
                className={`p-2 text-bold cursor-pointer border-b-2 border-gray-200 hover:bg-purple-700 hover:text-white ${
                  classSeatOption === value ? 'selected' : ''
                }`}
              >
                {classSeatOption}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelectClass;
