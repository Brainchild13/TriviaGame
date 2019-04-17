$(document).ready(function() {
  var questions = [
    {
      question1: "What is the oldest black Fraternity on UCLA's campus?",
      choice: [
        "Alpha Phi Alpha",
        "Kappa Alpha Psi",
        "Phi Beta Sigma",
        "Omega Psi Phi"
      ],
      answer: 1
    },
    {
      question:
        "Which person is a famous member of this fraternity and chapter member at UCLA?",
      choice: [
        "Arthur Ashe",
        "Johnny Cochran",
        "Tom Bradley",
        "All of the above"
      ],
      answer: 3
    },
    {
      question: "What university was the fraternity founded?",
      choice: [
        "Morehouse College",
        "Howard University",
        "Indiana University",
        "Harvard University"
      ],
      answer: 2
    },
    {
      question: "What are the official colors of this fraternity?",
      choice: [
        "Red and White",
        "Blue and Gold",
        "Crimson and Cream",
        "Black and White"
      ],
      answer: 2
    },
    {
      question: "What year was the fraternity founded?",
      choice: ["1901", "1934", "1922", "1911"]
    }
  ];
  var correctAnswers = 0;
  var wrongAnswers = 0;
  var noAnswer = 0;
  var time = 60;
  var intervalId;
  var userGuess = "";
  var running = false;
  var questionCount = questions.length;
  var choices;
  var index;
  var newArray = [];
  var answerHolder = [];

  //testing
  console.log(time);

  $("#reset").hide();

  //start button to begin the game
  $("#start").on("click", function() {
    $("#start").hide();
    showQuestion();
    startTimer();
    for (var i = 0; i < questions.length; i++) {
      answerHolder.push(questions[i]);
    }
  });

  //start the timer
  function startTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }

  //countdown the timer
  function decrement() {
    $("#time-left").html("<h2>Time Remaining: " + time + "</h2>");
    time--;
    //timer stop if it equals 0

    if (time === 0) {
      noAnswer++;
      stop();
      $("#answer-block").html(
        "<p>Time is Up! The correct answer is : " +
          choices.index[choices.answer] +
          "</p>"
      );
    }
  }

  //stop timer
  function stop() {
    running = false;
    clearInterval(intervalId);
  }

  function displayQuestion() {
    index = Math.floor(Math.random() * questions.length);
    choices = questions[index];

    if (choices.shown) {
      displayQuestion();
    } else {
      console.log(choices.question);
      $("#question-block").html("<h2>" + choices.question + "</h2>");
      for (var i = 0; i < questions.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(choices.choice[i]);
        userChoice.attr("data-guessvalue", i);
        $("#answer-block").append(userChoice);
      }
    }
  }

  $(".answerchoice").on("click", function() {
    if (userGuess === questions.answer) {
      userGuess = parseInt($(this).attr("data-guessvalue"));

      if (userGuess === choices.answer) {
        stop();
        correctCount++;
        userGuess = "";
        $("answer-block").html("<p>Correct!</p>");
      } else {
        stop();
        wrongCount++;
        userGuess = "";
        $("#answer-block").html(
          "<p>Wrong! The correct answer is: " +
            questions.choice[questions.answer] +
            "</p>"
        );
      }
    }
  });
  function endGame () {
      if (wrongAnswers + correctAnswers + noAnswers === questionCount) {
        $("#question-block").empty();
        $("#question-block").html("<h2>Game Over! Here is your statistics: </h2>");
        $("#answer-block").append("<h3>Correct: " + correctAnswers + "</h3>");
        $("#answer-block").append("<h3>Incorrect: " + wrongAnswers + "</h3>");
        $("#answer-block").append("<h3>Unanswered: " + noAnswer + "</h3>");
        $("#reset").show();
        correctAnswers = 0;
        wrongAnswers = 0;
        noAnswer = 0;
      } else {
        startTimer();
        showQuestion();
      }
    } 3000);
  }

$("#reset").on("click", function() {
  $("#reset").hide();
  $("#answer-block").empty();
  $("#question-block").empty();
  for (var i = 0; i < answerHolder.length; i++) {
    questions.push(questions[i]);
  }
  startTimer();
  showQuestion();
});

// function gamePlay() {
//   $(".startBtn").on("click", function() {
//     $("button").remove(".startBtn");
//     quest1();
//   });
// }
// function quest1()
// {
//   var newDiv = $('<div class ="questions question1">');
//   newDiv.html(questions.question1);

//   $('.btnContainer').append(newDiv);
//   intervalId = setInterval(timeCount, 1000);

// function timeCount() {
//   time--;
//   console.log(time);
//   if(time=== 0)
