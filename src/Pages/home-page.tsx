import React from 'react';
import '../scss/home-page.scss';
import logo from '../assets/images/images.jpg';
import SearchField from '../Components/searchField';


class Homepage extends React.Component {
    render() {
        
        return (
            <div className="Home-page" testid="home-page-container">
                
                <div className="home-top">
                    <div className="home-page-image">
                        <div>
                            <img src={logo} alt=""/>
                        </div>               
                      
                    </div> 
                    <div className="bannerContainer">
                        <div className="homeCover">
                            <div className="homeCover-text">
                               <p>The Noble Quran</p>
                              
                            </div>
                            <SearchField />
                        </div>
                        <div  className="quran-font-image"></div>
                    </div>
                </div>
                <div className="home-middle">
                                       
                    <div className="scrollSuggestion">
                        <p>Scroll down for more!</p>                
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;