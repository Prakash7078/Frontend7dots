import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { LuSkipForward } from "react-icons/lu";
import { MdOutlineSanitizer } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
// import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const App = () => {
  // const [key, setKey] = useState(0); // Key to force reset the countdown
  const [time, setTime] = useState(60);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime - 1) % 60); // Decrement time every second
      }, 1000);
    }
    if (time === 0) {
      clearInterval(interval);
      setIsPaused(true);
    }

    return () => clearInterval(interval);
  }, [isPaused, time]);

  const resetTimer = () => {
    // setKey((prevKey) => prevKey + 1); // Change the key to force a reset
    setTime(0); // Reset the time to 00:00
    setIsPaused(true);
  };

  const addTime = () => {
    setTime((prevTime) => (prevTime + 10) % 60); // Add 10 seconds to the current time
    setIsPaused(false);
  };



  return (
    <div className='m-auto w-fit my-20 flex flex-col gap-12 items-center'>
      <div className='flex flex-col items-center gap-5'>
        <h1 className='font-semibold text-xl'>Routine starting in...</h1>
        <p className='text-gray-500'>Subheading here</p>
      </div>
      <div >
      {/* <CountdownCircleTimer
        // key={key} // Key to reset the timer
        isPlaying={!isPaused}
        duration={60}
        colors={["white", "purple"]}
        colorsTime={[0, 10]}
        onComplete={() => {resetTimer();setIsPaused(false);}} // Callback when timer completes
      >
        {({ remainingTime }) => {
          const totalSeconds = (time + remainingTime) % 60;
          return (
            <div>
              <h1>{`${Math.floor(totalSeconds / 60)}:${totalSeconds % 60}`.padStart(5, '0')}</h1>
            </div>
          );
        }}
      </CountdownCircleTimer> */}
      <div className='w-40 h-40'>
      <CircularProgressbar value={time} styles={buildStyles({
        textColor: "purple",
        pathColor: "purple"
      })} text={`00:${time<=9 ? "0"+time:time}`} maxValue={60} />
      </div>
      </div>
      <div className='flex justify-between  gap-24'>
        <button onClick={() => addTime(10)} className='flex items-center gap-3 text-purple-900 shadow-xl rounded-full px-3 py-1'>
          <FaPlus color='purple'/><button >10 sec</button>
        </button> 
        <button onClick={resetTimer} className='flex items-center gap-3 text-purple-900 shadow-xl rounded-full px-3 py-1'>
          <LuSkipForward color='purple'/>
          <button>Skip</button>
        </button>
      </div>
      <div className='flex flex-col gap-8 sm:gap-10 bg-gray-200 py-2 px-5 mx-2 rounded-xl'>
        <h1 className='text-lg'>Step <span className='text-xl'>2</span>/3</h1>
        <div className='flex items-end gap-6 sm:gap-16'>
          <div className='flex gap-5 items-center'>
            <MdOutlineSanitizer size={65} color='gray' />
            <div className='flex flex-col gap-4'>
              <h1 className='font-bold'>Cleansing</h1>
              <div className='flex items-center gap-3 text-purple-900'>
                <IoIosTimer color='purple'/>
                <h1>60 sec</h1>
              </div>
            </div>
          </div>
          <p className='text-purple-900 font-semibold'>How to do</p>
        </div>
      </div>
    </div>
  );
};

export default App;