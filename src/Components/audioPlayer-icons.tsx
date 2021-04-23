import { faPauseCircle, faPlayCircle, faTimes, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';


type props = {
    playState: string;
}

export default function AudioplayerIcons(props: props) {

    const [playstate, setPlaystate] = useState(faPauseCircle);
    const [mutestate] = useState(faVolumeUp);

    useEffect(() => {
        const playHandler = () => {setPlaystate(faPauseCircle)};
        const pauseHandler = () => {setPlaystate(faPlayCircle)};
        const audio = document.querySelector('#audioPlayer')! as HTMLAudioElement;
        const audio1 = document.querySelector('#audioPlayer1')! as HTMLAudioElement;
        [audio, audio1].forEach(item => {
            item.addEventListener('play', playHandler);
            item.addEventListener('pause', pauseHandler);
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