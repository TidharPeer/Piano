import React from 'react';
import './BlackKey.css';

const BlackKey: React.FC<{ char: string, onClick?: any }> = ({ char, onClick }) => {
  return (
    <div onClick={onClick} className={`black-key w-[32px] h-[128px] flex justify-center items-end keyboard-${char}`}>
      <div className='mb-[20px] text-white'>{char}</div>
    </div>
  );
}

export default BlackKey;
