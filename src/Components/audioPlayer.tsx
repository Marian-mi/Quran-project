import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPauseCircle, faPlayCircle, faTimes, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../scss/audioPlayer.scss';

type props = {
    soreNumber: number;
}
type state = {
    playsate: IconProp;
    mutestate: IconProp;
}

export default class Audioplayer extends React.Component<props , state> {

    constructor(props: props) {
        super(props)
        this.state = {
            playsate : faPlayCircle,
            mutestate: faVolumeUp
        }
    }

    componentDidMount() {
        const playIconContainer = document.getElementById('play-icon')! as HTMLDivElement;
        const audioPlayerContainer = document.querySelector('#audio-player-container')! as HTMLDivElement;
        const seekSlider = document.querySelector('#seek-slider')! as HTMLInputElement;
        const muteIconContainer = document.querySelector('#muteicon')!;
        const closeIcon = document.querySelector('#close-icon')!;
        const textContainers = document.querySelectorAll<HTMLDivElement>('.aye-text');
        const ayeContainer = document.querySelector('.aye-container')! as HTMLDivElement;
        const ayeContainerChildren = ayeContainer.children;
        let playState = 'play';
        let muteState = 'unmute';

        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.soreNumber;
        playButtons.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target! as HTMLDivElement;
                let aye = +(target.getAttribute('ayeno') as string)
                const parentDiv = target.parentElement;
                const mainDiv = parentDiv!.parentElement!;
                audio.onabort = audioAboutHandler(mainDiv);
                const mainDivIndex = Array.prototype.indexOf.call(ayeContainerChildren, mainDiv);
                audioPlayerContainer.style.display= 'block';
                audioPlayerContainer.style.opacity= '1';              
                playState = 'pause';
                this.setState({playsate: faPauseCircle})
                autoplayHandler(aye, sorreno, mainDivIndex);           
            })
        })

        

        const autoplayHandler = (currentAye: number, currentSoore: number, index:number) => {
            let aye = currentAye.toString().padStart(3, '0');
            let soore = currentSoore.toString().padStart(3, '0');
            currentAudio = audio;
            currentAudio.setAttribute('src', `https://audio.qurancdn.com/Alafasy/mp3/${soore}${aye}.mp3`);
            let currentParent = ayeContainerChildren[index]! as HTMLDivElement;
            currentParent.style.color = 'rgba(0, 126, 109, 0.76)';
            autoScroller(currentParent); 
            requestAnimationFrame(whilePlaying);         
            currentAudio.play();                     
            currentAye++;
            index++
            currentAudio.onended = () => {
                currentParent.style.color = 'rgba(34, 34, 34, 0.733)';
                cancelAnimationFrame(raf);
                autoplayHandler1(currentAye, currentSoore, index);
                
            };
        }


        


        const autoplayHandler1 = (currentAye: number, currentSoore: number, index: number) => {
            let aye = currentAye.toString().padStart(3, '0');
            let soore = currentSoore.toString().padStart(3, '0');
            currentAudio = audio1;
            currentAudio.setAttribute('src', `https://audio.qurancdn.com/Alafasy/mp3/${soore}${aye}.mp3`);
            let currentParent = ayeContainerChildren[index]! as HTMLDivElement;
            currentParent.style.color = 'rgba(0, 126, 109, 0.76)';
            autoScroller(currentParent);
            requestAnimationFrame(whilePlaying);
            currentAudio.play();               
            currentAye++;
            index++
            currentAudio.onended = () => {
                currentParent.style.color = 'rgba(34, 34, 34, 0.733)';
                cancelAnimationFrame(raf);                
                autoplayHandler(currentAye, currentSoore, index)
            };
        }

        const autoScroller = (element: HTMLElement) => {
            let y = element.offsetTop - 100;
            window.scroll({
                top: y,
                left: 0,
                behavior: 'smooth'
            });
        }

        closeIcon.addEventListener('click', e => {
            audioPlayerContainer.style.opacity = '0';
            // currentAudio.pause();
            audio.setAttribute('src', '');
            audio1.setAttribute('src', '');
            textContainers.forEach((item) => {
                item.style.color ='rgba(34, 34, 34, 0.733)';           
            })          
            setTimeout(() => {
                audioPlayerContainer.style.display = 'none';
                
            }, 500);
        })

        const audioAboutHandler = (parent: HTMLElement): any => {
            
            textContainers.forEach((item) => {
                if (item !== parent) {
                    item.style.color ='rgba(34, 34, 34, 0.733)';
                }
            })
        }

        const playHandler = (e?: MouseEvent, isnew?: boolean) => {
            if(isnew) {
                currentAudio.play();
                playState = 'pause';
                this.setState({playsate: faPauseCircle})
                cancelAnimationFrame(raf);
                requestAnimationFrame(whilePlaying);
                return
            }
            if(playState === 'play') {
                currentAudio.play();              
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
                this.setState({playsate: faPauseCircle})
            } else {
                currentAudio.pause();
                cancelAnimationFrame(raf);
                playState = 'play';
                this.setState({playsate: faPlayCircle})
            }
        }

        playIconContainer.addEventListener('click', playHandler);

        

        muteIconContainer.addEventListener('click', () => {
            console.log('yup')
            if(muteState === 'unmute') {
                audio.muted = true;
                muteState = 'mute';
                this.setState({mutestate: faVolumeMute})
            } else {
                audio.muted = false;
                muteState = 'unmute';
                this.setState({mutestate: faVolumeUp})
            }
        });

        const showRangeProgress = (rangeInput: HTMLInputElement) => {
            if(rangeInput === seekSlider) audioPlayerContainer!.style.setProperty('--seek-before-width', +rangeInput.value / +rangeInput.max * 100 + '%');
            else audioPlayerContainer!.style.setProperty('--volume-before-width', +rangeInput.value / +rangeInput.max * 100 + '%');
        }

        seekSlider.addEventListener('input', e => {
            const target = e.target! as HTMLInputElement
            showRangeProgress(target);
        })
       


        const audio = document.querySelector('#audioPlayer')! as HTMLAudioElement;
        const audio1 = document.querySelector('#audioPlayer1')! as HTMLAudioElement;
        let currentAudio = audio;
        const durationContainer = document.getElementById('duration')!;
        const currentTimeContainer = document.getElementById('current-time')!;
        let raf: any = null;

        const calculateTime = (secs: number) => {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        }

        const displayDuration = () => {
            durationContainer.textContent = calculateTime(audio!.duration);
        }

        const setSliderMax = () => {
            seekSlider.max = Math.floor(audio!.duration).toString();
        }

        

        const whilePlaying = () => {
            seekSlider.value = Math.floor(audio!.currentTime).toString();
            currentTimeContainer.textContent = calculateTime(+seekSlider.value);
            audioPlayerContainer.style.setProperty('--seek-before-width', `${+seekSlider.value / +seekSlider.max * 100}%`);
            raf = requestAnimationFrame(whilePlaying);
        }

        if (audio.readyState > 0) {
            displayDuration();
            setSliderMax();
        } else {
            audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
        });}
    


        seekSlider.addEventListener('input', () => {
            currentTimeContainer.textContent = calculateTime(+seekSlider.value);
            if(!audio.paused) {
                cancelAnimationFrame(raf);
            }
        });

        seekSlider.addEventListener('change', () => {
            audio.currentTime = +seekSlider.value;
            if(!audio.paused) {
                requestAnimationFrame(whilePlaying);
            }
        });

      
        
        
    }

    render () {

        return (
            <div id="audio-player-container">
                <audio src="https://audio.qurancdn.com/Alafasy/mp3/001002.mp3" preload="metadata" id="audioPlayer"></audio>
                <audio src="" preload="metadata" id="audioPlayer1"></audio>
                <div className="audio-icons-container">                 
                    <div id="icons12">
                        <FontAwesomeIcon icon={faTimes} id="close-icon"/>
                        <FontAwesomeIcon icon={this.state.playsate} id="play-icon"/>
                        <FontAwesomeIcon icon={this.state.mutestate} id="muteicon" />                  
                    </div>                  
                </div>
                <div>
                    <span id="current-time" className="time">0:00</span>
                    <input type="range" id="seek-slider" max="100" defaultValue="0" />
                    <span id="duration" className="time">0:00</span>                    
                </div>
            </div>
        )
    }
}