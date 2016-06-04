describe("Geometry", function() {
    var sandbox = null;
    var Geometry = null;
    var geo;

    function createGeometry(_class, shading){
        geo = new _class();
        geo.material = {
            init:sandbox.stub(),
            shading: shading || wd.EShading.FLAT
        };

        return geo;
    }

    function createFaces(indices, normals){
        return wd.GeometryUtils.convertToFaces(indices, normals);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Geometry = wd.Geometry;
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("dispose", function(){
        var geo;

        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionVAO = {};

            geo = createGeometry(wd.RectGeometry);

            geo.init();

            geo.material = {
                dispose:sandbox.stub()
            }
        });

        //todo test more

        it("dispose vaoManager", function(){
            sandbox.stub(geo.vaoManager, "dispose");

            geo.dispose();

            expect(geo.vaoManager.dispose).toCalledOnce();
        });
    });

    describe("defer create buffer ", function(){
        var geo,arrayBuffer,eleBuffer;

        beforeEach(function(){
            arrayBuffer = {
                resetData:sandbox.stub()
            };
            eleBuffer = {
                resetData:sandbox.stub()
            };
            sandbox.stub(wd.ArrayBuffer, "create").returns(arrayBuffer);
            sandbox.stub(wd.ElementBuffer, "create").returns(eleBuffer);
            geo = createGeometry(wd.RectGeometry);
            geo.material.color = wd.Color.create("#ffffff");
        });

        describe("when init", function(){
            beforeEach(function(){

            });

            it("create BufferContainer and add geometry data", function(){
                expect(geo.buffers).toBeNull();

                geo.init();

                expect(geo.buffers).toBeInstanceOf(wd.BufferContainer);
                expect(geo.buffers.geometryData.vertices).toEqual(jasmine.any(Array));
                expect(geo.buffers.geometryData.indices).toEqual(jasmine.any(Array));
                expect(geo.buffers.geometryData.normals).toEqual(jasmine.any(Array));
                expect(geo.buffers.geometryData.texCoords).toEqual(jasmine.any(Array));
                expect(geo.buffers.geometryData.colors).toEqual(
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                );
            });
            it("not create buffers", function () {
                geo.init();

                expect(wd.ArrayBuffer.create).not.toCalled();
                expect(wd.ElementBuffer.create).not.toCalled();
            });
        });

        describe("when invoke BufferContainer->getChild", function(){
            beforeEach(function(){
                geo.init();
            });

            it("if the buffer is cached, return the cached one", function(){
                var result1 = geo.buffers.getChild(wd.EBufferDataType.VERTICE);

                var result2 = geo.buffers.getChild(wd.EBufferDataType.VERTICE);

                expect(wd.ArrayBuffer.create).toCalledOnce();
                expect(result1).toEqual(result2);
            });
            it("else, create buffer and add it to cache", function(){
                var result1 = geo.buffers.getChild(wd.EBufferDataType.NORMAL);
                var result2 = geo.buffers.getChild(wd.EBufferDataType.INDICE);

                expect(wd.ArrayBuffer.create).toCalledOnce();
                expect(wd.ElementBuffer.create).toCalledOnce();
                expect(result1).toEqual(arrayBuffer);
                expect(result2).toEqual(eleBuffer);
            });
        });
    });

    describe("get normal data", function(){
        beforeEach(function(){
            geo = createGeometry(wd.ModelGeometry);
        });

        describe("if cached", function(){
            beforeEach(function(){
                geo.material.shading = wd.EShading.FLAT;

                geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                geo.faces = createFaces([0,2,1], [1,-1,0, 0,1,0,0,0,1]);

                geo.init();
            });

            it("if not change normal data, return cached data", function(){
                var data = geo.buffers.geometryData;
                var normals1 = data.normals;
                var normals2 = data.normals;

                expect(normals1.length).not.toEqual(0);
                expect(normals2 === normals1).toBeTruthy();
            });
            it("if change faces, return changed normal data", function(){
                var data = geo.buffers.geometryData;
                var normals1 = data.normals;
                data.faces = data.faces;
                var normals2 = data.normals;

                expect(normals1.length).not.toEqual(0);
                expect(normals2 === normals1).toBeFalsy();
            });
        });

        describe("else", function(){
            beforeEach(function(){

            });

            describe("if material is flat shading", function(){
                beforeEach(function(){
                    geo.material.shading = wd.EShading.FLAT;
                });

                it("if not has face normal, compute it", function(){
                    geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                    geo.faces = createFaces([0,2,1]);

                    geo.init();

                    var data = geo.buffers.geometryData;
                    var normals = data.normals;
                    expect(normals).toEqual([
                        -0.8164966106414795, -0.40824830532073975, -0.40824830532073975, -0.8164966106414795, -0.40824830532073975, -0.40824830532073975, -0.8164966106414795, -0.40824830532073975, -0.40824830532073975
                    ])
                });
                it("else, get normal from it", function(){
                    geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                    geo.faces = createFaces([0,2,1], [1,-1,0, 0,1,0,0,0,1]);

                    geo.init();

                    var data = geo.buffers.geometryData;
                    var normals = data.normals;
                    expect(normals).toEqual([
                        1, -1, 0, 1, -1, 0, 1, -1, 0
                    ])
                });
            });

            describe("if material is smooth shading", function(){
                beforeEach(function(){
                    geo.material.shading = wd.EShading.SMOOTH;
                });

                it("if not has vertex normal, compute it", function(){
                    geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                    geo.faces = createFaces([0,2,1]);

                    geo.init();

                    var data = geo.buffers.geometryData;
                    var normals = data.normals;
                    expect(normals).toEqual([
                        -0.8164966106414795, -0.40824830532073975, -0.40824830532073975, -0.8164966106414795, -0.40824830532073975, -0.40824830532073975, -0.8164966106414795, -0.40824830532073975, -0.40824830532073975
                    ])
                });
                it("else, get normal from it", function(){
                    geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                    geo.faces = createFaces([0,2,1], [1,-1,0, 0,1,0,0,0,1]);

                    geo.init();

                    var data = geo.buffers.geometryData;
                    var normals = data.normals;
                    expect(normals).toEqual([
                        1, -1, 0, 0, 1, 0, 0, 0, 1
                    ])
                });
            });
        });
    });

    describe("get indice data", function(){
        beforeEach(function(){
            geo = createGeometry(wd.ModelGeometry);
        });

        describe("if cached", function(){
            beforeEach(function(){
                geo.material.shading = wd.EShading.FLAT;

                geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                geo.faces = createFaces([0,2,1]);

                geo.init();
            });

            it("if not change indice data, return cached data", function(){
                var data = geo.buffers.geometryData;
                var indices1 = data.indices;
                var indices2 = data.indices;

                expect(indices1.length).not.toEqual(0);
                expect(indices2 === indices1).toBeTruthy();
            });
            it("if change faces, return changed indice data", function(){
                var data = geo.buffers.geometryData;
                var indices1 = data.indices;
                data.faces = data.faces;
                var indices2 = data.indices;

                expect(indices1.length).not.toEqual(0);
                expect(indices2 === indices1).toBeFalsy();
            });
        });

        it("else, get data from face.aIndex,bIndex,cIndex", function(){
            geo.vertices = [1,-1,0, 0,1,0,0,0,1];
            geo.faces = createFaces([0,2,1, 1,2,0]);

            geo.init();

            var data = geo.buffers.geometryData;
            var indices = data.indices;
            expect(indices).toEqual([
                0,2,1, 1,2,0
            ])
        });
    });

    describe("get color data", function(){
        beforeEach(function(){
            geo = createGeometry(wd.ModelGeometry);
        });

        describe("if cached", function(){
            var data;

            beforeEach(function(){
                geo.material.shading = wd.EShading.FLAT;
                geo.material.color = wd.Color.create("rgb(1.0,0.0,0.0)");

                geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                geo.faces = createFaces([0,2,1]);

                geo.init();

                data = geo.buffers.geometryData;
            });

            it("if not change color data, return cached data", function(){
                var colors1 = data.colors;
                var colors2 = data.colors;

                expect(colors1.length).not.toEqual(0);
                expect(colors2 === colors1).toBeTruthy();
            });

            it("if set color data, return changed data", function(){
                var colors2 = [1,0,0.1, 1,1,1, 1,1,1];
                data.colors = colors2;

                expect(data.colors).toEqual(colors2);
            });
            
            describe("if change material.color", function(){
                beforeEach(function(){
                });
                
                it("if not set color data, return changed data from material", function(){
                    geo.material.color = wd.Color.create("rgb(1.0,1.0,0.0)");

                    expect(data.colors).toEqual([1, 1, 0, 1, 1, 0, 1, 1, 0]);
                });
                it("else, return setted color data", function () {
                    var colors = [1,0,0.1, 1,1,1, 1,1,1];
                    data.colors = colors;

                    geo.material.color = wd.Color.create("rgb(1.0,1.0,0.0)");

                    expect(data.colors).toEqual(colors);
                });

            });

            it("if change material, return data from new material->color", function(){
                var newMaterial = new wd.BasicMaterial();
                newMaterial.color = wd.Color.create("rgb(1.0,1.0,0.0)");

                geo.material = newMaterial;

                expect(data.colors).toEqual([1, 1, 0, 1, 1, 0, 1, 1, 0]);
            });
        });

        describe("else", function(){
            beforeEach(function(){
            });

            //todo more test
        });
    });

    describe("computeFaceNormals", function(){
        it("compute normal based on triangle point", function(){
            geo = createGeometry(wd.ModelGeometry);
            geo.vertices = [1,-1,0, 0,1,0,0,0,1];
            geo.faces = createFaces([0,2,1]);

            geo.init();

            expect(testTool.getValues(
                geo.buffers.getChild(wd.EBufferDataType.NORMAL).data
            )).toEqual(
                [ -0.8164966, -0.4082483, -0.4082483,
                    -0.8164966, -0.4082483, -0.4082483,
                    -0.8164966, -0.4082483, -0.4082483]
            )
        });
        it("if faces not use all vertices data, then the normals will has empty data which are filled with 0", function(){
            geo = createGeometry(wd.ModelGeometry);
            geo.vertices = [1,-1,0, 0,1,0,0,0,1, 1, 2, 3];
            geo.faces = createFaces([3,2,1]);

            geo.init();

            expect(testTool.getValues(
                geo.buffers.getChild(wd.EBufferDataType.NORMAL).data
            )).toEqual(
                [
                    0, 0, 0, 0.942809, -0.2357023, -0.2357023, 0.942809, -0.2357023, -0.2357023, 0.942809, -0.2357023, -0.2357023
                ]
            )
        });
    });

    describe("computeVertexNormals", function(){
        it("compute average vertex normal", function(){
            geo = createGeometry(wd.ModelGeometry, wd.EShading.SMOOTH);
            geo.vertices = [1,-1,0, 0,1,0,0,0,1, 2,3,-2];
            geo.faces = createFaces([0,2,1, 2,3,1]);

            geo.init();

            expect(
                testTool.getValues(
                    geo.buffers.getChild(wd.EBufferDataType.NORMAL).data
                )
            ).toEqual(
                [ -0.8164966, -0.4082483, -0.4082483,
                    -0.8880739, 0.3250575, 0.3250575,
                    -0.8880739, 0.3250575, 0.3250575,
                    0, 0.7071068, 0.7071068 ]
            );
        });
        it("if faces not use all vertices data, then the normals will has empty data which are filled with 0", function(){
            geo = createGeometry(wd.ModelGeometry, wd.EShading.SMOOTH);
            geo.vertices = [1,-1,0, 0,1,0,0,0,1, 1, 2, 3, 10, 20, 30];
            geo.faces = createFaces([3,2,1, 4,3,1]);

            geo.init();

            expect(testTool.getValues(
                geo.buffers.getChild(wd.EBufferDataType.NORMAL).data
            )).toEqual(
                [
                    0, 0, 0, 0.953171, -0.1187764, -0.2781315, 0.942809, -0.2357023, -0.2357023, 0.953171, -0.1187764, -0.2781315, 0.9486833, 0, -0.3162278
                ]
            )
        });
    });

    describe("change material", function(){
        var gameObject;

        function createGeometry(_class, shading){
            geo = new _class();
            geo.material = {
                init:sandbox.stub(),
                shading: shading || wd.EShading.FLAT
            };
            geo.material = wd.BasicMaterial.create();

            sandbox.stub(geo.material, "init");
            sandbox.stub(geo.material, "shading", shading || wd.EShading.FLAT);

            return geo;
        }

        beforeEach(function(){
            geo = createGeometry(wd.RectGeometry);
            geo.material.color = wd.Color.create("#111111");

            gameObject = wd.GameObject.create();
            gameObject.addComponent(geo);

            gameObject.init();
        });

        describe('Geometry trigger its gameObject->"material change" event when change material', function(){
            it('BufferContainer remove color cache when event triggered', function(){
                var colors = geo.buffers.getChild(wd.EBufferDataType.COLOR);
                sandbox.spy(colors, "resetData");

                expect(testTool.getValues(colors.data)).toEqual(
                    [ 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667, 0.0666667 ]
                );



                var newMaterial = wd.BasicMaterial.create();
                newMaterial.color = wd.Color.create("#222222");

                geo.material = newMaterial;

                newMaterial.init();



                var newColors = geo.buffers.getChild(wd.EBufferDataType.COLOR);

                expect(colors.resetData).toCalledOnce();

                expect(testTool.getValues(newColors.data)).toEqual(
                    [ 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333, 0.1333333 ]
                );
            });
        });

        //it('just "init material" instead of "add to geometry and init material" when "change material", so that material->init is not related to geometry', function(){
        //    //var newMaterial = wd.BasicMaterial.create();
        //    //newMaterial.color = wd.Color.create("#222222");
        //    //
        //    //newMaterial.init();
        //    //
        //    //expect(newMaterial.shader.getLibs().getCount()).toEqual(0);
        //    //
        //    //
        //    //
        //    //
        //    //prepareTool.prepareGeo(sandbox, wd.GameObject.create(), geo, newMaterial);
        //    //
        //    //var director = wd.Director.getInstance();
        //    //director._init();
        //    //
        //    //expect(newMaterial.shader.getLibs().getCount()).not.toEqual(0);
        //
        //
        //
        //    var newMaterial = wd.BasicMaterial.create();
        //
        //    newMaterial.color = wd.Color.create("#222222");
        //
        //    newMaterial.init();
        //
        //    expect(newMaterial.shader.getLibs().getCount()).not.toEqual(0);
        //});
    });
});

