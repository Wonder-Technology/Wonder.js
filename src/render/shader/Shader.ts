/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class Shader{
        //public static create(shaderDefinition?:IShaderDefinition) {
        public static create() {
        	var obj = new this();

            //if(shaderDefinition){
            //    obj.read(shaderDefinition);
            //}

            obj.initWhenCreate();

        	return obj;
        }

        public vsSource:string = "";
        public vsSourceHead:string = "";
        public vsSourceBody:string = "";
        public fsSource:string = "";
        public fsSourceHead:string = "";
        public fsSourceBody:string = "";
        public attributes:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();
        public uniforms:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();

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

        //todo move
        public program:Program = Program.create();

        public init(){
            var self = this;

            //todo not build here?
            //todo rename?
            this.build();

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

        //todo move
        private _libs: dyCb.Collection<ShaderLib> = dyCb.Collection.create<ShaderLib>();

        public addLib(lib:ShaderLib){
            this._libs.addChild(lib);
        }

        public build(){
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
            this.vsSource = this._generateAttributeSource() + this.vsSourceHead + ShaderSnippet.main_begin + this.vsSourceBody + ShaderSnippet.main_end;
        }

        private _buildFsSource(){
            this.fsSource = this.fsSourceHead + ShaderSnippet.main_begin + this.fsSourceBody + ShaderSnippet.main_end;
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
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT(type));
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
}
