describe("GLTFAssembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection,
        Hash = wdCb.Hash;

    function setData(data) {
        testTool.extend(parseData, data);

        return testTool.extend(parseData);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new wd.GLTFAssembler();

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
                    return getSingleModel(data).components.getChild(1);
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

                    function getComponent(data){
                        return getSingleModel(data).getFirstComponent();
                    }

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
                describe("add cameraController component", function(){
                    it("add BasicCameraController", function () {
                        var camera = wd.PerspectiveCamera.create();
                        camera.near = 0.1;

                        setComponent({
                            camera:camera
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.BasicCameraController);
                        expect(component.camera.near).toEqual(camera.near);
                    });
                });

                describe("add light component", function(){
                    var color;

                    beforeEach(function(){
                        color = wd.Color.create("#123456");
                    });

                    it("add AmbientLight", function(){
                        setComponent({
                            type:"ambient",
                            lightColor:color
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.AmbientLight);
                        expect(component.color).toEqual(color);
                    });
                    it("add DirectionLight", function(){
                        setComponent({
                            type:"directional",
                            lightColor:color
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.DirectionLight);
                        expect(component.color).toEqual(color);
                    });
                    it("add PointLight", function(){
                        setComponent({
                            type:"point",
                            lightColor:color,
                            distance: 10,
                            constantAttenuation:1,
                            linearAttenuation:0.1,
                            quadraticAttenuation:0.001
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.PointLight);
                        expect(component.color).toEqual(color);
                        expect(component.range).toEqual(10);
                        expect(component.linear).toEqual(0.1);
                        expect(component.quadratic).toEqual(0.001);
                    });
                });
            });
        });
    });
});

