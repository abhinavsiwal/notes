console.log("working");
shownotes();
//If user Add a Note add it to a Local Storage;
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);//Convert it into Object;
    }
   
    notesObj.push(addTxt.value);

    // console.log(myobj.text);
    // console.log(Array.isArray(notesObj) );
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    shownotes();
});
//Function to Show Elements from Local Storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card mx-2 my-2" style="width: 18rem;">

        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div> `
    })

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerText="Nothing to see Here"
    }
}
//Function to Delete Node
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}
let search = document.getElementById('searchtxt');
search.addEventListener('input',function(){
    let inputval = search.value.toLowerCase();
    console.log(inputval);
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function(element){
        let cardtext= element.getElementsByTagName('p')[0].innerText;
        if(cardtext.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }

    })
})