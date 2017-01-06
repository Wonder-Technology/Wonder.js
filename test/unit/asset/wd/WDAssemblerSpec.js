describe("WDAssembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection;
    var Vector2 = wd.Vector2;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;

    function setData(data) {
        return wdAssemblerTool.setData(parseData, data);
    }

    function getSingleModel (data){
        return wdAssemblerTool.getSingleModel(data);
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

        it("build metadata", function(){
            setData({
                metadata:{
                    "generator": "collada2gltf@ceec062e3d5793f2f249f53cbd843aee382ad40b",
                    "premultipliedAlpha": true,
                    "profile": {
                        "api": "WebGL",
                        "version": "1.0.2"
                    },
                    "version": 1
                }
            })

            var data = builder.build(parseData);

            expect(data.getChild("metadata")).toEqual(parseData.metadata);
        });

        describe("build model", function(){
            function setSingleObject(data){
                var objectData = Collection.create();
                objectData.addChild(data);

                setData({
                    objects:objectData
                });
            }
            function setComponent(data){
                var componentData = Collection.create();
                componentData.addChild(data);

                setSingleObject({
                    components:componentData
                });
            }

            beforeEach(function(){

            });

            it("if parseData.name exist, set model name", function () {
                setSingleObject({
                    name: "a",
                    components:Collection.create()
                })

                var data = builder.build(parseData);

                var model = getSingleModel(data);
                expect(model.name).toEqual("a");
            });
            it("if it's container, add tag", function(){
                setSingleObject({
                    components:Collection.create()
                })

                var data = builder.build(parseData);

                var model = getSingleModel(data);
                expect(model.hasTag(wd.EWDTag.CONTAINER)).toBeFalsy();




                setSingleObject({
                    isContainer:true,
                    components:Collection.create()
                })

                var data = builder.build(parseData);

                var model = getSingleModel(data);
                expect(model.hasTag(wd.EWDTag.CONTAINER)).toBeTruthy();
            });
            it("build children", function () {
                var data1 = {
                    name:"1",
                    components:Collection.create()
                };
                var data2 = {
                    name:"2",
                    components:Collection.create(),
                    children:Collection.create().addChild(data1)
                };
                var data3 = {
                    name:"3",
                    components:Collection.create()
                };

                var objectData = Collection.create();
                objectData.addChild(data2);
                objectData.addChild(data3);

                setData({
                    objects:objectData
                });





                var data = builder.build(parseData);





                var models = data.getChild("models");
                expect(models.getChildren().length).toEqual(2);

                var model1 = models.getChild(0);
                var model2 = models.getChild(1);

                expect(model1.name).toEqual("2");
                expect(model1.getChild(0).name).toEqual("1");

                expect(model2.name).toEqual("3");
            });
        });
    });
});

