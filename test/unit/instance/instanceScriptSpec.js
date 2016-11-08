describe("instance+script", function(){
    var gl;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var box1,box1Instance1;
    var instanceArr;

    var camera;

    var urlSource, urlInstance;

    var scriptSource, scriptInstance;

    //function prepare(){
    //    box1 = instanceTool.createBox();
    //    box1.name = "box1";
    //
    //    box1.addComponent(wd.Script.create());
    //
    //    var instanceArr = [];
    //
    //    instanceArr.push(box1);
    //
    //    box1Instance1 = instanceTool.cloneInstance(box1, "0");
    //    //box1Instance2 = instanceTool.cloneInstance(box1, "1");
    //
    //    instanceArr.push(box1Instance1);
    //
    //    //instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");
    //
    //
    //    director.scene.addChildren(instanceArr);
    //}

    function createBox(){
        box1 = instanceTool.createBox();
        box1.name = "box1";
    }

    function createInstance(){
        box1Instance1 = instanceTool.cloneInstance(box1, "box1Instance");
    }

    function addInstance(){
        instanceArr.push(box1Instance1);

        director.scene.addChildren(instanceArr);
    }

    var InstanceSourceScript = (function () {
        function Test(gameObject) {
            this.gameObject = null;
            this.recordArr = [];
            this.gameObject = gameObject;
        }
        Test.prototype.init = function () {
            this.recordArr.push(this.gameObject.name);
        };
        return Test;
    }());


    var InstanceInstanceScript = (function () {
        function Test(gameObject) {
            this.gameObject = null;
            this.recordArr = [];
            this.gameObject = gameObject;
        }
        Test.prototype.init = function () {
            this.recordArr.push(this.gameObject.name);
        };
        return Test;
    }());


    //     function testScriptOfTwoGameObjects (entityObject1, data1, entityObject2, data2, done, isNotAdd) {
    //         var director = wd.Director.getInstance();
    //
    //         var test1 = null;
    //         var test2 = null;
    //
    //
    //
    //
    //         if(isNotAdd === true){
    //         }
    //         else{
    //             if(!wd.JudgeUtils.isEqual(entityObject1, director.scene)){
    //                 director.scene.addChild(entityObject1);
    //             }
    //             if(!wd.JudgeUtils.isEqual(entityObject2, director.scene)){
    //                 director.scene.addChild(entityObject2);
    //             }
    //         }
    //
    //         var execScript1 = entityObject1.execScript;
    //
    //         entityObject1.execScript = function(scriptHandlerName){
    //             if(scriptHandlerName === "onEnter"){
    //                 test1 = entityObject1.scriptList.getChild(data1.scriptName);
    //                 //if(test){
    //                 data1.judgeOnEnter(test1, entityObject1);
    //                 //}
    //
    //                 execScript1.apply(entityObject1, arguments);
    //
    //                 return;
    //             }
    //
    //             if(scriptHandlerName === "init"){
    //                 execScript1.apply(entityObject1, arguments);
    //
    //                 //director._loopBody(1);
    //                 //
    //                 return;
    //             }
    //
    //
    //             execScript1.apply(entityObject1, arguments);
    //         }
    //
    //
    //
    //
    //         var execScript2 = entityObject2.execScript;
    //
    //
    //         entityObject2.execScript = function(scriptHandlerName){
    //             if(scriptHandlerName === "onEnter"){
    //                 test2 = entityObject2.scriptList.getChild(data2.scriptName);
    //                 //if(test){
    //                 data2.judgeOnEnter(test2, entityObject2);
    //                 //}
    //
    //                 execScript2.apply(entityObject2, arguments);
    //
    //                 return;
    //             }
    //
    //             if(scriptHandlerName === "init"){
    //                 execScript2.apply(entityObject2, arguments);
    //
    //                 //director._loopBody(1);
    //                 //
    //                 return;
    //             }
    //
    //
    //             execScript2.apply(entityObject2, arguments);
    //         }
    //
    //
    //
    //         //var loopBody = director._loopBody;
    //
    //
    //
    //
    //
    //
    //         //director._loopBody = function () {
    //         //    var time = 100;
    //         //
    //         //    data1.judgeBeforeLoopBody(test1, entityObject1);
    //         //    data2.judgeBeforeLoopBody(test2, entityObject2);
    //         //
    //         //    loopBody.call(director, time);
    //         //
    //         //    data1.judgeAfterLoopBody(test1, time, entityObject1);
    //         //    data2.judgeAfterLoopBody(test2, time, entityObject2);
    //         //
    //         //    director.stop();
    //         //
    //         //    done();
    //         //};
    //
    //
    //
    //         director._init();
    //
    //
    //         wd.GlobalScriptUtils.handlerAfterLoadedScript({
    //             name:data1.scriptName,
    //             class: InstanceSourceScript
    //         }, entityObject1);
    //
    //         wd.GlobalScriptUtils.handlerAfterLoadedScript({
    //             name:data2.scriptName,
    //             class: InstanceInstanceScript
    //         }, entityObject2);
    //
    //         data1.judgeBeforeLoopBody(test1, entityObject1);
    //         data2.judgeBeforeLoopBody(test2, entityObject2);
    //
    //         director._loopBody(1);
    //
    //
    //         data1.judgeAfterLoopBody(test1, entityObject1);
    //         data2.judgeAfterLoopBody(test2, entityObject2);
    // }



    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);



        camera = testTool.createCamera();


        director.scene.addChild(camera);

        instanceArr = [];


        //urlSource = testTool.resPath + "test/res/script/instance_source_script.js";
        //urlInstance = testTool.resPath + "test/res/script/instance_instance_script.js";
        //
        //
        //scriptSource = wd.Script.create();
        //scriptSource.url = urlSource;
        //
        //
        //scriptInstance = wd.Script.create();
        //scriptInstance.url = urlInstance;
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    it("source and instance share script", function(){
        createBox();
        box1.addComponent(scriptSource);

        createInstance();

        addInstance();


        scriptTool.testScriptOfTwoGameObjectsNotLoadScript(
            box1,
            {
                scriptName:"instance_source_script",
                class: InstanceSourceScript,
                judgeOnEnter: function(test){
                },
                judgeBeforeLoopBody:function(test){
                    expect(test.recordArr.length).toEqual(1);
                    expect(test.recordArr).toEqual([
                        "box1"
                    ]);
                },
                judgeAfterLoopBody:function(test, time, gameObject){

                }
            },
            box1Instance1,
            {
                scriptName:"instance_instance_script",
                class: InstanceInstanceScript,
                judgeOnEnter: function(test){
                },
                judgeBeforeLoopBody:function(test){
                    expect(test.recordArr.length).toEqual(1);
                    expect(test.recordArr).toEqual([
                        "box1Instance"
                    ]);
                },
                judgeAfterLoopBody:function(test, time, gameObject){
                }
            },
            true);
        });

    it("if source and instance add different Script component by user, they can be independent", function () {

    });
});
