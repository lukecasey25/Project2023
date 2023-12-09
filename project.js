
//Newsletter Javascript 

function buttonNewsletter() {
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check that the email is formatted correctly
    var fname = prompt("Enter Your Name");
    var email = prompt("Enter Your Email");

    if (!email || !fname) {
        alert("Please click Close, to Exit the Newsletter Modal Box") //was getting a infinite loop if left blank, so tried to break it by reloading the pge
        location.reload();


    }
    else if (emailFormat.test(email)) {
        alert(email + " has been Validated");
        alert(fname + ", thank you for your details. You will now receive our weekly Newsletter via " + email);
        buttonNewsletterHide(); //hides signup button when email validated
    }
    else {
        alert(email + " is an Invalid Email, Please check the format");
        buttonNewsletter(); //starts the function again as the email was wrong
    }




}
//hides the fnewsletter button
function buttonNewsletterHide() {
    document.getElementById("newsletterButton").style.display = "none";
    myFunction();

}


//home page quote function 

function quoteCal() {
    var form = document.getElementById("quoteForm");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
    //variables
    var visit = document.getElementById("visits").value;
    var job = document.getElementById("jobQuote").value;
    var sizeOfArea = document.getElementById("sizeArea").value;
    var quote = 0;
    var costPerSQ = 0;
    //for dropdown and job cost surplus 
    if (job == 1) {
        costPerSQ = 5;
    }

    else if (job == 2) {
        costPerSQ = 10;
    }
    else if (job == 3) {
        costPerSQ = 30;
    }
    else if (job == 4) {
        costPerSQ = 35;
    }

    else if (job == 5) {
        costPerSQ = 40;
    }
    else if (job == 6) {
        costPerSQ = 0;
    }
    else {
        alert("You have not picked a job type.")
    }

    //compute
    quote = (visit * sizeOfArea + (visit * costPerSQ));

    //output
    document.getElementById("quoteResult").innerHTML += "Your Quote is " + "€" + quote + ".00";
    quoteHide();


}


function resetQuote() {
    var form = document.getElementById("quoteForm");
    function handleForm(event) { event.preventDefault(); } //stop page reloading when I click submit
    form.addEventListener('submit', handleForm);
    document.getElementById('quoteForm').reset();//resettin the form
    document.getElementById('quoteResult').innerHTML = ""; //when i click reset it removes the previous quote
    document.getElementById("quoteButton").style.display = "inline-block"; //show the submit buttoon again when reset function is called

}

function availReset() {
    var form = document.getElementById("avail");
    function handleForm(event) { event.preventDefault(); } //stop page reloading when I click submit
    form.addEventListener('submit', handleForm);
    document.getElementById('avail').reset();//resettin the form
    document.getElementById('availabilityMessage').innerHTML = ""; //when i click reset it removes the previous quote
    document.getElementById("availButton").style.display = "inline-block"; //show the submit buttoon again when reset function is called

}

function contactReset() {
    var form = document.getElementById("contactForm");
    function handleForm(event) { event.preventDefault(); } //stop page reloading when I click submit
    form.addEventListener('submit', handleForm);
    document.getElementById('contactForm').reset();//resettin the form
    document.getElementById("contactButton").style.display = "inline-block"; //show the submit buttoon again when reset function is called

}

function quoteHide() {
    document.getElementById("quoteButton").style.display = "none";

}


//AvailForm -- email to be configured, counties outside Dublin, Wicklow,Louth, Meath and westmeath arent 
//worked on, no time after 2pm will allow for bookings
function availForm() {
    var form = document.getElementById("avail");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
    var countyLeinster = ["dublin", "wicklow", "louth", "meath", "westmeath", "carlow", "kildare", "laois", "kilkenny", "longford", "wexford", "offaly"];
    var countyChoice = document.getElementById("inputCounty").value.toLowerCase();
    var timeChoice = document.getElementById("Time").value.toLowerCase();
    var timeEntered = new Date('2000-01-01 ' + timeChoice);
    var timeNo = new Date('2000-01-01 15:00:00');
    var autoName = document.getElementById("inputName").value.toLowerCase();
    var contact = '<a href="contact.html">here</a>';



    let emailFormatAvail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check that the email is formatted correctly
    var emailAvail = document.getElementById("inputEmail").value;

    if (!emailAvail) {
        alert("Please click Close, to Exit the Newsletter Modal Box") //was getting a infinite loop if left blank, so tried to break it by reloading the pge
        location.reload();


    }
    else if (emailFormatAvail.test(emailAvail)) {
        alert(emailAvail + " has been Validated");
    }
    else {
        alert(emailAvail + " is an Invalid Email, Please check the format");
    }

    /*this is for checking if the entry is for a suitable county only leinster*/

    var isCountyInLeinster = false;

    for (var i = 0; i < countyLeinster.length; i++) {
        if (countyChoice.toLowerCase() === countyLeinster[i].toLowerCase()) {
            isCountyInLeinster = true;
            break; // was getting a loop that would continue through the array even after getting the right answre,  need to break the loop
        }
    }

    if (isCountyInLeinster) { //once this condition is true then I will see the result Else/ I wont and get an err msg 
        alert("Leinster Counties only --> " + countyChoice.toLowerCase() + " is in Leinster");
    } else {
        alert(countyChoice.toLowerCase() + " is not in Leinster or the county is spelled incorrectly");
    }


    /*Create a message that notifies the user that there isnt any bookings put in to start after 3pm*/
    if (timeEntered >= timeNo) {
        alert("dont start bookings after 3pm")
    }


    //produce message that once they have put in a correct email, time and county they will get a message that says there is availability
    if (isCountyInLeinster === true && emailFormatAvail.test(emailAvail) && timeEntered <= timeNo) {

        document.getElementById('availabilityMessage').innerHTML = "Hi " + autoName + ",There is availability with the information provided " + "Please contact us " + contact + " to arrange a visit.";

    }//if meets one of the below conditions spits out msg that says no avail
    else if (isCountyInLeinster === false || timeEntered >= timeNo) {
        document.getElementById('availabilityMessage').innerHTML = "Hi " + autoName + ", Unfortunately, There is no availability. Please contact us " + contact + " if you have further queries";
    }
    else {//fail safe to highlight an unknown error and location .
        document.getElementById('availabilityMessage').innerHTML = "Internal Error @151 -ref LCasey";

    }

}

//popover for County in availability 
document.addEventListener('DOMContentLoaded', function () {
    const popcorn = document.querySelector('#popcorn');
    const popover = document.querySelector('#popover');
    const popoverInstance = new bootstrap.Popover(popcorn, {
        container: 'body', // optional, specify a container
    });
});

//Contact Form javascript

function contactForm() {
    var form = document.getElementById("contactForm");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
    let emailFormatContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check that the email is formatted correctly
    var emailContact = document.getElementById("inputContactEmail").value;
    var nameContact = document.getElementById("inputContactName").value;


    //Check email is valid 

    if (!emailContact) {
        alert("Please click Close, to Exit the Newsletter Modal Box") //was getting a infinite loop if left blank, so tried to break it by reloading the pge
        location.reload();


    }
    else if (emailFormatContact.test(emailContact)) {
        alert(emailContact + " has been Validated");
    }
    else {
        alert(emailContact + " is an Invalid Email, Please check the format");
    }

    //return value from the dropdown for contact tpe to be used to inform user of how we will contact them
    var contactType = document.getElementById("formSelect").value;

    if (contactType == 1) {
        contactType = "Phone";
    }

    else if (contactType == 2) {
        contactType = "text";
    }
    else if (contactType == 3) {
        contactType = "email";
    }

    //to validat the number make sure number is atleast 8 digits long

    var phoneNum = document.getElementById("inputPhone").value;

    if (!/^\d{8,11}$/.test(phoneNum) || phoneNum.length >= 12) {
        alert(phoneNum + " Is an invalid phone number.")
    }

    else {
        alert("You Phone number is Valid")

    }

    if (emailFormatContact.test(emailContact) && /^\d{8,11}$/.test(phoneNum)) {

        alert("Hello " + nameContact + ", We will be in touch by " + contactType + " shortly.")

    }
    else {
        alert("The Details you have entered are incorrect, please try again.")
    }




    contactHide();


}

function contactHide() {
    document.getElementById("contactButton").style.display = "none";
}


var minNum = 1;
var maxNum = 10;
var Mx = 1000;





function game() {

    const computerResult = 4; //we have won it 4 times 
    let wins = 0;
    let resultVouch = Math.floor(Math.random() * (Mx + 1) + minNum); //make three numbers appear on ech run of the loop 

    document.getElementById("computerResult").innerHTML += '';
    document.getElementById("yourResult").innerHTML += '';


    document.getElementById("computerResult").innerHTML += "We have won the Irish Landscaping awards " + computerResult + " Times";

    for (let i = 0; i < 3; i++) {
        let yourResult = Math.floor(Math.random() * (maxNum + 1) + minNum); //make three numbers appear on ech run of the loop 
        document.getElementById("yourResult").innerHTML += yourResult + " ";//print numbers



        if (yourResult === computerResult) {
            wins++


        }
    }

    if (wins > 0) {
        alert("you Win");
        document.getElementById("gameResult").innerHTML += 'You Win!, ' + "Your voucher number for €50.00 off you next vist is " + "[LgcVoucher " + resultVouch + "]";
        alert("Please quote this voucher number at your next booking " + resultVouch)
    }
    else {
        document.getElementById("gameResult").innerHTML += 'You Lose';
    }

    gameHide(); // kill the game 

}




function gameHide() {
    document.getElementById("gameClick").style.display = "none";
}