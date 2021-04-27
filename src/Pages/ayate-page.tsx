import React, { lazy, Suspense } from 'react';
import {Qurantext} from '../assets/ts/quran-simple-plain';
import '../scss/ayePage.scss';
import Buttons from  '../Components/buttons-inflex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faChevronCircleLeft, faCog, faCopy, faPlayCircle, faShare } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/bismillah.png';
import tarjomeAnsarian from  '../assets/ts/tarjomeh/fa.ansarian';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../Components/error-boundary';
import Audioplayer from '../Components/audioPlayer';
const Setting = lazy(() => import('../Components/settings'));

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      ayeno?: number;
      sooreno?: number;
      customvalue?: string;
      testid?: string;
    }
}
type props = {
    location: {
        state: {
            start: number;
            end: number;
            ayeName: string;
            sooreNumber: number;
            isComingFromSearch: boolean;
            scrolltoAye: number;
            ayatCount: number;
        }
    }
}
type state = {
    ayeCounter: number;
    ayat: any[];
    ayeSize: string;
    tarjoemSize: string;
}

export default class ayatePage extends React.Component<props, state> {
    
    constructor(props: props) {
        super(props)
        this.state = {
            ayeCounter: 0,
            ayat: [],
            ayeSize: '35px',
            tarjoemSize: '26px'
        }
    }
    copyNotif = React.createRef<HTMLDivElement>();

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
        {textData: "Copy", icon:<FontAwesomeIcon onClick={(e) => {this.copyFunction(e)}} className="copyButton" icon={faCopy} />, id: 3},
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

    englishNumber_toPersian = (num: number) => {
        if( this.sorreno === 1 ) {num--};
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        let spiltted = num.toString().split('');
        const persianNumber = spiltted.map(item => {
            return persianDigits[+item];
        })
        return persianNumber.join('');
    }

    ayeMaker = (item: string[], index:number, count: number ) => {
        if (this.sorreno === 1 && index === 0 ) {
            return;    
        }
        if(index > item.length-1) {
            return;
        }
        return <div
            className="aye-text"                       
            key={item[0][2] + index.toString()} >  
            <div className="aye-texts-container">
                <p className="ayeText ayeitself">

                    {item[index]}

                    {!this.props.location.state.isComingFromSearch && 
                    <span className="aye-index"><p>
                    {this.englishNumber_toPersian(count + index + 1)}
                    </p></span>}
                    
                    {this.props.location.state.isComingFromSearch && 
                    <span className="aye-index"><p>
                    {this.englishNumber_toPersian(this.props.location.state.scrolltoAye + count + index)}
                    </p></span>}

                </p>
                <p className="ayeText ayeTarjome">{tarjomeAnsarian[this.start + count + index - 1]}</p>
            </div>
            <div className="aye-buttons-container"> {this.buttonMaker} </div>
        </div>
    }

    observerCallback = () => {
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
            arr.push(this.ayeMaker(item, i, index ));
            if( i === 19) {
                this.stateUpdater(arr, index)
            }
        }
    }

    stateUpdater = (arr: any[], index: number) => {
        let newCount = index + 20;
        this.setState({ayeCounter: newCount, ayat: [...this.state.ayat,...arr]})
    }

    copyFunction = (e: React.MouseEvent) => {
        const copyAlert = this.copyNotif.current!;
        const target = e.target! as HTMLDivElement
        const parent = target.parentElement!.parentElement!.parentElement!.parentElement!;
        const theTarget = parent.children[0]!.children[0]!;
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
    }

    componentDidMount() {


        let ayeS = localStorage.getItem('ayeFont') as string;
        this.setState({ayeSize: ayeS});
        let tarjoemS = localStorage.getItem('tarjomeFont') as string;
        this.setState({tarjoemSize: tarjoemS})  
        

        const ayetexts = document.querySelectorAll<HTMLParagraphElement>('.ayeitself')!
        const tarjometexts = document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome')!
        
        ayetexts.forEach(item => {
            item.style.fontSize = this.state.ayeSize;
        })
        tarjometexts.forEach(item => {
            item.style.fontSize = this.state.tarjoemSize;
        })

        let lastNode = document.querySelector('.aye-page-footer')!;
        let observer = new IntersectionObserver(entry => {
            if(entry[0].isIntersecting) {
                this.observerCallback();
            }
        }, {threshold: 0.3});

        observer.observe(lastNode);

        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.location.state.sooreNumber;
        if( !this.props.location.state.isComingFromSearch ) {

            playButtons.forEach((item, index) => {
                if(sorreno === 1) {
                    item.setAttribute('ayeno', (index+=2).toString())
                }else {              
                    item.setAttribute('ayeno', (index+=1).toString())               
                }
            })
        }else {
                   
            playButtons.forEach((item, index) => {
                let startAye = (this.props.location.state.scrolltoAye) + index;
                if(sorreno === 1) {
                    item.setAttribute('ayeno', (startAye).toString())
                }else {              
                    item.setAttribute('ayeno', (startAye).toString())               
                }
            })
        }
        
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {

        const ayetexts = document.querySelectorAll<HTMLParagraphElement>('.ayeitself')!
        const tarjometexts = document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome')!
        
        ayetexts.forEach(item => {
            item.style.fontSize = this.state.ayeSize;
        })
        tarjometexts.forEach(item => {
            item.style.fontSize = this.state.tarjoemSize;
        })
        

        

        const playButtons = document.querySelectorAll('.playButton')!;
        let sorreno = this.props.location.state.sooreNumber;

        if ( !this.props.location.state.isComingFromSearch ) {
            
            playButtons.forEach((item, index) => {
                if(sorreno === 1) {
                    item.setAttribute('ayeno', (index+=2).toString())
                }else {              
                    item.setAttribute('ayeno', (index+=1).toString())               
                }
            })
        }else {       
            playButtons.forEach((item, index) => {
                let startAye = (this.props.location.state.scrolltoAye) + index;
                if(sorreno === 1) {
                    item.setAttribute('ayeno', (startAye).toString())
                }else {              
                    item.setAttribute('ayeno', (startAye).toString())               
                }
            })
        }
    }

    scrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    openSetting = (e: React.MouseEvent) => {
        const settingContainer = document.querySelector('.setting-container')! as HTMLDivElement;
        settingContainer.classList.add('settingOpen')
    }

    
    render() {
        let totalAyats

        if (this.props.location.state.isComingFromSearch) {         
            totalAyats = this.props.location.state.ayatCount;
        }else {
            totalAyats = this.AyeText.length;
        }

        return (
            <div className="aye-main">
                <Suspense fallback={<div>Loading...</div>}><Setting /></Suspense>
                <div className="aye-container">
                <div className="aye-page-header">
                    <Link to="/" >
                        <FontAwesomeIcon icon={faChevronCircleLeft} className="backtohomeIcon" />
                    </Link>
                    <div className="copied" ref={this.copyNotif}>
                        <p>Copied to Clipboard!</p>
                    </div>
                    <FontAwesomeIcon icon={faCog} onClick={this.openSetting} className="settingIcon"/>
                    <p>
                    {this.props.location.state.ayeName}
                    </p>
                    
                </div>
                
                    <img src={logo} alt="Bismillah"/>
                    {this.state.ayat}
                    
                    
                </div>
                <div className="scrollTop"><FontAwesomeIcon icon={faArrowCircleUp} onClick={this.scrollToTop} /></div>
                <div className="aye-page-footer">...</div>
                <ErrorBoundary>
                    <Audioplayer soreNumber={this.props.location.state.sooreNumber} ayatCount={totalAyats}/>
                </ErrorBoundary>
            </div>
            
        )
    }
}