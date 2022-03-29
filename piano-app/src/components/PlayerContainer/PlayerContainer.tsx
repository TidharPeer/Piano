import React from 'react';
// import { MyAudioContext } from '../../context/AudioContext/AudioContext';
import './PlayerContainer.css';
import { isRecording$, updateIsPlayRecording, updateIsRecording } from '../../state/audio.store';
import { useObservable } from '@ngneat/react-rxjs';

const PlayerContainer = () => {
  // const {setPlayRecording} = useContext(MyAudioContext);
  // const {isRecording, setIsRecording} = useContext(MyAudioContext);
  const [isRecording] = useObservable(isRecording$);
  return (
    <div className={`flex relative mb-[20px] justify-center items-end`}>
      <button onClick={() => updateIsRecording(!isRecording)}
              className={`mr-[32px] w-[32px] h-[32px] rounded-full ${isRecording ? 'bg-red-400' : 'bg-black'} hover:bg-sky-700`} />
      <button onClick={() => updateIsPlayRecording(true)}
              className='play-button' />
    </div>
  );
}

export default PlayerContainer;
