var renderTestTool = (function(){
    return {
        getCenterPoint:function(){
            return {
                x:500,
                y:250
            }
        },
        prepareContext: function(){
            wd.Main.setConfig({
                    screenSize:{
                        x:0,
                        y:0,
                        width:1000,
                        height:500
                    }
                })
                .init();
        },
        destoryContext: function () {
            $("canvas").remove();
        }
    }
})();
