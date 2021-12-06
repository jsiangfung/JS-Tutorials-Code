//Elements
let linkAdr = document.getElementById("input-el");
let text = document.getElementById("text");
let inputBtn = document.getElementById("save-input-btn");
let deleteBtn = document.getElementById("delete-link-btn");
let deleteAllBtn = document.getElementById("delete-all-links-btn"); 
let storedLinksEl = document.getElementById("saved-links");

let storedLinks = [];


formatSavedLinks(); 
printStoredLinks(); 
 
//Saves link to storage and updates history 
inputBtn.addEventListener("click", function(){
    saveLink();
    //linkLocalStorage();
});

//Deletes most recent link in storage and updates history 
deleteBtn.addEventListener("click", function(){
    deleteLink(); 
}); 

//Deletes all links in storage and updates history
deleteAllBtn.addEventListener("click", function(){
    deleteAllLinks();
}); 

//Saves current storedLinks to local storage on exit/refresh 
//TODO: Doesn't work as intended - doesn't call linkStorage() apparently since storage.clear() isn't happening
window.addEventListener("reload", function(){
    linkLocalStorage();
})

window.addEventListener("close", function(){
    linkLocalStorage();
})



//Saves link in input text field 
function saveLink(){
    let link = linkAdr.value; 
    storedLinks.push(link); 
    printStoredLinks();
}

//Deletes most recent link from history - and updates storage
function deleteLink(){
    storedLinks.pop(); //TODO: Deletes most recent except for first entry for some reason 
    printStoredLinks(); 
    //linkLocalStorage();
}

//Deletes all links from history and storage 
function deleteAllLinks(){
    storedLinks = [];
    storedLinksEl.innerText = ""; 
    //localStorage.clear(); 
}

//Saves currently stored links to local storage. Clears old data from storage
function linkLocalStorage(){
    localStorage.clear(); 
    localStorage.setItem("saved-links",  JSON.stringify(storedLinks));   
}




//Cleans up the stored links from JSON string form and convert it to a string array to set storedLinks to
function formatSavedLinks(){
    let unformattedLinks = localStorage.getItem("saved-links"); //One giant string for saved links in storage
    //String.splice() - Returns string in between two indexes of referenced string
    let formattedLinks = unformattedLinks.slice(1, unformattedLinks.length-1); //Returns the string between the array brackets 
    storedLinks = formattedLinks.split(',');  //Splits string into an array with entries based on delimiter ','
    console.log(storedLinks); 
}

function printStoredLinks(){
    if(storedLinks.length != 0){
        let listItems = "";
        for(let i=0; i<storedLinks.length;i++){ 
            listItems += `
            <li>
                <a id='saved-links' target='_blank' href='${storedLinks[i]}'> 
                 ${storedLinks[i]} 
                </a>
            </li>`;
            
            // Does the same thing and is less intuitive to understand
            // const li = document.createElement("li"); 
            // li.textContent = storedLinks[i]; 
            // storedLinksEl.append(li);
        }
        storedLinksEl.innerText = listItems;
    }
}




