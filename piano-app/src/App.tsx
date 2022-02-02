import React from 'react';
import './App.css';
import KeyboardContainer from './components/KeyboardContainer/KeyboardContainer';
import { AudioProvider } from './context/AudioContext/AudioContext';
import PlayerContainer from './components/PlayerContainer/PlayerContainer';

const App = () => {
  return (
    <div className='App flex grow flex-col items-center h-full'>
      <h1 className='text-3xl font-bold underline'>
        Piano App!
      </h1>
      <div className='h-full'>
        <AudioProvider>
          <div className='flex flex-col h-full justify-center items-center'>
            <PlayerContainer />
            <KeyboardContainer />
          </div>
        </AudioProvider>
      </div>
    </div>
  );
}

export default App;
