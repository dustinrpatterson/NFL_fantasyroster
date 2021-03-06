function PlayerController(){
  
  var playerService = new PlayerService()
  
//This invokes the updateRoster function once button is clicked to either add a player or remove a player 
  



  $('#roster').on('click', '.pickUpPlayer', function(){
    playerService.addPlayer(this.id)
    updateRoster(playerService.getPlayersData())
    updateMyTeam(playerService.getMyPlayers())
  })
  

  $('#myTeam').on('click', '.dropPlayer', function(){
    console.log("hi")
    debugger
    playerService.dropPlayer(this.id)
    updateMyTeam(playerService.getMyPlayers())
    updateRoster(playerService.getPlayersData())
  })


  function updateMyTeam(arr){
    myTeamElem = $('#myTeam')
    var myTeamTemplate = ""
    for (var i = 0; i < arr.length; i++) {
      var myPlayer = arr[i];
      myTeamTemplate += `
      <div class="card">
        <button class="dropPlayer" id="${myPlayer.id}"> Drop Player </button>
        <img class="player-image" src="${myPlayer.photo}" alt="Photo of: ${myPlayer.fullname}">
        <h4>${myPlayer.fullname}</h4>
        <h5>${myPlayer.pro_team}</h5>
        <h5>${myPlayer.position}</h5>
        <p>${myPlayer.jersey}</p>
       </div>    
      
      `
    }
    myTeamElem.empty()
    myTeamElem.append(myTeamTemplate);
  }

  function updateRoster(arr){
    var rosterElem = $('#roster')
    var nflTemplate = ''
    for (var i = 0; i < arr.length; i++) {
      var player = arr[i];
      nflTemplate += `
      <div class="card">
        <button class="pickUpPlayer" id="${player.id}"> Add Player </button>
        <img class="player-image" src="${player.photo}" alt="Photo of: ${player.fullname}">
        <h4>${player.fullname}</h4>
        <h5>${player.pro_team}</h5>
        <h5>${player.position}</h5>
        <p>${player.jersey}</p>
       </div>
 
      `
    }
    //you can also run rosterElem.empty().append(nflTemplate) FYI
    rosterElem.empty()
    rosterElem.append(nflTemplate);
    // registerRemove()
  } 
 
  
  
  
  playerService.getNFL(updateRoster)  
  
  
  
  
// updateRoster(playerService.getPlayers())
}
PlayerController()


