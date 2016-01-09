describe("event component", function () {
    var sandbox = null;
    var uiObject;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("integration test", function(){
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



        var eventTrigger = wd.EventTrigger.create();
        eventTrigger.triggerFirstSelected = true;

        uiObject.addComponent(eventTrigger);


        var eventTriggerDetector = wd.UIEventTriggerDetector.create();



        uiObject.addComponent(eventTriggerDetector);



        uiObject.transform.width = 200;
        uiObject.transform.height = 100;


        //uiObject.transform.scale = wd.Vector2.create(1,2);
        uiObject.transform.translate(300,100);






        scriptTool.testScript(uiObject, function(test){
            sandbox.spy(test, "onMouseClick");

        }, function(test){
            //todo pass fake event obj?
            //eventTool.triggerDomEvent(wd.EventName.CLICK, document.body);


            var fakeEvent = {
                pageX:310,
                pageY:110
            };
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

            expect(test.onMouseClick).toCalledOnce();





            fakeEvent = {
                pageX:299,
                pageY:110
            };
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

            expect(test.onMouseClick).not.toCalledTwice();

        }, function(test, time, gameObject){
        }, done);
    });
});

