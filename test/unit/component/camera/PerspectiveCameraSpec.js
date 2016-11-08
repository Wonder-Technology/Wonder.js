describe("PerspectiveCamera", function() {
    var sandbox = null;
    var camera = null;

    function build() {
        var camera = wd.PerspectiveCamera.create();

        return camera;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        camera = build();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("shallow clone fovy,aspect,far,near", function () {
            var fovy = 1,
                aspect = 0.5,
                far = 1000,
                near = 0.1;

            cloneTool.extend(camera, {
                fovy:fovy,
                aspect:aspect,
                far:far,
                near:near
            })

            var result = camera.clone();

            expect(result === camera).toBeFalsy();
            expect(result.fovy).toEqual(fovy);
            expect(result.aspect).toEqual(aspect);
            expect(result.far).toEqual(far);
            expect(result.near).toEqual(near);
        });
        it("clone pMatrix", function () {
            var pMatrix = wd.Matrix4.create().setTranslate(10,20,30);
            var origin = pMatrix.clone();

            cloneTool.extend(camera, {
                pMatrix:pMatrix
            })

            var result = camera.clone();

            camera.pMatrix.setTranslate(50,50,50);

            expect(result === camera).toBeFalsy();
            expect(testTool.getValues(result.pMatrix)).toEqual(testTool.getValues(origin));
        });
    });

    describe("convertWorldToScreen", function(){
        beforeEach(function(){

        });

        it("convert world coordinate to screen coordinate", function(){
            var screenWidth = 1000,
                screenHeight = 2000;

            camera.fovy = 60;
            camera.near = 0.1;
            camera.far = 100;
            camera.aspect = screenWidth / screenHeight;

            camera.worldToCameraMatrix = wd.Matrix4.create();
            camera.worldToCameraMatrix.lookAt(
                wd.Vector3.create(0, 1, 1),
                wd.Vector3.create(0, 0, 0),
                wd.Vector3.up
            );

            camera.init();

            var screenCoordinate = camera.convertWorldToScreen(0,0,0, screenWidth, screenHeight);

            expect([screenCoordinate.x, screenCoordinate.y]).toEqual(
                [500, 2732]
            );
        });
    });
});

