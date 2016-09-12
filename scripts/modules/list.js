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

    return {
        toggleAddDialog:toggleAddDialog
    };
}