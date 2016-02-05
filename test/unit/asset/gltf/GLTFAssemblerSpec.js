describe("GLTFAssembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection,
        Hash = wdCb.Hash;
    var Vector2 = wd.Vector2;
    var Vector3 = wd.Vector3;

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

                describe("add ThreeDTransform component", function(){
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

                describe("add ModelGeometry component", function(){
                    beforeEach(function(){

                    });

                    it("create ModelGeometry", function(){
                        setComponent({
                            material:{
                                type:"BasicMaterial"
                            }
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.ModelGeometry);
                    });
                    it("add geometryData", function () {
                        var vertices = [Vector3.create(1,2,3), Vector3.create(2,2,3), Vector3.create(1,2,3)];
                        var colors = [Vector3.create(3,2,3), Vector3.create(2,2,3), Vector3.create(1,2,3)];
                        var texCoords = [Vector2.create(0.5, 0.1), Vector2.create(0.2,0.3), Vector2.create(0.2,0.1)];
                        var faces = [
                            wd.Face3.create(0, 1, 2)
                        ];
                        setComponent({
                            vertices:vertices,
                            colors:colors,
                            texCoords:texCoords,
                            faces:faces,

                            material:{
                                type:"BasicMaterial"
                            }
                        })



                        var data = builder.build(parseData);



                        var component = getComponent(data);
                        expect(component.vertices).toEqual(vertices);
                        expect(component.colors).toEqual(colors);
                        expect(component.texCoords).toEqual(texCoords);
                        expect(component.faces).toEqual(faces);
                    });
                    it("add drawMode", function () {
                        setComponent({
                            drawMode: wd.DrawMode.LINE_LOOP,

                            material:{
                                type:"BasicMaterial"
                            }
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component.drawMode).toEqual(wd.DrawMode.LINE_LOOP);
                    });


                    describe("add material", function(){
                        function getMaterial(data){
                            return getComponent(data).material;
                        }
                        function setMaterial(data){
                            setComponent({
                                material:data
                            })
                        }

                        function createColor(valueArr){
                            var color = wd.Color.create();

                            color.r = valueArr[0];
                            color.g = valueArr[1];
                            color.b = valueArr[2];

                            if(valueArr.length === 4){
                                color.a = valueArr[3];
                            }

                            return color;
                        }

                        function judgeColorEqual(source, target){
                            expect(source).toEqual(target);
                        }

                        beforeEach(function(){
                            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
                        });

                        it("if type === 'BasicMaterial', add BasicMaterial", function(){
                            setMaterial({
                                type:"BasicMaterial"
                            })

                            var data = builder.build(parseData);

                            var material = getMaterial(data);
                            expect(material.side).toEqual(wd.Side.FRONT);






                            setMaterial({
                                type:"BasicMaterial",
                                doubleSided:true
                            })

                        var data = builder.build(parseData);

                        var material = getMaterial(data);
                        expect(material).toBeInstanceOf(wd.BasicMaterial);
                            expect(material.side).toEqual(wd.Side.BOTH);
                        });

                        describe("else if type === 'LightMaterial', add LightMaterial", function(){
                            it("test", function(){
                                var materialData = {
                                    type:"LightMaterial",
                                    doubleSided:true,

                                    diffuseColor:createColor([1,1,0]),
                                    specularColor:createColor([0.2,1,0]),

                                    diffuseMap:wd.ImageTexture.create({}),
                                    specularMap:wd.ImageTexture.create({a:1}),

                                    shininess: 10
                                };
                                setMaterial(materialData);




                                var data = builder.build(parseData);




                                var material = getMaterial(data);
                                expect(material).toBeInstanceOf(wd.LightMaterial);
                                expect(material.side).toEqual(wd.Side.BOTH);
                                judgeColorEqual(material.color, materialData.diffuseColor);
                                judgeColorEqual(material.specular, materialData.specularColor);

                                expect(material.diffuseMap).toEqual(materialData.diffuseMap);
                                expect(material.specularMap).toEqual(materialData.specularMap);

                                expect(material.shininess).toEqual(materialData.shininess);
                            });

                            describe("test lightModel", function(){
                                it("if it's LAMBERT, log 'not support' info and use PHONG instead", function () {
                                    sandbox.stub(wd.Log, "log");
                                    setMaterial({
                                        type:"LightMaterial",
                                        lightModel:wd.LightModel.LAMBERT
                                    });




                                    var data = builder.build(parseData);


                                    expect(wd.Log.log).toCalledOnce();
                                    var material = getMaterial(data);
                                    expect(material.lightModel).toEqual(wd.LightModel.PHONG);
                                });
                                it("else, set lightModel", function () {
                                    setMaterial({
                                        type:"LightMaterial",
                                        lightModel:wd.LightModel.CONSTANT
                                    });




                                    var data = builder.build(parseData);


                                    var material = getMaterial(data);
                                    expect(material.lightModel).toEqual(wd.LightModel.CONSTANT);
                                });
                            });
                        });
                    });
                });

                it("add MeshRenderer component", function(){
                        setComponent({
                        })


                        var data = builder.build(parseData);

                        var component = getComponent(data);
                        expect(component).toBeInstanceOf(wd.MeshRenderer);
                });
            });
        });
    });
});

