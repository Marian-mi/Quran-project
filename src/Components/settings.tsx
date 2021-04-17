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

        

        const openSettingBody = () => {
            const settingBody = document.querySelector('.setting-body') as HTMLDivElement;
            const bodyHeight = settingBody.scrollHeight;
            const icon = document.querySelector('.body-headers-icon')!;
            settingBody.classList.toggle('setting-open');           
            if( settingBody.classList.contains('setting-open') ) {
                settingBody.style.height = `${bodyHeight}px`; 
                icon.innerHTML= "-";
            }else {
                settingBody.style.height = `0px`;
                icon.innerHTML= "+";
            }         
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
                <div className="setting-body-container">
                    <div onClick={openSettingBody} className="body-headers">تنظیمات سایز فونت
                    <div className="body-headers-icon">+</div>
                    </div>
                    <div className="setting-body">
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
                </div>
            </div>
        )
    }
}