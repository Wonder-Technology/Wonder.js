describe("Camera", function() {
    var sandbox = null;
    var camera = null;

    function build() {
        var camera = new wd.Camera();

        return camera;
    }

    function setTransform(transform){
        camera.entityObject = {
            transform: transform
        };
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        camera = build();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("get cameraToWorldMatrix", function () {
        var matrix = {};
        setTransform({
            localToWorldMatrix: matrix
        });

        expect(camera.cameraToWorldMatrix).toEqual(matrix);
    });
    
    describe("worldToCameraMatrix", function () {
        it("if already set worldToCameraMatrix, just return it", function () {
            var matrix = {};
            camera.worldToCameraMatrix = matrix;

            expect(camera.worldToCameraMatrix).toEqual(matrix);
        });
        it("else, return cameraToWorldMatrix.invert()", function () {
            var matrix = {};
            var cameraToWorldMatrix = {
                invert:sandbox.stub().returns(matrix)
            };
            setTransform({
                localToWorldMatrix: {
                    clone: sandbox.stub().returns(cameraToWorldMatrix)
                }
            });

            expect(camera.worldToCameraMatrix).toEqual(matrix);
        });
    });

    describe("update", function(){
        beforeEach(function(){
            camera.updateProjectionMatrix = sandbox.stub();
        });

        it("if pMatrix is setted, not update", function () {
            camera.pMatrixDirty = true;
            camera.pMatrix = wd.Matrix4.create();

            camera.update();

            expect(camera.updateProjectionMatrix).not.toCalled();
        });
        it("if not pMatrixDirty, do nothing", function(){
            camera.pMatrixDirty = false;

            camera.update();

            expect(camera.updateProjectionMatrix).not.toCalled();
        });
        it("else, updateProjectionMatrix", function () {
            camera.pMatrixDirty = true;

            camera.update();

            expect(camera.updateProjectionMatrix).toCalledOnce();
        });
    });
});

