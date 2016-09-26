module.exports = function(app, db){    
    // Toggles the visibility of the add new list dialog.    
    var toggleAddDialog = function(visible){
        app.isLoading = false;
        if (visible) {
            app.addDialog.classList.add('dialog-container--visible');
        } else {
            app.addDialog.classList.remove('dialog-container--visible');
        }          
    };

    // Toggles the visibility of the add new list dialog.    
    var toggleAddItemDialog = function(visible){        
        if (visible) {
            app.addItemDialog.classList.add('dialog-container-item--visible');
        } else {
            app.addItemDialog.classList.remove('dialog-container-item--visible');
        }          
    };

    var updateAppList = function(){        
        db.from('list').list(10).done(function(list) {
        app.SelectedToBuyLists = list;
        //if theres is a list, show then to the user on select
        if (list) {    
            list.forEach(function(item) {      
                // load with data                
                updateToBuyListCards(item);
            });                    
        }
        });
    }

    var getListItemsByList = function(list){     
        let lisItemParent = document.querySelector('.main-itens-list');
        
        for(var i = 0; i < lisItemParent.childNodes.length; i++){
            lisItemParent.removeChild(lisItemParent.childNodes[i]);
        }

        db.values('list_item', ydn.db.KeyRange.starts([list])).done(function(keys) {
            for (var i = 0; i < keys.length; i++) {
                
                
                let lisItemDiv = document.createElement('div');
                lisItemDiv.classList.add('card', 'listItensTemplate','item');

                lisItemDiv.innerHTML = "<div class='list-item-name'>Produto: "+keys[i].name+"</div>"+
                                            "<div class='list-item-quant'>Quant: "+keys[i].quantity+"</div> "+   
                                            "<div class='list-item-price'>Preço Uni: "+keys[i].unityPrice+"</div>";                                                                 
                
                lisItemParent.appendChild(lisItemDiv);   

                console.log(lisItemDiv)

                //binds method to click on the item and open its food list
                lisItemDiv.addEventListener('click', function(e) {
                    console.log(e)
                    //nao esta marcado
                    if(this.classList.value.indexOf('checked') == -1)
                        this.classList += ' checked';
                    else
                        this.classList.remove('checked');  
                });
            }
        });
    }
    
    //updates the html with the elements from a especific list 
    var updateToBuyListCards = function(data) {
        let card = app.visibleCards[data.id];
        if (!card) {
            card = app.listTemplate.cloneNode(true);
            card.classList.remove('listTemplate');
            card.querySelector('.list-name').textContent = data.name;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[data.name] = card;

            //binds method to click on the item and open its food list
            card.addEventListener('click', () => {                
                let lisItemParent = document.querySelector('.main-itens-list');
        
                for(var i = 0; i < lisItemParent.childNodes.length; i++){
                    lisItemParent.removeChild(lisItemParent.childNodes[i]);
                }
                
                listItemsLogic(data);

                //hide the add and button list, and show the add item list
                document.getElementById('butAdd').setAttribute('hidden', true);
                //sets the list id to the add button                
                document.getElementById('butAddItem').setAttribute('data-id', data.name);
                document.getElementById('butAddItem').removeAttribute('hidden');
               
                document.getElementById('back').removeAttribute('hidden');

            });

        }
        if (app.isLoading) {
            app.spinner.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }

        function listItemsLogic(){                 
            app.container.setAttribute('hidden', true);
            app.containerItensList.removeAttribute('hidden');                                      
                            
            getListItemsByList(data.name);                
        }
    };

    var updateItemsListCard = function(obj){       
        let lisItemParent = document.querySelector('.main-itens-list');
 
        let lisItemDiv = document.createElement('div');
        lisItemDiv.classList.add('card', 'listItensTemplate','item');

        lisItemDiv.innerHTML = "<div class='list-item-name'>Produto: "+obj.name+"</div>"+
                                    "<div class='list-item-quant'>Quant: "+obj.quantity+"</div> "+   
                                    "<div class='list-item-price'>Preço Uni: "+obj.unityPrice+"</div>";                                                                 
        
        lisItemParent.appendChild(lisItemDiv);                        
    }

    return {
        toggleAddDialog: toggleAddDialog,
        toggleAddItemDialog: toggleAddItemDialog,
        updateToBuyListCards: updateToBuyListCards,
        updateItemsListCard: updateItemsListCard,
        updateAppList:updateAppList        
    };
}