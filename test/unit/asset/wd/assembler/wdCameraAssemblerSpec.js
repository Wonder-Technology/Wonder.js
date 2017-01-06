describe("wd camera assembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection;
    var Vector2 = wd.Vector2;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;

    function getComponent(data, _class){
        return wdAssemblerTool.getComponent(data, _class);
    }

    function setComponent(animData){
        wdAssemblerTool.setComponent(parseData, animData);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new wd.WDAssembler();

        parseData = {
        };
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("build", function(){
        beforeEach(function(){

        });

        describe("build model", function(){

            beforeEach(function(){

            });

            describe("add components", function(){
                beforeEach(function(){

                });

                describe("add cameraController component", function(){
                    it("add BasicCameraController", function () {
                        var camera = wd.PerspectiveCamera.create();
                        camera.near = 0.1;

                        setComponent({
                            camera:camera
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.BasicCameraController);
                        expect(component).toBeInstanceOf(wd.BasicCameraController);
                        expect(component.camera.near).toEqual(camera.near);
                    });
                });
            });
        });
    });
});

