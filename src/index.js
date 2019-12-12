// import bubbleChart from "./chart";

// let bubbleChart;
// document.addEventListener("DOMContentLoaded", () => {
//     //console.log("top here");
//     const rootDiv = document.getElementById("root");
//     // initialize data visualzation
//     rootDiv.innerHTML = "works"
//     bubbleChart = new BubbleChart("svg.chart");

//     // button group event listener
//     let btnGroup = document.querySelector(".btn-group");
//     btnGroup.addEventListener("mousedown", e => {
//         e.preventDefault();
//         let currentBtn = e.target;
//         let currentBtnType = currentBtn.classList[1];
//         let currentBtnClass;
//         if (currentBtnType === "header-chart__btn") {
//             currentBtnClass = currentBtn.classList[0].split("-")[1];
//         }

//         if (currentBtnType === "header-chart__btn") {
//             bubbleChart.updateData(currentBtnClass);
//             let allBtns = btnGroup.querySelectorAll("a");
//             allBtns.forEach(btn => {
//                 btn.classList.remove("active");
//             });
//             currentBtn.classList.add("active");
//         }
//     });

//     // modal actions
//     const modalBg = document.querySelector('.modal-bg');
//     // console.log("Do we make it here?");
//     // console.log(modalBg);
//     modalBg.addEventListener('click', handleModalBgClick);    
//     modalBg.addEventListener('click', console.log("clicked modal"));    

// });

// // modal close 
// function handleModalBgClick(e) {
//     e.stopPropagation();
//     let modalBg = document.querySelector(".modal-bg");
//     let modal = document.querySelector('.modal');

//     if (
//         e.target.classList[0] === "modal-bg" ||
//         e.target.classList[0] === "modal-close__btn-single") {
//          modal.setAttribute("style", "opacity: 0; visibility: hidden");
//          modalBg.setAttribute("style", "opacity: 0; visibility: hidden");
//         // modal.getElementsByClassName.display = 'none';
//         // modalBg.getElementsByClassName.display = 'none';
//     }
// }

// let modal = documnet.getElementById('simpleModal');
// let modalBtn = document.getElementById('modalBtn');
// let closeBtn = document.getElementsByClassName('closeBtn')[0];

// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);

// function openModal() {
//     modal.style.display = 'block';
// }

// function closeModal() {
//     modal.style.display = 'none';
// }

// import BubbleChart from "./chart";

// let bubbleChart;
document.addEventListener("DOMContentLoaded", () => {
   // const rootDiv = document.getElementById("root");
   // rootDiv.innerHTML = "works"
  // initialize data visualzation
    //   bubbleChart = new BubbleChart("svg.chart");

  // button group event listener
  let btnGroup = document.querySelector(".btn-group");
  btnGroup.addEventListener("mousedown", e => {
    e.preventDefault();
    let currentBtn = e.target;
    let currentBtnType = currentBtn.classList[1];
    let currentBtnClass;
    if (currentBtnType === "header-chart_btn") {
      currentBtnClass = currentBtn.classList[0].split("-")[1];
    }

    if (currentBtnType === "header-chart_btn") {
    //   worldGraph.updateData(currentBtnClass);
      let allBtns = btnGroup.querySelectorAll("a");
      allBtns.forEach(btn => {
        btn.classList.remove("active");
      });
      currentBtn.classList.add("active");
    }
  });

  // modal actions
    const modal = document.querySelector(".close-modal-btn");
  console.log(modal);
  modal.addEventListener('click', console.log("hi"));
});

document.querySelector(".close-modal-btn").addEventListener("click", e => {
    let mode = document.querySelector(".modal")
    mode.setAttribute("style", "display:none");
})

// modal close 
function handleModalOnClick(e) {
    console.log("hi");
  //e.stopPropagation();
//   let modal = document.querySelector(".modal");
//   let modalContent = document.querySelector('.modal-content');
//   let closeModal = document.querySelector('.close');

//   if (
//     e.target.classList[0] === "modal" ||
//     e.target.classList[0] === "modal-close_btn-single" ) {
//     modalContent.setAttribute("style", "opacity: 0; visibility: hidden");
//     modal.setAttribute("style", "opacity: 0; visibility: hidden");
//     closeModal.setAttribute("style", "display: none");
//   }  
}
