describe("GLTFAssembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Color = wd.Color,
        Collection = wdCb.Collection,
        Hash = wdCb.Hash;

    function setData(data) {
        testTool.extend(parseData, data);

        return testTool.extend(parseData);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new wd.GLTFAssembler();

        parseData = {
            //scene: {},
            //materials: {},
            //objects: []
        }

        //sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
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

            expect(data.getChild("metadata").getChildren()).toEqual(parseData.metadata);
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

            function getSingleModel(data){
                return data.getChild("models").getChild(0);
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
                expect(model.hasTag(wd.WDTag.CONTAINER)).toBeFalsy();




                setSingleObject({
                    isContainer:true,
                    components:Collection.create()
                })

                var data = builder.build(parseData);

                var model = getSingleModel(data);
                expect(model.hasTag(wd.WDTag.CONTAINER)).toBeTruthy();
            });

            describe("add components", function(){
                function getComponent(data){
                    return getSingleModel(data).getFirstComponent();
                }

                function judgeEqual(source, target){
                    expect(testTool.getValues(
                        source
                    )).toEqual(testTool.getValues(
                        target
                    ));
                }

                function judgeRotation(source, target){
                    expect(testTool.getValues(
                        [source.x, source.y, source.z, source.w]
                    )).toEqual(testTool.getValues(
                        [target.x, target.y, target.z, target.w]
                    ));
                }


                beforeEach(function(){

                });

                describe("add transform component", function(){
                    var matrix;

                    beforeEach(function(){
                        matrix = wd.Matrix4.create();
                    });

                    it("if matrix exist", function () {
                        var position = wd.Vector3.create(1,2,3);
                        var scale = wd.Vector3.create(2,2,2);
                        var rotation = wd.Quaternion.create(0,1,5,1);

                        matrix.setTRS(position, rotation, scale);

                        setComponent({
                            matrix: matrix
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.ThreeDTransform);
                        judgeEqual(component.position, matrix.getTranslation());
                        judgeRotation(component.rotation, matrix.getRotation())
                        judgeEqual(component.scale, matrix.getScale());
                    });
                    it("else if position,rotation,scale exist", function () {
                        var position = wd.Vector3.create(1,2,3);
                        var scale = wd.Vector3.create(2,2,2);
                        var rotation = wd.Quaternion.create(0,1,5,1);


                        setComponent({
                            position:position,
                            rotation:rotation,
                            scale:scale
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.ThreeDTransform);
                        matrix.setTRS(position, rotation, scale);
                        judgeEqual(component.position, matrix.getTranslation());
                        judgeRotation(component.rotation, matrix.getRotation())
                        judgeEqual(component.scale, matrix.getScale());
                    });

                });
            });
        });
    });
});

