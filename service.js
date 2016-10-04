// ENCAPSULATION
function PlayerService(){
 
  //alias for this 
  var playServ = this;

  //this is the entire NFL
  var playersData = [];
 
  //This is my selected team
  var myPlayers = [];
  
  //This is returning the entire NFL
  playServ.getPlayersData = function getPlayersData(){
    return playersData
  }

  //This is returning my selected team
  playServ.getMyTeam = function getMyTeam(){
    return myPlayers
  }
  
  //for loop looks for NFL ID. Once found, it pushes the playerToBeAdded to the myPlayers array
  playServ.addPlayer = function addPlayer(id){
    for (var i = 0; i < playersData.length; i++) {
      var playerToBeAdded = playersData[i];
      if (playerToBeAdded.id == id) {
        myPlayers.push(playerToBeAdded)
        playersData.splice(i,1)
        playServ.setMyTeam()
      }
    }
  }

  //for loop looks for NFL ID. Once found, it pushed the playerToBeDropped into the playersData array
  playServ.dropPlayer = function dropPlayer(id){
    for (var i = 0; i < myPlayers.length; i++) {
      var playerToBeDropped = myPlayers[i];
      if (playerToBeDropped.id == id) {
        myPlayers.splice(i,1)
        playersData.push(playerToBeDropped)
        playServ.setMyTeam()
      }
    }
  }

  
  playServ.getNFL = function loadPlayersData(callback){
      var localData = localStorage.getItem('playersData');

      if(localData){
        playersData = JSON.parse(localData);
        return callback(playersData); 
        //return will short-circuit the loadPlayersData function
        //this will prevent the code below from ever executing
      }else{
      
      var apiUrl = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var url = "https://bcw-getter.herokuapp.com/?url=";
      var endPointUrl = url + encodeURIComponent(apiUrl);
        $.getJSON(endPointUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback(playersData)
        });
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 
      }


    }   
    playServ.setMyTeam = function setMyTeam(){
      localStorage.setItem("myNFLTeam",JSON.stringify(myPlayers))
    }
    playServ.findMyTeam = function findMyTeam(callback){
      var temp = localStorage.getItem('myNFLTeam')
      if (temp) {
        myPlayers = JSON.parse(temp)
      }
      callback(myPlayers)
    }
}
