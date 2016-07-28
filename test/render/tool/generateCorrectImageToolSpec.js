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
describe("generate correct image lightTool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/texture/1.jpg", id: "texture"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChildren(createInstances());
//            director.scene.addChild(createAmbientLight());
//            director.scene.addChild(createDirectionLight());
            director.scene.addChild(sceneTool.createCamera(300));

            director.start();
        }

        function createInstances(){
            var arr = [],
                model = createBillboardAllPlane(),
                range = 300,
                count = 10;

            var sourceInstanceComponent = wd.SourceInstance.create();
            model.addComponent(sourceInstanceComponent);

            arr.push(model);

            for(var i = 0; i < count; i++){
                var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                instance.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, null, null);
                instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                instance.transform.scale = instanceTool.getInstanceScale(i, count);

                arr.push(instance);
            }

//            return model;
            return arr;
        }


        function createBillboardAllPlane(){
            var material = wd.BasicMaterial.create();
            material.map = wd.LoaderManager.getInstance().get("texture").toTexture();


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var billboard = wd.Billboard.create();
            billboard.mode = wd.EBillboardMode.ALL;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(billboard);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
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
                    imageName:"instance_billboard"
                },
            ]
        );
    });
});

