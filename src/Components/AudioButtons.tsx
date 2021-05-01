import { faBackward, faForward, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type props = {
    isPlaying: boolean;
    onPlayPauseClick(state: boolean): void;
    onPrevClick(): void;
    onNextClick(): void;
}

class AudioControls extends React.Component<props> {

    prevButtonRef = React.createRef<HTMLButtonElement>();
    nextButtonRef = React.createRef<HTMLButtonElement>();

    componentDidMount() {
        this.prevButtonRef.current?.addEventListener('click', () => {this.props.onPrevClick()});
        this.nextButtonRef.current?.addEventListener('click', () => {this.props.onNextClick()});
    }
        
    


    render() {
        return (
            <div className="audio-controls">
                
                <button
                type="button"
                className="prev"
                aria-label="Previous"
                ref={this.prevButtonRef}
                >
                <FontAwesomeIcon icon={faBackward} /> 
                </button>
                {this.props.isPlaying ? (
                <button
                    type="button"
                    className="pause"
                    onClick={() => {this.props.onPlayPauseClick(false)}}
                    aria-label="Pause"
                >
                    <FontAwesomeIcon icon={faPauseCircle} />
                </button>
                ) : (
                <button
                    type="button"
                    className="play"
                    onClick={() => {this.props.onPlayPauseClick(true)}}
                    aria-label="Play"
                >
                    <FontAwesomeIcon icon={faPlayCircle} />
                </button>
                )}
                <button
                type="button"
                className="next"
                aria-label="Next"
                ref={this.nextButtonRef}
                >
                <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
            )
    }
}

export default AudioControls;