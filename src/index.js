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
    e.stopPropagation();
    let modalBg = documnet.querySelector('.modal-bg');
    let modal = document.querySelector('.modal');

    if (
        e.target.classList[0] === 'modal-bg' ||
        e.target.classList[0] === 'modal-close__btn-single'
    ) {
        modal.setAttribute('style', 'opacity: 0; visibility: hidden');
        modalBg.setAttribute('style', 'opacity: 0; visibility: hidden');
    }
}