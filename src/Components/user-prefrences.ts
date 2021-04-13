
let ayeFont, tarjomeFont
window.addEventListener('load', e => {
    
    if(localStorage.getItem('ayeFont')) {
        
        ayeFont = localStorage.getItem('ayeFont')
    }else{ayeFont = '34px'}
    if(localStorage.getItem('tarjomeFont')) {
        ayeFont = localStorage.getItem('tarjomeFont')
    }else{tarjomeFont = '26px'}
})

let fontStyle = {
    ayeFontSize: ayeFont,
    tarjomeFontSize: tarjomeFont
}

export{fontStyle}