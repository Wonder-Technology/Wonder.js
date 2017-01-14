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

        it("clone left,right,top,bottom", function () {
            var left = 1,
                right = 10,
                top = 10,
                bottom = -10;

            cloneTool.extend(camera, {
                left:left,
                right:right,
                top:top,
                bottom:bottom
            })

            var result = camera.clone();

            expect(result === camera).toBeFalsy();
            expect(result.left).toEqual(left);
            expect(result.right).toEqual(right);
            expect(result.top).toEqual(top);
            expect(result.bottom).toEqual(bottom);
        });
    });
});

