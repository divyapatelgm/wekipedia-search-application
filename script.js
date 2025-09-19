// 1. Adding Event Listener to Input Element
let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");
 
// Creating and Append Search Item
function createAndAppendSearchResult (result) {
    // Creating Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl); // Appending to Search Results Item

    // Creating Title Element
    let {link, title, description} = result;

    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    // Creating Break Element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // Creating URL Element
    let urlEL = document.createElement("a");
    urlEL.classList.add("result-url"); 
    urlEL.href = link;
    urlEL.target = "_blank";
    urlEL.textContent = link;
    resultItemEl.appendChild(urlEL);

    // Creating Break Element
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // Creating Description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults (searchResults) {

    spinner.classList.toggle("d-none"); // Hide Spinner while displaying results

    // let result = searchResults[0]; // Single Search Result
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

// 1. and getting User Entered text
function searchWikipedia (event) {

    searchResultsEl.textContent = ""; // Clear previous search results 

    if (event.key === "Enter") {
        spinner.classList.toggle("d-none"); // Show Spinner

        let searchInputVlaue = searchInputEl.value;
        // console.log(searchInputVlaue);

        // URL
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputVlaue;
        // console.log(url);

        // Request Configuration
        let options = {
            method : "GET"
        };

        //Making HTTP request using fetch API
        fetch (url, options)
        .then(function (response) {
            return response.json();
        })
        .then (function (jsonData) {
            // console.log(jsonData);
            let {search_results} = jsonData;
            displayResults (search_results);
        })
    }
}

searchInputEl.addEventListener("keydown",searchWikipedia);

