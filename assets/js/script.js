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
myPlanner = new Object
 function populatePlanner(i, meridian) {

    var timeStr = i.toString().concat(meridian)
    
    //create section
    var secEl = $('<section>');
    //create article
    var artEl = $('<article>');
    //create textarea
    var taEl = $('<textarea>');
    //create button
    var btnEl = $('<button>');
    var iconEl = $('<i>');
    
    //append elements to dom
    $('main').append(secEl);
    secEl.append(artEl);
    secEl.append(taEl);
    secEl.append(btnEl);
    btnEl.append(iconEl);


    //set attributes
    $('main').addClass('container-lg px-5')
    secEl.attr('id', 'hour-' + (i + 1)).addClass('row time-block')
    artEl.addClass('col-2 col-md-1 hour text-center py-3').text(timeStr)
    taEl.addClass('col-8 col-md-10 description').attr('rows', '3')
    btnEl.addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
    iconEl.addClass('fas fa-save').attr('aria-hidden', 'true')

    //var tempVal = Object.keys(myPlanner).includes(timeStr) ? 'hi' : "low"
    //var tempVal = myPlanner[timeStr] ?? '';
    //load planner
    //if (myPlanner[timeStr] != null) {taEl.val(tempVal)}
    //console.log(myPlanner[timeStr])
    //myPlanner[timeStr] && taEl.val(tempVal)

    //add event listener
    btnEl.click(function () {

        //save value to object
        myPlanner[timeStr] = taEl.val()
        //save object to local storage
        localStorage.setItem("myPlannerStringify", JSON.stringify(myPlanner));
        
    }
    )
    
 }
    
 function init() {
    //planner ojbect empty
    console.log(myPlanner)
    //get item from LS, save to object
     myPlanner = JSON.parse(localStorage.getItem("myPlannerStringify"))
     //planner object has data
     console.log(myPlanner)
     
    var meridian = "";
    for (var i = 9; i <= 12; i++) {
        meridian = "am"
 populatePlanner(i, meridian)
    }
        for (var i = 1; i <= 5; i++) {
            meridian = "pm"
     populatePlanner(i, meridian)
        }

    }

 init()


  