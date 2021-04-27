import { faPauseCircle, faPlayCircle, faTimes, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';



export default function AudioplayerIcons() {

    const [playstate, setPlaystate] = useState(faPauseCircle);
    const [mutestate, setMutestate] = useState(faVolumeUp);

    useEffect(() => {
        const playHandler = () => {setPlaystate(faPauseCircle)};
        const pauseHandler = () => {setPlaystate(faPlayCircle)};
        const muteHandler = (e: Event) => {
            const target = e.target! as HTMLAudioElement;
            if (target.muted) {
                setMutestate(faVolumeMute)
            }else {
                setMutestate(faVolumeUp)
            }
        }
        const audio = document.querySelector('#audioPlayer')! as HTMLAudioElement;
        const audio1 = document.querySelector('#audioPlayer1')! as HTMLAudioElement;
        [audio, audio1].forEach(item => {
            item.addEventListener('play', playHandler);
            item.addEventListener('pause', pauseHandler);
            item.addEventListener('volumechange', (e) => {muteHandler(e)})
        })
    })


    return (
        <div id="icons12">
            <FontAwesomeIcon icon={faTimes} id="close-icon"/>
            <FontAwesomeIcon icon={playstate} id="play-icon"/>
            <FontAwesomeIcon icon={mutestate} id="muteicon" />                  
        </div>
    )
}