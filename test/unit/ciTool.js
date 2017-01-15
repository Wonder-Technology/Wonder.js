var ciTool = (function () {
    return {
        isTestInCI: function(){
            return bowser.firefox;
        }
    }
})()
