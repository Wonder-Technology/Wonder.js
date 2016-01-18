var scriptTool = (function () {
    return {
        testScript: function (entityObject, scriptName, judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done) {
            var director = wd.Director.getInstance();

            var test = null;
            var onEnter = director.scene.gameObjectScene.onEnter;
            director.scene.gameObjectScene.onEnter = function () {
                test = entityObject.scriptList.getChild(scriptName);
                judgeOnEnter(test, entityObject);
                onEnter.call(director.scene);
            };

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

            director.start();
        }
    }
})();

