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

                //pra cada item da lista de compras, clona um elemente da lista do html e appenda
                let listItem = app.listItemTemplate;
                listItem.removeAttribute('hidden'); 
                var cloned = listItem.cloneNode(true);
                listItem.appendChild(cloned);

                listItem.querySelector('.list-item-name').textContent = item.name;
                listItem.querySelector('.list-item-quant').textContent = item.quantity;
                listItem.querySelector('.list-item-price').textContent = item.unityPrice;                            
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