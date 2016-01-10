var scriptTool = (function () {
    return {
        testScript: function (gameObject, scriptName, judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done) {
            var director = wd.Director.getInstance();

            var test = null;
            var onEnter = director.scene.gameObjectScene.onEnter;
            director.scene.gameObjectScene.onEnter = function () {
                test = gameObject.scriptList.getChild(scriptName);
                judgeOnEnter(test, gameObject);
                onEnter.call(director.scene);
            };

            director.scene.addChild(gameObject);

            var loopBody = director._loopBody;
            director._loopBody = function () {
                var time = 100;

                judgeBeforeLoopBody(test, gameObject);

                loopBody.call(director, time);

                judgeAfterLoopBody(test, time, gameObject);

                director.stop();

                done();
            };

            director.start();
        }
    }
})();

