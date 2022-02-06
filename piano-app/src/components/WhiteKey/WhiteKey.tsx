import React from 'react';
import './WhiteKey.css';

const WhiteKey: React.FC<{ className?: string; char?: string, onClick?: any}> = ({ className, char, onClick }) => {
  return (
    <div onClick={onClick} className={`${className || ''} white-key keyboard-${char} flex relative w-[64px] h-[256px] justify-center items-end grow`}>
      <div className='mb-[20px]'>{char}</div>
    </div>
  );
}

export default WhiteKey;
