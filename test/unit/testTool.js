var testTool = (function(){
    return {
        updateAction: function(time, gameObject){
            window.performance.now.returns(time);
            gameObject._actionManager.update(time);
        }
    }
}());
