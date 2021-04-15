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
}


export default class Rangeinput extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = {
            fontSize: "35"
        }
    }

    render() {
        const submitHandler = (e:FormEvent , id:string, localStoragekey: string) => {
            e.preventDefault();
            const FontInput = document.querySelector(`#${id}`)! as HTMLInputElement;
            let fontSize = FontInput.value.toString();
            localStorage.setItem(localStoragekey, `${fontSize}px`);
            // window.location.reload();
        }

        const changeHandler = (id: string, displayid: string) => {
            const FontInput = document.querySelector(`#${id}`)! as HTMLInputElement;
            const currentAmount = document.querySelector(`#${displayid}`)! as HTMLParagraphElement;
            currentAmount.innerHTML = FontInput.value;
        }

        return (
            <h1>
                <div className={this.props.maincontainerClass}>
                    <form onSubmit={(event) => {submitHandler(event, this.props.inputName,this.props.localstogrageKey)}}>
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