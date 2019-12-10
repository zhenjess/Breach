import bubbleChart from "./chart";

let bubbleChart;
document.addEventListener("DOMContentLoaded", () => {
    const rootDiv = document.getElementById("root");
    // initialize data visualzation
    rootDiv.innerHTML = "works"
    bubbleChart = new BubbleChart("svg.chart");

    // button group event listener
    let btnGroup = document.querySelector(".btn-group");
    btnGroup.addEventListener("mousedown", e => {
        e.preventDefault();
        let currentBtn = e.target;
        let currentBtnType = currentBtn.classList[1];
        let currentBtnClass;
        if (currentBtnType === "header-chart__btn") {
            currentBtnClass = currentBtn.classList[0].split("-")[1];
        }

        if (currentBtnType === "header-chart__btn") {
            bubbleChart.updateData(currentBtnClass);
            let allBtns = btnGroup.querySelectorAll("a");
            allBtns.forEach(btn => {
                btn.classList.remove("active");
            });
            currentBtn.classList.add("active");
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
