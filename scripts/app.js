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
  id : '0',
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

//On firt load, checks if theres any list in localStorage 
app.SelectedToBuyLists = localStorage.SelectedToBuyLists;

//if theres is a list, show then to the user on select
if (app.SelectedToBuyLists) {
  app.SelectedToBuyLists = JSON.parse(app.SelectedToBuyLists);
  app.SelectedToBuyLists.forEach(function(item) {
    // load with data
    List.updateToBuyListCards(item);
  });        
  List.saveSelectedToBuyList();
}
//if theres none, get the default and save to the select
else {  
  app.SelectedToBuyLists = [
    fakeToBuyList
  ];
  // load with data
  List.updateToBuyListCards(app.SelectedToBuyLists[0]);    
  List.saveSelectedToBuyList();
}