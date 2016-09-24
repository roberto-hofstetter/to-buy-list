module.exports = function(List){   

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
      let countListItems = app.getToBuyLists().length;
      let id = countListItems + 1;        
      app.SelectedToBuyLists.push({id: id, label: label});
      List.updateToBuyListCards({id: id, label: label});        
      List.saveSelectedToBuyList();    
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