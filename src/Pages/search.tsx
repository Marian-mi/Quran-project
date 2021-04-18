import React, { ChangeEvent } from 'react';
import {Qurantext} from '../assets/ts/quran-simple-plain';
import Sura from '../assets/ts/quran-metadata';
import { Link } from 'react-router-dom';
import '../scss/ayePage.scss';


type props = {
    
}
type state = {
    query: string;
}


export default class Search extends React.Component<props, state> {
   
    constructor(props: props) {
        super(props)
        this.state = {
            query: ''
        }
    }  

    componentDidUpdate () {
        const noResult = document.querySelector('#noResult')! as HTMLDivElement;
        const searchContainer = document.querySelector('#search-container')! as HTMLDivElement;
        const results = searchContainer.children.length; 
        if( results < 3 ) {
            noResult.style.display = 'block'
        }else {
            noResult.style.display = 'none'
        }
    }

    render() {
        const linkStyle = {
            textDecoration: 'none'
        }

        const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            if ( input.length > 3) {
                setTimeout(() => {             
                    this.setState({ query: input});
                }, 1000);
            }
        }
    
    
        const results = [{item: 'none', index: 3, cnt: 0, start: 0, end: 0, ayeName: 'g'}];
        if ( this.state.query.length > 3) {
            for ( let i = 0; i < Qurantext.length; i++) {
                let query = RegExp(this.state.query , 'gi');
                if ( query.test(Qurantext[i]) ) {
                    let theSura= 0;
                    let start = 0;
                    let end = 0;
                    let name = '';
                    Sura.Sura.forEach((item, index, arr) => {
                        if ( i >= item[0] && i < arr[index + 1][0]) {
                            theSura = index;
                            start = item[0] as number;
                            end = arr[index + 1][0] as number;
                            name = item[4] as string;
                        }
                    })
                    // if ( i < 7) {--i};
                    let info = {
                        item: Qurantext[i],
                        index: i,
                        cnt: theSura,
                        start: start,
                        end: end,
                        ayeName: name
                    }
                    results.push(info)
                }
            }
        }


    
    
        const displayedResults = results.map((item, index) => {
            if( index !== 0 ) {
                return <Link key={item.item[0][5]} style={linkStyle}
                to={{
                    pathname:'/Aye',
                    state: {
                        start: item.index,
                        end: item.end ,
                        ayeName: item.ayeName,
                        sooreNumber: item.cnt,
                        isComingFromSearch: true,
                        scrolltoAye: (item.index - item.start+1),
                        ayatCount: (item.end - item.start)
                    }
                }}
                >
                <div className="search-result" key={item.index}><p>{item.item}</p> 
                <p>( سوره {item.ayeName} -- آیه شماره {item.index - item.start+1} )</p></div>
                </Link>
            }else return null;
        })
        return (
            <div id="search-container">
                <input
                type="text"
                name="search"
                id="searchQuery"
                onChange={(e) => {searchHandler(e)}}
                placeholder="با وارد کردن حداقل سه حرف جست و جو را شروع کنید"
                defaultValue=""
                autoComplete="off"
                ></input>
                {displayedResults}
                <div id="noResult">
                    <p>نتیجه ای یافت نشد</p>
                </div>
            </div>
        )
    }
}