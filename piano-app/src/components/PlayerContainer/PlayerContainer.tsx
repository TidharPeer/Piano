import React, { useContext } from 'react';
import { MyAudioContext } from '../../context/AudioContext/AudioContext';
import './PlayerContainer.css';

const PlayerContainer = () => {
  const {setIsPlayRecording} = useContext(MyAudioContext);
  const {isRecording, setIsRecording} = useContext(MyAudioContext);
  return (
    <div className={`flex relative mb-[20px] justify-center items-end`}>
      <button onClick={() => setIsRecording(!isRecording)}
              className={`mr-[32px] w-[32px] h-[32px] rounded-full ${isRecording ? 'bg-red-400' : 'bg-black'} hover:bg-sky-700`} />
      <button onClick={() => setIsPlayRecording(true)}
              className='play-button' />
    </div>
  );
}

export default PlayerContainer;
