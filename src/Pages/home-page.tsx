import React from 'react';
import '../scss/home-page.scss';
import logo from '../assets/images/bismillah.png';
import Buttons from '../Components/buttons-inflex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faFile, faList } from '@fortawesome/free-solid-svg-icons';
import SearchField from '../Components/searchField'


class Homepage extends React.Component {
    render() {
        const buttonData = [
            {textData: "Soore List", icon:<FontAwesomeIcon icon={faList} />, id: 2, class: "felxItem"},
            {textData: "Setting", icon:<FontAwesomeIcon icon={faAddressBook} />, id: 3, class: "felxItem"},
            {textData: "About Us", icon:<FontAwesomeIcon icon={faFile} />, id: 4, class: "felxItem"}
        ]
        const ButtonDiv = buttonData.map(item => {
            return <Buttons
            class={item.class} 
            textData={item.textData} 
            icon={item.icon}
            key={item.id}
            />
        })
        return (
            <div className="Home-page">
                <div className="home-top">
                    <div className="home-page-image">
                        <div>
                            <img src={logo} alt=""/>
                        </div>
                        <FontAwesomeIcon icon={faList} />
                      
                    </div>
                    <div className="bannerContainer">
                        <div className="homeCover">
                            <h1>The Noble Quran</h1>
                            <p>
                            Lorem ipsum dolor sit amet, 
                            consectetuer adipiscing elit. Aenean commodo                           
                            </p>
                        </div>
                        <div  className="quran-font-image"></div>
                    </div>
                </div>
                <div className="home-middle">
                    <SearchField />
                    <div className="HM-left">
                    {ButtonDiv}
                    </div> 
                    <div className="scrollSuggestion">
                        <p>Scroll down for more!</p>                
                    </div>
                    
                </div>
                <div>learn react</div>
            </div>
        )
    }
}

export default Homepage;