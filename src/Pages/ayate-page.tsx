import React from 'react';
import {Qurantext} from '../assets/ts/quran-simple-plain';
import '../scss/ayePage.scss';
import Buttons from  '../Components/buttons-inflex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCopy, faPlayCircle, faShare } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/bismillah.png';
import tarjomeAnsarian from  '../assets/ts/tarjomeh/fa.ansarian';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      ayeno?: number;
      sooreno?: number;
    }
}
type props = {
    location: {
        state: {
            start: number;
            end: number;
            ayeName: string;
            sooreNumber: number;
        }
    }
}
type state = {
    ayeCounter: number;
}

export default class ayatePage extends React.Component<props> {
    
    state: state = {
        ayeCounter: 0
    }

    componentDidMount() {
        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.location.state.sooreNumber;
        playButtons.forEach((item, index) => {
            if(sorreno === 1) {
                item.setAttribute('ayeno', (index+=2).toString())
            }else {              
                item.setAttribute('ayeno', (index+=1).toString())               
            }
        })
        const audio = document.querySelector('#ayeAudio')! as HTMLAudioElement;
        const audio2 = document.querySelector('#ayeAudio2')! as HTMLAudioElement;
        playButtons.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target! as HTMLDivElement;
                let aye = target.getAttribute('ayeno')!.padStart(3, '0');
                console.log(aye);
                let soore = (sorreno.toString()).padStart(3, '0');
                console.log(soore);
                audio.setAttribute('src', `https://audio.qurancdn.com/Alafasy/mp3/${soore}${aye}.mp3`);
                audio.play();
                const parentDiv = target.parentElement;
                const mainDiv = parentDiv!.parentElement!;
                audio.onabort = audioAboutHandler(mainDiv);
                mainDiv!.style.color = 'rgba(0, 126, 109, 0.76)';
                audio.onended = () => {
                    mainDiv!.style.color = 'rgba(34, 34, 34, 0.733)';
                    audio2.setAttribute('src', `https://audio.qurancdn.com/Alafasy/mp3/${soore}${aye}.mp3`);
                };
            })
        })

        const audioAboutHandler = (parent: HTMLElement): any => {
            const textContainers = document.querySelectorAll<HTMLDivElement>('.aye-text');
            textContainers.forEach((item) => {
                if (item !== parent) {
                    item.style.color ='rgba(34, 34, 34, 0.733)';
                }
            })
        }

        const copyButtons = document.querySelectorAll('.copyButton')!;
        copyButtons.forEach(item => {
            item.addEventListener('click', e => {
                const copyAlert = document.querySelector('.copied')! as HTMLDivElement;
                const target = e.target! as HTMLDivElement
                const parent = target.parentElement!;
                const pparent = parent.parentElement!;
                const theTarget = pparent.children[0]!;
                var r = document.createRange();
                r.selectNode(theTarget);
                window.getSelection()?.removeAllRanges();
                window.getSelection()?.addRange(r);
                document.execCommand('copy');
                window.getSelection()?.removeAllRanges();
                copyAlert.style.transform = 'translateY(-20%)'
                setTimeout(() => {
                    copyAlert.style.transform = 'translateY(-120%)'
                }, 2000);
            })
        })

        window.scrollTo(0, 0);
    }

    

    
    render() {
        let sorreno = this.props.location.state.sooreNumber;
        let start = this.props.location.state.start;
        let end = this.props.location.state.end;
        const AyeText = Qurantext.filter((item, index) => {
            if(index >= start && index < end) {
                return {item}
            }else return false;
        })
        
        const buttonsData = [
            {textData: "Play", icon:<FontAwesomeIcon className="playButton" icon={faPlayCircle} />, id: 1},
            {textData: "Copy", icon:<FontAwesomeIcon className="copyButton" icon={faCopy} />, id: 3},
            {textData: "Share", icon:<FontAwesomeIcon icon={faShare} />, id: 4}
        ]
        const ButtonDiv = buttonsData.map((item, index) => {
            return <Buttons
            class="ayeButtons" 
            textData={item.textData} 
            icon={item.icon}
            key={item.id}/>
            
        })

        const ayeStyle = {
            fontSize: localStorage.getItem('ayeFont') as string
        }
        const tarjomeStyle = {
            fontSize: localStorage.getItem('tarjomeFont') as string
        }
        const openSetting = (e: React.MouseEvent) => {
            const settingContainer = document.querySelector('.setting-container')! as HTMLDivElement;
            settingContainer.classList.add('settingOpen')
        }

        const AyeDiv = AyeText.map((item, index) => {
            if (sorreno === 1 && index === 0) {
                return null;    
            }
            return <div
                className="aye-text"
                             
                key={index}>  
                <p style={ayeStyle}  className="ayeText">{item}</p>
                <p style={tarjomeStyle} className="ayeText ayeTarjome">{tarjomeAnsarian[start + index - 1]}</p>
                {ButtonDiv}
            </div>
        })

        return (
            <div className="aye-main">
                
                <div className="aye-container">
                <div className="aye-page-header">
                    <div className="copied">
                        <p>Copied to Clipboard!</p>
                    </div>
                    <FontAwesomeIcon icon={faCog} onClick={openSetting}/>
                    <p>
                    {this.props.location.state.ayeName}
                    </p>
                    
                </div>
                
                    <img src={logo} alt="Bismillah"/>
                    {AyeDiv}
                    
                </div>
                <div className="aye-page-footer"></div>
                <audio id="ayeAudio" src=""></audio>
                <audio id="ayeAudio2" src=""></audio>
            </div>
            
        )
    }
}