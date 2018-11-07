var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var friends = require("./App/Data/friends.js");

var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/App/Public/home.html'));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, '/App/Public/survey.html'));
});




app.post('/survey', function(req, res) {
    var reqBodyScores = req.body.scores;
    var bestMatchPerson;
    var bestMatchScoreDiff = 10000;

    for (var i = 0; i < friends.length; i++) {
        //NOw we are in our first array
        var scoreDiff = 0;
        for (var j = 0; j < friends[i].scores.length; j++) {
            //This iterates through our scores array
            var diff = Math.abs(friends[i].scores[j] - reqBodyScores[j]);
            scoreDiff += diff;
        }
        console.log(scoreDiff);
        if (bestMatchScoreDiff > scoreDiff) {
            bestMatchPerson = friends[i];
            bestMatchScoreDiff = scoreDiff;
        }

    }
    friends.unshift(req.body);
    console.log(friends);
    res.json(bestMatchPerson);
});

app.listen(PORT, function(err) {
    if (!err) {
        console.log('Success on PORT: ' + PORT);
    }
});