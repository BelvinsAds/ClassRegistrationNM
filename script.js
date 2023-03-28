/*
Need to connect the option from drop down to connect to the information give to the database
I.E. {
    if(option1 == selected){
        selected class == FirebaseOption Name
    }
}
Then is connected and will follow current steps to connect to the database and go through the program.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

//Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwXhDZsSdu3Ls2UcnwssSHrfjvaCeU8_s",
    authDomain: "house-of-fitness-classes.firebaseapp.com",
    databaseURL: "https://house-of-fitness-classes-default-rtdb.firebaseio.com",
    projectId: "house-of-fitness-classes",
    storageBucket: "house-of-fitness-classes.appspot.com",
    messagingSenderId: "868182869541",
    appId: "1:868182869541:web:9f458be71f6db2cbf1e1cc",
    measurementId: "G-GYP0W351RH"
};
const app = initializeApp(firebaseConfig);

//Initalize DB
const database = getDatabase(app);

//Form Values

var ClassType 
var ClassName
var ClassNameType
var participants = [];
var Guest_First_Name = document.getElementById("First_Name");
var Guest_Last_Name = document.getElementById("Last_Name");
var Guest_Phone_Number = document.getElementById("Phone_Number");
var GuestEmail = document.getElementById("Guest_Email");
//Collecting Form Data
function applyForClass(){
    var SpotNum = Math.floor(Math.random() * 25);
    set(ref(database, `/Classes/${ClassName}/${SpotNum}`),{
        Guest: "IsGUEST",
        FName: Guest_First_Name.value,
        LName: Guest_Last_Name.value,
        PNumber: Guest_Phone_Number.value,
        Num: SpotNum,
        GuestEmail: GuestEmail.value
    })
    setTimeout(sendEmailGuest(), 3000);
    alert('Your Spot Reservation Is Pending. Click "Ok" To Continue');
    window.location.href = "https://buy.stripe.com/bIY2bZ5608cw30QcMP"
    if(participants.length == 25) {
        sendEmailList();
    }
}

//Get Count
SelectClassType.addEventListener('change', async (event) => {
     ClassType = document.getElementById("SelectClassType");
     ClassName = ClassType.value;
     ClassNameType = ClassType.options[ClassType.selectedIndex].text;
    var deRef = ref(database, `/Classes/${ClassName}/`);
    let i = 0;
    onValue(deRef, (snapshot) => {
    let data = snapshot.val()
    participants = snapshotToArray(snapshot);
    //Display Number of Participants
    let CountParticipants = `<label class="SpotsCount">${participants.length}/25 Spots Taken <br> Price For This Class: $20</label>`;
    let shownum = document.getElementById('numcount');
    shownum.innerHTML = CountParticipants;
    if(participants.length > 25) {
        alert('Sorry, It Looks Like This Class Is Full');
    } else {
        submit.addEventListener('click', applyForClass);
    }
    })
})

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.key = childSnapshot.key
        returnArr.push(item)
    });
    return returnArr;
}


// Sending Email List Full List
function sendEmailList() {
    var params = {
        class_name: ClassName,
        message: myJSON,
    }
    emailjs.send("service_ngjmswq","template_8h8qpbx", params);
}

// Sending Email To Non-Member
function sendEmailGuest() {
    var params = {
        Guest_First_Name: Guest_First_Name.value,
        ClassNameType: ClassNameType
    }
    emailjs.send("service_ngjmswq","template_s5p49f8", params);
}

