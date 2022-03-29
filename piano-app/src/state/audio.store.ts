import { createStore, select, setProp, withProps } from '@ngneat/elf';

export interface Audio {
  audioContext: AudioContext;
  isRecording: boolean;
  isPlayRecording: boolean;
}

const store = createStore(
  { name: 'audio' },
  withProps<Audio>({ audioContext: new AudioContext(), isRecording: false, isPlayRecording: false }),
);

export const getAudioContext = store.getValue().audioContext;
export const isRecording$ = store.pipe(select(({isRecording}) => isRecording));
export const isPlayRecording$ = store.pipe(select(({isPlayRecording}) => isPlayRecording));

export function updateIsRecording(isRecording: Audio['isRecording']) {
  store.update(setProp('isRecording', isRecording));
}

export function updateIsPlayRecording(isPlayRecording: Audio['isPlayRecording']) {
  store.update(setProp('isPlayRecording', isPlayRecording));
}
