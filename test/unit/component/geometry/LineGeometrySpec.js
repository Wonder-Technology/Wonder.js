describe("LineGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.LineGeometry();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        it("clone geometry data", function () {
            var vertices = [1,2,3],
                indices = [1,2,3];
                //normals = [0.1,2,-1],
                //colors = [0.1,0.2,0.3],
                //texCoords = [0.3,0.1];

            cloneTool.extend(geo, {
                vertices: vertices,
                indices:indices
                //normals:normals,
                //colors: colors,
                //texCoords: texCoords
            })

            var result = geo.clone();

            expect(result.vertices).toEqual(vertices);
            expect(result.vertices === vertices).toBeFalsy();

            expect(result.indices).toEqual(indices);
            expect(result.indices === indices).toBeFalsy();

            //expect(result.normals).toEqual(normals);
            //expect(result.normals === normals).toBeFalsy();
            //
            //expect(result.colors).toEqual(colors);
            //expect(result.colors === colors).toBeFalsy();
            //
            //expect(result.texCoords).toEqual(texCoords);
            //expect(result.texCoords === texCoords).toBeFalsy();
        });
    });

    describe("computeData", function(){
        beforeEach(function(){
        });

            it("not contain texCoords", function () {
                geo.texCoords = [0.1, 0.2];

                var result = geo.computeData();

                expect(result.texCoords).toBeUndefined();
            });
            it("not contain colors", function () {
                geo.colors = [0.1, 0.2];

                var result = geo.computeData();

                expect(result.colors).toBeUndefined();
        });
    });
});

