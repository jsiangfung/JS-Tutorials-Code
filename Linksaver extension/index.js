//Elements
let linkAdr = document.getElementById("input-el");
let text = document.getElementById("text");
let inputBtn = document.getElementById("save-input-btn");
let storedLinksEl = document.getElementById("saved-links");

let storedLinks = [];

inputBtn.addEventListener("click", function(){
    
});


function saveLink(){
    let link = linkAdr.value; 
    storedLinks.push(link);
    printStoredLinks();
}

function printStoredLinks(){
    if(storedLinks.length != 0){
        let listItems = "";
        for(let i=0; i<storedLinks.length;i++){ 
            listItems += `
            <li>
                <a id='saved-links'target='_blank' href='${storedLinks[i]}'> 
                 ${storedLinks[i]} 
                </a>
            </li>`;
            
            // Does the same thing and is less intuitive to understand
            // const li = document.createElement("li"); 
            // li.textContent = storedLinks[i]; 
            // storedLinksEl.append(li);
        }
        storedLinksEl.innerHTML = listItems;
    }
}


