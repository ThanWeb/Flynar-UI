import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

const cities: string[] = [
  'Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Semarang', 'Medan', 'Makassar', 'Palembang',
  'Denpasar', 'Malang', 'Padang', 'Bogor', 'Tangerang', 'Depok', 'Pekanbaru', 'Balikpapan',
  'Serang', 'Bandar Lampung', 'Banjarmasin', 'Batam', 'Pontianak', 'Bekasi', 'Samarinda',
  'Cimahi', 'Padangsidempuan', 'Pematangsiantar', 'Binjai', 'Magelang', 'Malang', 'Cilegon',
  'Kupang', 'Banda Aceh', 'Manado', 'Palu', 'Ternate', 'Kendari', 'Sibolga', 'Pangkal Pinang',
  'Tanjung Pinang', 'Manokwari', 'Jayapura', 'Sorong', 'Mataram', 'Tanjung Selor', 'Tarakan'
]

const CustomSelectSearch: React.FC<{ selectedCity: string, onSelectCity: (city: string) => void, placeholder: string }> = ({ selectedCity, onSelectCity, placeholder }) => {
  const [searchWord, setSearchWord] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleSelectCityClick = () => {
    setIsActive(!isActive);
  }

  const handleCloseCityClick = () => {
    setIsActive(false);
  }

  const handleCityOptionClick = (city: string) => {
    onSelectCity(city)
    setIsActive(false)
  }

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value.toLowerCase())
  }

  const filteredCities = cities.filter(city => {
    return city.toLowerCase().startsWith(searchWord)
  })

  return (
    <div className='wrapper'>
      <div className={`select-btn cursor-pointer shadow-sm focus:outline-none relative ${isActive ? 'active' : ''}`} onClick={handleSelectCityClick}>
        <span className='font-medium text-lg leading-6 text-slate-700'>{selectedCity || placeholder}</span>
      </div>
      {isActive && (
        <div className='content absolute z-50 bg-white rounded-md shadow py-2 h-80 p-3 overflow-y-scroll'>
          <div className='flex items-center'>
            <div className='search relative me-2'>
              <input
                spellCheck='false'
                type='text'
                placeholder='Cari Kota...'
                className='p-2 border-2 w-full rounded-md border-gray-400 focus:outline-purple-500'
                value={searchWord}
                onChange={handleCityInputChange}
              />
              <FontAwesomeIcon icon={faSearch} className='absolute text-gray-500 right-2 top-1/2 transform -translate-y-1/2' />
            </div>
            <FontAwesomeIcon icon={faTimes} className='cursor-pointer text-red-600' onClick={handleCloseCityClick} />
          </div>
          <ul className='options'>
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <li
                  key={city}
                  onClick={() => handleCityOptionClick(city)}
                  className={`p-2 text-base cursor-pointer border-b-2 border-gray-200 hover:bg-purple-700 hover:text-white ${city === selectedCity ? 'selected ' : ''}`}
                >
                  {city}
                </li>
              ))
            ) : (
              <p className='mt-3'>Oops! City not found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelectSearch
