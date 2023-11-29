import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { logo, linkArrow } from '../assets';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 55) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener('scroll', changeNavbarColor);
  return (
    <header
      className={`${
        navbar ? `${styles.header} ${styles.active}` : styles.header
      }`}
    >
      <nav className={`${styles.navContainer}`}>
        <img src={logo} alt='Logo' className={styles.logo} />
        <div className='flex items-center gap-[3px]'>
          <a
            href='http://christmaspepe.com/'
            className='text-[#fff] text-[300]'
          >
            {' '}
            Back Home{' '}
          </a>
          <img src={linkArrow} />
        </div>
        <button
          className={` bg-white rounded-[3px] [background:linear-gradient(180deg,rgb(57,169,74)_0%,rgb(116.52,246.93,137.39)_100%)] text-[#fff] ${styles.btn}`}
        >
          Connect
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
