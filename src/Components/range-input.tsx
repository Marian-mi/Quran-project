import React, { FormEvent } from 'react';

type props = {
    maincontainerClass: string;
    inputName: string;
    defaultValue: string;
    text: string;
    localstogrageKey: string;
    changesOutputid: string;
}
type state  = {
    fontSize: string;
    ayeText: NodeListOf<HTMLParagraphElement>;
    ayeTarjome: NodeListOf<HTMLParagraphElement>
}


export default class Rangeinput extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = {
            fontSize: "35",
            ayeText: document.querySelectorAll<HTMLParagraphElement>('.ayeitself')!,
            ayeTarjome: document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome')!,
        }
    }

    ayeContainer = document.querySelector('#root')!
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
        this.observer.observe(this.ayeContainer, {
            childList: true
        })
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    submitHandler = (e:FormEvent , id:string, localStoragekey: string) => {
        e.preventDefault();
        const FontInput = document.querySelector(`#${id}`)! as HTMLInputElement;
        let fontSize = FontInput.value.toString();
        localStorage.setItem(localStoragekey, `${fontSize}px`);
        // window.location.reload();
        if( localStoragekey === 'ayeFont') {
            this.state.ayeText.forEach( item => {
                item.style.fontSize = `${fontSize}px`
            })
        }else {
           this.state.ayeTarjome.forEach( item => {
               item.style.fontSize = `${fontSize}px`
           })
        }         
    }

    render() {
        const changeHandler = (id: string, displayid: string) => {
            const FontInput = document.querySelector(`#${id}`)! as HTMLInputElement;
            const currentAmount = document.querySelector(`#${displayid}`)! as HTMLParagraphElement;
            currentAmount.innerHTML = FontInput.value;
        }

        return (
            <h1>
                <div className={this.props.maincontainerClass}>
                    <form onSubmit={(event) => {this.submitHandler(event, this.props.inputName,this.props.localstogrageKey)}}>
                        <label htmlFor={this.props.inputName}>
                            <p>
                            سایز فونت متن {this.props.text} ایات را انتخاب کنید
                            (بین ۵۰-۲۰ برحسب پیکسل)
                            </p>
                        </label>
                        <input type="range" id={this.props.inputName}
                        name={this.props.inputName} min="20" max="50"
                        defaultValue={this.props.defaultValue}
                        onChange={() => {changeHandler(this.props.inputName, this.props.changesOutputid)}}></input>
                        <p id={this.props.changesOutputid}>{this.props.defaultValue}</p>
                        <input type="submit" value="ذخیره"   />
                    </form>
                </div>
            </h1>
        )
    }
}