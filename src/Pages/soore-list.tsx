import React from 'react';
import '../scss/soore-list.scss';
import SooreList from '../Components/sooreList';
import Sura from '../assets/ts/quran-metadata'
import { Link } from 'react-router-dom';

type props = {

}
type state = {
    elementCounter: number;
    Sura: Array<any>;
}

export default class SooreListPage extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = {
            elementCounter: 0,
            Sura: [],
        }
    }



    
    itemMaker = (i: number, item: (string | number)[][], Linkstyle: object, count: number) => {
        if(item[i][4] !== undefined && item[i] !== undefined){
            return <Link style={Linkstyle} key={item[i][0]}
            to={{
                pathname: `Aye/${item[i][5]}`,
                state: {
                    start: item[i][0],
                    end: item[i+1][0],
                    sooreNumber: (i),
                    ayeName: item[i][4],               
                }
            }}>
            <SooreList
                arabicName={item[i][4] as string}
                conuter={(count + i)}
                finglishName={item[i][5] as string}
                englishName={item[i][6] as string}
                key={item[i][2]}
            />
            </Link>
        }else{return null};      
    }


    observerCallback = () => {
        let index = this.state.elementCounter;  
        let arr = []
        let item = Sura.Sura.slice((index), index + 12);
        for (let i = 0; i <  10; i++) {
            arr.push(this.itemMaker(i, item, {textDecoration: 'none'}, index))
            if (i === 9) {this.stateUpdater(arr, index)}
        }
    }

    stateUpdater = (arr: any[], counter: number) => {
       let newelementCount = counter + 10;
       this.setState({Sura: [...this.state.Sura,...arr], elementCounter: newelementCount});
    }

    componentDidMount() {
        this.observerCallback();
    }

    componentDidUpdate() {
        let lastNode = document.querySelector('#lastnode')!;
        let observer = new IntersectionObserver((entry) => {
            if (entry[0].isIntersecting ) {
                this.observerCallback();
            }
        }, {threshold: 1})
        observer.observe(lastNode);
    }

    render() {

        return (
            <div className="soore-list-main">
                <div className="soore-list-top">
                    برای مشاهده آیات هر سوره کلیک کنید
                </div>
                <div className="soore-list-container">
                    {this.state.Sura}
                    <div id="lastnode">Loading...</div>
                </div>
            </div>
        )
    }
}