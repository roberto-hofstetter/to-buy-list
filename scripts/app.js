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

let home = require('./components/home.js')(List);
home.init();

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