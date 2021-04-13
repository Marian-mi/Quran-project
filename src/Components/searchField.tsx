import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type props = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class searchField extends React.Component<props> {
    render () {
        return ( 
            <div className="searchContainer">
                <div className="searchField" >
                    <label htmlFor="search" ></label>
                    <input
                    
                    name="search" 
                    type="text"
                    placeholder="مثال: الفاتحه"
                    onChange={this.props.onChange}
                    autoComplete="off" 
                    />
                    <div className="searchlogo">
                        <FontAwesomeIcon 
                        icon={faSearch}
                        />
                    </div>
                </div>                  
            </div>
        )
    }
}