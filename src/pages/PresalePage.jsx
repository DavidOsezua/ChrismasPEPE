import React from 'react';
import styles from './Presale.module.css';
import { Navbar, Timer, Footer, Card } from '../components';

const PresalePage = () => {
  return (
    <div className={`${styles.section}`}>
      <Navbar />

      <main className={`text-center text-[#fff] ${styles.main} mb-[4rem]`}>
        <h2 className={`${styles.title}`}>BUY CHRISTMAS PEPE</h2>

        <Timer />

        <Card
          className={`flex justify-between px-[1rem] py-[0.8rem] items-center`}
        >
          <div className={`flex flex-col`}>
            <label>You Send</label>
            <input type='text' className={`${styles.input}`} />
          </div>

          <select className='text-[#FFF] bg-[#39A94A] p-[0.5rem]'>
            <option value='BUSD' className='text-[#FFF]'>
              Bus
            </option>
            <option value='BUSD' className='text-[#FFF]'>
              Bus
            </option>
            <option value='BUSD' className='text-[#FFF]'>
              Bus
            </option>
          </select>
        </Card>

        <h2 className='text-[#39A94A]'>
          1 USDT = <span>300,000 </span> PEPEMAS
        </h2>

        <Card
          className={`flex justify-between px-[1rem] py-[0.8rem] items-center`}
        >
          <div className={`flex flex-col`}>
            <label>You Receive</label>
            <input type='text' className={`${styles.input}`} />
          </div>

          <select className='text-[#FFF] bg-[#39A94A] p-[0.5rem]'>
            <option value='BUSD' className='text-[#FFF]'>
              Bus
            </option>
            <option value='BUSD' className='text-[#FFF]'>
              Bus
            </option>
            <option value='BUSD' className='text-[#FFF]'>
              Bus
            </option>
          </select>
        </Card>

        <button className={styles.button}>BUY PEPMAS</button>
      </main>

      <Footer />
    </div>
  );
};

export default PresalePage;
