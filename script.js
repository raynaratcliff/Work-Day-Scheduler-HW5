$(function () {});
  
/* Declare Variables */
var today = moment().format("dddd, MMMM Do");

var now = moment().format("H A");

/* planWorkday entries for each hour of the workday */
var planner = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

/*Current Day*/ 
$("currentDay").text(today); 

/* Local Storage check */
var events = JSON.parse(localStorage.getItem("workDay"));
if (events) {
  planner = events;
}

/*Create rows */
planner.forEach(function(timeBlock, index) {
    var label = timeBlock.time; 
    var blockColor = colorRow(label);
    var row = 
    '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    label +
    '</div><textarea class="form-control ' +
    blockColor +
    '">' +
    timeBlock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

    /* Adding rows to container div */
    $(".container").append(row);

}); 

/* Color rows based on current time */
function colorRow(time) {
	var planNow = moment(now, "H A");
	var entry = moment(time, "H A");
	if (planNow.isBefore(entry) === true) {
		return "future";
	} else if (planNow.isAfter(entry) === true) {
		return "past";
	} else {
		return "present";
	}
}

/* Save Events */
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planner[blockID].event = userEntry;

	/* Set local storage */
	localStorage.setItem("workDay", JSON.stringify(planner));
});