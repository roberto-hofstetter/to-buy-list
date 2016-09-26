module.exports = function(List, app, db){   

  var init = function(){
    //binds method to add another list 
    document.getElementById('butAddItem').addEventListener('click', function() {
      // Open/show the add new city dialog
      List.toggleAddItemDialog(true);
    });

    //binds method to add list on "add" button click
    document.getElementById('butAddItemSave').addEventListener('click', function() {
      
      //find the list by id
      let btnAdd = document.getElementById('butAddItem');
      let item_id = btnAdd.getAttribute('data-id');            

      // Add the newly created item to buy list
      let newItem = document.getElementById('NewItemName');            
      let label = newItem.value;    
      let newItemQuant = document.getElementById('NewItemQuant');            
      let labelQuant = newItemQuant.value;    
      let newItemPrice = document.getElementById('NewItemPrice');            
      let labelPrice = newItemPrice.value;    
      
      var obj = {
          name: label, 
          quantity: labelQuant, 
          unityPrice: labelPrice
      }

      db.put('list_item', obj, [item_id, obj.name]);      
      List.updateItemsListCard(obj);            
      List.toggleAddItemDialog(false);
    });

    // //binds method to close modal on "cancel" button click 
    document.getElementById('butAddItemCancel').addEventListener('click', function() {
      // Close the add new city dialog
      List.toggleAddItemDialog(false);
    });

    document.getElementById('back').addEventListener('click', function(){
        app.containerItensList.setAttribute('hidden', true);
        app.container.removeAttribute('hidden');
        document.getElementById('back').setAttribute('hidden', true);
        document.getElementById('butAddItem').setAttribute('hidden', true);
        document.getElementById('butAdd').removeAttribute('hidden');
    });
  }

  return {
    init:init
  }

};