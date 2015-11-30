//todo extract buildShaderLib function
describe("ShaderSourceBuilder", function () {
    var sandbox = null;
    var builder = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new dy.ShaderSourceBuilder();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("build", function(){
        var libs,lib1,lib2;

        beforeEach(function(){
            sandbox.stub(dy.ArrayBuffer, "create");

            lib1 = {
                attributes: {
                    "a_color": {
                        type: dy.VariableType.FLOAT_4,
                        value: [
                            1, 0, 0, 1,
                            1, 0, 0, 1,
                            0, 1, 0, 1,
                            0, 0, 1, 1
                        ]
                    }
                },
                uniforms: {
                    "u_test1": {
                        type: dy.VariableType.FLOAT_1,
                        value: 1.0
                    }
                },

                vsSourceTop:"",
                vsSourceDefine:"",
                vsSourceVarDeclare: [
                    "varying vec4 v_color;"
                ].join("\n"),
                vsSourceFuncDeclare: [
                    "vec4 getPos();"
                ].join("\n"),
                vsSourceFuncDefine: [
                    "vec4 getPos(){return vec4(1.0);}"
                ].join("\n"),
                vsSourceBody: [
                    "v_color = a_color;",
                    "float a = u_test1;",
                    "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * getPos();"
                ].join("\n"),
                fsSourceTop:"",
                fsSourceDefine:"",
                fsSourceVarDeclare: [
                    "varying vec4 v_color;"
                ].join("\n"),
                fsSourceFuncDeclare:"",
                fsSourceFuncDefine:"",
                fsSourceBody: [
                    "gl_FragColor = v_color;"
                ].join("\n"),


                vsSourceDefineList: wdCb.Collection.create(),
                fsSourceDefineList: wdCb.Collection.create()
            };
            lib2 = {
                attributes: {
                    "a_position": {
                        type: dy.VariableType.FLOAT_3,
                        value: [
                            0, 0, 0,
                            1, 0, 0,
                            0, 1, 0,
                            0, 0, 1
                        ]
                    }
                },
                uniforms: {
                    "u_test2": {
                        type: dy.VariableType.STRUCTURE,
                        value: {
                            "b": {
                                type:dy.VariableType.FLOAT_1,
                                value: function(){
                                    return 3.0;
                                }
                            }
                        }
                    }
                },
                vsSourceTop: "precision highp float;\n",
                vsSourceDefine: "#define TEST\n",
                vsSourceVarDeclare: [
                    "#ifdef TEST",
                    "varying vec3 v_position;",
                    "endif",
                    "varying vec4 v_color",
                    "struct Test2{float b;};",
                    "Test2 u_test2;"
                ].join("\n"),
                vsSourceFuncDeclare: [
                    "vec3 get();"
                ].join("\n"),
                vsSourceFuncDefine: [
                    "vec3 get(){return vec3(1.0);}"
                ].join("\n"),
                vsSourceBody: [
                    "v_color = vec4(0.0, 1.0, 0.0, 1.0);",
                    "float b = u_test2.b;",
                    "#ifdef TEST",
                    "v_position = get();",
                    "endif",
                    "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;"
                ].join("\n"),
                fsSourceTop: "precision highp float;\n",
                fsSourceDefine: "#define AAA 2\n",
                fsSourceVarDeclare: [
                    "varying vec4 v_color;",
                    "#if AAA === 2",
                    "varying vec3 v_position;",
                    "endif"
                ].join("\n"),
                fsSourceFuncDeclare:"",
                fsSourceFuncDefine:"",
                fsSourceBody: [
                    "gl_FragColor = v_color;"
                ].join("\n"),



                vsSourceDefineList: wdCb.Collection.create(),
                fsSourceDefineList: wdCb.Collection.create()
            };

            libs = wdCb.Collection.create([
                lib1, lib2
            ]);

        });

        it("build vs source,auto generate attribute and uniform variables into glsl source", function(){
            builder.build(libs);

            expect(rendererTool.convertSource(builder.vsSource)).toEqual(
                'precision highp float;#define TESTattribute vec4 a_color;attribute vec3 a_position;uniform float u_test1;varying vec4 v_color;#ifdef TESTvarying vec3 v_position;endifvarying vec4 v_colorstruct Test2{float b;};Test2 u_test2;vec4 getPos();vec3 get();vec4 getPos(){return vec4(1.0);}vec3 get(){return vec3(1.0);}void main(void){v_color = a_color;float a = u_test1;gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * getPos();v_color = vec4(0.0, 1.0, 0.0, 1.0);float b = u_test2.b;#ifdef TESTv_position = get();endifgl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;}'
            );
        });
        it("build fs source, auto generate uniform variables into glsl source", function(){
            builder.build(libs);

            expect(rendererTool.convertSource(builder.fsSource)).toEqual(
                'precision highp float;#define AAA 2varying vec4 v_color;varying vec4 v_color;#if AAA === 2varying vec3 v_position;endifvoid main(void){gl_FragColor = v_color;gl_FragColor = v_color;}'
            )
        });
        it("combine attribute variables,convert it to ArrayBuffer", function(){
            var buffer = new dy.ArrayBuffer();

            dy.ArrayBuffer.create.returns(buffer);

            builder.build(libs);

            expect(dy.ArrayBuffer.create).toCalledTwice();
            expect(builder.attributes.getChildren()).toEqual(
                {
                    "a_color": {
                        type: dy.VariableType.FLOAT_4,
                        value: buffer
                    },
                    "a_position": {
                        type: dy.VariableType.FLOAT_3,
                        value: buffer
                    }
                }
            )
        });
        it("combine uniform variables", function(){
            builder.build(libs);

            expect(builder.uniforms.getChildren()).toEqual(
                {
                    u_test1: lib1.uniforms.u_test1,
                    u_test2: lib2.uniforms.u_test2
                }
            )
        });
    });

    describe("auto generate uniform variables", function(){
        beforeEach(function(){

        });

        it("if it already in varDeclare part of glsl, not generate", function(){
            lib1 = {
                attributes: {
                },
                uniforms: {
                    "u_test1": {
                        type: dy.VariableType.FLOAT_1,
                        value: 1.0
                    }
                },

                vsSourceTop:"",
                vsSourceDefine:"",
                vsSourceVarDeclare: [
                    "varying vec4 v_color;",
                    "uniform float u_test1;"
                ].join("\n"),
                vsSourceFuncDeclare: [
                    "vec4 getPos();"
                ].join("\n"),
                vsSourceFuncDefine: [
                    "vec4 getPos(){return vec4(1.0);}"
                ].join("\n"),
                vsSourceBody: [
                    "v_color = a_color;",
                    "float a = u_test1;",
                    "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * getPos();"
                ].join("\n"),
                fsSourceTop:"",
                fsSourceDefine:"",
                fsSourceVarDeclare: [
                    "varying vec4 v_color;"
                ].join("\n"),
                fsSourceFuncDeclare:"",
                fsSourceFuncDefine:"",
                fsSourceBody: [
                    "gl_FragColor = v_color;"
                ].join("\n"),


                vsSourceDefineList: wdCb.Collection.create(),
                fsSourceDefineList: wdCb.Collection.create()
            };

            libs = wdCb.Collection.create([
                lib1
            ]);

            builder.build(libs);

            expect(rendererTool.convertSource(builder.vsSource)).toEqual(
                'varying vec4 v_color;uniform float u_test1;vec4 getPos();vec4 getPos(){return vec4(1.0);}void main(void){v_color = a_color;float a = u_test1;gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * getPos();}'
            );
        });
        it("if the variable is STRUCTURE or STRUCTURES, should manual define in glsl, not auto generate", function(){
            lib1 = {
                uniforms: {
                    "u_test2": {
                        type: dy.VariableType.STRUCTURE,
                        value: {
                            "b": {
                                type:dy.VariableType.FLOAT_1,
                                value: function(){
                                    return 3.0;
                                }
                            }
                        }
                    }
                },
                vsSourceTop: "precision highp float;\n",
                vsSourceDefine: "#define TEST\n",
                vsSourceVarDeclare: [
                    "struct Test2{float b;};",
                    "Test2 u_test2;"
                ].join("\n"),
                vsSourceFuncDeclare: [
                    "vec3 get();"
                ].join("\n"),
                vsSourceFuncDefine: [
                    "vec3 get(){return vec3(1.0);}"
                ].join("\n"),
                vsSourceBody: [
                    "float b = u_test2.b;",
                    "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(1.0);"
                ].join("\n"),
                fsSourceTop: "",
                fsSourceDefine: "",
                fsSourceVarDeclare: "",
                fsSourceFuncDeclare:"",
                fsSourceFuncDefine:"",
                fsSourceBody: [
                    "gl_FragColor = vec4(1.0);"
                ].join("\n"),

                vsSourceDefineList: wdCb.Collection.create(),
                fsSourceDefineList: wdCb.Collection.create()
            };

            libs = wdCb.Collection.create([
                lib1
            ]);

            builder.build(libs);

            expect(rendererTool.convertSource(builder.vsSource)).toEqual(
                'precision highp float;#define TESTstruct Test2{float b;};Test2 u_test2;vec3 get();vec3 get(){return vec3(1.0);}void main(void){float b = u_test2.b;gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(1.0);}'
            );
        });
    });
});
