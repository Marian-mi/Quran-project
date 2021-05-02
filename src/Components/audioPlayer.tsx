import React, { useEffect, useRef, useState } from 'react';
import AudioControls from './AudioButtons';
import '../scss/audioPlayer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


type props = {
    totalAyats: number;
    soreNumber: number;
    isComingFromSearch: boolean;
    selectedQari: string;
    startingAye?: number;
}

const AudioPlayer = ({totalAyats, soreNumber,  isComingFromSearch, startingAye, selectedQari}: props) => {

    let qari = 'Alafasy'
    let audioType = 'mp3'
    if (localStorage.getItem('qariName')) {
        let value = selectedQari;
        audioType = value.slice(value.length-3, value.length);
        qari = value.slice(0, value.length-3);
    }
    const ayeSrcBuilder = (isPreload?: boolean) => {

        const aye = isPreload ? (ayeIndex+1).toString().padStart(3, '0') : (ayeIndex).toString().padStart(3, '0');
        const soore = soreNumber.toString().padStart(3, '0');

        return `https://audio.qurancdn.com/${qari}/${audioType}/${soore}${aye}.${audioType}`
    }

    let defaultAye = soreNumber === 1 ? 1 : 0;

    const mainContainer = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [ayeIndex, setAyeIndex] = useState<number>(defaultAye);
    const [ayeProgress, setAyeProgress] = useState(0);
    
    const isReady = useRef<number>(1);

    const audioSrc = ayeSrcBuilder();
    let audioSrcPreload = '';

    if ( ayeIndex < totalAyats - 1 ) audioSrcPreload = ayeSrcBuilder(true);

    const audioRef = useRef(new Audio(audioSrc));
    const audioRef1 = useRef(new Audio(audioSrcPreload));
    const isMounted = useRef(false);
    const intervalRef = useRef(setInterval(()=>{},1000));
    


    useEffect(() => {

        audioRef.current.pause();
        setIsPlaying(false);
        let src = ayeSrcBuilder();
        audioRef.current = new Audio(src);

        //eslint-disable-next-line
    }, [selectedQari])

   
    

    useEffect(() => {
        const playButtons = document.querySelectorAll<HTMLDivElement>('.playButton')!;

        const playAudio = (e: MouseEvent) => {
            const target = e.target! as HTMLDivElement;
            const value = target.getAttribute('ayeno')!;

            setAyeIndex(+value);
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

    const scrollButton = useRef<HTMLDivElement>(document.querySelector('.scrollTop'))

    const displayAudioControls = () => {

        if ( mainContainer.current !== null ) {
            setTimeout(() => {      
                mainContainer.current!.style.display = 'block';
                mainContainer.current!.style.opacity = '1';
            }, 100);
        }
        if ( scrollButton.current !== null ) scrollButton.current.style.bottom = '120px';
    }
    

    const { duration } = audioRef.current;

    const toPrevAye = () => {

        if( soreNumber > 1 ) {
            if ( ayeIndex < 1 ) {
                return
            }else {
                setAyeIndex(ayeIndex - 1)
            }
        }else {
            if ( ayeIndex < 2 ) {
                return
            }else {
                setAyeIndex(ayeIndex - 1)
            }
        }

    }

    const toNextAye = () => {

        if ( ayeIndex < totalAyats - 1 ) {
            setAyeIndex(ayeIndex + 1)
        }else {
            return
        }

    }

    useEffect(() => {

        if ( isPlaying ) {          
            audioRef.current.play().catch(err => {
                console.log(err)

            })
            
            startTimer();
            
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
        audioRef1.current = new Audio(audioSrcPreload);
        setAyeProgress(audioRef.current.currentTime)
        if ( isReady.current === 2 ) {
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
    }, [ayeIndex])

    const startTimer = () => {

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if ( audioRef.current.ended ) {
                toNextAye();
            }else {
                setAyeProgress(audioRef.current.currentTime)
            }
        }, 1000)

    }

    const onDrag = (value: string) => {

        clearInterval(intervalRef.current);
        audioRef.current.currentTime = +value;
        setAyeProgress(audioRef.current.currentTime)

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
        const highlightDiv = () => {
            if ( soreNumber > 1 ) {
                ayeContainer.forEach(item => {
                    item.style.color = 'rgba(34, 34, 34, 0.733)'
                })
                if( 1 ) {
                    const ayatMainContainer = document.querySelector('.aye-container')! as HTMLDivElement;
                    let index = ayeIndex + 1 ;
                    if ( isComingFromSearch && startingAye ) { index = index - startingAye + 1}
                    const currentChild = ayatMainContainer.children[index] as HTMLDivElement;
                    console.log(currentChild)   
                    currentChild.style.color = 'rgba(0, 126, 109, 0.76)';
                    const scrollAmount = currentChild.offsetTop - 100;
                    scrollTo(scrollAmount);             
                }
            }
            else {
                ayeContainer.forEach(item => {
                    item.style.color = 'rgba(34, 34, 34, 0.733)'
                })
                if( 1 ) {
                    const ayatMainContainer = document.querySelector('.aye-container')! as HTMLDivElement;
                    let index = ayeIndex;
                    if ( isComingFromSearch && startingAye ) { index = index - startingAye + 1}
                    const currentChild = ayatMainContainer.children[index]! as HTMLDivElement;
                    currentChild.style.color = 'rgba(0, 126, 109, 0.76)';
                    const scrollAmount = currentChild.offsetTop - 100;
                    scrollTo(scrollAmount);
                }
                
            }
        }

        if ( isMounted.current ) {
            highlightDiv();
        }else {
            isMounted.current = true;
        }
        
        //eslint-disable-next-line
    }, [ayeIndex])

    const closePanel = () => {
        audioRef.current.pause();
        const ayeContainer = document.querySelectorAll<HTMLDivElement>('.aye-text');
        ayeContainer.forEach(item => {
            item.style.color = 'rgba(34, 34, 34, 0.733)'
        })
        mainContainer.current!.style.display = 'none';
        if ( scrollButton.current !== null && window.outerWidth < 800 ) scrollButton.current.style.bottom = '20px';
    }

    return (
        <div className="audio-player-container" ref={mainContainer} >
            <div className="audio-control-buttons">
                <FontAwesomeIcon onClick={closePanel} className="audio-close-icon" icon={faTimesCircle} />
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevAye}
                    onNextClick={toNextAye}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
            <div className="audio-input">
                <input
                    type="range"
                    value={ayeProgress}
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