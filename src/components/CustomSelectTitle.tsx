import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const options = ['Mr.', 'Mrs.']

const CustomSelectTitle: React.FC<{ value: string; onChange: (option: string) => void }> = ({ value, onChange }) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleSelectLocationClick = () => {
    setIsActive(!isActive)
  }

  const handleCloseClick = () => {
    setIsActive(false)
  }

  const handleOptionClick = (option: string) => {
    onChange(option)
    setIsActive(false)
  }

  return (
    <div className='wrapper'>
      <div
        className={`select-btn p-2 rounded-md cursor-text border-2 border-gray-200 relative ${isActive ? 'active border-purple-700' : ''}`}
        onClick={handleSelectLocationClick}
      >
        <span className='font-medium text-sm leading-6 text-slate-700'>{value || 'Title'}</span>
      </div>
      {isActive && (
        <div className='content w-[300px] absolute z-50 bg-white rounded-md shadow-md p-2'>
          <div className='flex justify-end items-center border-b-2'>
            <FontAwesomeIcon
              icon={faXmark}
              className='mr-3 py-2 cursor-pointer text-red-600'
              onClick={handleCloseClick}
            />
          </div>
          <ul className='classSeat'>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`p-2 text-bold rounded-md cursor-pointer border-b-2 border-gray-200 hover:bg-purple-700 hover:text-white ${
                  option === value ? 'selected' : ''
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CustomSelectTitle
