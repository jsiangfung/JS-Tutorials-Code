//Elements
let linkAdr = document.getElementById("input-el");

//Buttons
let inputBtn = document.getElementById("save-input-btn");
let tabBtn = document.getElementById("save-tab-btn");
let deleteBtn = document.getElementById("delete-link-btn");
let deleteAllBtn = document.getElementById("delete-all-links-btn");

//Saved Links El
let storedLinksEl = document.getElementById("saved-links");

let storedLinks = [];

//Restores links from local storage at start, if there are any.
if (localStorage.getItem("saved-links") != null) {
  //One giant string for saved links in storage)
  let unformattedLinks = localStorage.getItem("saved-links");
  storedLinks = JSON.parse(unformattedLinks); 
}

printStoredLinks();

//Saves link to storage and updates history
inputBtn.addEventListener("click", function () {
  saveLink();
  linkLocalStorage();
  console.log(storedLinks);
});

let tabs = [{ url: "" }];

//Adds the link in the current tab to storeLinks and updates history
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    storedLinks.push(tabs[0].url);
    linkLocalStorage();
    printStoredLinks();
    console.log(storedLinks);
  });
});

//Deletes most recent link in storage and updates history
deleteBtn.addEventListener("click", function () {
  deleteLink();
  linkLocalStorage();
});

//Deletes all links in storage and updates history
deleteAllBtn.addEventListener("click", function () {
  deleteAllLinks();
  linkLocalStorage();
});

//Saves link in input text field
function saveLink() {
  let link = linkAdr.value;
  if (link != "") {
    storedLinks.push(link);
    linkAdr.value = "";
    printStoredLinks();
  }
}

//Deletes most recent link from history - and updates storage
function deleteLink() {
  //storedLinks.pop(); //TODO: Deletes most recent except for first entry for some reason
  console.log("popped: " + storedLinks.pop());
  console.log("updated array: " + storedLinks);
  printStoredLinks();
}

//Deletes all links from history and storage
function deleteAllLinks() {
  storedLinks = [];
  storedLinksEl.innerText = "";
}

//Saves currently stored links to local storage. Clears old data from storage
function linkLocalStorage() {
  localStorage.setItem("saved-links", JSON.stringify(storedLinks));
}

//Updates link history with links in storage.
function printStoredLinks() {
  let listItems = "";

  for (let i = 0; i < storedLinks.length; i++) {
    listItems += `
              <li>
                  <a id='saved-links' target='_blank' rel='noreferrer noopener' href='${storedLinks[i]}'> 
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

//Bug log/ Problems faced: 
//Cleans up the stored links from JSON string form and convert it to a string array to set storedLinks to
// function formatSavedLinks() {
//   //Turns out this code wasn't needed since I can just use JSON.parse()...XD
//   // //String.slice() - Returns string in between two indexes of referenced string
//   // let formattedLinks = unformattedLinks.slice(1, unformattedLinks.length-1); //Returns the string between the array brackets
//   // storedLinks = formattedLinks.split(',');  //Splits string into an array with entries based on delimiter ','
//   // console.log(storedLinks);
//   //  Yo I think the bug from earlier with extra quotations was cause we removed the brackets but not the quotation "" marks from each string entry... and so
//   //  the quotations were counted as a part of the string. Every time we saved the entry with quotations is wrapped inside another quotation mark. Wow.
//   return JSON.parse(unformattedLinks);
// }

//Saves current storedLinks to local storage on exit/refresh - saves memory doing it once at the end vs doing it on every button click.
//Makes sense to do it once at the end too since we're saving the storage when the user is finished for next time.
//Doesn't cover the case where we switch tabs (not exiting/refreshing) so not using this function anymore
// window.addEventListener("beforeunload", function () {
//   linkLocalStorage();
// });

//Restores links from local storage at start, if there are any.
// Gotta test for .getItem edge case where there is nothing to pull from since we'll be setting storedLinks to a null object
// if (localStorage.getItem("saved-links") != null) {
//   //One giant string for saved links in storage)
//   let unformattedLinks = localStorage.getItem("saved-links");
//   storedLinks = JSON.parse(unformattedLinks); 
// }
