import React, { useContext, useEffect, useState } from 'react';
import './KeyboardContainer.css';
import WhiteKey from '../WhiteKey/WhiteKey';
import BlackKey from '../BlackKey/BlackKey';
import { findNote, playNote } from './KeyboardContainer.utils';
import { MyAudioContext } from '../../context/AudioContext/AudioContext';
import './KeyboardContainer.css';

const KeyboardContainer = () => {
  const {audioContext} = useContext(MyAudioContext);
  const {isPlayRecording, setIsPlayRecording} = useContext(MyAudioContext);
  const {isRecording, setIsRecording} = useContext(MyAudioContext);
  const [oscillator, setOscillator] = useState<OscillatorNode>();
  const [pressed, setPressed] = useState<boolean>(false);
  const [record, setRecord] = useState<string[]>([]);

  const play = ({key}: KeyboardEvent) => {
    const currentNote = findNote(key);

    if (!currentNote || pressed) {
      return;
    }

    setPressed(true);
    const osc = playNote(audioContext, currentNote.frequency);
    setOscillator(osc);
    if (isRecording) {
      record.push(key);
      setRecord(record);
      localStorage.setItem('record', JSON.stringify(record));
    }

    const element = document.getElementsByClassName(`keyboard-${key.toUpperCase()}`);
    (element[0] as HTMLElement).classList.add('active');
  }

  const end = ({key}: KeyboardEvent) => {
    if (oscillator) {
      oscillator.stop();
    }
    setPressed(false);
    const currentNote = findNote(key);
    if (!currentNote) {
      return;
    }

    const element = document.getElementsByClassName(`keyboard-${key.toUpperCase()}`);
    (element[0] as HTMLElement).classList.remove('active');
  }

  useEffect(() => {
    const osc = audioContext.createOscillator();
    osc.frequency.value = 0;
    setOscillator(osc);
    const str = localStorage.getItem('record') || '[]';
    const record = JSON.parse(str) || [];
    setRecord(record);
  }, [audioContext]);

  useEffect(() => {
    if (isPlayRecording) {
      setIsPlayRecording(false);
      record.forEach((key: string, index: number) => {
        const currentNote = findNote(key);
        if (!currentNote) {
          return;
        }
        playNote(audioContext, currentNote.frequency, index / 2);
      });
    }
  }, [audioContext, isPlayRecording, setIsPlayRecording, record, setRecord]);

  useEffect(() => {
    if (isRecording) {
      setRecord([]);
    }
  }, [isRecording, setIsRecording]);

  useEffect(() => {
    window.addEventListener('keydown', play);
    window.addEventListener('keyup', end);
    return () => {
      window.removeEventListener('keydown', play);
      window.removeEventListener('keyup', end);
    }
  }, [oscillator, isRecording, record, pressed, setPressed, setOscillator]);

  return (
    <div className='h-[256px] flex relative keyboard-container'>
      <WhiteKey char='Q' onClick={() => play({key: 'q'} as any)} />
      <BlackKey char='2' onClick={() => play({key: '2'} as any)} />
      <WhiteKey char='W' className='ml-[-16px]' onClick={() => play({key: 'w'} as any)} />
      <BlackKey char='3' onClick={() => play({key: '3'} as any)} />
      <WhiteKey char='E' className='ml-[-16px]' onClick={() => play({key: 'e'} as any)} />
      <WhiteKey char='R' onClick={() => play({key: 'r'} as any)} />
      <BlackKey char='5' onClick={() => play({key: '5'} as any)} />
      <WhiteKey char='T' className='ml-[-16px]' onClick={() => play({key: 't'} as any)} />
      <BlackKey char='6' onClick={() => play({key: '6'} as any)} />
      <WhiteKey char='Y' className='ml-[-16px]' onClick={() => play({key: 'y'} as any)} />
      <BlackKey char='7' onClick={() => play({key: '7'} as any)} />
      <WhiteKey char='U' className='ml-[-16px]' onClick={() => play({key: 'u'} as any)} />
    </div>
  );
}

export default KeyboardContainer;
