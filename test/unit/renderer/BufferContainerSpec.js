describe("BufferContainer", function() {
    var sandbox = null;
    var container = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new dy.BufferContainer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("hasChild", function(){
        it("if geometryData has data which is corresponding to the buffer, then return true; else return false", function(){
            var geometryData = new dy.GeometryData();
            geometryData.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
            container.geometryData = geometryData;

            expect(container.hasChild(dy.BufferDataType.TEXCOORD)).toBeTruthy();
            expect(container.hasChild(dy.BufferDataType.VERTICE)).toBeFalsy();
        });
    });
    
    describe("get tangent buffer", function(){
        var geo,geometryData;

        beforeEach(function(){
            sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
            geo = new dy.ModelGeometry();
            geo.material = {
                init:sandbox.stub()
            }
            geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
            geo.faces = dy.GeometryUtils.convertToFaces([0,2,1], [0,2,2,-3,4,-1,-3,5,1.2]);
            geo.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
            geo.colors = [];


            geo.init();


            geometryData = geo.buffers.geometryData;
            container = geo.buffers;
        });

        it("return calculated tangents firstly; return the last one if not dirty after", function(){
            sandbox.spy(geometryData, "_calculateTangents");

            var result1 = container.getChild(dy.BufferDataType.TANGENT);
            var result2 = container.getChild(dy.BufferDataType.TANGENT);

            expect(result1.data).toEqual(
            new Float32Array([
                0.8285171389579773,0.552344799041748,0.0920574814081192,-1,0.8285171389579773,0.552344799041748,0.0920574814081192,-1,0.8285171389579773,0.552344799041748,0.0920574814081192,-1
            ])
            );
            expect(result2).toEqual(result1);
            expect(geometryData._calculateTangents).toCalledOnce();
        });
        it("if change vertices or texCoords or faces, recompute tangents", function(){
            sandbox.stub(geometryData, "_calculateTangents").returns([]);

            container.getChild(dy.BufferDataType.TANGENT);
            geometryData.vertices = [];
            container.getChild(dy.BufferDataType.TANGENT);
            geometryData.texCoords = [];
            container.getChild(dy.BufferDataType.TANGENT);
            geometryData.faces = geometryData.faces;
            container.getChild(dy.BufferDataType.TANGENT);


            container.getChild(dy.BufferDataType.TANGENT);

            expect(geometryData._calculateTangents.callCount).toEqual(4);
        });
    });
});

