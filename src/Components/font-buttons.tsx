import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type props = {
    maincontainerClass: string;
    text: string;
    localstogrageKey: string;
}
type state  = {
    fontSize: string;
    ayeText: NodeListOf<HTMLParagraphElement>;
    ayeTarjome: NodeListOf<HTMLParagraphElement>
}


export default class FontButtons extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = {
            fontSize: "35",
            ayeText: document.querySelectorAll<HTMLParagraphElement>('.ayeitself')!,
            ayeTarjome: document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome')!,
        }
    }

        mutrationCallback: MutationCallback = entry => {
            if( entry[0].type === 'childList') {
                let ayeTexts = document.querySelectorAll<HTMLParagraphElement>('.ayeitself')!;
                let tarjomeTexts = document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome')!;
                this.setState({
                ayeText: ayeTexts,
                ayeTarjome: tarjomeTexts
                })
            }
        }
        observer = new MutationObserver(this.mutrationCallback);

    componentDidMount () {
        const ayeContainer = document.querySelector('.aye-container')!
        this.observer.observe(ayeContainer, {
            childList: true
        })
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    clickHandler = (e: React.MouseEvent , localStoragekey: string, increase: boolean) => {
        e.preventDefault();
        let fontSize:number;
        let currentFontSize = localStorage.getItem(localStoragekey) ? localStorage.getItem(localStoragekey) : '35px';
        if (increase) {
            fontSize = parseInt(currentFontSize!) + 2;
        }else {
            fontSize = parseInt(currentFontSize!) - 2;
        }
        if ( fontSize > 60 || fontSize < 10 ) return
        if( localStoragekey === 'ayeFont') {
            localStorage.setItem(localStoragekey, `${fontSize}px`)
            this.state.ayeText.forEach( item => {
                item.style.fontSize = `${fontSize}px`
            })
        }else {
            localStorage.setItem(localStoragekey, `${fontSize}px`)
            this.state.ayeTarjome.forEach( item => {  
                item.style.fontSize = `${fontSize}px`
            })
        }         
    }

    render() {

        return (
            <div className={this.props.maincontainerClass}>
                <div onClick={(e) => this.clickHandler(e, this.props.localstogrageKey, false)} className="font-increase-button">
                    <FontAwesomeIcon icon={faMinusCircle} />
                </div> 
                <div className="fontSize-currentAmount"><p>سایز فونت متن { this.props.text} آیات</p></div>
                <div onClick={(e) => this.clickHandler(e, this.props.localstogrageKey, true)} className="font-decrease-button">
                    <FontAwesomeIcon icon={faPlusCircle} />
                </div>
            </div>
            
        )
    }
}