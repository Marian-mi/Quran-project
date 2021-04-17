import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

type props = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
type state = {
    query: string
}

export default class searchField extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state= {
            query: ''
        }
    }



    render () {

        return ( 
            <div className="searchContainer">
                <Link to="/Search" >
                <div className="searchField" >                                 
                    <div className="searchlogo">
                        
                        <FontAwesomeIcon                       
                        icon={faSearch}
                        />                      
                    </div>
                </div>                  
                </Link>
            </div>
        )
    }
}