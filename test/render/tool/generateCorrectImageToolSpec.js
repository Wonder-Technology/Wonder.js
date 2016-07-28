var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getShadowInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, 60, 0);
        },
        getSpecificInstancePosition:function(index, range, count, x,y,z){
            var x = x !== null ? x : (range / 2 - this._getVal(index, count) * range);
            var y = y !== null ? y : (range / 2 - this._getVal(index + 1, count) * range);
            var z = z !== null ? z :(range / 2 - this._getVal(index + 2, count) * range);

            return wd.Vector3.create(x, y, z);
        },
        getInstanceRotation:function(index, count){
            var val = this._getVal(index, count);

            return wd.Vector3.create(90 * val, 90 * val,0);
        },
        getInstanceScale:function(index, count){
            return wd.Vector3.create(3,3,3);
        },
        _getVal:function(index, count){
            return randomTool.getFixedRandomNum(index);
        }
    }
})();




describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
            ])
            .do(function(){
                var director = wd.Director.getInstance();

                director.scene.addChild(createLine());
                director.scene.addChild(sceneTool.createCamera(20));

                director.start();
            });

        function createLine() {
            var line = wd.DashLine.create();


            var geometry = wd.DashLineGeometry.create();
            geometry.vertices.push(-10, -10, 0);
            geometry.vertices.push(-10, 10, 0);
            geometry.vertices.push(10, 10, 0);

            geometry.dashSize = 3;
            geometry.gapSize = 2;
            geometry.dashCount = 20;

            var material = wd.LineMaterial.create();
            material.color = wd.Color.create("rgb(1.0,0.0,1.0)");

            geometry.material = material;


            var lineObject = wd.GameObject.create();

            lineObject.addComponent(line);

            lineObject.addComponent(geometry);

            lineObject.addComponent(wd.MeshRenderer.create());

            return lineObject;
        }


    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();


        tester.execBody(body, done);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                                        frameIndex:1,
                    imageName:"ui_line_dash.png"
                },
            ]
        );
    });
});

