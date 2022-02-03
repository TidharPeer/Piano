import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface AudioContextState {
  audioContext: AudioContext;
  setAudioContext: Dispatch<SetStateAction<AudioContext>>;
  isRecording: boolean;
  setIsRecording: Dispatch<SetStateAction<boolean>>;
  isPlayRecording: boolean;
  setIsPlayRecording: Dispatch<SetStateAction<boolean>>;
}

export const MyAudioContext = createContext<AudioContextState>({} as AudioContextState);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const context = new AudioContext();
  const [audioContext, setAudioContext] = useState<AudioContext>(context);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlayRecording, setIsPlayRecording] = useState<boolean>(false);

  return <MyAudioContext.Provider value={{ audioContext, setAudioContext, isRecording, setIsRecording, isPlayRecording, setIsPlayRecording }}>{children}</MyAudioContext.Provider>;
};
