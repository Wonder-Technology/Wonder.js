describe("ProgressBar", function () {
    var sandbox = null;
    var bar;
    var renderer;
    var gameObject;
    var director;

    var canvasPosition;

    function createBar() {
        bar = wd.ProgressBar.create();


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(bar);


        renderer = wd.UIRenderer.create();


        gameObject.addComponent(renderer);


        return gameObject;
    }

    function getCanvasPosition(webGLPosition){
        return wd.CoordinateUtils.convertWebGLPositionToCanvasPosition(webGLPosition);
    }

    function prepareForUpdateBeforeInit(){
        renderer.context = canvasTool.buildFakeContext(sandbox);
        renderer.context.canvas = {
            width:1000,
            height:500
        }

    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500
        });






        gameObject = createBar();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));



        director.scene.addChild(gameObject);






        bar.width = 400;
        bar.height = 50;
        bar.borderStyle = "gray";
        bar.fillStyle = "red";


        var webGLPosition = wd.Vector3.create(10, 20, 0);

        gameObject.transform.position = webGLPosition;

        canvasPosition = getCanvasPosition(webGLPosition);
    });
    afterEach(function () {
        testTool.clearInstance();
        gameObject.dispose();
        sandbox.restore();
    });
    
    describe("init", function(){
        beforeEach(function(){
            
        });
        
        it("ui can be init before init scene", function(){
            sandbox.spy(bar, "getContext");


            prepareForUpdateBeforeInit();

            gameObject.init();

            expect(bar.getContext).toCalledOnce();


            bar.percent = 0.5;

            gameObject.update(-1);


            expect(renderer.context.drawImage).toCalledOnce();



            director.scene.init();

            expect(bar.getContext).toCalledOnce();
        });
        it("get uiRenderer's context", function(){
            gameObject.init();

            expect(bar.context).toEqual(renderer.context);
        });

        describe("create offScreen canvas", function(){
            it("set it's size to equal ui canvas's size", function(){
                gameObject.init();

                expect(bar._offScreenCanvas.width).toEqual(1000);
                expect(bar._offScreenCanvas.height).toEqual(500);
            });
            it("create offScreen canvas, get its context", function(){
                gameObject.init();

                expect(bar._offScreenCanvas).not.toBeNull();
                expect(bar._offScreenContext).not.toBeNull();

            });
        });

        it("draw progress bar in offScreen", function(){
            var fakeOffScreenCanvas, fakeOffScreenContext;

            function buildFakeOffScreenCanvas(){
                fakeOffScreenContext = canvasTool.buildFakeContext(sandbox);

                fakeOffScreenCanvas = {
                    width:1000,
                    height:500,

                    getContext:sandbox.stub().returns(
                        fakeOffScreenContext
                    )
                }


                fakeOffScreenContext.canvas = fakeOffScreenCanvas;

                sandbox.stub(wdCb.DomQuery, "create").onCall(0).returns({
                    get:sandbox.stub().returns(
                        fakeOffScreenCanvas
                    ),
                    attr:sandbox.stub()
                });


                wdCb.DomQuery.create.onCall(1).returns({
                    get:sandbox.stub(),
                    remove:sandbox.stub()
                });
            }


            buildFakeOffScreenCanvas();

            gameObject.init();

            expect(fakeOffScreenContext.clearRect).toCalledWith(0, 0, fakeOffScreenCanvas.width, fakeOffScreenCanvas.height);

            expect(fakeOffScreenContext.save).toCalledOnce();
            expect(fakeOffScreenContext.beginPath).toCalledAfter(fakeOffScreenContext.save);


            expect(fakeOffScreenContext.moveTo).toCalledOnce();
            expect(fakeOffScreenContext.arcTo.callCount).toEqual(4);

            expect(fakeOffScreenContext.closePath).toCalledBefore(fakeOffScreenContext.stroke);

            expect(fakeOffScreenContext.stroke).toCalledOnce();
            expect(fakeOffScreenContext.fill).toCalledOnce();

            expect(fakeOffScreenContext.restore).toCalledOnce();
        });
    });

    describe("update", function(){
        beforeEach(function(){
            prepareForUpdateBeforeInit();

            gameObject.init();


            bar.percent = 0.5;

            gameObject.update(-1);
        });

        it("draw border", function(){
            expect(renderer.context.arcTo.callCount).toEqual(4);
            expect(renderer.context.stroke).toCalledOnce();
            expect(renderer.context.fill).not.toCalled();
        });
        it("draw offScreen canvas", function(){
            var context = renderer.context;

            expect(context.drawImage).toCalledOnce();
            expect(context.drawImage).toCalledWith(bar._offScreenCanvas, 0, 0,
                bar.width * bar.percent,
                bar.height,
                canvasPosition.x, canvasPosition.y,
                bar.width * bar.percent,
                bar.height
            );
        });
    });
});

