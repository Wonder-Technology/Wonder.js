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
        beforeEach(function(){
            sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        });
        
        it("return calculated tangents firstly; return the last one if not dirty after", function(){
            var geometryData = new dy.GeometryData();
            geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
            geometryData.normals = [0,2,2,-3,4,-1,-3,5,1.2];
            geometryData.indices = [0,2,1];
            geometryData.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
            container.geometryData = geometryData;
            sandbox.spy(geometryData, "_calculateTangents");

            var result1 = container.getChild(dy.BufferDataType.TANGENT);
            var result2 = container.getChild(dy.BufferDataType.TANGENT);

            expect(result1.data).toEqual(
            new Float32Array([
                    0.8285171389579773,0.552344799041748,0.0920574814081192,-1,-0.49378958344459534,0.8356438875198364,-0.24056415259838104,-1,-0.44177374243736267,0.8785273432731628,0.18172967433929443,-1
                ])
            );
            expect(result2).toEqual(result1);
            expect(geometryData._calculateTangents).toCalledOnce();
        });
        it("if change vertices or normals or indices, recompute tangents", function(){
            var geometryData = new dy.GeometryData();
            container.geometryData = geometryData;
            sandbox.stub(geometryData, "_calculateTangents").returns([]);

            container.getChild(dy.BufferDataType.TANGENT);
            geometryData.vertices = [];
            container.getChild(dy.BufferDataType.TANGENT);
            geometryData.normals = [];
            container.getChild(dy.BufferDataType.TANGENT);
            geometryData.indices = [];
            container.getChild(dy.BufferDataType.TANGENT);


            container.getChild(dy.BufferDataType.TANGENT);

            expect(geometryData._calculateTangents.callCount).toEqual(4);
        });
    });
});

