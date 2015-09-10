/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class Shader{
        public static create(){
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public program:Program = Program.create();
        public vsSource:string = "";
        public vsSourceHead:string = "";
        public vsSourceBody:string = "";
        public fsSource:string = "";
        public fsSourceHead:string = "";
        public fsSourceBody:string = "";
        public attributes:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();
        public uniforms:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();

        private _libs: dyCb.Collection<ShaderLib> = dyCb.Collection.create<ShaderLib>();


        public createVsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        }

        public createFsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        }

        public isEqual(other:Shader){
            return this.vsSource === other.vsSource
            && this.fsSource === other.fsSource;
        }

        public initWhenCreate(){
            this.addLib(render.CommonShaderLib.getInstance());
        }

        public init(){
            var self = this;

            this.buildDefinitionData();

            this.attributes.forEach((val:IShaderData, key:string) => {
                if(val.value instanceof ArrayBuffer
                || val.value === VariableCategory.ENGINE){
                    return;
                }

                dyCb.Log.error(!JudgeUtils.isArray(val.value), dyCb.Log.info.FUNC_MUST_BE("shader->attributes->value", "array"));

                val.value = self._convertToArrayBuffer(val.type, val.value);
            });

            //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
            this.program.initWithShader(this);
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            material.textureManager.sendData(program);

            this._libs.forEach((lib:ShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            program.sendUniformDataFromShader();
            program.sendAttributeDataFromShader();
        }

        public addLib(lib:ShaderLib){
            this._libs.addChild(lib);
        }

        public removeAllLibs(){
            this._libs.removeAllChildren();
        }

        public read(definitionData:IShaderDefinitionData){
            if(definitionData.attributes){
                this.attributes = <dyCb.Hash<IShaderData>>(definitionData.attributes instanceof dyCb.Hash ? definitionData.attributes : dyCb.Hash.create(definitionData.attributes));
            }

            if(definitionData.uniforms){
                this.uniforms = <dyCb.Hash<IShaderData>>(definitionData.uniforms instanceof dyCb.Hash ? definitionData.uniforms : dyCb.Hash.create(definitionData.uniforms));
            }

            this.vsSourceHead = definitionData.vsSourceHead || "";
            this.vsSourceBody = definitionData.vsSourceBody || "";
            this.fsSourceHead = definitionData.fsSourceHead || "";
            this.fsSourceBody = definitionData.fsSourceBody || "";
            //
            //this._buildVsSource();
            //this._buildFsSource();
        }

        public buildDefinitionData(){
            var self = this;

            this._libs.forEach((lib:ShaderLib) => {
                self.attributes.addChildren(lib.attributes);
                self.uniforms.addChildren(lib.uniforms);
                self.vsSourceHead += lib.vsSourceHead;
                self.vsSourceBody += lib.vsSourceBody;
                self.fsSourceHead += lib.fsSourceHead;
                self.fsSourceBody += lib.fsSourceBody;
            });

            this._buildVsSource();
            this._buildFsSource();
        }

        private _buildVsSource(){
            this.vsSource = this.vsSourceHead + this._generateAttributeSource() + this._generateUniformSource(this.vsSourceBody) + ShaderSnippet.main_begin + this.vsSourceBody + ShaderSnippet.main_end;
        }

        private _buildFsSource(){
            this.fsSource = this.fsSourceHead + this._generateUniformSource(this.fsSourceBody) +  ShaderSnippet.main_begin + this.fsSourceBody + ShaderSnippet.main_end;
        }

        private _generateAttributeSource(){
            var result = "";

            this.attributes.forEach((val:IShaderData, key:string) => {
                if(!val){
                    return;
                }

                //todo use typescript template to refactor
                result += "attribute " + VariableTable.getVariableType(val.type) + " " + key + ";\n";
            });

            return result;
        }

        private _generateUniformSource(sourceBody:string){
            var result = "";

            this.uniforms.forEach((val:IShaderData, key:string) => {
                if(!val){
                    return;
                }

                if(sourceBody.indexOf(key) !== -1){
                    //todo use typescript template to refactor
                    result += "uniform " + VariableTable.getVariableType(val.type) + " " + key + ";\n";
                }
            });

            return result;
        }

        private _convertToArrayBuffer(type:VariableType, value:Array<any>) {
            //todo get BufferType from val.type?
            return ArrayBuffer.create(new Float32Array(value), this._getBufferNum(type), render.BufferType.FLOAT);
        }

        private _getBufferNum(type:VariableType){
            var num = null;

            switch (type){
                case VariableType.FLOAT_1:
                case VariableType.NUMBER_1:
                    num = 1;
                    break;
                case VariableType.FLOAT_3:
                    num = 3;
                    break;
                case VariableType.FLOAT_4:
                    num = 4;
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT("VariableType", type));
                    break;
            }

            return num;
        }

        private _initShader(shader, source){
            var gl = Director.getInstance().gl;

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

    export interface IShaderData{
        type:VariableType;
        value:any;
    }

    //todo typescript inner interface
    export interface IShaderDefinitionData{
        vsSourceHead:string;
        vsSourceBody:string;
        fsSourceHead:string;
        fsSourceBody:string;
        attributes:IShaderData|dyCb.Hash<IShaderData>;
        uniforms:IShaderData|dyCb.Hash<IShaderData>;
    }
}
