/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Shader{
        public static create(){
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public program:Program = Program.create();
        public attributes:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        public uniforms:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        public vsSource:string = "";
        public fsSource:string = "";

        private _libs: dyCb.Collection<ShaderLib> = dyCb.Collection.create<ShaderLib>();
        private _sourceBuilder:ShaderSourceBuilder = ShaderSourceBuilder.create();


        public createVsShader(){
            var gl = DeviceManager.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        }

        public createFsShader(){
            var gl = DeviceManager.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        }

        public isEqual(other:Shader){
            return this.vsSource === other.vsSource
            && this.fsSource === other.fsSource;
        }

        public initWhenCreate(){
            this.addLib(CommonShaderLib.getInstance());
        }

        public init(){
            this.buildDefinitionData();

            //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
            this.program.initWithShader(this);
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            this._libs.forEach((lib:ShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            program.sendAttributeDataFromCustomShader();
            program.sendUniformDataFromCustomShader();

            material.textureManager.sendData(program);

        }

        public addLib(lib:ShaderLib){
            this._libs.addChild(lib);
        }

        public removeAllLibs(){
            this._libs.removeAllChildren();
        }

        public read(definitionData:ShaderDefinitionData){
            this._sourceBuilder.read(definitionData);
        }

        public buildDefinitionData(){
            this._sourceBuilder.build(this._libs);

            this.attributes = this._sourceBuilder.attributes;
            this.uniforms = this._sourceBuilder.uniforms;
            this.vsSource = this._sourceBuilder.vsSource;
            this.fsSource = this._sourceBuilder.fsSource;
        }

        private _initShader(shader, source){
            var gl = DeviceManager.getInstance().gl;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                return shader;
            }
            else{
                //todo error?
                dyCb.Log.log(gl.getShaderInfoLog(shader));
            }
        }
    }

    export type ShaderData = {
        type:VariableType;
        value:any;
    }

    export type ShaderDefinitionData = {
        vsSourceTop:string;
        vsSourceDefine:string;
        vsSourceVarDeclare:string;
        vsSourceFuncDeclare:string;
        vsSourceFuncDefine:string;
        vsSourceBody:string;
        fsSourceTop:string;
        fsSourceDefine:string;
        fsSourceVarDeclare:string;
        fsSourceFuncDeclare:string;
        fsSourceFuncDefine:string;
        fsSourceBody:string;
        attributes:ShaderData|dyCb.Hash<ShaderData>;
        uniforms:ShaderData|dyCb.Hash<ShaderData>;
    }
}
