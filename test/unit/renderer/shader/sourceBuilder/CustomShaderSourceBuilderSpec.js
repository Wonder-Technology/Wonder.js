describe("CustomShaderSourceBuilder", function () {
    var sandbox = null;
    var builder = null;

    var definitionData;
    var vsSource,fsSource;

    function prepareDefinitionData(){
        definitionData = {
            "attributes": {
                "a_position":{
                    "type":"FLOAT_3",
                    "value": "POSITION"
                },
                "a_texCoord":{
                    "type":"FLOAT_2",
                    "value": "TEXCOORD"
                },
                "a_color": {
                    "type":"FLOAT_3",
                    "value": [
                        1, 0, 0,
                        1, 0, 0,
                        0, 1, 0,
                        0, 0, 1
                    ]
                }
            },
            "uniforms": {
                "u_mvpMatrix": {
                    "type": "FLOAT_MAT4",
                    "value": "MODEL_VIEW_PROJECTION"
                },
                "u_sampler2D": {
                    "type": "SAMPLER_2D",
                    "textureId": "texture"
                }
            },
            "vsSourceId": "vs",
            "fsSourceId": "fs"
        };

        sandbox.stub(wd.LoaderManager.getInstance(), "get");

        vsSource = "void main(void){};";
        wd.LoaderManager.getInstance().get.withArgs("vs").returns(vsSource);

        fsSource = "void main(void){};";
        wd.LoaderManager.getInstance().get.withArgs("fs").returns(fsSource);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = wd.CustomShaderSourceBuilder.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("read", function(){
        beforeEach(function(){
            prepareDefinitionData();
        });

        it("read attributes", function(){
            builder.read(definitionData);

            expect(builder.attributes.getChildren()).toEqual({
                "a_position":{
                    "type":"FLOAT_3",
                    "value": "POSITION"
                },
                "a_texCoord":{
                    "type":"FLOAT_2",
                    "value": "TEXCOORD"
                },
                "a_color": {
                    "type":"FLOAT_3",
                    "value": [
                        1, 0, 0,
                        1, 0, 0,
                        0, 1, 0,
                        0, 0, 1
                    ]
                }
            });
        });
        it("read uniforms", function(){
            builder.read(definitionData);

            expect(builder.uniforms.getChildren()).toEqual({
                "u_mvpMatrix": {
                    "type": "FLOAT_MAT4",
                    "value": "MODEL_VIEW_PROJECTION"
                },
                "u_sampler2D": {
                    "type": "SAMPLER_2D",
                    "textureId": "texture"
                }
            });
        });
        it("read vsSource", function () {

            builder.read(definitionData);

            expect(builder.vsSource).toEqual(vsSource);
        });
        it("read fsSource", function () {

            builder.read(definitionData);

            expect(builder.fsSource).toEqual(fsSource);
        });
    });

    describe("build", function(){
        beforeEach(function(){
        });

        it("combine attribute variables,convert it to ArrayBuffer", function(){
            var buffer = {};
            sandbox.stub(wd.ArrayBuffer, "create").returns(buffer);
            builder.read(
                {
                    "attributes": {
                        "a_position": {
                            "type": "FLOAT_3",
                            "value": "POSITION"
                        },
                        "a_texCoord": {
                            "type": "FLOAT_2",
                            "value": "TEXCOORD"
                        },
                        "a_color": {
                            "type": "FLOAT_3",
                            "value": [
                                1, 0, 0,
                                1, 0, 0,
                                0, 1, 0,
                                0, 0, 1
                            ]
                        }
                    }
                }
            );


            builder.build();


            expect(wd.ArrayBuffer.create).toCalledOnce();
            expect(builder.attributes.getChildren()).toEqual(
                {
                    "a_color": {
                        type: wd.EVariableType.FLOAT_3,
                        value: buffer
                    },
                    "a_position": {
                        type: wd.EVariableType.FLOAT_3,
                        "value": "POSITION"
                    },
                    "a_texCoord": {
                        type: wd.EVariableType.FLOAT_2,
                        "value": "TEXCOORD"
                    }
                }
            )
        });
    });

    describe("clearShaderDefinition", function(){
        beforeEach(function(){
            prepareDefinitionData();

            builder.read(definitionData);
        });

        it("clear attributes,uniforms", function(){
            builder.clearShaderDefinition();

            expect(builder.attributes.getCount()).toEqual(0);
            expect(builder.uniforms.getCount()).toEqual(0);
        });
        it("clear vs source", function () {
            builder.clearShaderDefinition();

            expect(builder.vsSource).toBeNull();
        });
        it("clear fs source", function () {
            builder.clearShaderDefinition();

            expect(builder.fsSource).toBeNull();
        });
    });
});
