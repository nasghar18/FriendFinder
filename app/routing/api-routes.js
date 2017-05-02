// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // for(var i = 0; i < friendData.length; i++){

    // }
    function getSum(total, num){
      return total + num;
    }

    var newScores = [];
    for(var i = 0; i<req.body.scores.length; i++){
      var parseNum = parseInt(req.body.scores[i]);
      newScores.push(parseNum);
    }
    var scoreCompare = [];

    var totalDiff = [];

    for (var i=0; i < friendData.length; i++){
      var friendC = friendData[i].scores;
      console.log("FriendC before: " + friendC);

      for(var k = 0; k < friendC.length; k++){
      friendC[k] = parseInt(friendC[k]);
      }
      console.log("friendC: " + friendC);

      for (var j = 0; j < newScores.length; j++){
        scoreCompare[j]= Math.abs(friendC[j]-newScores[j]);
      }
      var Diff = scoreCompare.reduce(getSum);
      totalDiff.push(Diff);
      console.log(totalDiff);

    }

    function indexOfSmallest(a) {
      return a.indexOf(Math.min.apply(Math, a));
    }

    var indexDiff = indexOfSmallest(totalDiff);

    var result = friendData[indexDiff];


    //for (var i = 0; i < scoreCompare.length)

    friendData.push(req.body);

    console.log("New scores: " + newScores);
    console.log("Score difference: " + scoreCompare);
    res.json(result);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     tableData = [];
//     waitListData = [];

//     console.log(tableData);
//   });
};