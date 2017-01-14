describe("CommonShaderLib", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("test send vMatrix,pMatrix", function(){
        var director;
        var model;

        beforeEach(function(){
        });

        it("if entityObject.data.vMatrix/pMatrix is setted, send it", function(){
            var vMatrix = wd.Matrix4.create().translate(1,0,0);
            var pMatrix = wd.Matrix4.create().translate(0,1,0);

            model = wd.GameObject.create();

            model.data = {
                vMatrix:vMatrix,
                pMatrix:pMatrix
            }

            geo = geometryTool.createGeometryWithFakeGeometryData();

            material = wd.BasicMaterial.create();


            prepareTool.prepareGeo(sandbox, model, geo, material);




            director = wd.Director.getInstance();



            director._init();

            var program = material.shader.program;

            shaderTool.stubProgram(sandbox, {
                program:program
            });





            director._loopBody(1);





            var args = program.sendUniformData.withArgs("u_vMatrix").getCall(0).args;
            expect(args[2]).toEqual(vMatrix)

            var args2 = program.sendUniformData.withArgs("u_pMatrix").getCall(0).args;
            expect(args2[2]).toEqual(pMatrix)
        });
        it("if entityObject.data.pMatrix is setted, send it", function(){

        });
    });
});

