
window.addEventListener('scroll',()=> {
    const header = document.querySelector("#header");
    const positionFixed = window.pageYOffset;
    console.log(positionFixed)
    if (positionFixed > 100) {
        header.classList.add('fixed')
        // header.style.zIndex= '999';
    } 
    if (positionFixed<99) {
        header.classList.remove('fixed');
    }
    
}, true)

const form = document.querySelector("form"),
showForm = document.querySelector("#add"),
closeForm = document.querySelector(".closeForm");


function show() {
    let form = document.querySelector(".form");
    form.classList.add("block")
}

function close() {
    let form = document.querySelector(".form");
    form.classList.remove("block");
}




// delete info
const deleteInfo = (title)=> {
    const info = JSON.parse(localStorage.getItem("info"));
    for (let i = 0; i < info.length; i++) {
        if (info[i].title == title) {
            let confirms = confirm("Do you want to delete it ?")
            if (confirms) {
                info.splice(i, 1);
            }
        }
    }
    
    // set Valu to local storage
    localStorage.setItem("info", JSON.stringify(info));

    showContent();
}



// Form
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    // Get Valu From User
    let title = document.querySelector(".user-title").value;
    let desc = document.querySelector("#textarea").value;

    // Store value in object
    let userValue = {
        title: title,
        desc: desc
    }
    if (title !== '' && desc !== '') {
        
    if (localStorage.getItem("info") === null) {
        let storeValue = [];

        // Push object an array
        storeValue.push(userValue);
        
        // set Valu to local storage
        localStorage.setItem("info", JSON.stringify(storeValue));

        // close form automatically when click save button
    
    } else {
        // get item from local storage
        storeValue = JSON.parse(localStorage.getItem("info"));

        // Push object an array
        storeValue.push(userValue);
        
        // set Valu to local storage
        localStorage.setItem("info", JSON.stringify(storeValue));
    }
    // Close popup form
    close();
    } else {
        alert('Empty Not Allowed !');
    }

    // Reset form
    form.reset();

    showContent();
    
});

// Show 
const showContent = ()=> {
    const showInfo = JSON.parse(localStorage.getItem("info")),
    showBox = document.querySelector(".wrapper-box");
    showBox.innerHTML = '';

    for (let i = 0; i < showInfo.length; i++) {

        const title = showInfo[i].title;
        const desc = showInfo[i].desc;

        // console.log(title);
        
        showBox.innerHTML += `<div class="box">
        <span class="close closeSaveContent" onclick="deleteInfo('${title}')">&#215</span>
        <h2 id="title">${title}</h2>
        <p id="description">${desc}</p>
    </div>`;
    }

}






window.addEventListener("load", ()=> showContent())
// showContent();
showForm.addEventListener("click", show);
closeForm.addEventListener("click", close);