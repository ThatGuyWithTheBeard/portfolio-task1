
let highscore;
let points = 0;
const nonDigit = /\D+/g;
const digit = /\d+/g;

$().ready(() => {

    highscore = parseInt(localStorage.getItem("localHighscore"));

    if(isNaN(highscore)) {
        highscore = 0;
    }

    $("#highscore").text(`Highscore: ${highscore}`);
    
    
    console.log($("#highscore").text());
    console.log(highscore);
    console.log(isNaN(highscore));
    console.log(typeof highscore);
    console.log(typeof localStorage.getItem("localHighscore"));

    //$("#points").text()
    console.log($("#points").text());
    console.log(typeof $("#points").text());
    console.log($("#points").text().replace(nonDigit, ""));
});

const addPoint = () => {

    points += 1;
    console.log(points);

    $("#points").text(`Points: ${points}`);
    console.log($("#points").text());
    console.log($("#highscore").text());


    if(highscore < points) {
        $("#highscore").text(`Highscore: ${points}`);
        localStorage.setItem("localHighscore", points);
    }
    
}

const resetHighscore = () => {

    highscore = 0;
    $("#highscore").text(`Highscore: ${highscore}`);
    localStorage.setItem("localHighscore", 0);

}