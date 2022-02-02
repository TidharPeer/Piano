export const notes = [
    {"label":"C4", "frequency":"261.63", "key": "q"},
    {"label":"C#3", "frequency":"277.18", "key": "2"},
    {"label":"D4","frequency":"293.66", "key": "w"},
    {"label":"D#4","frequency":"311.13", "key": "3"},
    {"label":"E4","frequency":"329.63", "key": "e"},
    {"label":"F4","frequency":"349.23", "key": "r"},
    {"label":"F#4","frequency":"369.99", "key": "5"},
    {"label":"G4","frequency":"392","key": "t"},
    {"label":"G#4","frequency":"415.3", "key": "6"},
    {"label":"A4","frequency":"440", "key": "y"},
    {"label":"A#4","frequency":"466.16", "key": "7"},
    {"label":"B4","frequency":"493.88", "key": "u"}
];

export const playNote = (audioContext: AudioContext, freq: string, time = 0) => {
    const osc = audioContext.createOscillator();
    osc.frequency.value = 0;
    if (osc && audioContext) {
        osc.frequency.value = parseInt(freq);
        osc.connect(audioContext.destination);
        osc.start(audioContext.currentTime + time);
        osc.stop(audioContext.currentTime + 0.2 + time);
    }
};
