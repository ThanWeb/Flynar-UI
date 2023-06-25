import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPerson, faPlus, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';

const options: string[] = ['Dewasa', 'Anak', 'Bayi'];

const CustomSelectClass: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [totalPassengers, setTotalPassengers] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSelectLocationClick = () => {
    setIsActive(!isActive);
  };

  const handleCloseClick = () => {
    setIsActive(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleIncrement = (index: number) => {
		const updatedCounts = [...counts];
		if (updatedCounts[index] < 7) {
			updatedCounts[index] += 1;
			setCounts(updatedCounts);
		}
	};

  const handleDecrement = (index: number) => {
    const updatedCounts = [...counts];
    if (updatedCounts[index] > 0) {
      updatedCounts[index] -= 1;
      setCounts(updatedCounts);
    }
  };

  const handleSaveClick = () => {
    setTotalPassengers(counts.reduce((acc, count) => acc + count, 0));
    setIsSaved(true);
    setIsActive(false);
  };

  return (
    <div className='wrapper'>
      <div className={`select-btn cursor-pointer shadow-sm focus:outline-none relative ${isActive ? 'active' : ''}`} onClick={handleSelectLocationClick}>
        <span className='font-medium text-base leading-6 text-slate-700'>
          {isSaved ? `${totalPassengers} penumpang` : selectedOption || 'Jml Penumpang'}
        </span>
      </div>
      {isActive && (
        <div className='content absolute z-50 bg-white rounded-md shadow p-2'>
          <div className='flex justify-end items-center border-b-2'>
						<FontAwesomeIcon icon={faXmark} className='mr-3 py-2 cursor-pointer text-red-600' onClick={handleCloseClick} />
					</div>
          <ul className='classSeat'>
            {options.map((option, index) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`p-2 text-base cursor-pointer border-b-2 border-gray-200 ${option === selectedOption ? 'selected' : ''}`}
              >
                <div className='option'>
									<div className='flex justify-between'>
										<div className='mr-2'>
											<FontAwesomeIcon icon={faPerson} className='mr-2' />
											<span className='option-label'>{option}</span>
										</div>
										<div className='counter flex justify-between items-center w-16'>
											<FontAwesomeIcon
												icon={faMinus}
												className='counter-icon border-2 mr-2'
												onClick={(e) => {
													e.stopPropagation();
													handleDecrement(index);
												}}
											/>
											<span className='count mr-2'>{counts[index]}</span>
											<FontAwesomeIcon
												icon={faPlus}
												className='counter-icon border-2'
												onClick={(e) => {
													e.stopPropagation();
													handleIncrement(index);
												}}
											/>
									</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='save-button flex justify-end'>
            <button className='btn-save m-2 p-1 rounded-md bg-purple-700 text-white hover:bg-purple-600' onClick={handleSaveClick}>Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelectClass;
