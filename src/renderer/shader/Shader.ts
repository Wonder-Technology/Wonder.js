/// <reference path="../../definitions.d.ts"/>
module dy{
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
        public vsSourceDefine:dyCb.Collection<any> = dyCb.Collection.create<any>();
        public fsSourceDefine:dyCb.Collection<any> = dyCb.Collection.create<any>();
        public attributes:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        public uniforms:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();

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
            this.addLib(CommonShaderLib.getInstance());
        }

        public init(){
            var self = this;

            this.buildDefinitionData();

            this.attributes.forEach((val:ShaderData, key:string) => {
                if(val.value instanceof ArrayBuffer
                || val.value === VariableCategory.ENGINE){
                    return;
                }

                dyCb.Log.error(!JudgeUtils.isArray(val.value), dyCb.Log.info.FUNC_MUST_BE("shader->attributes->value", "array"));

                val.value = self._convertArrayToArrayBuffer(val.type, val.value);
            });

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
            if(definitionData.attributes){
                this.attributes = <dyCb.Hash<ShaderData>>(definitionData.attributes instanceof dyCb.Hash ? definitionData.attributes : dyCb.Hash.create(definitionData.attributes));
            }

            if(definitionData.uniforms){
                this.uniforms = <dyCb.Hash<ShaderData>>(definitionData.uniforms instanceof dyCb.Hash ? definitionData.uniforms : dyCb.Hash.create(definitionData.uniforms));
            }

            this.vsSourceHead = definitionData.vsSourceHead || "";
            this.vsSourceBody = definitionData.vsSourceBody || "";
            this.fsSourceHead = definitionData.fsSourceHead || "";
            this.fsSourceBody = definitionData.fsSourceBody || "";
        }

        public buildDefinitionData(){
            var self = this,
                vsHead = "",
                vsBody = "",
                fsHead = "",
                fsBody = "";


            this._libs.forEach((lib:ShaderLib) => {
                self.attributes.addChildren(lib.attributes);
                self.uniforms.addChildren(lib.uniforms);
                vsHead += lib.vsSourceHead;
                vsBody += lib.vsSourceBody;
                fsHead += lib.fsSourceHead;
                fsBody += lib.fsSourceBody;
                self.vsSourceDefine.addChildren(lib.vsSourceDefine);
                self.fsSourceDefine.addChildren(lib.fsSourceDefine);
            });

            //ensure shader lib's code is before custom shader's source
            this.vsSourceHead = vsHead + this.vsSourceHead;
            this.vsSourceBody = vsBody + this.vsSourceBody;
            this.fsSourceHead = fsHead + this.fsSourceHead;
            this.fsSourceBody = fsBody + this.fsSourceBody;

            this._buildVsSource();
            this._buildFsSource();
        }

        //todo test
        //todo duplicate
        private _buildVsSource(){
            this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceHead() + this._buildVsSourceBody();
        }

        private _buildFsSource(){
            this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceHead() + this._buildFsSourceBody();
        }

        //todo move to builder
        private _buildVsSourceTop(){
            return "";
        }
        private _buildVsSourceDefine(){
            return this._buildSourceDefine(this.vsSourceDefine);
        }
        private _buildVsSourceHead(){
            return this._generateAttributeSource() + this._generateUniformSource(this.vsSourceHead, this.vsSourceBody) + this.vsSourceHead;
        }
        private _buildVsSourceBody(){
            return ShaderSnippet.main_begin + this.vsSourceBody + ShaderSnippet.main_end;
        }

        private _buildFsSourceTop(){
            return this._getPrecisionSource();
        }

        private _buildFsSourceDefine(){
            return this._buildSourceDefine(this.fsSourceDefine);
        }
        //todo set define type
        private _buildSourceDefine(define:any){
            var result = "";

            //todo destructure define
            define.forEach((define:any) => {
                if(!define.value){
                    result += `#define ${define.name}\n`;
                }
                else{
                    result += `#define ${define.name} ${define.value}\n`;
                }
            });

            return result;
        }
        private _buildFsSourceHead(){
            return this._generateUniformSource(this.fsSourceHead, this.fsSourceBody) + this.fsSourceHead;
        }
        private _buildFsSourceBody(){
            return ShaderSnippet.main_begin + this.fsSourceBody + ShaderSnippet.main_end;
        }

        private _getPrecisionSource(){
            var precision = GPUDetector.getInstance().precision,
                result = null;

            switch (precision){
                case GPUPrecision.HIGHP:
                    result = ShaderChunk.highp_head_fragment;
                    break;
                case GPUPrecision.MEDIUMP:
                    result = ShaderChunk.mediump_head_fragment;
                    break;
                case GPUPrecision.LOWP:
                    result = ShaderChunk.lowp_head_fragment;
                    break;
                default:
                    //dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("precision"));
                    result = "";
                    break;
            }

            return result;
        }

        private _generateAttributeSource(){
            var result = "";

            this.attributes.forEach((val:ShaderData, key:string) => {
                if(!val){
                    return;
                }

                result += `attribute ${VariableTable.getVariableType(val.type)} ${key};\n`;
            });

            return result;
        }

        //todo test
        private _generateUniformSource(sourceHead:string, sourceBody:string){
            var result = "";

            this.uniforms.forEach((val:ShaderData, key:string) => {
                if(!val || val.type === VariableType.STRUCTURE || val.type === VariableType.STRUCTURES){
                    return;
                }

                if(sourceHead.indexOf(key) !== -1
                || sourceBody.indexOf(key) !== -1){
                    result += `uniform ${VariableTable.getVariableType(val.type)} ${key};\n`;
                }
            });

            return result;
        }

        private _convertArrayToArrayBuffer(type:VariableType, value:Array<any>) {
            //todo get BufferType from val.type?
            return ArrayBuffer.create(new Float32Array(value), this._getBufferNum(type), BufferType.FLOAT);
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

    export type ShaderData = {
        type:VariableType;
        value:any;
    }

    export type ShaderDefinitionData = {
        vsSourceHead:string;
        vsSourceBody:string;
        fsSourceHead:string;
        fsSourceBody:string;
        attributes:ShaderData|dyCb.Hash<ShaderData>;
        uniforms:ShaderData|dyCb.Hash<ShaderData>;
    }
}
