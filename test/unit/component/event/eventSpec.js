describe("event component", function () {
    var sandbox = null;
    var uiObject;
    var director;

    var manager;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500,

            offset:{
                x:0,
                y:0
            }
        });


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));



        manager = wd.EventManager;

    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("integration test", function(){
        it("test trigger UIObject event script", function(done){
            function createUIRenderer(){
                var renderer = wd.UIRenderer.create();

                return renderer;
            }

            function createProgressBar(renderer){
                var bar = wd.ProgressBar.create();


                var barUIObject = wd.UIObject.create();

                barUIObject.addComponent(bar);


                barUIObject.addComponent(renderer);

                return barUIObject;
            }



            var url = "http://" + location.host + "/" + testTool.resPath + "test/res/script/event.js";


            var renderer = createUIRenderer();
            uiObject = createProgressBar(renderer);




            uiObject.addComponent(wd.Script.create(url));



            var eventTriggerDetector = wd.UIEventTriggerDetector.create();



            uiObject.addComponent(eventTriggerDetector);



            uiObject.transform.width = 200;
            uiObject.transform.height = 100;


            //uiObject.transform.scale = wd.Vector2.create(1,2);
            uiObject.transform.translate(300,100);






            scriptTool.testScript(uiObject, "event", function(test){
                sandbox.spy(test, "onMouseClick");

            }, function(test){
                //todo pass fake event obj?
                //eventTool.triggerDomEvent(wd.EventName.CLICK, document.body);


                var fakeEvent = {
                    pageX: 300 - 200 / 2,
                    pageY:100 - 100 / 2
                };
                manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                expect(test.onMouseClick).toCalledOnce();





                fakeEvent = {
                    pageX: 300 - 200 / 2 - 1,
                    pageY:100 - 100 / 2
                };
                manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                expect(test.onMouseClick).not.toCalledTwice();

            }, function(test, time, gameObject){
            }, done);
        });
        it("test trigger GameObject event script", function(){
            //todo
        });
    });
});

