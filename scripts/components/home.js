module.exports = function(List, app, db){   

  var init = function(){
    //binds method to add another list 
    document.getElementById('butAdd').addEventListener('click', function() {
      // Open/show the add new city dialog
      List.toggleAddDialog(true);
    });

    //binds method to add list on "add" button click
    document.getElementById('butAddList').addEventListener('click', function() {
      // Add the newly created to buy list
      let newList = document.getElementById('NewListName');            
      let label = newList.value;          
      db.put('list', {name: newList.value});
      List.updateToBuyListCards({name: newList.value});            
      List.toggleAddDialog(false);
    });

    //binds method to close modal on "cancel" button click 
    document.getElementById('butAddCancel').addEventListener('click', function() {
      // Close the add new city dialog
      List.toggleAddDialog(false);
    });
  }

  return {
    init:init
  }

};