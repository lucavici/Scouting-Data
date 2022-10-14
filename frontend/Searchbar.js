

var TeamData = null;

const init = async () => {
    try {
        TeamData = await (await fetch("json.json")).json();
        //length = Object.keys(TeamData).length;
    } catch(e) {
        console.log(`Could not read file: ${e}`);
    }
}

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    document.getElementById("showhide").style.visibility = "visible";
    document.getElementById("searchbox-value").value = inputBox.value;
    document.getElementById("searchbox-value").remove();
    icon.onclick = ()=>{
        document.getElementById("showhide").style.visibility = "visible";
        document.getElementById("searchbox-value").value = inputBox.value;
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list) {
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

init().then(() => {

    if (TeamData != null) {

        graph();

        console.log(TeamData);

        let suggestions = [];

        for (let i = 0; i < TeamData.length; i++) {
            suggestions.push(TeamData[i].number);
        }

        //console.log(suggestions);


        // if user press any key and release
        inputBox.onkeyup = (e)=>{
            console.log(inputBox.value);
            let userData = e.target.value; //user enetered data
            let emptyArray = [];
            if (userData){
                // icon.onclick = ()=>{
                //     webLink = `https://www.google.com/search?q=${userData}`;
                //     linkTag.setAttribute("href", webLink);
                //     linkTag.click();
                // }
                emptyArray = suggestions.filter((data)=>{
                    //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                    return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                });
                emptyArray = emptyArray.map((data)=>{
                    // passing return data inside li tag
                    return data = `<li>${data}</li>`;
                });
                searchWrapper.classList.add("active"); //show autocomplete box
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag
                    allList[i].setAttribute("onclick", "select(this)");
                }
            } else {
                searchWrapper.classList.remove("active"); //hide autocomplete box
            }
        }

        

    }
});



