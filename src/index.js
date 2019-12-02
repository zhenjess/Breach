// document.addEventListener("DOMContentLoaded", () => {
//     const rootDiv = document.getElementById("root");
//     // ReactDOM.render(<h1>React is working</h1>, rootDiv);
//     rootDiv.innerHTML = "works"
// });

import Map from './map';

let map;

document.addEventListener('DOMContentLoaded', () => {
    //iniitalize data visualization
    map = new Map('svg.graph');

    //button group event listener
    let btnGroup = document.querySelector('.btn-group');
    btnGroupGroup.addEventListener('mousedown', e => {
        e.preventDefault();
        let currentBtn = e.target;
        let currentBtnType = currentBtn.classList[1];
        let currentBtnClass;
        if (currentBtnType === 'header-graph__btn') {
            currentBtnClass = currentBtn.classList[0].split('-')[1];
        }

        if (currentBtnType === 'header-graph__btn') {
            map.updateData(currentBtnClass);
            let allBtns = btnGroup.querySelectorAll('a');
            allBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            currentBtn.classList.add('active');
        }
    });

    // modal actions
    const modalBg = document.querySelector('.modal-bg');
    modalBg.addEventListener('click', handleModalBgClick);
});

// modal close 
function handleModalBgClick(e) {
    e.stopPropagation();
    let modalBg = document.querySelector(".modal-bg");
    let modal = document.querySelector('.modal');

    if (
        e.target.classList[0] === "modal-bg" ||
        e.target.classList[0] === "modal-close__btn-single") {
        modal.setAttribute("style", "opacity: 0; visibility: hidden");
        modalBg.setAttribute("style", "opacity: 0; visibility: hidden");
    }  
}