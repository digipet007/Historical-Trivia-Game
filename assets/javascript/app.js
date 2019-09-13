//--------------SET UP VARIABLES AND OBJECTS--------------------

var questions = [{
    question: "In what year did Scotsman John Napier invent logarithms?",
    answers: ["1206", "1614", "1776", "1991"],
    correctAnswer: "1614"
}, {
    question: "The first flight of the Boeing 747, or Jumbo Jet, took place in this year, with passenger service offered one year later.",
    answers: ["1969", "1952", "1999", "1942"],
    correctAnswer: "1969"
}, {
    question: "Bessemer introduces his process for producing steel in this year, allowing for a dramatic increase in the output of the steel industry.",
    answers: ["1555", "1690", "1787", "1856"],
    correctAnswer: "1856" 
}, {
    question: "While imprisoned in Genoa, Marco Polo writes in this year his celebrated accounts of his travels throughout the Asian continent.",
    answers: ["1347", "1298", "1428", "1502"],
    correctAnswer: "1298"
}, {
    question: "The space shuttle, Challenger, explodes in this year, killing all on board.",
    answers: ["1968", "1987", "1991", "1986"],
    correctAnswer: "1986"
}, {
    question: "The date by which experts believe the pyramids in Egypt were completed.",
    answers: ["C. 5000 BCE", "c. 5 CE", "c. 2500 BCE", "c.300 BCE"],
    correctAnswer: "c. 2500 BCE"
}];

//-------FUNCTIONS------------------------------------------------------
$("#startBtn").on("click", function(){
    $("#startBtn").remove(); 
    game.loadQuestion();
})
//because the DONE button is dynamically created at the end of the code, 
//the document on click function needs to be used.
$(document).on("click", ".answer-button", function(e){
    game.clicked(e);
})
$(document).on("click", "#reset", function(){
    game.reset();
})
//object to hold game stats and beginning and ending functions
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter <= 0){
            console.log('Time up');
            game.timeUp();
        }
    },
    loadQuestion: function (){
        $('#questionsContainer').empty();
        timer = setInterval(game.countdown, 1000);
        //why does adding 30 into the html work as a timer????????
        $('#questionsContainer').append('<h2> TIME REMAINING: </h2><h2><span id="counter">30</span> seconds</h2>');
        $('#questionsContainer').append('<h2>' + questions[game.currentQuestion].question + "</h2>");
        //why can we add answers.length to this?  The questions object sits outside of the game object...
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++){
            $('#questionsContainer').append('<button class="answer-button" id="button-' +i+ '" data-name="' + questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        $('#questionsContainer').html('<h2> You ran out of time </h2>');
        $('#questionsContainer').append('<h3> Correct answer: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        game.unanswered++;
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#questionsContainer').html('<h2> All Done!</h2>')
        $('#questionsContainer').append('<h2> Correct: ' + game.correct+ '</h2>');
        $('#questionsContainer').append('<h2> Incorrect: ' + game.incorrect+ '</h2>');
        $('#questionsContainer').append('<h2> Unanswered: ' + game.unanswered+ '</h2>');
        $('questionsContainer').append('<button id="reset"> RESET</button>');

    },
    clicked: function(e){
        clearInterval(timer);
        //target property specifies whichever item was clicked- why not use 'this'?
        if($(e.target).data('name')==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("yes");
        clearInterval(timer);
        game.correct++;
        $("#questionsContainer").html('<h2>Way to go!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("wrong");
        clearInterval(timer);
        game.incorrect++;
        $("#questionsContainer").html('</h2>That is incorrect</h2>');
        $('#questionsContainer').append('<h3> Correct answer: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
};

