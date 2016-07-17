describe("DashLineGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.DashLineGeometry();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("initWhenCreate", function(){
        beforeEach(function(){

        });

        it("set drawMode to be LINES", function () {
            geo = wd.DashLineGeometry.create();
            expect(geo.drawMode).toEqual(wd.EDrawMode.LINES);
        });
    });

    describe("clone", function(){
        it("clone geometry data", function () {
            var vertices = [1,2,3];

            cloneTool.extend(geo, {
                vertices: vertices
            })

            var result = geo.clone();

            expect(result.vertices).toEqual(vertices);
            expect(result.vertices === vertices).toBeFalsy();
        });
        it("clone other data", function () {
            var dashSize = 10,
                gapSize = 5,
                dashCount = 20;

            cloneTool.extend(geo, {
                dashSize:dashSize,
                gapSize:gapSize,
                dashCount:dashCount
            })

            var result = geo.clone();

            expect(result.dashSize).toEqual(dashSize);
            expect(result.gapSize).toEqual(gapSize);
            expect(result.dashCount).toEqual(dashCount);
        });
    });

    describe("computeData", function(){
        beforeEach(function(){
        });

        it("compute dash vertices", function () {
            var dashSize = 3,
                gapSize = 2,
                dashCount = 5;

            cloneTool.extend(geo, {
                dashSize:dashSize,
                gapSize:gapSize,
                dashCount:dashCount
            })
            geo.vertices = [
                -10, -10, 0,
                -10, 10, 0,
                10, 10, 0
            ];

            var result = geo.computeData();

            expect(testTool.getValues(result.vertices)).toEqual([
                -10, -10, 0,
                -10, -5.2, 0,

                -10, -2, 0,
                -10, 2.8, 0,

                -10, 10, 0,
                -5.2, 10, 0,

                -2, 10, 0,
                2.8, 10, 0
            ]);
            expect(result.faces).toBeUndefined();
            expect(result.texCoords).toBeUndefined();
            expect(result.colors).toBeUndefined();
        });
    });
});

