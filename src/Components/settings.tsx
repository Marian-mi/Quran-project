import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent} from 'react';
import '../scss/setting.scss'

export default class Setting extends React.Component {

    componentDidMount() {
        const ayeFontInput = document.querySelector('#ayeFontSize')! as HTMLInputElement;
        const ayeOutput = document.querySelector('#ayeFontAmount')!
        ayeFontInput.addEventListener('change', e => {
            ayeOutput.innerHTML = ayeFontInput.value;
        })
        const tarjomeFontInput = document.querySelector('#tarjomeFontSize')! as HTMLInputElement;
        const tarjomeOutput = document.querySelector('#tarjomeFontAmount')!
        tarjomeFontInput.addEventListener('change', e => {
            tarjomeOutput.innerHTML = tarjomeFontInput.value;
        })
    }

    render() {

        const ayeFontSubmit = (e: FormEvent) => {
            e.preventDefault();
            const ayeFontInput = document.querySelector('#ayeFontSize')! as HTMLInputElement;
            let fontSize = ayeFontInput.value.toString();
            localStorage.setItem('ayeFont', `${fontSize}px`);
            window.location.reload();
        }
        const tarjomeFontSubmit = (e: FormEvent) => {
            e.preventDefault();
            const tarjomeFontInput = document.querySelector('#tarjomeFontSize')! as HTMLInputElement;
            let fontSize = tarjomeFontInput.value.toString();
            localStorage.setItem('tarjomeFont', `${fontSize}px`);
            window.location.reload();
        }

        const closeSetting = (e: React.MouseEvent) => {
            console.log('hi')
            const settingContainer = document.querySelector('.setting-container')! as HTMLDivElement;
            settingContainer.classList.remove('settingOpen')           
        }

        return (
            <div className="setting-container">
                <div className="setting-headers">
                    <div  onClick={closeSetting} className="closeicon" >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                    <p>
                        تنظیمات
                    </p>
                    
                </div>
                
                <div className="setting-body1">
                    <form onSubmit={ayeFontSubmit}>
                        <label htmlFor="ayefontsize">
                            <p>
                            سایز فونت متن عربی ایات را انتخاب کنید
                            (بین ۵۰-۲۰ برحسب پیکسل)
                            </p>
                        </label>
                        <input type="range" id="ayeFontSize"
                        name="ayefontsize" min="20" max="50"
                        defaultValue="35"></input>
                        <p id="ayeFontAmount">35</p>
                        <input type="submit" value="ذخیره" />
                    </form>
                </div>
                <div className="setting-body1">
                    <form onSubmit={tarjomeFontSubmit}>
                        <label htmlFor="tarjomeFontSize">
                            <p>
                            سایز فونت متن ترجمه ایات را انتخاب کنید
                            (بین ۵۰-۲۰ برحسب پیکسل)
                            </p>
                        </label>
                        <input type="range" id="tarjomeFontSize"
                        name="tarjomeFontSize" min="20" max="50"
                        defaultValue="26"></input>
                        <p id="tarjomeFontAmount">26</p>
                        <input type="submit" value="ذخیره" />
                    </form>
                </div>
            </div>
        )
    }
}