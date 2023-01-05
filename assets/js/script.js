// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
//$(function () {
// TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage.
//HINT: What does `this` reference in the click listener function?
//How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked?
//How might the id be useful when saving the description in local storage?

// TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour.
//HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes?
//How can Day.js be used to get the current hour in 24-hour time?

// TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
//HINT: How can the id attribute of each time-block be used to do this?

// TODO: Add code to display the current date in the header of the page.
// });
myPlanner = new Object();
var today = new Date();
var currentMonth = new String();
var currentDay = new String();
var currentHour = new String();
var currentMinute = new String();
var currentSecond = new String();
var currentMeridian = new String();

function populatePlanner(i, meridian) {
  var timeStr = i.toString().concat(meridian);
  var time24 = 0;

  if(meridian === 'pm') {
    time24 = i + 12
  }
  else {time24 = i}

  //create section
  var secEl = $("<section>");
  //create article
  var artEl = $("<article>");
  //create textarea
  var taEl = $("<textarea>");
  //create button
  var btnEl = $("<button>");
  var iconEl = $("<i>");

  //append elements to dom
  $("main").append(secEl);
  secEl.append(artEl);
  secEl.append(taEl);
  secEl.append(btnEl);
  btnEl.append(iconEl);

  //set attributes
  $("main").addClass("container-lg px-5");
  secEl.attr("id", "hour-" + (i + 1)).addClass("row time-block");
  artEl.addClass("col-2 col-md-1 hour text-center py-3").text(timeStr);
  taEl.addClass("col-8 col-md-10 description").attr("rows", "3");
  btnEl.addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  iconEl.addClass("fas fa-save").attr("aria-hidden", "true");

if (time24 < today.getHours()) {
    secEl.addClass("past")
}
else if (time24 === today.getHours()) {
    secEl.addClass("present")
}
else if (time24 > today.getHours()) {
    secEl.addClass("future")
}
else {console.log("no condition met")}

  myPlanner[timeStr] && taEl.val(myPlanner[timeStr]);

  //add event listener
  btnEl.click(function () {
    //save value to object
    myPlanner[timeStr] = taEl.val();
    //save object to local storage
    localStorage.setItem("myPlannerStringify", JSON.stringify(myPlanner));
  });
}

function setMonth() {
  switch (today.getDay()) {
    case 0:
      currentMonth = "January";
      break;
    case 1:
      currentMonth = "February";
      break;
    case 2:
      currentMonth = "March";
      break;
    case 3:
      currentMonth = "April";
      break;
    case 4:
      currentMonth = "May";
      break;
    case 5:
      currentMonth = "June";
      break;
    case 6:
      currentMonth = "July";
      break;
    case 7:
      currentMonth = "August";
      break;
    case 8:
      currentMonth = "September";
      break;
    case 9:
      currentMonth = "Ocbtober";
      break;
    case 10:
      currentMonth = "November";
      break;
    case 11:
      currentMonth = "December";
      break;
  }
}

function setDay() {
  switch (today.getDay()) {
    case 0:
      currentDay = "Sunday";
      break;
    case 1:
      currentDay = "Monday";
      break;
    case 2:
      currentDay = "Tuesday";
      break;
    case 3:
      currentDay = "Wednesday";
      break;
    case 4:
      currentDay = "Thursday";
      break;
    case 5:
      currentDay = "Friday";
      break;
    case 6:
      currentDay = "Saturday";
      break;
  }
}

function setHour() {
  if (today.getHours() === 0) {
    currentHour = "12";
    currentMeridian = "AM";
  } else if (today.getHours() < 10) {
    currentHour = today.getHours();
    currentMeridian = "AM";
  } else if (today.getHours() < 12) {
    currentHour = today.getHours();
    currentMeridian = "AM";
  } else if (today.getHours() === 12) {
    currentHour = "12";
    currentMeridian = "PM";
  } else if (today.getHours() < 24) {
    currentHour = today.getHours() - 12;
    currentMeridian = "PM";
  } else {
    console.log("No Conditions Met");
  }
}

function setMinute() {
  if (today.getMinutes() < 10) {
    currentMinute = "0".concat(today.getMinutes());
  } else {
    currentMinute = today.getMinutes();
  }
}

function setSecond() {
  if (today.getSeconds() < 10) {
    currentSecond = "0".concat(today.getSeconds().toString());
  } else {
    currentSecond = today.getSeconds().toString();
  }
}

function getDateWords() {
  return (
    currentDay +
    ", " +
    currentMonth +
    " " +
    today.getDate() +
    ", " +
    today.getFullYear()
  );
}

function getDateNumbers() {
  return (
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear()
  );
}

function getTime() {
  // console.log( currentHour)
  // console.log( currentMinute)
  // console.log( currentSecond)
  return (
    currentHour +
    ":" +
    currentMinute +
    ":" +
    currentSecond +
    " " +
    currentMeridian
  );
}

function setToday() {
  setMonth();
  setDay();
  setHour();
  setMinute();
  setSecond();
}

var myTempBool = true

function displayDate() {
  var curd1 = $("#currentDay1");
  var curd2 = $("#currentDay2");
  var curd3 = $("#currentDay3");

  curd1.text(getDateWords());
  curd2.text(getDateWords() + "  " + getTime());
  curd3.text(getDateNumbers() + "  " + getTime());

  var tempNoteEl;
  if(myTempBool) {
    tempNoteEl = $('<p>').attr("id", "temp-note").text("click time to change format")
  }

  curd1.append(tempNoteEl)
  curd1.click(function () {
    curd1.removeClass("visible");
    curd1.addClass("invisible");

    $('#currentDay1 p').remove()
    myTempBool = false;



    curd2.removeClass("invisible");
    curd2.addClass("visible");
  });

  curd2.click(function () {
    curd2.removeClass("visible");
    curd2.addClass("invisible");

    curd3.removeClass("invisible");
    curd3.addClass("visible");
  });

  curd3.click(function () {
    curd3.removeClass("visible");
    curd3.addClass("invisible");

    curd1.removeClass("invisible");
    curd1.addClass("visible");
  });
}

function init() {
  setInterval(function () {
    today = new Date();
    setToday();
    displayDate();
  }, 1000);

$("#currentDay1").addClass("visible");
$("#currentDay2").addClass("invisible");
$("#currentDay3").addClass("invisible");

//alert("click the date to change the format!")

  //planner ojbect empty
  console.log(myPlanner);
  //get item from LS, save to object
  myPlanner = JSON.parse(localStorage.getItem("myPlannerStringify")) ?? {};
  //planner object has data
  console.log(myPlanner);

  var meridian = "";
  for (var i = 9; i <= 12; i++) {
    meridian = "am";
    populatePlanner(i, meridian);
  }
  for (var i = 1; i <= 5; i++) {
    meridian = "pm";
    populatePlanner(i, meridian);
  }
}

init();
