import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/homePage.module.css'; // Ubah dengan nama file styles Anda

function SearchPortal() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleInputClick = () => {
    setIsPortalOpen(true);
  };

  const handlePortalClose = () => {
    setIsPortalOpen(false);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lakukan sesuatu dengan nilai pencarian
    console.log('Nilai pencarian:', searchValue);
    // Menutup portal
    setIsPortalOpen(false);
  };

  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    portalContainerRef.current = document.getElementById('portal-root');
  }, []);

  const portalContainer = portalContainerRef.current;

  return (
    <div>
      <div className='inputanFlight' style={{ width: '300px', height: '40px', borderBottom: '2px solid #D0D0D0' }}>
        <input
          placeholder='Pilih Lokasi'
          type='text'
          className={`border-0 w-100 ${styles.placeholder}`}
          style={{ fontWeight: '500', fontSize: '18px', lineHeight: '26px', outline: 'none' }}
          onClick={handleInputClick}
          value={searchValue}
          readOnly
        />
      </div>

      {isPortalOpen && portalContainer && (
        <>{createPortal(
          <div className="portal">
            <form onSubmit={handleSearchSubmit}>
              <input type="text" placeholder="Cari..." value={searchValue} onChange={handleSearchInputChange} />
              <button type="submit">Cari</button>
              <button onClick={handlePortalClose}>Tutup</button>
            </form>
          </div>,
          portalContainer
        )}</>
      )}
    </div>
  );
}

export default SearchPortal;
