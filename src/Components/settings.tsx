import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../scss/setting.scss';
import Rangeinput from '../Components/range-input';

export default class Setting extends React.Component {


    render() {
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
                <Rangeinput
                defaultValue="35"
                inputName="ayeFontSize"
                maincontainerClass="setting-body1"
                localstogrageKey="ayeFont"
                text="عربی"
                changesOutputid= "ayeCurrentAmount"
                   
                />
                <Rangeinput
                defaultValue="26"
                inputName="tarjomeFontSize"
                maincontainerClass="setting-body1"
                text="ترجمه"
                localstogrageKey="tarjomeFont"
                changesOutputid="tarjoemCurrentAmount"
                />
            </div>
        )
    }
}