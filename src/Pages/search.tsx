import React, { ChangeEvent, useEffect, useState } from 'react';
import {Qurantext} from '../assets/ts/quran-simple-plain';
import Sura from '../assets/ts/quran-metadata';
import { Link } from 'react-router-dom';
import '../scss/ayePage.scss'




type resObj = { item: string, index: number, cnt: number, start: number, end: number, ayeName: string }[]


export default function Search () {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<resObj | undefined>();
    const [elementsResults, setelementsResults] = useState<(JSX.Element | null)[]>();
    const [displayedResults, setDisplayedresults ] = useState<(JSX.Element | null)[]>();
    const [itemCount, setitemCount] = useState(0);


    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            const input = e.target.value;      
            if ( input.length > 3) {
                setQuery(input);
                setitemCount(0);
            }
           
        }, 500);
    }
    useEffect(()=> {
        const noresult = document.querySelector('#noResult')! as HTMLDivElement;
        noresult.style.display = 'none';
    },[])
    useEffect(() => {
        const noresult = document.querySelector('#noResult')! as HTMLDivElement;
        const result = [{item: 'none', index: 3, cnt: 0, start: 0, end: 0, ayeName: 'g'}];
        if ( query.length > 3 ) {
            for ( let i = 0; i < Qurantext.length; i++) {

                let pattern = RegExp(query , 'gi');

                if ( pattern.test(Qurantext[i]) ) {

                    let theSura= 0; let start = 0; let end = 0; let name = '';

                    Sura.Sura.forEach((item, index, arr) => {
                        if ( i >= item[0] && i < arr[index + 1][0]) {
                            theSura = index;
                            start = item[0] as number;
                            end = arr[index + 1][0] as number;
                            name = item[4] as string;
                        }
                    })

                    // if ( i < 7) {--i};
                    let info = { item: Qurantext[i], index: i, cnt: theSura, start: start, end: end, ayeName: name }
                    result.push(info)
                }
            }       
        }
        
        setResults(result);
        
        if (result.length < 2 ) {
            noresult.style.display = 'block';
        }else {
            noresult.style.display = 'none';
        }
    }, [query]);

    useEffect(() => {
        if (results !== undefined ) {
            const linkStyle = { textDecoration: 'none'}
            if ( results !== undefined ) {
                const res = results.map((item, index) => {
                    if( index !== 0 ) {
        
                        return <Link key={item.item[0][5]} style={linkStyle} className="searchPageLinks"
                        to={{
                            pathname:'/Aye',
                            state: {
                                start: item.index,
                                end: item.end,
                                ayeName: item.ayeName,
                                sooreNumber: item.cnt,
                                isComingFromSearch: true,
                                scrolltoAye: (item.index - item.start+1),
                                ayatCount: (item.end - item.start)
                            }
                        }}>
                        
                        <div className="search-result" key={item.index-item.start}><p>{item.item}</p> 
                        <p>( سوره {item.ayeName} -- آیه شماره {item.index - item.start+1} )</p></div>
                        </Link>
        
                    }else return null;
                    
                })
                setelementsResults(res);
            }  
        }
    }, [results])


    useEffect(() => {
        if (elementsResults !== undefined) {
            const elementsTorender = elementsResults!.splice(itemCount, itemCount + 10);
            setDisplayedresults(elementsTorender);
        }
        //eslint-disable-next-line
    },[elementsResults])

    useEffect(() => {
        const lastnode = document.querySelector('#lastNode')!;
            const observer = new IntersectionObserver(entries => {
                if ( entries[0].isIntersecting ) {
                    itemMaker();
                }
            }, {threshold: 1});
            observer.observe(lastnode)
            return () => {
                observer.disconnect();
            }
        //eslint-disable-next-line
    },[displayedResults] )

    const itemMaker = () => {
        if ( elementsResults !== undefined && displayedResults !== undefined) {
            const index = itemCount + 10;
            const elementsTorender = elementsResults.splice(index, index+10);
            setDisplayedresults([...displayedResults,...elementsTorender])
            setitemCount(itemCount+10);
        }
    }


    return(
        <div id="search-container">

                <input type="text" name="search" id="searchQuery" onChange={(e) => {searchHandler(e)}}
                placeholder="با وارد کردن حداقل سه حرف جست و جو را شروع کنید" 
                defaultValue="" autoComplete="off" ></input>

                {displayedResults}
                <div id="lastNode"></div>
                <div id="noResult">
                    <p>نتیجه ای یافت نشد</p>
                </div>

        </div>
    )
}