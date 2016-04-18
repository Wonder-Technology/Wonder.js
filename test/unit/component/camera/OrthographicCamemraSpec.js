describe("OrthographicCamera", function() {
    var sandbox = null;
    var camera = null;

    function build() {
        var camera = wd.OrthographicCamera.create();

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

        it("shallow clone left,right,top,bottom,far,near", function () {
            var left = 1,
                right = 10,
                top = 10,
                bottom = -10,
                far = 1000,
                near = 0.1;

            cloneTool.extend(camera, {
                left:left,
                right:right,
                top:top,
                bottom:bottom,
                far:far,
                near:near
            })

            var result = camera.clone();

            expect(result === camera).toBeFalsy();
            expect(result.left).toEqual(left);
            expect(result.right).toEqual(right);
            expect(result.top).toEqual(top);
            expect(result.bottom).toEqual(bottom);
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
});

