describe("wd geometry assembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection;
    var Vector2 = wd.Vector2;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;

    function getComponent(data, _class){
        return wdAssemblerTool.getComponent(data, _class);
    }

    function setComponent(animData){
        wdAssemblerTool.setComponent(parseData, animData);
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

        describe("build model", function(){

            beforeEach(function(){

            });

            describe("add components", function(){
                beforeEach(function(){

                });

                describe("add ModelGeometry component", function(){
                    beforeEach(function(){
                    });

                    it("create ModelGeometry", function(){
                        setComponent({
                            material:{
                                type:"LightMaterial"
                            }
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.ModelGeometry);
                        //expect(component).toBeInstanceOf(wd.ModelGeometry);
                        expect(component).toBeExist();
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
                                type:"LightMaterial"
                            }
                        })



                        var data = builder.build(parseData);



                        var component = getComponent(data, wd.Geometry);
                        expect(component.vertices).toEqual(vertices);
                        expect(component.colors).toEqual(colors);
                        expect(component.texCoords).toEqual(texCoords);
                        expect(component.faces).toEqual(faces);
                    });

                    it("add drawMode", function () {
                        setComponent({
                            drawMode: wd.EDrawMode.LINE_LOOP,

                            material:{
                                type:"LightMaterial"
                            }
                        })

                        var data = builder.build(parseData);

                        var component = getComponent(data, wd.Geometry);
                        expect(component.drawMode).toEqual(wd.EDrawMode.LINE_LOOP);
                    });

                    describe("add material", function(){
                        function getMaterial(data){
                            return getComponent(data, wd.Geometry).material;
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

                        // it("if type === 'BasicMaterial', add BasicMaterial", function(){
                        //     setMaterial({
                        //         type:"BasicMaterial"
                        //     })
                        //
                        //     var data = builder.build(parseData);
                        //
                        //     var material = getMaterial(data);
                        //     expect(material.side).toEqual(wd.ESide.FRONT);
                        //
                        //
                        //
                        //
                        //
                        //
                        //     setMaterial({
                        //         type:"BasicMaterial",
                        //         doubleSided:true
                        //     })
                        //
                        // var data = builder.build(parseData);
                        //
                        // var material = getMaterial(data);
                        // expect(material).toBeInstanceOf(wd.BasicMaterial);
                        //     expect(material.side).toEqual(wd.ESide.BOTH);
                        // });

                        describe("else if type === 'LightMaterial', add LightMaterial", function(){
                            it("common test", function(){
                                var materialData = {
                                    type:"LightMaterial",
                                    doubleSided:true,

                                    diffuseColor:createColor([1,1,0]),
                                    specularColor:createColor([0.2,1,0]),

                                    diffuseMap:wd.ImageTexture.create({}),
                                    specularMap:wd.ImageTexture.create({a:1}),
                                    normalMap:wd.ImageTexture.create({a:1}),
                                    lightMap:wd.ImageTexture.create({a:1}),

                                    shininess: 10,

                                    transparent:true,
                                    opacity: 0
                                };
                                setMaterial(materialData);




                                var data = builder.build(parseData);




                                var material = getMaterial(data);
                                expect(material).toBeInstanceOf(wd.LightMaterial);
                                expect(material.side).toEqual(wd.ESide.BOTH);
                                judgeColorEqual(material.color, materialData.diffuseColor);
                                judgeColorEqual(material.specularColor, materialData.specularColor);

                                expect(material.diffuseMap).toEqual(materialData.diffuseMap);
                                expect(material.specularMap).toEqual(materialData.specularMap);
                                expect(material.lightMap).toEqual(materialData.lightMap);
                                expect(material.normalMap).toEqual(materialData.normalMap);

                                expect(material.shininess).toEqual(materialData.shininess);
                            });

                            describe("test set blend", function () {
                                it("set blendType to be NORMAL", function () {
                                    var materialData = {
                                        type:"LightMaterial",

                                        transparent:true,
                                        opacity: 0.1
                                    };
                                    setMaterial(materialData);




                                    var data = builder.build(parseData);




                                    var material = getMaterial(data);
                                    expect(material).toBeInstanceOf(wd.LightMaterial);
                                    expect(material.blend).toBeTruthy();
                                    expect(material.opacity).toEqual(0.1);
                                    expect(material.blendType).toEqual(wd.EBlendType.NORMAL);
                                });
                                it("test opacity = 0", function () {
                                    var materialData = {
                                        type:"LightMaterial",

                                        transparent:true,
                                        opacity: 0
                                    };
                                    setMaterial(materialData);




                                    var data = builder.build(parseData);




                                    var material = getMaterial(data);
                                    expect(material).toBeInstanceOf(wd.LightMaterial);

                                    expect(material.blend).toBeTruthy();
                                    expect(material.opacity).toEqual(0);
                                    expect(material.blendType).toEqual(wd.EBlendType.NORMAL);
                                });
                            });

                            describe("test lightModel", function(){
                                it("if it's LAMBERT, log 'not support' info and use PHONG instead", function () {
                                    sandbox.stub(wd.Log, "log");
                                    setMaterial({
                                        type:"LightMaterial",
                                        lightModel:wd.ELightModel.LAMBERT
                                    });




                                    var data = builder.build(parseData);


                                    expect(wd.Log.log).toCalledOnce();
                                    var material = getMaterial(data);
                                    expect(material.lightModel).toEqual(wd.ELightModel.PHONG);
                                });
                                it("else, set lightModel", function () {
                                    setMaterial({
                                        type:"LightMaterial",
                                        lightModel:wd.ELightModel.CONSTANT
                                    });




                                    var data = builder.build(parseData);


                                    var material = getMaterial(data);
                                    expect(material.lightModel).toEqual(wd.ELightModel.CONSTANT);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

