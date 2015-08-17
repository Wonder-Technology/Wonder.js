var testTool = (function(){
    return {
        resPath: "base/",

        updateAction: function(time, gameObject){
            window.performance.now.returns(time);
            gameObject._actionManager.update(time);
        }
    }
}());
