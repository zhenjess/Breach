// document.addEventListener("DOMContentLoaded", () => {
//     const rootDiv = document.getElementById("root");
//     // ReactDOM.render(<h1>React is working</h1>, rootDiv);
//     rootDiv.innerHTML = "works"

//     //group event listener

//     // let btnGroup = documnet.querySelector(".btn-group");
//     // btnGroup.addEventListener('mousedown', e => {
//     //     e.preventDefault();
//     //     let currentBtn = e.target;
//     //     let currentBtnType = currentBtn.classList[1];
//     //     let currentBtnClass;
//     //     if (currentBtnType === 'header-chart__btn') {
//     //         currentBtnClass = currentBtn.classList[0].split('-')[1];
//     //     }
//     //     if (currentBtnType === 'header-chart__btn') {
//     //         chart.updateData(currentBtnClass);
//     //         let allBtns = btnGroup.querySelectorAll('a');
//     //         allBtns.forEach(btn => {
//     //             btn.classList.remove('active');
//     //         });
//     //         currentBtn.classList.add('active');
//     //     }
//     // })
// });
import bubbleChart from "./chart";
//modal
let bubbleChart;
document.addEventListener("DOMContentLoaded", () => {

    bubbleChart = new bubbleChart('svg.chart');

    let btnGroup = documnet.querySelector('.btn-group');
    btnGroup.addEventListener('mousedown', e => {
        e.preventDefault();
        let currentBtn = e.target;
        let currentBtnType = currentBtn.classList[1];
        let currentBtnClass;
        if (currentBtnType === 'header-chart__btn') {
            currentBtnClass = currentBtn.classList[0].split('-')[1];
        }

        if (currentBtnType === 'header-chart__btn') {
            bubbleChart.updateData(currentBtnClass);
            let allBtns = btnGroup.querySelectorAll('a');
            allBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            currentBtn.classList.add('active');
        }
    });
    const modalBg = document.querySelector('.modal-bg');
    modalBg.addEventListener('click', handleModalBgClick);
});


//close modal
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