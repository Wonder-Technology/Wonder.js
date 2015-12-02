describe("WDBuilder", function () {
    var sandbox = null;
    var builder = null;
    var json = null;
    var Color,Collection,Hash;

    function setJson(data) {
        testTool.extend(json, data);

        return testTool.extend(json);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new wd.WDBuilder();
        Color = wd.Color;
        Collection = wdCb.Collection;
        Hash = wdCb.Hash;

        json = {
            scene: {},
            materials: {},
            objects: []
        }

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("build", function(){
        beforeEach(function(){

        });

        it("build metadata", function(){
            setJson({
                metadata:{
                    formatVersion:"0.1",
                    description:"aaa",
                    sourceFile:"b.wd",
                    generatedBy:"OBJConverter"
                }
            })

            var data = builder.build(json);

            expect(data.getChild("metadata").getChildren()).toEqual(json.metadata);
        });

        it("build scene", function(){
            setJson({
                scene:{
                    ambientColor: Color.create(1.0, 0, 0.5)
                }
            })

            var result = builder.build(json);

            expect(result.getChild("scene").getChild("ambientColor")).toEqual(json.scene.ambientColor);
        });
    });
});
