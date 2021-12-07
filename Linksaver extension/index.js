//Elements
let linkAdr = document.getElementById("input-el");
let text = document.getElementById("text");

//Buttons 
let inputBtn = document.getElementById("save-input-btn");
let deleteBtn = document.getElementById("delete-link-btn");
let deleteAllBtn = document.getElementById("delete-all-links-btn"); 

//Saved Links El
let storedLinksEl = document.getElementById("saved-links");

let storedLinks = [];

//Restores links from local storage at start 
formatSavedLinks(); 
printStoredLinks(); 
 
//Saves link to storage and updates history 
inputBtn.addEventListener("click", function(){
    saveLink();
    linkLocalStorage();
});

//Deletes most recent link in storage and updates history 
deleteBtn.addEventListener("click", function(){
    deleteLink(); 
    linkLocalStorage(); 
}); 

//Deletes all links in storage and updates history
deleteAllBtn.addEventListener("click", function(){
    deleteAllLinks();
    linkLocalStorage(); 
}); 



//Saves current storedLinks to local storage on exit/refresh 
//TODO: Doesn't work as intended - doesn't call linkStorage() apparently since storage.clear() isn't happening
// window.addEventListener("reload", function(){
//     linkLocalStorage();
// })

// window.addEventListener("close", function(){
//     linkLocalStorage();
// })

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
}

//Deletes all links from history and storage 
function deleteAllLinks(){
    storedLinks = [];
    storedLinksEl.innerText = ""; 
}

//Saves currently stored links to local storage. Clears old data from storage
function linkLocalStorage(){
    localStorage.setItem("saved-links",  JSON.stringify(storedLinks));   
}




//Cleans up the stored links from JSON string form and convert it to a string array to set storedLinks to
function formatSavedLinks(){
    let unformattedLinks = localStorage.getItem("saved-links"); //One giant string for saved links in storage
    //Turns out this code wasn't needed since I can just use JSON.parse()...XD 
    // //String.slice() - Returns string in between two indexes of referenced string
    // let formattedLinks = unformattedLinks.slice(1, unformattedLinks.length-1); //Returns the string between the array brackets 
    // storedLinks = formattedLinks.split(',');  //Splits string into an array with entries based on delimiter ','
    // console.log(storedLinks); 
    //  Yo I think the bug from earlier with extra quotations was cause we removed the brackets but not the quotation "" marks from each string entry... and so 
    //  the quotations were counted as a part of the string. Every time we saved the entry with quotations is wrapped inside another quotation mark. Wow. 
    storedLinks = JSON.parse(unformattedLinks);  
}   

//Updates link history with links in storage. 
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
        storedLinksEl.innerHTML = listItems;
    }
}




