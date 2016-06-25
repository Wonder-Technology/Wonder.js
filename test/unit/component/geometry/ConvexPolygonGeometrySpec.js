describe("ConvexPolygonGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.ConvexPolygonGeometry();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        describe("clone", function(){
            it("clone geometry data", function () {
                var vertices = [1,2,3],
                    indices = [1,2,3],
                    //normals = [0.1,2,-1],
                    colors = [0.1,0.2,0.3],
                    texCoords = [0.3,0.1];

                cloneTool.extend(geo, {
                    vertices: vertices,
                    indices:indices,
                    //normals:normals,
                    colors: colors,
                    texCoords: texCoords
                })

                var result = geo.clone();

                expect(result.vertices).toEqual(vertices);
                expect(result.vertices === vertices).toBeFalsy();

                expect(result.indices).toEqual(indices);
                expect(result.indices === indices).toBeFalsy();

                //expect(result.normals).toEqual(normals);
                //expect(result.normals === normals).toBeFalsy();

                expect(result.colors).toEqual(colors);
                expect(result.colors === colors).toBeFalsy();

                expect(result.texCoords).toEqual(texCoords);
                expect(result.texCoords === texCoords).toBeFalsy();
            });
        });
    });

    describe("computeData", function(){
        beforeEach(function(){

        });

        describe("compute indices", function(){
            it("compute by vertices", function () {
                geo.vertices = [
                    1,1.1,0.5,
                    5, 6, 7,
                    2,3,4,
                    8,3,4
                ];

                var result = geo.computeData();

                expect(geo.indices).toEqual([0,2,1, 0,3,2]);
            });
        });

        it("not contain normals", function () {
            geo.vertices = [
                1,1.1,0.5,
                5, 6, 7,
                2,3,4,
                8,3,4
            ];

            geo.normals = [
                3,1.1,0.5,
                5, 6, 7,
                2,3,4,
                8,3,4
            ];

            var result = geo.computeData();

            expect(geo.normals).toBeNull();
            for(var i = 0, len = result.faces.length; i < len; i++){
                var face = result.faces[i];

                expect(face.vertexNormals.getCount()).toEqual(0);
                expect(face.faceNormal.isEqual(wd.Vector3.create(0,0,0))).toBeTruthy();
            }
        });
        it("contain texCoords", function () {
            geo.texCoords = [0.1, 0.2];

            var result = geo.computeData();

            expect(result.texCoords).toEqual(geo.texCoords);
        });
        it("contain colors", function () {
            geo.colors = [0.1, 0.2];

            var result = geo.computeData();

            expect(result.colors).toEqual(geo.colors);
        });
    });
});

