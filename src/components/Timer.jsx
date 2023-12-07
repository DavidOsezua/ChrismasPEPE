import React, { useState, useEffect } from 'react';
import { twoDots } from '../assets';
import styles from './Timer.module.css';

const COUNTDOWN_TARGET = new Date('2023-12-25T23:59:59');

const getTimeLeft = () => {
  const totalTimeLeft = COUNTDOWN_TARGET - new Date();
  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((totalTimeLeft / 1000) % 60);
  return { hours, minutes, seconds };
};

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='countdown'>
      <div className={styles.content}>
        {Object.entries(timeLeft).map(([label, value], i) => (
          <div key={label}>
            <div className='flex items-center gap-[10px] justify-center'>
              <div className={styles.box}>
                <span className={styles.value}>{Math.abs(value)}</span>
              </div>
              {i < Object.entries(timeLeft).length - 1 && (
                <img src={twoDots} className='w-[10px]' alt='dots' />
              )}
            </div>
            <div>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;

// import React, { useState, useEffect } from 'react';
// import { twoDots } from '../assets';
// import styles from './Timer.module.css';

// const COUNTDOWN_TARGET = new Date('2023-06-31T23:59:59');

// const getTimeLeft = () => {
//   const totalTimeLeft = COUNTDOWN_TARGET - new Date();
//   const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
//   const seconds = Math.floor((totalTimeLeft / 1000) % 60);
//   return { hours, minutes, seconds };
// };

// const Timer = () => {
//   const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(getTimeLeft());
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <div className='countdown'>
//       <div className={styles.content}>
//         {Object.entries(timeLeft).map((el, i) => {
//           const label = el[0];
//           const value = el[1];
//           return (
//             <div key={label}>
//               <div className='flex items-center gap-[10px] justify-center'>
//                 <div className={styles.box}>
//                   <span className={styles.value}>{Math.abs(value)}</span>
//                 </div>
//                 {i === Object.entries(timeLeft).length - 1 ? (
//                   ''
//                 ) : (
//                   <img src={twoDots} className='w-[10px]' />
//                 )}
//               </div>

//               <div>
//                 <span > {label} </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Timer;

/*import React, { useState, useEffect } from "react";
import "./styles.css";

const COUNTDOWN_TARGET = new Date("2023-06-31T23:59:59");

const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
	return { days, hours, minutes, seconds };
};

const Countdown = () => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='countdown'>
			<h2>Countdown</h2>
			<div className='content'>
				{Object.entries(timeLeft).map((el) => {
					const label = el[0];
					const value = el[1];
					return (
						<div className='box' key={label}>
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label'> {label} </span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Countdown;
 */
