import React, { useEffect, useRef, useState } from 'react';
import AudioControls from './AudioButtons';
import '../scss/audioPlayer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


type props = {
    totalAyats: number;
    soreNumber: number;
    isComingFromSearch: boolean;
    startingAye?: number;
}

const AudioPlayer = ({totalAyats, soreNumber,  isComingFromSearch, startingAye}: props) => {

    let qari = 'Alafasy'
    let audioType = 'mp3'
    if (localStorage.getItem('qariName')) {
        let value = localStorage.getItem('qariName')!;
        audioType = value.slice(value.length-3, value.length);
        qari = value.slice(0, value.length-3);
    }

    let ayeDefault = 1;
    if ( soreNumber === 1 ) ayeDefault = 0;

    const mainContainer = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState<number>(ayeDefault);
    const [trackProgress, setTrackProgress] = useState(0);
    
    const [tracks, setTracks] = useState<string[]>(
        []
    );
    const isReady = useRef<number>(1);

    const audioSrc = tracks[trackIndex];
    const audioSrc1 = tracks[trackIndex+1];

    const audioRef = useRef(new Audio(audioSrc));
    const audioRef1 = useRef(new Audio(audioSrc1));
    const intervalRef = useRef(setInterval(()=>{},1000));
    


    useEffect(() => {
        const track = [];
        
        for (let i = 1; i <= totalAyats; i++) {
            let soore = soreNumber.toString().padStart(3, '0');
            let aye = i.toString().padStart(3, '0');
            let src =
            `https://audio.qurancdn.com/${qari}/${audioType}/${soore}${aye}.${audioType}`;
            track.push(src);
        }

        setTracks(track);

        
        if ( isReady.current === 3 ) {
            audioRef.current.pause();
            audioRef.current = new Audio(track[trackIndex]);
            audioRef.current.play();
        }
    

        //eslint-disable-next-line
    }, [qari, totalAyats, soreNumber, audioType])

    useEffect(() => {
        const playButtons = document.querySelectorAll<HTMLDivElement>('.playButton')!;

        const playAudio = (e: MouseEvent) => {
            const target = e.target! as HTMLDivElement;
            const value = target.getAttribute('ayeno')!;

            setTrackIndex(+value-1);
            displayAudioControls();
        }
        playButtons.forEach(item => {
            item.addEventListener('click', (e) => {playAudio(e)})
        })

        return () => {
            playButtons.forEach(item => {
                item.removeEventListener('click', (e) => {playAudio(e)})
            })
        }
    })

    const displayAudioControls = () => {

        if ( mainContainer.current !== null ) {
            setTimeout(() => {      
                mainContainer.current!.style.display = 'block';
                mainContainer.current!.style.opacity = '1';
            }, 100);
        }

    }
    

    const { duration } = audioRef.current;

    const toPrevTrack = () => {

        if ( trackIndex < 0 ) {
            return
        }else {
            setTrackIndex(trackIndex - 1)
        }

    }

    const toNextTrack = () => {

        if ( trackIndex < tracks.length - 1 ) {
            setTrackIndex(trackIndex + 1)
        }else {
            return
        }

    }

    useEffect(() => {

        if ( isPlaying ) {          
            audioRef.current.play().catch(err => {
                console.log(err)

            })
            const start = () => {
                startTimer();
            }
            start();
        }else {
            audioRef.current.pause();
        }
        //eslint-disable-next-line
    }, [isPlaying])

    useEffect(() => {

        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }

    }, []);

    useEffect(() => {

        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        audioRef1.current = new Audio(audioSrc1);
        setTrackProgress(audioRef.current.currentTime)
        if ( isReady.current === 3 ) {
            audioRef.current.play();
            setIsPlaying(true);       
            const start = () => {
                startTimer();
            }
            start();
        }else {
            isReady.current = isReady.current + 1;
        }
        //eslint-disable-next-line
    }, [trackIndex])

    const startTimer = () => {

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if ( audioRef.current.ended ) {
                toNextTrack();
            }else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, 1000)

    }

    const onDrag = (value: string) => {

        clearInterval(intervalRef.current);
        audioRef.current.currentTime = +value;
        setTrackProgress(audioRef.current.currentTime)

    } 

    const onDragEnd = () => {

        if ( !isPlaying ) {
            setIsPlaying(true)
        }
        startTimer();

    }

    const scrollTo = (value: number) => {
        window.scroll({
            top: value,
            left: 0,
            behavior: 'smooth'
        })
    }


    useEffect(() => {

        const ayeContainer = document.querySelectorAll<HTMLDivElement>('.aye-text');
        if ( soreNumber > 1 ) {
            ayeContainer.forEach(item => {
                item.style.color = 'rgba(34, 34, 34, 0.733)'
            })
            if( isReady.current === 3) {
                const ayatMainContainer = document.querySelector('.aye-container')! as HTMLDivElement;
                let index = trackIndex + 2 ;
                if ( isComingFromSearch && startingAye ) { index = index - startingAye + 1}   
                const currentChild = ayatMainContainer.children[index] as HTMLDivElement;
                currentChild.style.color = 'rgba(0, 126, 109, 0.76)';
                const scrollAmount = currentChild.offsetTop - 100;
                scrollTo(scrollAmount);             
            }
        }
        else {
            ayeContainer.forEach(item => {
                item.style.color = 'rgba(34, 34, 34, 0.733)'
            })
            if( isReady.current === 3 ) {
                const ayatMainContainer = document.querySelector('.aye-container')! as HTMLDivElement;
                let index = trackIndex + 1;
                if ( isComingFromSearch && startingAye ) { index = index - startingAye + 1}
                const currentChild = ayatMainContainer.children[index]! as HTMLDivElement;
                currentChild.style.color = 'rgba(0, 126, 109, 0.76)';
                const scrollAmount = currentChild.offsetTop - 100;
                scrollTo(scrollAmount);
            }
            
        }
        
        //eslint-disable-next-line
    }, [trackIndex])

    const closePanel = () => {
        audioRef.current.pause();
        const ayeContainer = document.querySelectorAll<HTMLDivElement>('.aye-text');
        ayeContainer.forEach(item => {
            item.style.color = 'rgba(34, 34, 34, 0.733)'
        })
        mainContainer.current!.style.display = 'none';
    }

    return (
        <div className="audio-player-container" ref={mainContainer} >
            <div className="audio-control-buttons">
                <FontAwesomeIcon onClick={closePanel} className="audio-close-icon" icon={faTimesCircle} />
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
            <div className="audio-input">
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onDrag(e.target.value)}
                    onMouseUp={onDragEnd}
                    onKeyUp={onDragEnd}
                />
            </div>
        </div>
    )
}

export default AudioPlayer;