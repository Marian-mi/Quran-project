import React from 'react';
import {Qurantext} from '../assets/ts/quran-simple-plain';
import '../scss/ayePage.scss';
import Buttons from  '../Components/buttons-inflex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faChevronCircleLeft, faCog, faCopy, faPlayCircle, faShare } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/bismillah.png';
import tarjomeAnsarian from  '../assets/ts/tarjomeh/fa.ansarian';
import { Link } from 'react-router-dom';
import Audioplayer from '../Components/audioPlayer';
import ErrorBoundary from '../Components/error-boundary';

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
    ayat: any[];
}

export default class ayatePage extends React.Component<props, state> {
    
    constructor(props: props) {
        super(props)
        this.state = {
            ayeCounter: 0,
            ayat: []
        }
    }

    sorreno = this.props.location.state.sooreNumber;
    start = this.props.location.state.start;
    end = this.props.location.state.end;

    AyeText = Qurantext.filter((item, index) => {
        if(index >= this.start && index < this.end) {
            return {item}
        }else return false;
    })

    buttonsData = [
        {textData: "Play", icon:<FontAwesomeIcon className="playButton" icon={faPlayCircle} />, id: 1},
        {textData: "Copy", icon:<FontAwesomeIcon className="copyButton" icon={faCopy} />, id: 3},
        {textData: "Share", icon:<FontAwesomeIcon icon={faShare} />, id: 4}
    ]

    buttonMaker = this.buttonsData.map((item) => {
        return <Buttons
            class="ayeButtons" 
            textData={item.textData} 
            icon={item.icon}
            key={item.id}
        />
    })

    ayeMaker = (item: string[], index:number, ayeStyle: object, tarjomeStyle: object, count: number ) => {
        if (this.sorreno === 1 && index === 0 ) {
            return;    
        }
        if(index > item.length-1) {
            return;
        }
        return <div
            className="aye-text"                       
            key={item[0][2] + index.toString()} >  
            <p  style={ayeStyle}  className="ayeText">{item[index]}</p>
            <p  style={tarjomeStyle} className="ayeText ayeTarjome">{tarjomeAnsarian[this.start + count + index - 1]}</p>
            {this.buttonMaker}
        </div>
    }

    observerCallback = (ayeS: object, tarjomeS:object) => {
        console.log(this.sorreno)
        let index = this.state.ayeCounter;
        let arr = [];
        let item: string[] = []
        if( index > this.AyeText.length) {return};
        if(this.AyeText.length > 20) {
            item = this.AyeText.slice(index, index + 20)
        }else {
            item = this.AyeText
        }
        for(let i = 0; i < 20; i++) {
            arr.push(this.ayeMaker(item, i, ayeS, tarjomeS, index ));
            if( i === 19) {
                this.stateUpdater(arr, index)
            }
        }
    }

    stateUpdater = (arr: any[], index: number) => {
        let newCount = index + 20;
        this.setState({ayeCounter: newCount, ayat: [...this.state.ayat,...arr]})
    }

    componentDidMount() {
        const ayeStyle = {
            fontSize: localStorage.getItem('ayeFont') as string
        }
        const tarjomeStyle = {
            fontSize: localStorage.getItem('tarjomeFont') as string
        }

        this.observerCallback(ayeStyle, tarjomeStyle);

        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.location.state.sooreNumber;
        playButtons.forEach((item, index) => {
            if(sorreno === 1) {
                item.setAttribute('ayeno', (index+=2).toString())
            }else {              
                item.setAttribute('ayeno', (index+=1).toString())               
            }
        })
        

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

    componentDidUpdate() {
        const ayeStyle = {
            fontSize: localStorage.getItem('ayeFont') as string
        }
        const tarjomeStyle = {
            fontSize: localStorage.getItem('tarjomeFont') as string
        }

        let lastNode = document.querySelector('.aye-page-footer')!;
        let observer = new IntersectionObserver(entry => {
            if(entry[0].isIntersecting) {
                this.observerCallback(ayeStyle, tarjomeStyle);
            }
        }, {threshold: 0.3});

        observer.observe(lastNode);

        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.location.state.sooreNumber;
        playButtons.forEach((item, index) => {
            if(sorreno === 1) {
                item.setAttribute('ayeno', (index+=2).toString())
            }else {              
                item.setAttribute('ayeno', (index+=1).toString())               
            }
        })
    }

    

    
    render() {

        const scrollToTop = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
        
        const openSetting = (e: React.MouseEvent) => {
            const settingContainer = document.querySelector('.setting-container')! as HTMLDivElement;
            settingContainer.classList.add('settingOpen')
        }

       
        return (
            <div className="aye-main">
                
                <div className="aye-container">
                <div className="aye-page-header">
                    <Link to="/" >
                        <FontAwesomeIcon icon={faChevronCircleLeft} className="backtohomeIcon" />
                    </Link>
                    <div className="copied">
                        <p>Copied to Clipboard!</p>
                    </div>
                    <FontAwesomeIcon icon={faCog} onClick={openSetting} className="settingIcon"/>
                    <p>
                    {this.props.location.state.ayeName}
                    </p>
                    
                </div>
                
                    <img src={logo} alt="Bismillah"/>
                    {this.state.ayat}
                    
                </div>
                <div className="scrollTop"><FontAwesomeIcon icon={faArrowCircleUp} onClick={scrollToTop} /></div>
                <div className="aye-page-footer">...</div>
                <ErrorBoundary>
                    <Audioplayer soreNumber={this.props.location.state.sooreNumber} ayatCount={this.AyeText.length}/>
                </ErrorBoundary>
            </div>
            
        )
    }
}