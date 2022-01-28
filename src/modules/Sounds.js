const sounds = (mp3SoundSource, oggSoundSource) => {
    return {
        x: 300,
        // y: GAME_TEXT.y,
        y: 100,
        loop: false,
        soundSourceOgg: oggSoundSource,
        soundSrcMp3: mp3SoundSource,
        startTime: null,
        stopTime: null,
        soundObject: document.createElement('audio'),
        soundText: "Off",
        soundToggle: document.getElementById('soundToggle'),

        play: function (isMuted) {
            let source = document.createElement('source');
            source.type = 'audio/ogg';
            source.src = this.soundSourceOgg;
            this.soundObject.appendChild(source);

            source.src = this.soundSrcMp3;
            source.type = 'audio/mp3';
            this.soundObject.appendChild(source);

            this.soundObject.muted = isMuted;
            this.soundObject.currentTime = this.startTime;
            this.soundObject.loop = this.loop;
            this.soundObject.addEventListener('timeupdate', () => {
                if (this.soundObject.currentTime > this.stopTime) {
                    this.pause();
                }
            });
            this.soundObject.play();
        },
        pause: function () {
            this.soundObject.pause();
        },
        render: function (isMuted) {
            const soundOnOffIcon = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';

            this.soundToggle.innerHTML = soundOnOffIcon;
        }
    };
};

export default sounds;