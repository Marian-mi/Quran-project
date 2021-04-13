import React from 'react';

type fprop = {
    id?: number | string;
    textData: string;
    icon: any;
    class: string;
    ayeNumber?: number;
    sooreNo?: number;
}

class buttonInflex extends React.Component<fprop> {
    render () {
        return ( 
            <div className={this.props.class} ayeno={this.props.ayeNumber} sooreno={this.props.sooreNo} id={this.props.id as string}>
                {this.props.icon}
                <p>
                    {this.props.textData}
                </p>
            </div>
        )
    }
}

export default buttonInflex;