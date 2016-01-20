var scriptTool = (function () {
    return {
        testScript: function (entityObject, scriptName, judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done) {
            var director = wd.Director.getInstance();

            var test = null;
            var execScript = entityObject.execScript;




            entityObject.execScript = function(scriptHandlerName){
                if(scriptHandlerName === "onEnter"){
                    test = entityObject.scriptList.getChild(scriptName);
                    judgeOnEnter(test, entityObject);

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


            if(!wd.JudgeUtils.isEqual(entityObject, director.scene)){
                director.scene.addChild(entityObject);
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

