//document.getElementById("p-counter").innerText = 5;

let counterEl = document.getElementById("p-counter");
let counter = 0; 

let saved;

function increment(){
    counter++;
    counterEl.innerText = counter;
}

function decrement(){
    counter--; 
    counterEl.innerText = counter;
}


function save(){
    saved = counter;
    // Note: style.visiblity = "hidden"; also works but it still affects layout where as display doesn't */
    document.getElementById("save-text").style.display = "none";
    document.getElementById("saved-text").style.display = "inline";
}

function load(){
    if(saved == null){
        document.getElementById("save-text").style.display = "inline";
    } else{
        counter = saved; 
        counterEl.innerText = counter;
    }
}

function reset(){
    counter = 0;
    counterEl.innerText = counter;
}
