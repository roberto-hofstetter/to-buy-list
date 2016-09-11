
(function() {
  'use strict';
  
  /*****************************************************************************
   *
   * Default ToBuyList
   *
   ****************************************************************************/
  // var fakeToBuyList = {    
  //   key : '0',
  //   label: 'Lista da semana',    
  //   todolist: {
  //     data: [
  //       {name: 'ovo', quantity: 2, unityPrice: 1.50},
  //       {name: 'pão', quantity: 6, unityPrice: 2.78},
  //       {name: 'chocolate', quantity: 60, unityPrice: 50}
  //     ]
  //   }
  // };

  /*****************************************************************************
   *
   * App initial defautl values
   *
   ****************************************************************************/  
  var app = {
    isLoading: true,
    visibleCards: {},
    SelectedToBuyLists: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container') 
  };  

  /*****************************************************************************
   *
   * Gets all To Buy Lists
   *
   ****************************************************************************/      
  app.getToBuyLists = function(key, label) {        
    return app.SelectedToBuyLists;
  };

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  // document.getElementById('butRefresh').addEventListener('click', function() {
  //   // Refresh all of the ToBuyLists
  //   app.updateToBuyLists();
  // });

  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new city dialog
    app.toggleAddDialog(true);
  });

  document.getElementById('butAddList').addEventListener('click', function() {
    // Add the newly created to buy list
    var newList = document.getElementById('NewListName');            
    var label = newList.value;    
    var countListItems = app.getToBuyLists().length;
    var key = countListItems + 1;        
    app.SelectedToBuyLists.push({key: key, label: label});
    app.updateToBuyListCards({key: key, label: label});        
    app.saveSelectedToBuyList();    
    app.toggleAddDialog(false);
  });

  document.getElementById('butAddCancel').addEventListener('click', function() {
    // Close the add new city dialog
    app.toggleAddDialog(false);
  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new list dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  // Add code to save the users list of subscribed cities here
  // Save list of cities to localStorage, see note below about localStorage.
  app.saveSelectedToBuyList = function() {
    var SelectedToBuyLists = JSON.stringify(app.SelectedToBuyLists);
    // IMPORTANT: See notes about use of localStorage.
    localStorage.SelectedToBuyLists = SelectedToBuyLists;
  };

  // Updates a weather card with the latest weather ToBuyList. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateToBuyListCards = function(data) {
    var card = app.visibleCards[data.key];
    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.list-name').textContent = data.label;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[data.key] = card;
    }
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };  

  // Iterate all of the cards and attempt to get the latest ToBuyList data
  // app.updateToBuyLists = function() {
  //   var keys = Object.keys(app.visibleCards);
  //   keys.forEach(function(key) {
  //     app.getToBuyList(key);
  //   });
  // };

  /*****************************************************************************
   *
   * On firt load, checks if theres any list in localStorage
   *
   ****************************************************************************/    
  app.SelectedToBuyLists = localStorage.SelectedToBuyLists;

  //if theres is a list, show then to the user on select
  if (app.SelectedToBuyLists) {
    app.SelectedToBuyLists = JSON.parse(app.SelectedToBuyLists);
    app.SelectedToBuyLists.forEach(function(item) {
      // load with data
      app.updateToBuyListCards(item);
    });        
    app.saveSelectedToBuyList();
  }
  //if theres none, get the default and save to the select
  else {  
    app.SelectedToBuyLists = [
      {key: fakeToBuyList.key, label: fakeToBuyList.label}
    ];
    // load with data
    app.updateToBuyListCards(app.SelectedToBuyLists[0]);    
    app.saveSelectedToBuyList();
  }

})();
