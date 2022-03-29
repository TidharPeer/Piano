import React, { useCallback, useEffect, useState } from 'react';
import './KeyboardContainer.css';
import WhiteKey from '../WhiteKey/WhiteKey';
import BlackKey from '../BlackKey/BlackKey';
import { notes, playNote } from './KeyboardContainer.utils';
// import { MyAudioContext } from '../../context/AudioContext/AudioContext';
import { getAudioContext, isPlayRecording$, isRecording$, updateIsPlayRecording } from '../../state/audio.store';
import { useObservable } from '@ngneat/use-observable';

const KeyboardContainer = () => {
  // const {audioContext} = useContext(MyAudioContext);
  const audioContext = getAudioContext;
  // const {playRecording, setPlayRecording} = useContext(MyAudioContext);
  const [playRecording] = useObservable(isPlayRecording$);
  // const {isRecording, setIsRecording} = useContext(MyAudioContext);
  const [isRecording] = useObservable(isRecording$);
  const [oscillator, setOscillator] = useState<OscillatorNode>();
  const [record, setRecord] = useState<string[]>([]);

  const play = useCallback((e: KeyboardEvent) => {
    const currentNote = notes.find(element => element.key === e.key);
    if (!currentNote) {
      return;
    }
    playNote(audioContext, currentNote.frequency);
    if (isRecording) {
      record.push(e.key);
      setRecord(record);
      localStorage.setItem('record', JSON.stringify(record));
    }
  }, [audioContext, record, isRecording]);

  useEffect(() => {
    const osc = audioContext.createOscillator();
    osc.frequency.value = 0;
    setOscillator(osc);
    const str = localStorage.getItem('record') || '[]';
    const record = JSON.parse(str) || [];
    setRecord(record);
  }, [audioContext]);

  useEffect(() => {
    if (playRecording) {
      updateIsPlayRecording(false);
      record.forEach((key: string, index: number) => {
        const currentNote = notes.find(element => element.key === key);
        if (!currentNote) {
          return;
        }
        playNote(audioContext, currentNote.frequency, index / 2);
      });
    }
  }, [audioContext, playRecording, record]);

  useEffect(() => {
    if (isRecording) {
      setRecord([]);
    }
  }, [isRecording]);

  useEffect(() => {
    window.addEventListener('keydown', play);
    return () => {
      window.removeEventListener('keydown', play);
    }
  }, [oscillator, isRecording, record, play]);

  return (
    <div className='h-[256px] flex relative'>
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
