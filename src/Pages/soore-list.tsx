import React from 'react';
import '../scss/soore-list.scss';
import SooreList from '../Components/sooreList';
import Sura from '../assets/ts/quran-metadata';
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

    lastNode = React.createRef<HTMLDivElement>();

    itemMaker = (i: number, item: (string | number)[][], Linkstyle: object, count: number) => {
        if(item[i][4] !== undefined ){
            return <Link style={Linkstyle} key={item[i][0]}
            to={{
                pathname: `/Aye`,
                state: {
                    start: item[i][0],
                    end: item[i+1][0],
                    sooreNumber: (count + i),
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
        let arr = [];
        let j = 10; // number of elements to render on each call
        if ( index === 110) {
            j = 5;
        }
        let item = Sura.Sura.slice((index), index + 11);
        for (let i = 0; i < j; i++) {
            if( index + i > (Sura.Sura.length-1 )) { return }
            arr.push(this.itemMaker(i, item, {textDecoration: 'none'}, index))
            if (i === j-1) {this.stateUpdater(arr, index)}
        }
    }

    stateUpdater = (arr: any[], counter: number) => {
       let newelementCount = counter + 10;
       this.setState({Sura: [...this.state.Sura,...arr], elementCounter: newelementCount});
    }

    componentDidMount() {
        this.observerCallback();
    }

    observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting ) {
            this.observerCallback();
        }
    }, {threshold: 1})
    
    componentDidUpdate() {
        this.observer.observe(this.lastNode.current!);
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    render() {

        return (
            <div className="soore-list-main">
                <div className="soore-list-top">
                    ???????? ???????????? ???????? ???? ???????? ???????? ????????
                </div>
                <div className="soore-list-container">
                    {this.state.Sura}
                    <div ref={this.lastNode} id="lastnode"></div>
                </div>
            </div>
        )
    }
}