import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../scss/setting.scss';
import FontButtons from './font-buttons';
import QariList from './qari-list';

type props = {
    tarjomeSelection(index: number): void;
}

export default class Setting extends React.Component<props>{

    componentDidMount() {
        const qariOptions = document.querySelectorAll<HTMLDivElement>('.qari-option')!
        qariOptions.forEach( element => {
            element.addEventListener('click', (e) => {
                let target = e.target as HTMLDivElement;
                let icon = target.children[0] as HTMLDivElement;
                icon.style.opacity = '1';
                let value = target.getAttribute('customvalue')!;
                localStorage.setItem('qariName', value);
                qariOptions.forEach((item: HTMLDivElement) => {
                    if ( item.children[0] !== icon ) {
                        let remove = item.children[0] as HTMLDivElement;
                        remove.style.opacity = '0';
                    }
                })
            })
        })
    }

    closeSetting = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            const settingContainer = e.target as HTMLDivElement;
            settingContainer.classList.remove('settingOpen')        
        }   
    }

    openSettingBody = (e: React.MouseEvent, item: string, iconindex: number) => {
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

    
    render() {
        return (
            <div className="setting-container" onClick={this.closeSetting}>
                <div className="setting-headers">
                    <p>تنظیمات</p>                   
                </div>
                <div className="setting-body-container">
                    <div onClick={(e) => {this.openSettingBody(e, 'setting-body', 1)}} className="body-headers">تنظیمات سایز فونت
                        <div><FontAwesomeIcon  className="body-headers-icon1" icon={faArrowAltCircleDown}/></div>
                    </div>
                    <div className="setting-body">
                        <FontButtons maincontainerClass="setting-body1"
                        localstogrageKey="ayeFont" text="عربی" />

                        <FontButtons maincontainerClass="setting-body1"
                        text="ترجمه" localstogrageKey="tarjomeFont"/>
                    </div>
                    <div onClick={(e) => {this.openSettingBody(e, 'qari-select-container', 2)}} className="body-headers">انتخاب قاری
                        <div><FontAwesomeIcon className="body-headers-icon2" icon={faArrowAltCircleDown}/></div>
                    </div>
                    <div className="qari-select-container">                     
                        <div className="Qari-select">
                            <QariList />
                        </div>                       
                    </div>
                    <div onClick={(e) => {this.openSettingBody(e, 'tarjome-select-container', 3)}} className="body-headers">انتخاب ترجمه
                        <div><FontAwesomeIcon className="body-headers-icon3" icon={faArrowAltCircleDown}/></div>
                    </div>
                    <div className="tarjome-select-container">
                        <div onClick={() => {this.props.tarjomeSelection(0)}}><p>استاد انصاریان</p></div>
                        <div onClick={() => {this.props.tarjomeSelection(1)}}><p>آیت الله مکارم شیرازی</p></div>
                        <div onClick={() => {this.props.tarjomeSelection(2)}}><p>استاد ملکی</p></div>
                    </div>
                </div>
                
            </div>
        )
    }
}


