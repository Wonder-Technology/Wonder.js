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
        },
        testScriptNotLoadScript: function (entityObject1, data1, done, isNotAdd) {
            var director = wd.Director.getInstance();

            var test1 = null;




            if(isNotAdd === true){
            }
            else{
                if(!wd.JudgeUtils.isEqual(entityObject1, director.scene)){
                    director.scene.addChild(entityObject1);
                }
            }







            director._init();


            wd.GlobalScriptUtils.addScriptToEntityObject(
                entityObject1,
                {
                    name:data1.scriptName,
                    class: data1.class
                }
            );



            test1 = entityObject1.scriptList.getChild(data1.scriptName);


            var execScript1 = entityObject1.execScript;

            entityObject1.execScript = function(scriptHandlerName){
                if(scriptHandlerName === "onEnter"){
                    data1.judgeOnEnter(test1, entityObject1);

                    execScript1.apply(entityObject1, arguments);

                    return;
                }

                if(scriptHandlerName === "init"){
                    data1.judgeInit && data1.judgeInit(test1, entityObject1);

                    execScript1.apply(entityObject1, arguments);

                    return;
                }


                execScript1.apply(entityObject1, arguments);
            }



            wd.GlobalScriptUtils.handlerAfterLoadedScript(entityObject1);




            data1.judgeBeforeLoopBody(test1, entityObject1);

            var time = 100;

            director._loopBody(time);


            data1.judgeAfterLoopBody(test1, time, entityObject1);

            done();
        },
        testTwoScriptsNotLoadScript: function (entityObject1, data1, data2, done, isNotAdd) {
            var director = wd.Director.getInstance();

            var test1 = null;
            var test2 = null;




            if(isNotAdd === true){
            }
            else{
                if(!wd.JudgeUtils.isEqual(entityObject1, director.scene)){
                    director.scene.addChild(entityObject1);
                }
            }







            director._init();


            wd.GlobalScriptUtils.addScriptToEntityObject(
                entityObject1,
                {
                    name:data1.scriptName,
                    class: data1.class
                }
            );

            wd.GlobalScriptUtils.addScriptToEntityObject(
                entityObject1,
                {
                    name:data2.scriptName,
                    class: data2.class
                }
            );



            test1 = entityObject1.scriptList.getChild(data1.scriptName);
            test2 = entityObject1.scriptList.getChild(data2.scriptName);


            var execScript1 = entityObject1.execScript;
            var count = 0;

            entityObject1.execScript = function(scriptHandlerName){
                if(scriptHandlerName !== "onEnter" && scriptHandlerName !== "init"){
                    execScript1.apply(entityObject1, arguments);

                    return
                }


                count ++;

                //script->onEnter
                if(count === 1){
                    //test = entityObject1.scriptList.getChild("test");

                    //if(test){
                    data1.judgeTest1OnEnter(test1, entityObject1);
                    //}

                    execScript1.apply(entityObject1, arguments);
                }

                //script->init
                else if(count === 2){
                    execScript1.apply(entityObject1, arguments);
                }

                //script2->onEnter
                else if(count === 3){
                    //test2 = entityObject1.scriptList.getChild("test2");
                    data2.judgeTest2OnEnter(test2, entityObject1);

                    execScript1.apply(entityObject1, arguments);
                }

                //script2->init
                else if(count === 4){
                    execScript1.apply(entityObject1, arguments);

                    //director._loopBody(1);
                }
            }



            wd.GlobalScriptUtils.handlerAfterLoadedScript(entityObject1);




            data1.judgeBeforeLoopBody(test1, entityObject1);
            data2.judgeBeforeLoopBody(test2, entityObject1);

            var time = 100;

            director._loopBody(time);


            data1.judgeAfterLoopBody(test1, time, entityObject1);
            data2.judgeAfterLoopBody(test2, time, entityObject1);

            done();
        },
        testScriptOfTwoGameObjectsNotLoadScript:function (entityObject1, data1, entityObject2, data2, done, isNotAdd) {
            var director = wd.Director.getInstance();

            var test1 = null;
            var test2 = null;




            if(isNotAdd === true){
            }
            else{
                if(!wd.JudgeUtils.isEqual(entityObject1, director.scene)){
                    director.scene.addChild(entityObject1);
                }
                if(!wd.JudgeUtils.isEqual(entityObject2, director.scene)){
                    director.scene.addChild(entityObject2);
                }
            }









            director._init();




            wd.GlobalScriptUtils.addScriptToEntityObject(
                entityObject1,
                {
                    name:data1.scriptName,
                    class: data1.class
                }
            );



            test1 = entityObject1.scriptList.getChild(data1.scriptName);


            var execScript1 = entityObject1.execScript;

            entityObject1.execScript = function(scriptHandlerName){
                if(scriptHandlerName === "onEnter"){
                    data1.judgeOnEnter(test1, entityObject1);

                    execScript1.apply(entityObject1, arguments);

                    return;
                }

                if(scriptHandlerName === "init"){
                    data1.judgeInit && data1.judgeInit(test1, entityObject1);

                    execScript1.apply(entityObject1, arguments);

                    return;
                }


                execScript1.apply(entityObject1, arguments);
            }



            wd.GlobalScriptUtils.handlerAfterLoadedScript(entityObject1);





            wd.GlobalScriptUtils.addScriptToEntityObject(
                entityObject2,
                {
                    name:data2.scriptName,
                    class: data2.class
                }
            );

            test2 = entityObject2.scriptList.getChild(data2.scriptName);


            var execScript2 = entityObject2.execScript;

            entityObject2.execScript = function(scriptHandlerName){
                if(scriptHandlerName === "onEnter"){
                    data2.judgeOnEnter(test2, entityObject2);

                    execScript2.apply(entityObject2, arguments);

                    return;
                }

                if(scriptHandlerName === "init"){
                    data2.judgeInit && data2.judgeInit(test2, entityObject2);

                    execScript2.apply(entityObject2, arguments);

                    return;
                }


                execScript2.apply(entityObject2, arguments);
            }



            wd.GlobalScriptUtils.handlerAfterLoadedScript(entityObject2);






            data1.judgeBeforeLoopBody(test1, entityObject1);
            data2.judgeBeforeLoopBody(test2, entityObject2);

            var time = 100;

            director._loopBody(time);


            data1.judgeAfterLoopBody(test1, time, entityObject1);
            data2.judgeAfterLoopBody(test2, time, entityObject2);

            done();
        }
    }
})();

