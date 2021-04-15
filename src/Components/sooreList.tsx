import React from 'react';


type props = {
    englishName: string;
    arabicName: string;
    finglishName: string;
    conuter: number;
    id?: string;
}

export default class SooreList extends React.Component<props> {

    render () {
        return (
            <div className="soore" id={this.props.id}>
                <p className="soore-name-arabic">{this.props.arabicName}</p>
                <div className="soore-name-english">
                    <p>{this.props.finglishName}</p>
                    <p className="soore-name-fin">{this.props.englishName}</p>
                </div>
                <div className="soore-number-counter">
                    <p>{this.props.conuter}</p>
                </div>
            </div>
        )
    }
}