//App initial defautl values    
let app = {
  isLoading: true,
  visibleCards: {},
  SelectedToBuyLists: [],
  spinner: document.querySelector('.loader'),
  listTemplate: document.querySelector('.listTemplate'),
  listItemTemplate: document.querySelector('.listItensTemplate'),
  container: document.querySelector('.main'),
  containerItensList: document.querySelector('.main-itens-list'),
  addDialog: document.querySelector('.dialog-container') 
};

let List = require('./modules/list.js')(app);

//Default ToBuyList
let fakeToBuyList = {    
  key : '0',
  label: 'Lista da semana',    
  tobuylist: [
      {name: 'egg', quantity: 2, unityPrice: 1.50},
      {name: 'bread', quantity: 6, unityPrice: 2.78},
      {name: 'chocolat', quantity: 60, unityPrice: 50}
    ]
}; 

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
  let key = countListItems + 1;        
  app.SelectedToBuyLists.push({key: key, label: label});
  app.updateToBuyListCards({key: key, label: label});        
  app.saveSelectedToBuyList();    
  List.toggleAddDialog(false);
});

//binds method to close modal on "cancel" button click 
document.getElementById('butAddCancel').addEventListener('click', function() {
  // Close the add new city dialog
  List.toggleAddDialog(false);
});

// Add code to save the users list of subscribed cities here
// Save list of cities to localStorage, see note below about localStorage.
app.saveSelectedToBuyList = function() {
  let SelectedToBuyLists = JSON.stringify(app.SelectedToBuyLists);
  // IMPORTANT: See notes about use of localStorage.
  localStorage.SelectedToBuyLists = SelectedToBuyLists;
};

// Updates a weather card with the latest weather ToBuyList. If the card
// doesn't already exist, it's cloned from the template.
app.updateToBuyListCards = function(data) {
  let card = app.visibleCards[data.key];
  if (!card) {
    card = app.listTemplate.cloneNode(true);
    card.classList.remove('listTemplate');
    card.querySelector('.list-name').textContent = data.label;
    card.removeAttribute('hidden');
    app.container.appendChild(card);
    app.visibleCards[data.key] = card;

    //binds method to click on the item and open its food list
    card.addEventListener('click', function() {
      app.container.setAttribute('hidden', true);
      app.containerItensList.removeAttribute('hidden');      
      let listItem = app.listItemTemplate;
      listItem.removeAttribute('hidden'); 
      listItem.cloneNode(true);        
      listItem.querySelector('.list-item-name').textContent = data.tobuylist[0].name;
      listItem.querySelector('.list-item-quant').textContent = data.tobuylist[0].quantity;
      listItem.querySelector('.list-item-price').textContent = data.tobuylist[0].unityPrice;
    });

  }
  if (app.isLoading) {
    app.spinner.setAttribute('hidden', true);
    app.container.removeAttribute('hidden');
    app.isLoading = false;
  }
};


//Gets all To Buy Lists
app.getToBuyLists = function() {      
    return app.SelectedToBuyLists;
}, 

//On firt load, checks if theres any list in localStorage 
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
    fakeToBuyList
  ];
  // load with data
  app.updateToBuyListCards(app.SelectedToBuyLists[0]);    
  app.saveSelectedToBuyList();
}