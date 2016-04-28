describe("instance with light material", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var instanceArr;
    var box1,box1Instance1,box1Instance2;

    var renderer;
    var camera;

    function prepareWithoutChild(){
        box1 = instanceTool.createBox();
        box1.getComponent(wd.Geometry).material = wd.LightMaterial.create();

        instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = instanceTool.cloneInstance(box1, "0");
        box1Instance2 = instanceTool.cloneInstance(box1, "1");

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);




        director.scene.addChild(camera);

        director._init();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);



        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("can vary instance's normalMatrix and modelMatrix(position,rotation,scale)", function(){
        var mMatrixPos,normalMatrixPos;

        function judgeMatricesInstancesArray(){
            expect(gl.bufferSubData).toCalledOnce();

            var targetMatricesInstancesArray = new Float32Array(1000);


            var offset = 0;
            instanceArr.forEach(function(instance){
                var mMatrix = instance.transform.localToWorldMatrix;
                var normalMatrix = mMatrix.invertTo3x3().transpose();

                mMatrix.cloneToArray(targetMatricesInstancesArray, offset);
                offset += 16;

                normalMatrix.cloneToArray(targetMatricesInstancesArray, offset);
                offset += 9;
            });


            var matricesInstancesArray = gl.bufferSubData.firstCall.args[2];

            for(var i = 0, len = matricesInstancesArray.length; i < len; i++){
                var data = matricesInstancesArray[i];

                expect(data).toEqual(targetMatricesInstancesArray[i]);
            }
        }

        function judgeSendModelMatrixVecData(location, index){
            expect(gl.enableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(gl.vertexAttribPointer.withArgs(location, 4, gl.FLOAT, false, 4 * 4 * 4 + 4 * 3 * 3, index * 16)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 1)).toCalledOnce();
        }

        function judgeSendNormalMatrixVecData(location, index){
            expect(gl.enableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(gl.vertexAttribPointer.withArgs(location, 3, gl.FLOAT, false, 4 * 4 * 4 + 4 * 3 * 3, (index - 4) * 12 + 64)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 1)).toCalledOnce();
        }

        function judgeUnBindInstancesBuffer(location, index){
            expect(gl.disableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 0)).toCalledOnce();
        }

        beforeEach(function(){
            prepareWithoutChild();
        });

        it("send the normal matrix data by 3 vec3 attribute data and send the model matrix data by send 4 vec4 attribute data", function () {
            box1Instance1.transform.position = wd.Vector3.create(1,1,1);
            box1Instance1.transform.scale = wd.Vector3.create(3,3,3);

            box1Instance2.transform.rotation = wd.Quaternion.create(2,2,2,1);

            mMatrixPos = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

            var offsetLocation0 = 11,
                offsetLocation1 = 12,
                offsetLocation2 = 13,
                offsetLocation3 = 14;

            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_0").returns(offsetLocation0);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_1").returns(offsetLocation1);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_2").returns(offsetLocation2);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_3").returns(offsetLocation3);


            normalMatrixPos = 2;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_normalMatrix").returns(normalMatrixPos);


            var offsetLocation4 = 15,
                offsetLocation5 = 16,
                offsetLocation6 = 17;

            gl.getAttribLocation.withArgs(sinon.match.any, "a_normalVec4_0").returns(offsetLocation4);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_normalVec4_1").returns(offsetLocation5);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_normalVec4_2").returns(offsetLocation6);




            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(gl.uniformMatrix4fv.withArgs(mMatrixPos)).not.toCalled();
            expect(gl.uniformMatrix4fv.withArgs(normalMatrixPos)).not.toCalled();


            judgeMatricesInstancesArray();

            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_0")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_1")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_2")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_3")).toCalledOnce();

            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_normalVec4_0")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_normalVec4_1")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_normalVec4_2")).toCalledOnce();

            judgeSendModelMatrixVecData(offsetLocation0, 0);
            judgeSendModelMatrixVecData(offsetLocation1, 1);
            judgeSendModelMatrixVecData(offsetLocation2, 2);
            judgeSendModelMatrixVecData(offsetLocation3, 3);

            judgeSendNormalMatrixVecData(offsetLocation4, 4);
            judgeSendNormalMatrixVecData(offsetLocation5, 5);
            judgeSendNormalMatrixVecData(offsetLocation6, 6);

            judgeUnBindInstancesBuffer(offsetLocation0, 0);
            judgeUnBindInstancesBuffer(offsetLocation1, 1);
            judgeUnBindInstancesBuffer(offsetLocation2, 2);
            judgeUnBindInstancesBuffer(offsetLocation3, 3);

            judgeUnBindInstancesBuffer(offsetLocation4, 4);
            judgeUnBindInstancesBuffer(offsetLocation5, 5);
            judgeUnBindInstancesBuffer(offsetLocation6, 6);
        });
        it("glsl code should contain instance_modelMatrix/normalMatrix code", function () {
            var box1Shader = box1.getComponent(wd.Geometry).material.shader;
            var box1Instance1Shader = box1Instance1.getComponent(wd.Geometry).material.shader;
            var box1Instance2Shader = box1Instance2.getComponent(wd.Geometry).material.shader;

            expect(glslTool.contain(box1Shader.vsSource, "mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3)")).toBeTruthy();
            expect(glslTool.contain(box1Shader.vsSource, "mat3 normalMatrix = mat3(a_normalVec4_0, a_normalVec4_1, a_normalVec4_2)")).toBeTruthy();

            expect(glslTool.contain(box1Instance1Shader.vsSource, "mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3)")).toBeTruthy();
            expect(glslTool.contain(box1Instance1Shader.vsSource, "mat3 normalMatrix = mat3(a_normalVec4_0, a_normalVec4_1, a_normalVec4_2)")).toBeTruthy();
            expect(glslTool.contain(box1Instance2Shader.vsSource, "mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3)")).toBeTruthy();
            expect(glslTool.contain(box1Instance2Shader.vsSource, "mat3 normalMatrix = mat3(a_normalVec4_0, a_normalVec4_1, a_normalVec4_2)")).toBeTruthy();
        });
    });

    describe("if hardware not support instance", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;

            testTool.openContractCheck(sandbox);
        });

        describe("batch draw instances", function(){
            var box1Material;
            var map;
            var program;

            beforeEach(function(){
                prepareWithoutChild();
                box1Material = box1.getComponent(wd.Geometry).material;

                map = wd.MarbleProceduralTexture.create();
                sandbox.stub(map, "bindToUnit");

                box1Material.diffuseMap = map;
                box1Material.redWrite = false;


                program = box1Material.program;
                program.name = "box1Program";
                sandbox.spy(program, "use");
                sandbox.spy(program, "sendUniformData");
                sandbox.spy(program, "sendAttributeData");
            });

            it("set webgl state and use program and bind texture and send glsl data(except mMatrix) only once", function () {
                director._init();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.colorMask.withArgs(false, true, true, true)).toCalledOnce();
                expect(program.use).toCalledOnce();
                expect(map.bindToUnit).toCalledOnce();
                expect(program.sendAttributeData.withArgs("a_position")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_shininess")).toCalledOnce();

                expect(gl.drawElements.callCount).toEqual(3);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(3);
                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
            it("not bind array,element buffer when draw instance", function () {
                director._init();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER).callCount).toEqual(6);
                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount).toEqual(2);
            });
            it("draw one instance in one draw call", function(){
                director._init();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.drawElements.callCount).toEqual(3);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(3);
                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
            it("send mMatrix and normalMatrix data to glsl", function () {
                director._init();

                var mMatrixPos = 1;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

                var normalMatrixPos = 2;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_normalMatrix").returns(normalMatrixPos);

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.uniformMatrix4fv.withArgs(mMatrixPos).callCount).toEqual(3);
                expect(gl.uniformMatrix3fv.withArgs(normalMatrixPos).callCount).toEqual(3);
            });
            it("glsl code should contain u_mMatrix,u_normalMatrix", function () {
                director._init();


                expect(glslTool.contain(
                    box1Material.shader.vsSource,
                    "mat4 mMatrix = u_mMatrix;"
                )).toBeTruthy();

                expect(glslTool.contain(
                    box1Material.shader.vsSource,
                    "mat3 normalMatrix = u_normalMatrix;"
                )).toBeTruthy();
            });

            it("test transparent object", function () {
                box1Material.opacity = 0.5;

                //todo
            });

            describe("test multi loops", function () {
                //todo
            });
        });
    });
});
