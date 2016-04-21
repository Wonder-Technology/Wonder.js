describe("SphereGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.SphereGeometry();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
            
        });

        describe("clone Geometry data", function(){
            beforeEach(function(){

            });

            it("clone material", function(){
                var material = new wd.Material();
                var resultMaterial = {};
                sandbox.stub(material, "clone").returns(resultMaterial);

                cloneTool.extend(geo, {
                    material:material
                })

                var result = geo.clone();

                expect(result.material).toEqual(resultMaterial);
            });
            //it("clone buffers", function () {
            //
            //});
            it("clone data", function () {
                var drawMode = wd.EDrawMode.LINES;

                cloneTool.extend(geo, {
                    drawMode:drawMode
                })

                var result = geo.clone();

                expect(result.drawMode).toEqual(drawMode);
            });

        });

        describe("clone SphereGeometry data", function(){
            beforeEach(function(){

            });

            it("clone data", function(){
                var radius = 1,
                    sphereDrawMode = wd.ESphereDrawMode.LATITUDELONGTITUDE,
                    segments = 10;

                cloneTool.extend(geo, {
                        radius: radius,
                        sphereDrawMode: sphereDrawMode,
                    segments: segments
                })

                var result = geo.clone();

                expect(result.radius).toEqual(radius);
                expect(result.sphereDrawMode).toEqual(sphereDrawMode);
                expect(result.segments).toEqual(segments);
            });
        });
    });
});

