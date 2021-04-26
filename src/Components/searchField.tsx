import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



export default class searchField extends React.Component {


    render () {
        const linkStyle = {
            textDecoration: 'none'
        }

        return ( 
            <div className="searchContainer">
                <Link to="/Search" style={linkStyle}>
                <div className="searchField" >
                    <div className="directingTosearch"><span>ورود به صفحه جستجو</span></div>                                 
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