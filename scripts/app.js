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
  addDialog: document.querySelector('.dialog-container'),
  addItemDialog: document.querySelector('.dialog-container-item') 
};

//indexedDB.deleteDatabase('to-buy-lists')

const list_schema = {
  stores: [{
    name: 'list',
    keyPath: 'name',
    autoIncrement:true
  }, {
    name: 'list_item',
    indexes: {
      keyPath: 'name'
    }
  }]
};

var db = new ydn.db.Storage('to-buy-lists', list_schema);

let List = require('./modules/list.js')(app, db);

let homeComponent = require('./components/home.js')(List, app, db);
homeComponent.init();

let listComponent = require('./components/list.js')(List, app, db);
listComponent.init();

if (!window.indexedDB) {
    window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
}

var list_1 = {
  name: 'lista do mes'
};

db.put('list', list_1);

List.updateAppList();