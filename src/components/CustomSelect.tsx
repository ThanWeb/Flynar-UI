import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'

const countries: string[] = [
  'Afghanistan', 'Algeria', 'Argentina', 'Australia', 'Bangladesh', 'Belgium', 'Bhutan',
  'Brazil', 'Canada', 'China', 'Denmark', 'Ethiopia', 'Finland', 'France', 'Germany',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Italy', 'Japan', 'Malaysia',
  'Maldives', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'Nigeria', 'Norway', 'Pakistan',
  'Peru', 'Russia', 'Romania', 'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
  'Thailand', 'Turkey', 'Uganda', 'Ukraine', 'United States', 'United Kingdom', 'Vietnam'
]

const CustomSelect: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [searchWord, setSearchWord] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleSelectLocationClick = () => {
    setIsActive(!isActive);
  }

	const handleCloseClick = () => {
    setIsActive(false);
  }

  const handleOptionClick = (country: string) => {
    setSelectedCountry(country);
    setIsActive(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value.toLowerCase());
  }

  const filteredCountries = countries.filter(country => {
    return country.toLowerCase().startsWith(searchWord);
  })

  return (
    <div className='wrapper'>
      <div className={`select-btn cursor-pointer shadow-sm focus:outline-none relative ${isActive ? 'active' : ''}`} onClick={handleSelectLocationClick}>
        <span className='font-medium text-lg leading-6 text-slate-700'>{selectedCountry || 'Pilih Lokasi'}</span>
      </div>
      {isActive && (
        <div className='content absolute z-50 bg-white rounded-md shadow py-2 h-80 p-3 overflow-y-scroll'>
					<div className='flex items-center'>
						<div className='search relative me-2'>
							<input
								spellCheck='false'
								type='text'
								placeholder='Cari Lokasi...'
								className='p-2 border-2 w-full rounded-md border-gray-400 focus:outline-purple-500'
								value={searchWord}
								onChange={handleInputChange}
							/>
							<FontAwesomeIcon icon={ faSearch } className='absolute text-gray-500 right-2 top-1/2 transform -translate-y-1/2' />
						</div>
						<FontAwesomeIcon icon={ faXmark } className='cursor-pointer text-red-600' onClick={ handleCloseClick }/>
					</div>
          <ul className='options'>
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <li
                  key={country}
                  onClick={() => handleOptionClick(country)}
                  className={`p-2 text-base cursor-pointer border-b-2 border-gray-200 hover:bg-purple-700 hover:text-white ${country === selectedCountry ? 'selected ' : ''}`}
                >
                  {country}
                </li>
              ))
            ) : (
              <p className='mt-3'>Oops! Country not found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
