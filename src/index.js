document.addEventListener("DOMContentLoaded", () => {
    const rootDiv = document.getElementById("root");
    // ReactDOM.render(<h1>React is working</h1>, rootDiv);
    //rootDiv.innerHTML = "works"
    //modal
    const modalBg = document.querySelector('.modal-bg');
    modalBg.addEventListener('click', handleModalBgClick);
});

//close modal
function handleModalBgClick(e) {
    
}