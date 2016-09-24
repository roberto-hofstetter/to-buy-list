module.exports = function(app){    
    // Toggles the visibility of the add new list dialog.    
    var toggleAddDialog = function(visible){
        app.isLoading = false;
        if (visible) {
            app.addDialog.classList.add('dialog-container--visible');
        } else {
            app.addDialog.classList.remove('dialog-container--visible');
        }          
    };

    //saves a new list to localStorage
    var saveSelectedToBuyList = function() {
        let SelectedToBuyLists = JSON.stringify(app.SelectedToBuyLists);
        // IMPORTANT: See notes about use of localStorage.
        localStorage.SelectedToBuyLists = SelectedToBuyLists;
    };
    
    //updates the html with the elements from a especific list 
    var updateToBuyListCards = function(data) {
        let card = app.visibleCards[data.id];
        if (!card) {
            card = app.listTemplate.cloneNode(true);
            card.classList.remove('listTemplate');
            card.querySelector('.list-name').textContent = data.label;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[data.id] = card;

            //binds method to click on the item and open its food list
            card.addEventListener('click', () => {                
                listItemsLogic(data);
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
                            
            data.tobuylist.map((item) => {                                  
                let lisItemParent = document.querySelector('.main-itens-list');
                let lisItemDiv = document.createElement('div');
                lisItemDiv.classList.add('card', 'listItensTemplate','item');

                lisItemDiv.innerHTML = "<div class='list-item-name'>Produto: "+item.name+"</div>"+
                                            "<div class='list-item-quant'>Quant: "+item.quantity+"</div> "+   
                                            "<div class='list-item-price'>Preço Uni: "+item.unityPrice+"</div>";                                                                 
                
                lisItemParent.appendChild(lisItemDiv);   

                //binds method to click on the item and open its food list
                lisItemDiv.addEventListener('click', function() {
                    //nao esta marcado
                    if(this.classList.value.indexOf('checked') == -1)
                        this.classList += ' checked';
                    else
                        this.classList.remove('checked');                    
                });
                                                      
            });
        }
    };


    //Gets all To Buy Lists
    var getToBuyLists = function() {      
        return app.SelectedToBuyLists;
    };


    return {
        toggleAddDialog: toggleAddDialog,
        getToBuyLists: getToBuyLists,
        saveSelectedToBuyList: saveSelectedToBuyList,
        updateToBuyListCards: updateToBuyListCards
    };
}