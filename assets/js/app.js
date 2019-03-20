var time = moment();

function newFunction() {
    $("#momentClock").html();
}

// function update() {
//     $("#momentClock").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
// }
function update() {
    $('#clock').html(moment(now).format('MMMM Do YYYY, h:mm:ss a'));
  }

setInterval(update, 1000);