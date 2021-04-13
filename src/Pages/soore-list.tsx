import React from 'react';
import '../scss/soore-list.scss';
import SooreList from '../Components/sooreList';
import Sura from '../assets/ts/quran-metadata'
import { Link } from 'react-router-dom';

export default class SooreListPage extends React.Component {


    render() {
        
        const Linkstyle = {
            textDecoration: 'none'
        }

        const SuraArray = Sura.Sura.map((item, index, array) => {
            if(item[4] !== undefined){
                return <Link style={Linkstyle} key={item[0]}
                to={{
                    pathname: `Aye/${item[5]}`,
                    state: {
                        start: item[0],
                        end: array[index+1][0],
                        sooreNumber: index,
                        ayeName: item[4],               
                    }
                }}>
                <SooreList
                    arabicName={item[4] as string}
                    conuter={index}
                    finglishName={item[5] as string}
                    englishName={item[6] as string}
                    key={item[5]}
                />
                </Link>
            }else{return null};
        })
        return (
            <div className="soore-list-main">
                <div className="soore-list-top">
                    برای مشاهده آیات هر سوره کلیک کنید
                </div>
                <div className="soore-list-container">
                    {SuraArray}
                </div>
            </div>
        )
    }
}