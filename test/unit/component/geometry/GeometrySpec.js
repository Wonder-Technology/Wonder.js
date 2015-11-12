describe("Geometry", function() {
    var sandbox = null;
    var Geometry = null;
    var geo;

    function createGeometry(_class){
        geo = new _class();
        geo.material = {
            init:sandbox.stub(),
            shading: dy.Shading.FLAT
        };

        return geo;
    }

    function createFaces(indices, normals){
        return dy.GeometryUtils.convertToFaces(indices, normals);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Geometry = dy.Geometry;
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("defer create buffer ", function(){
        var geo,arrayBuffer,eleBuffer;

        beforeEach(function(){
            arrayBuffer = {};
            eleBuffer = {};
            sandbox.stub(dy.ArrayBuffer, "create").returns(arrayBuffer);
            sandbox.stub(dy.ElementBuffer, "create").returns(eleBuffer);
            geo = createGeometry(dy.RectGeometry);
            geo.material.color = dy.Color.create("#ffffff");
        });

        it("only create BufferContainer and add geometry data when init", function(){
            expect(geo.buffers).toBeNull();

            geo.init();

            expect(geo.buffers).toBeInstanceOf(dy.BufferContainer);
            expect(geo.buffers.geometryData.vertices).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.indices).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.normals).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.texCoords).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.colors).toEqual(
                [
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                ]
            );
            expect(dy.ArrayBuffer.create).not.toCalled();
            expect(dy.ElementBuffer.create).not.toCalled();
        });

        describe("when invoke BufferContainer->getChild", function(){
            beforeEach(function(){
                geo.init();
            });

            it("if the buffer is cached, return the cached one", function(){
                var result1 = geo.buffers.getChild(dy.BufferDataType.VERTICE);

                var result2 = geo.buffers.getChild(dy.BufferDataType.VERTICE);

                expect(dy.ArrayBuffer.create).toCalledOnce();
                expect(result1).toEqual(result2);
            });
            it("else, create buffer and add it to cache", function(){
                var result1 = geo.buffers.getChild(dy.BufferDataType.NORMAL);
                var result2 = geo.buffers.getChild(dy.BufferDataType.INDICE);

                expect(dy.ArrayBuffer.create).toCalledOnce();
                expect(dy.ElementBuffer.create).toCalledOnce();
                expect(result1).toEqual(arrayBuffer);
                expect(result2).toEqual(eleBuffer);
            });
        })
    });
    
    describe("get normal data", function(){
        beforeEach(function(){
            geo = createGeometry(dy.ModelGeometry);
        });

        describe("if cached", function(){
            beforeEach(function(){
                geo.material.shading = dy.Shading.FLAT;

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
                    geo.material.shading = dy.Shading.FLAT;
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
                    geo.material.shading = dy.Shading.SMOOTH;
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
            geo = createGeometry(dy.ModelGeometry);
        });

        describe("if cached", function(){
            beforeEach(function(){
                geo.material.shading = dy.Shading.FLAT;

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

    describe("computeFaceNormals", function(){
        beforeEach(function(){

        });

        it("compute normal based on triangle point", function(){
            geo = createGeometry(dy.ModelGeometry);
            geo.vertices = [1,-1,0, 0,1,0,0,0,1];
            geo.faces = createFaces([0,2,1]);

            geo.init();
            geo.computeFaceNormals();

            expect(testTool.getValues(geo.faces[0].faceNormal.values)).toEqual(
                [ -0.8164966, -0.4082483, -0.4082483 ]
            )
        });
    });

    describe("computeVertexNormals", function(){
        beforeEach(function(){
            geo = createGeometry(dy.ModelGeometry);
        });
        
        it("compute average vertex normal", function(){
            geo = createGeometry(dy.ModelGeometry);
            geo.vertices = [1,-1,0, 0,1,0,0,0,1, 2,3,-2];
            geo.faces = createFaces([0,2,1, 2,3,1]);

            geo.init();
            geo.computeVertexNormals();

            expect(geo.faces[0].vertexNormals.getChildren()).toEqual(
                [ dy.Vector3.create( -0.8164966106414795,-0.40824830532073975,-0.40824830532073975 ), dy.Vector3.create( -0.8880738615989685,0.3250575363636017,0.3250575363636017 ), dy.Vector3.create( -0.8880738615989685,0.3250575363636017,0.3250575363636017 ) ]
            );
            expect(geo.faces[1].vertexNormals.getChildren()).toEqual(
                [ dy.Vector3.create( -0.8880738615989685,0.3250575363636017,0.3250575363636017 ), dy.Vector3.create( 0,0.7071067690849304,0.7071067690849304 ), dy.Vector3.create( -0.8880738615989685,0.3250575363636017,0.3250575363636017 ) ]
            );
        });
    });
});

