var scriptTool = (function () {
    return {
        testScript: function (entityObject, scriptName, judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done, isNotAdd) {
            var director = wd.Director.getInstance();

            var test = null;
            var execScript = entityObject.execScript;




            if(isNotAdd === true){
            }
            else{
                if(!wd.JudgeUtils.isEqual(entityObject, director.scene)){
                    director.scene.addChild(entityObject);
                }
            }


            entityObject.execScript = function(scriptHandlerName){
                if(scriptHandlerName === "onEnter"){
                    test = entityObject.scriptList.getChild(scriptName);
                    //if(test){
                        judgeOnEnter(test, entityObject);
                    //}

                    execScript.apply(entityObject, arguments);

                    return;
                }

                if(scriptHandlerName === "init"){
                    execScript.apply(entityObject, arguments);

                    director._loopBody(1);

                    return;
                }


                execScript.apply(entityObject, arguments);
            }




            var loopBody = director._loopBody;
            director._loopBody = function () {
                var time = 100;

                judgeBeforeLoopBody(test, entityObject);

                loopBody.call(director, time);

                judgeAfterLoopBody(test, time, entityObject);

                director.stop();

                done();
            };



            director._init();
        }
    }
})();

