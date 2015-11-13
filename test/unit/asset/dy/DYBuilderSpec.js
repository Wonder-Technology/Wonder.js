describe("DYBuilder", function () {
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
        builder = new dy.DYBuilder();
        Color = dy.Color;
        Collection = dyCb.Collection;
        Hash = dyCb.Hash;

        json = {
            scene: {},
            materials: {},
            objects: []
        }

        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
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
                    sourceFile:"b.dy",
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

        //describe("build models", function(){
        //    var v1,n1,c1,u1,i1;
        //    var v2,n2,c2,u2,i2;
        //
        //
        //    beforeEach(function(){
        //        v1 = [1, 2, 3, 2, 3, 4, 2, 3, 4];
        //        n1 = [1, 2, 3, -2, 3, 4, -2, 3, 4];
        //        c1 = [0.1, 0.2, 0, 0.1, 0.2, 1, 0.1, 0.2, 1];
        //        u1 = [0.1,0.2,0.1,0.2, 0.1,0.2];
        //        i1 = [1,2,3];
        //
        //        v2 = [3, 2, 3, 2, 3, 4, 2, 3, 4];
        //        n2 = [-1, 2, 3, -2, 3, 4, -2, 3, 4];
        //        c2 = [0.5, 0.2, 0, 0.1, 0.2, 1, 0.1, 0.2, 1];
        //        u2 = [0.4,0.2,0.1,0.2, 0.1,0.2];
        //        i2 = [3,2,1];
        //    });
        //
        //    describe("build model geometry", function(){
        //        var copy;
        //
        //        beforeEach(function(){
        //            copy = setJson({
        //                materials: Hash.create({
        //                    aa:{
        //                        type: "LightMaterial",
        //                        diffuseColor: Color.create(1.0, 0.1, 0),
        //                        specularColor: Color.create(0.0, 0.1, 0),
        //                        diffuseMap: new dy.ImageTexture(),
        //                        specularMap: new dy.CompressedTexture(),
        //                        normalMap: new dy.ImageTexture(),
        //                        shininess: 32,
        //                        opacity: 1.0
        //                    }
        //                }),
        //                objects:{
        //                    a:{
        //                        material:"aa",
        //                        vertices:Collection.create(v1),
        //                        normals:Collection.create(n1),
        //                        morphTargets: [
        //                        ],
        //                        colors: Collection.create(c1),
        //                        uvs:Collection.create(u1),
        //                        indices:Collection.create(i1)
        //                    }
        //                }
        //            })
        //        });
        //
        //        it("test geometry", function(){
        //            var result = builder.build(json);
        //
        //            var geo = result.getChild("models").getChild(0).getComponent(dy.Geometry);
        //            expect(geo.vertices).toEqual(
        //                copy.objects.a.vertices
        //            );
        //            expect(geo.normals).toEqual(
        //                copy.objects.a.normals
        //            );
        //            expect(geo.texCoords).toEqual(
        //                copy.objects.a.uvs
        //            );
        //            expect(geo.colors).toEqual(
        //                copy.objects.a.colors
        //            );
        //            expect(geo.indices).toEqual(
        //                copy.objects.a.indices
        //            );
        //
        //            geo.init();
        //            expect(testTool.getValues(geo.colorBuffer.data)).toEqual(
        //                copy.objects.a.colors.getChildren()
        //            );
        //        });
        //        it("build material", function(){
        //            var result = builder.build(json);
        //
        //
        //            var materialData = copy.materials.getChild("aa");
        //            var geo = result.getChild("models").getChild(0).getComponent(dy.Geometry);
        //            var mat = geo.material;
        //            expect(mat.color).toEqual(
        //                materialData.diffuseColor
        //            );
        //            expect(mat.specular).toEqual(
        //                materialData.specularColor
        //            );
        //            expect(mat.diffuseMap).toEqual(materialData.diffuseMap);
        //            expect(mat.specularMap).toEqual(materialData.specularMap);
        //            expect(mat.normalMap).toEqual(materialData.normalMap);
        //            expect(mat.shininess).toEqual(materialData.shininess);
        //            expect(mat.opacity).toEqual(materialData.opacity);
        //        });
        //        it("build multi models", function(){
        //            json.materials.addChild("bb", {
        //                diffuseColor: Color.create(0.2, 0.1, 0.2),
        //                specularColor: Color.create(0.0, 0.1, 0),
        //                specularMap: new dy.CompressedTexture(),
        //                shininess: 32,
        //                opacity: 1.0
        //            });
        //            json.objects.b = {
        //                //parent:null,
        //                material:"bb",
        //                vertices:Collection.create(v2),
        //                normals:Collection.create(n2),
        //                morphTargets: [
        //                ],
        //                colors: Collection.create(c2),
        //                uvs:Collection.create(u2),
        //                indices:Collection.create(i2),
        //                children:{
        //                    bb:{
        //                        //parent:json.objects.b,
        //                        material:"aa",
        //                        morphTargets: [
        //                        ],
        //
        //                        colors: Collection.create(c1),
        //                        indices:Collection.create(i1),
        //                        children:{
        //                            //parent:json.objects.b.childern.bb,
        //                            bbb:{
        //                                material:"bb",
        //                                morphTargets: [
        //                                ],
        //
        //                                indices:Collection.create(i2)
        //                            }
        //                        }
        //                    }
        //
        //                }
        //            }
        //
        //            var result = builder.build(json);
        //
        //
        //            var materialData1 = copy.materials.getChild("aa");
        //            var materialData2 = copy.materials.getChild("bb");
        //            var geo1 = result.getChild("models").getChild(0).getComponent(dy.Geometry);
        //            var mat1 = geo1.material;
        //
        //            expect(mat1.color).toEqual(materialData1.diffuseColor);
        //
        //
        //
        //
        //            var m2 = result.getChild("models").getChild(1)
        //            var geo2 = m2.getComponent(dy.Geometry);
        //            expect(geo2.vertices).toEqual(
        //                copy.objects.b.vertices
        //            );
        //            expect(geo2.normals).toEqual(
        //                copy.objects.b.normals
        //            );
        //
        //            var mat2 = geo2.material;
        //            expect(mat2.color).toEqual(materialData2.diffuseColor);
        //
        //            var geo21 = m2.getChild(0).getComponent(dy.Geometry);
        //            expect(geo21.colors).toEqual(
        //                copy.objects.b.bb.colors
        //            )
        //
        //        });
        //    });
        //
        //    describe("build animation", function(){
        //        beforeEach(function(){
        //
        //        });
        //
        //        it("build multi models animation", function(){
        //
        //        });
        //    });
        //});
    });
});
