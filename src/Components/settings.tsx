import { faArrowAltCircleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../scss/setting.scss';
import Rangeinput from '../Components/range-input';



export default class Setting extends React.Component{

    componentDidMount() {
        const qariOptions = document.querySelectorAll<HTMLDivElement>('.qari-option')!
        qariOptions.forEach( element => {
            element.addEventListener('click', (e) => {
                let target = e.target as HTMLDivElement;
                let value = target.getAttribute('customvalue')!;
                localStorage.setItem('qariName', value);
            })
        })
    }


    render() {
        const closeSetting = (e: React.MouseEvent) => {
            const settingContainer = document.querySelector('.setting-container')! as HTMLDivElement;
            settingContainer.classList.remove('settingOpen')           
        }

        const openSettingBody = (item: string, iconindex: number) => {
            const settingBody = document.querySelector(`.${item}`) as HTMLDivElement;
            const bodyHeight = settingBody.scrollHeight;
            const icon = document.querySelector(`.body-headers-icon${iconindex}`)! as SVGElement;
            settingBody.classList.toggle('setting-open');           
            if( settingBody.classList.contains('setting-open') ) {
                settingBody.style.height = `${bodyHeight}px`;
                icon.style.transform = 'translateY(-50%) rotate(180deg)'; 
            }else {
                settingBody.style.height = `0px`; 
                icon.style.transform = 'translateY(-50%) rotate(0)';
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
                    <div onClick={() => {openSettingBody('setting-body', 1)}} className="body-headers">تنظیمات سایز فونت
                        <div><FontAwesomeIcon  className="body-headers-icon1" icon={faArrowAltCircleDown}/></div>
                    </div>
                    <div className="setting-body">
                        <Rangeinput defaultValue="35" inputName="ayeFontSize" maincontainerClass="setting-body1"
                        localstogrageKey="ayeFont" text="عربی" changesOutputid= "ayeCurrentAmount"/>

                        <Rangeinput defaultValue="26" inputName="tarjomeFontSize" maincontainerClass="setting-body1"
                        text="ترجمه" localstogrageKey="tarjomeFont" changesOutputid="tarjoemCurrentAmount"/>
                    </div>
                    <div onClick={() => {openSettingBody('qari-select-container', 2)}} className="body-headers">تنظیمات قاری
                        <div><FontAwesomeIcon className="body-headers-icon2" icon={faArrowAltCircleDown}/></div>
                    </div>
                    <div className="qari-select-container">
                      
                            <div className="Qari-select">
                                <div className="qari-options-container">
                                    <div className="qari-option" customvalue="AbdulBaset/Mujawwadmp3"><p>عبدلباسط</p> <span>مرتّل</span></div>
                                    <div className="qari-option" customvalue="AbdulBaset/Murattalmp3"><p>عبدلباسط</p> <span>مجوّد</span></div>
                                    <div className="qari-option" customvalue="Alafasymp3"><p>العفاسی</p></div>
                                    <div className="qari-option" customvalue="Husary/Mujawwadogg"><p>خلیل‌الحصری</p> <span>مجوّد</span></div>
                                    <div className="qari-option" customvalue="Husary/Murattalogg"><p>خلیل‌الحصری</p> <span>مرتّل</span></div>
                                    <div className="qari-option" customvalue="Minshawi/Mujawwadmp3"><p>منشاوی</p> <span>مجوّد</span></div>
                                    <div className="qari-option" customvalue="Minshawi/Murattalmp3"><p>منشاوی</p> <span>مرتّل</span></div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}