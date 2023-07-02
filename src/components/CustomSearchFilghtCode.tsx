import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CustomSearchFlightCode: React.FC<{ value: string; onChange: (option: string) => void }> = ({ value, onChange }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [ticketData, setTicketData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');

  type Ticket = {
    id: number;
    flight: {
      flightCode: string;
    };
  };

  const fetchTicketData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/tickets');
      const data = response.data.tickets;
      return data;
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      return [];
    }
  };

  useEffect(() => {
    const getTicketData = async () => {
      const data = await fetchTicketData();
      setTicketData(data);
    };

    getTicketData();
  }, []);

  const handleSelectFlightCode = () => {
    setIsActive(!isActive);
  };

  const handleCloseClick = () => {
    setIsActive(false);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsActive(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredTicketData = ticketData.filter((ticket: Ticket) =>
    ticket.flight.flightCode.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='wrapper'>
      <div
        className={`px-2 py-0 border-2 border-slate-100 rounded-xl relative ${
          isActive ? 'active border-purple-700' : ''
        }`}
        onClick={handleSelectFlightCode}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='text-slate-100 text-sm md:text-base lg:text-base'
        />
      </div>
      {isActive && (
        <div className='content w-fit absolute right-0 top-0 z-50 bg-white rounded-md shadow-md p-2'>
          <div className='flex justify-end items-center border-b-2'>
            <FontAwesomeIcon
              icon={faXmark}
              className='mr-3 py-2 cursor-pointer text-red-600'
              onClick={handleCloseClick}
            />
          </div>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search flight code'
              value={searchValue}
              onChange={handleSearchChange}
              className='text-slate-900 text-sm focus:outline-none'
            />
          </div>
          <ul className='classSeat overflow-y-auto h-[200px]'>
            {filteredTicketData.map((ticket: Ticket) => (
              <li
                key={ticket.id}
                onClick={() => handleOptionClick(ticket.flight.flightCode)}
                className={`p-2 text-bold text-black text-xs rounded-md cursor-pointer border-b-2 border-gray-200 hover:bg-purple-700 hover:text-white ${
                  ticket.flight.flightCode === value ? 'selected' : ''
                }`}
              >
                {ticket.flight.flightCode}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSearchFlightCode;
