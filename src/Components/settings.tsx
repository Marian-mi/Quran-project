import { faArrowAltCircleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent } from 'react';
import '../scss/setting.scss';
import Rangeinput from '../Components/range-input';



export default class Setting extends React.Component{


    render() {
        const closeSetting = (e: React.MouseEvent) => {
            const settingContainer = document.querySelector('.setting-container')! as HTMLDivElement;
            settingContainer.classList.remove('settingOpen')           
        }

        const qariHandler = (e: FormEvent) => {
            e.preventDefault();
            const select = document.querySelector('#qariname')! as HTMLSelectElement;
            const input = select.value;
            localStorage.setItem('qariName', input);
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
                    <div onClick={() => {openSettingBody('qari-options', 2)}} className="body-headers">تنظیمات قاری
                        <div><FontAwesomeIcon className="body-headers-icon2" icon={faArrowAltCircleDown}/></div>
                    </div>
                    <div className="qari-options">
                        <div>
                            <form >
                                <select name="qari-name" id="qariname">
                                    <option value="AbdulBaset/Mujawwadmp3">عبدلباسط (مجوّد)</option>
                                    <option value="AbdulBaset/Murattalmp3">عبدلباسط (مرتّل)</option>
                                    <option value="Alafasymp3">العفاسی</option>
                                    <option value="Husary/Mujawwadogg">خلیل‌الحصری (مجوّد)</option>
                                    <option value="Husary/Murattalogg">(مرتّل) خلیل‌الحصری</option>
                                    <option value="Minshawi/Mujawwadmp3">(مجوّد) منشاوی</option>
                                    <option value="Minshawi/Murattalmp3">(مرتّل) منشاوی</option>
                                </select>
                                <button id="qarisubmit" onClick={qariHandler}>ذخیره</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}