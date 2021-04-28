import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QariList () {
    return (
        <div className="qari-options-container">
            <div className="qari-option" customvalue="AbdulBaset/Murattalmp3">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /><p>عبدلباسط</p> <span>مرتّل</span>
            </div>
            <div className="qari-option" customvalue="AbdulBaset/Mujawwadmp3">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /><p>عبدلباسط</p> <span>مجوّد</span>
            </div>
            <div className="qari-option" customvalue="Alafasymp3">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /><p>العفاسی</p>
            </div>
            <div className="qari-option" customvalue="Husary/Mujawwadogg">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /><p>خلیل‌الحصری</p> <span>مجوّد</span>
            </div>
            <div className="qari-option" customvalue="Husary/Murattalogg">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /><p>خلیل‌الحصری</p> <span>مرتّل</span>
            </div>
            <div className="qari-option" customvalue="Minshawi/Mujawwadmp3">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /><p>منشاوی</p> <span>مجوّد</span>
            </div>
            <div className="qari-option" customvalue="Minshawi/Murattalmp3">
                <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} /> <p>منشاوی</p> <span>مرتّل</span>
            </div>
        </div>
    )
}