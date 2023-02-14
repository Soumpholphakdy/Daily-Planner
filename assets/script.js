// This updates the time in the page.
$(function currentTime() {
    // These are my varibales that I use throughout my JS.
    var today = dayjs();
    var timeslot9am = $("#9AM");
    var timeslot10am = $("#10AM");
    var timeslot11am = $("#11AM");
    var timeslot12pm = $("#12PM");
    var timeslot1pm = $("#1PM");
    var timeslot2pm = $("#2PM");
    var timeslot3pm = $("#3PM");
    var timeslot4pm = $("#4PM");
    var timeslot5pm = $("#5PM");
    var saveBtn = $(".save-image");
    var timeSlotElArray = [
        timeslot9am, timeslot10am, timeslot11am, timeslot12pm, timeslot1pm, timeslot2pm, timeslot3pm, timeslot4pm, timeslot5pm];
    $("#currentDay").text(today.format("dddd, MMMM D YYYY h:mm:ss"));

    // This renders what is in the local storage and displays it.
    renderTask();
    function renderTask() {
        for (var el of timeSlotElArray) {
            el.val(localStorage.getItem("time" + el.data( "hour")));
        }
    }
    
    
    
    //This function shows what time it currently is and changes the colors in the calender based on what time it is. 
    function timeChange() {
        var currentHour = dayjs().hour();
        console.log(currentHour)
        $('.time-block').each(function () {
            console.log($(this));
            console.log($(this).attr("id").split('-')[1]);
            var Time = parseInt($(this).attr("id").split('-')[1]);  
            
            if (Time < currentHour) {
                $(this).addClass("past");
            } else if (Time === currentHour) {
                $(this).addClass("present");
                $(this).removeClass("past");
            } else {
                $(this).addClass("future");
                $(this).removeClass("past");
                $(this).removeClass("present");
            }
        })
    }
    //This is the function that shows the seconds and minutes tick away in real time.
    timeChange();
    setInterval(function () {
        $("#currentDay").text(dayjs().format("dddd, MMMM D YYYY h:mm:ss"));
    }, 1000)
    
        

//This function reacts to when you click on the saveBtn and saves it in local storage.
function submitFrom(event) {
    event.preventDefault();

    var clickBtn = $(event.currentTarget);
    var text = clickBtn.siblings("textarea");
    var time = text.data("hour");

    localStorage.setItem("time" + time, text.val());

}

saveBtn.on("click", submitFrom);

});