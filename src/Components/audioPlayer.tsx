import React from 'react';
import '../scss/audioPlayer.scss';
import AudioIcons from './audioPlayer-icons'

type props = {
    soreNumber: number;
    ayatCount: number;
}

export default class Audioplayer extends React.Component<props> {
    
    componentDidUpdate() {
        const playIconContainer = document.getElementById('play-icon')! as HTMLDivElement;
        const audioPlayerContainer = document.querySelector('#audio-player-container')! as HTMLDivElement;
        const seekSlider = document.querySelector('#seek-slider')! as HTMLInputElement;
        const muteIconContainer = document.querySelector('#muteicon')!;
        const closeIcon = document.querySelector('#close-icon')!;
        const textContainers = document.querySelectorAll<HTMLDivElement>('.aye-text');
        const ayeContainer = document.querySelector('.aye-container')! as HTMLDivElement;
        const ayeContainerChildren = ayeContainer.children;
        const audio = document.querySelector('#audioPlayer')! as HTMLAudioElement;
        const audio1 = document.querySelector('#audioPlayer1')! as HTMLAudioElement;
        const scrollTop = document.querySelector('.scrollTop')! as HTMLDivElement;
        let currentAudio = audio;
        const durationContainer = document.getElementById('duration')!;
        const currentTimeContainer = document.getElementById('current-time')!;
        let raf: any = null;
        let playState = 'play';
        let muteState = 'unmute'; let Qari: string; let audioType: string;
    
    
        if (localStorage.getItem('qariName')) {
            let value = localStorage.getItem('qariName')!;
            audioType = value.slice(value.length-3, value.length);
            Qari = value.slice(0, value.length-3);
        }else {
            Qari = 'Alafasy';
            audioType ='mp3'
        }
    
    
        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.soreNumber;
        playButtons.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target! as HTMLDivElement;
                let aye = +(target.getAttribute('ayeno') as string)
                const parentDiv = target.parentElement;
                const mainDiv = parentDiv!.parentElement!.parentElement!.parentElement!;
                audio.onabort = audioAboutHandler(mainDiv);
                const mainDivIndex = Array.prototype.indexOf.call(ayeContainerChildren, mainDiv);
                audioPlayerContainer.style.display= 'block';
                audioPlayerContainer.style.opacity= '1';
                scrollTop.style.bottom = "110px";              
                playState = 'pause';
                let linkAdditions = addPadding(aye, sorreno);
                audio.setAttribute('src', `https://audio.qurancdn.com/${Qari}/${audioType}/${linkAdditions.soore}${linkAdditions.aye}.${audioType}`);
                autoplayHandler(aye, sorreno, mainDivIndex);           
            })
        })
    
        
    
        const autoplayHandler = (currentAye: number, currentSoore: number, index:number) => {
            if(currentAye > this.props.ayatCount) {
                return
            }
           
            currentAudio = audio;
           
            if (currentAudio.readyState > 0) {
                displayDuration();
                setSliderMax();
            } else {
                currentAudio.addEventListener('loadedmetadata', () => {
                displayDuration();
                setSliderMax();
            });}
            let currentParent = ayeContainerChildren[index]! as HTMLDivElement;
            currentParent.style.color = 'rgba(0, 126, 109, 0.76)';
            autoScroller(currentParent); 
            requestAnimationFrame(whilePlaying);         
            currentAudio.play();                     
            currentAye++;
            index++;
            let linkAdditions = addPadding(currentAye, currentSoore);
            audio1.setAttribute('src', `https://audio.qurancdn.com/${Qari}/${audioType}/${linkAdditions.soore}${linkAdditions.aye}.${audioType}`);
            currentAudio.onended = () => {
                currentParent.style.color = 'rgba(34, 34, 34, 0.733)';
                cancelAnimationFrame(raf);
                autoplayHandler1(currentAye, currentSoore, index);             
            };
        }
    
    
        
    
    
        const autoplayHandler1 = (currentAye: number, currentSoore: number, index: number) => {
            if(currentAye > this.props.ayatCount) {
                return
            }
            currentAudio = audio1;
            
            if (currentAudio!.readyState > 0) {
                displayDuration();
                setSliderMax();
            } else {
                currentAudio!.addEventListener('loadedmetadata', () => {
                displayDuration();
                setSliderMax();
            });}
            let currentParent = ayeContainerChildren[index]! as HTMLDivElement;
            currentParent.style.color = 'rgba(0, 126, 109, 0.76)';
            autoScroller(currentParent);
            requestAnimationFrame(whilePlaying);
            currentAudio.play();               
            currentAye++;
            index++;
            let linkAdditions = addPadding(currentAye, currentSoore);
            audio.setAttribute('src', `https://audio.qurancdn.com/${Qari}/${audioType}/${linkAdditions.soore}${linkAdditions.aye}.${audioType}`);
            currentAudio.onended = () => {
                currentParent.style.color = 'rgba(34, 34, 34, 0.733)';
                cancelAnimationFrame(raf);                
                autoplayHandler(currentAye, currentSoore, index)
            };
        }
    
        const addPadding = (currentAye: number, currentSoore: number) => {
            let result = {
                aye:  currentAye.toString().padStart(3, '0'),
                soore: currentSoore.toString().padStart(3, '0')
            }
            return result;
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
            audio.setAttribute('src', '');
            audio1.setAttribute('src', '');
            scrollTop.style.bottom = "30px"
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
                cancelAnimationFrame(raf);
                requestAnimationFrame(whilePlaying);
                return
            }
            if(playState === 'play') {
                currentAudio.play();              
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                currentAudio.pause();
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        }
    
        playIconContainer.addEventListener('click', playHandler);
    
        
    
        muteIconContainer.addEventListener('click', () => {
            if(muteState === 'unmute') {
                audio.muted = true;
                audio1.muted = true;
                muteState = 'mute';
            } else {
                audio.muted = false;
                audio1.muted = false;
                muteState = 'unmute';
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
       
    
    
        
    
        const calculateTime = (secs: number) => {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        }
    
        const displayDuration = () => {
            durationContainer.textContent = calculateTime(currentAudio!.duration);
        }
        
        
    
        const setSliderMax = () => {
            seekSlider.max = Math.floor(currentAudio!.duration).toString();
        }
    
        
    
        const whilePlaying = () => {
            seekSlider.value = Math.floor(currentAudio!.currentTime).toString();
            currentTimeContainer.textContent = calculateTime(+seekSlider.value);
            audioPlayerContainer.style.setProperty('--seek-before-width', `${+seekSlider.value / +seekSlider.max * 100}%`);
            raf = requestAnimationFrame(whilePlaying);
        }
    
        
    
    
    
        seekSlider.addEventListener('input', () => {
            currentTimeContainer.textContent = calculateTime(+seekSlider.value);
            if(!currentAudio.paused) {
                cancelAnimationFrame(raf);
            }
        });
    
        seekSlider.addEventListener('change', () => {
            currentAudio.currentTime = +seekSlider.value;
            if(!currentAudio.paused) {
                requestAnimationFrame(whilePlaying);
            }
        });      
    }

    render() {
        return (
            <div id="audio-player-container">
                <audio src="" preload="metadata" id="audioPlayer"></audio>
                <audio src="" preload="metadata" id="audioPlayer1"></audio>
                <div className="audio-icons-container">                 
                    <AudioIcons />                 
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

