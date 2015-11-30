/// <reference path="../../filePath.d.ts"/>
module dy{
    //todo add custom define
    export class ShaderSourceBuilder{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public attributes:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        public uniforms:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        public vsSource:string = "";
        public vsSourceTop:string = "";
        public vsSourceDefine:string = "";
        public vsSourceVarDeclare:string = "";
        public vsSourceFuncDeclare:string = "";
        public vsSourceFuncDefine:string = "";
        public vsSourceBody:string = "";
        public fsSource:string = "";
        public fsSourceTop:string = "";
        public fsSourceDefine:string = "";
        public fsSourceVarDeclare:string = "";
        public fsSourceFuncDeclare:string = "";
        public fsSourceFuncDefine:string = "";
        public fsSourceBody:string = "";
        public vsSourceDefineList:wdCb.Collection<SourceDefine> = wdCb.Collection.create<SourceDefine>();
        public fsSourceDefineList:wdCb.Collection<SourceDefine> = wdCb.Collection.create<SourceDefine>();

        public attributesFromShaderLib:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        public uniformsFromShaderLib:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        public vsSourceFromShaderLib:string = "";
        public vsSourceTopFromShaderLib:string = "";
        public vsSourceDefineFromShaderLib:string = "";
        public vsSourceVarDeclareFromShaderLib:string = "";
        public vsSourceFuncDeclareFromShaderLib:string = "";
        public vsSourceFuncDefineFromShaderLib:string = "";
        public vsSourceBodyFromShaderLib:string = "";
        public fsSourceFromShaderLib:string = "";
        public fsSourceTopFromShaderLib:string = "";
        public fsSourceDefineFromShaderLib:string = "";
        public fsSourceVarDeclareFromShaderLib:string = "";
        public fsSourceFuncDeclareFromShaderLib:string = "";
        public fsSourceFuncDefineFromShaderLib:string = "";
        public fsSourceBodyFromShaderLib:string = "";
        public vsSourceDefineListFromShaderLib:wdCb.Collection<SourceDefine> = wdCb.Collection.create<SourceDefine>();
        public fsSourceDefineListFromShaderLib:wdCb.Collection<SourceDefine> = wdCb.Collection.create<SourceDefine>();


        public read(definitionData:ShaderDefinitionData){
            if(definitionData.attributes){
                this.attributesFromShaderLib = <wdCb.Hash<ShaderData>>(definitionData.attributes instanceof wdCb.Hash ? definitionData.attributes : wdCb.Hash.create(definitionData.attributes));
            }

            if(definitionData.uniforms){
                this.uniformsFromShaderLib = <wdCb.Hash<ShaderData>>(definitionData.uniforms instanceof wdCb.Hash ? definitionData.uniforms : wdCb.Hash.create(definitionData.uniforms));
            }

            this.vsSourceTopFromShaderLib = definitionData.vsSourceTop || "";
            this.vsSourceDefineFromShaderLib = definitionData.vsSourceDefine || "";
            this.vsSourceVarDeclareFromShaderLib = definitionData.vsSourceVarDeclare || "";
            this.vsSourceFuncDeclareFromShaderLib = definitionData.vsSourceFuncDeclare || "";
            this.vsSourceFuncDefineFromShaderLib = definitionData.vsSourceFuncDefine || "";
            this.vsSourceBodyFromShaderLib = definitionData.vsSourceBody || "";

            this.fsSourceTopFromShaderLib = definitionData.fsSourceTop || "";
            this.fsSourceDefineFromShaderLib = definitionData.fsSourceDefine || "";
            this.fsSourceVarDeclareFromShaderLib = definitionData.fsSourceVarDeclare || "";
            this.fsSourceFuncDeclareFromShaderLib = definitionData.fsSourceFuncDeclare || "";
            this.fsSourceFuncDefineFromShaderLib = definitionData.fsSourceFuncDefine || "";
            this.fsSourceBodyFromShaderLib = definitionData.fsSourceBody || "";
        }

        public build(libs:wdCb.Collection<ShaderLib>){
            var self = this;

            this._readLibSource(libs);

            this._buildVsSource();
            this._buildFsSource();

            this.attributes
                .filter((data:ShaderData) => {
                    return (JudgeUtils.isArray(data.value) || JudgeUtils.isFloatArray(data.value)) && data.value !== VariableCategory.ENGINE;
                })
                .forEach((data:ShaderData, key:string) => {
                    data.value = self._convertArrayToArrayBuffer(data.type, data.value);
            });
        }

        public clearShaderDefinition(){
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();
            this.vsSourceDefineList.removeAllChildren();
            this.fsSourceDefineList.removeAllChildren();

            this.vsSourceTop = "";
            this.vsSourceDefine = "";
            this.vsSourceVarDeclare = "";
            this.vsSourceFuncDeclare = "";
            this.vsSourceFuncDefine = "";
            this.vsSourceBody = "";
            this.fsSourceTop = "";
            this.fsSourceDefine = "";
            this.fsSourceVarDeclare = "";
            this.fsSourceFuncDeclare = "";
            this.fsSourceFuncDefine = "";
            this.fsSourceBody = "";
        }

        private _readLibSource(libs:wdCb.Collection<ShaderLib>){
            var self = this,
                vsSourceTop = "",
                vsSourceDefine = "",
                vsSourceVarDeclare = "",
                vsSourceFuncDeclare = "",
                vsSourceFuncDefine = "",
                vsSourceBody = "",
                fsSourceTop = "",
                fsSourceDefine = "",
                fsSourceVarDeclare = "",
                fsSourceFuncDeclare = "",
                fsSourceFuncDefine = "",
                fsSourceBody = "";

            libs.forEach((lib:ShaderLib) => {
                self.attributes.addChildren(lib.attributes);
                self.uniforms.addChildren(lib.uniforms);

                vsSourceTop += lib.vsSourceTop;
                vsSourceDefine += lib.vsSourceDefine;
                vsSourceVarDeclare += lib.vsSourceVarDeclare;
                vsSourceFuncDeclare += lib.vsSourceFuncDeclare;
                vsSourceFuncDefine += lib.vsSourceFuncDefine;
                vsSourceBody += lib.vsSourceBody;

                fsSourceTop += lib.fsSourceTop;
                fsSourceDefine += lib.fsSourceDefine;
                fsSourceVarDeclare += lib.fsSourceVarDeclare;
                fsSourceFuncDeclare += lib.fsSourceFuncDeclare;
                fsSourceFuncDefine += lib.fsSourceFuncDefine;
                fsSourceBody += lib.fsSourceBody;

                self.vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                self.fsSourceDefineList.addChildren(lib.fsSourceDefineList);
            });

            //ensure shader lib's code is before custom shader's source
            this.attributes.addChildren(this.attributesFromShaderLib);
            this.uniforms.addChildren(this.uniformsFromShaderLib);
            this.vsSourceTop = vsSourceTop + this.vsSourceTopFromShaderLib;
            this.vsSourceDefine = vsSourceDefine + this.vsSourceDefineFromShaderLib;
            this.vsSourceVarDeclare = vsSourceVarDeclare + this.vsSourceVarDeclareFromShaderLib;
            this.vsSourceFuncDeclare = vsSourceFuncDeclare + this.vsSourceFuncDeclareFromShaderLib;
            this.vsSourceFuncDefine = vsSourceFuncDefine + this.vsSourceFuncDefineFromShaderLib;
            this.vsSourceBody = vsSourceBody + this.vsSourceBodyFromShaderLib;

            this.fsSourceTop = fsSourceTop + this.fsSourceTopFromShaderLib;
            this.fsSourceDefine = fsSourceDefine + this.fsSourceDefineFromShaderLib;
            this.fsSourceVarDeclare = fsSourceVarDeclare + this.fsSourceVarDeclareFromShaderLib;
            this.fsSourceFuncDeclare = fsSourceFuncDeclare + this.fsSourceFuncDeclareFromShaderLib;
            this.fsSourceFuncDefine = fsSourceFuncDefine + this.fsSourceFuncDefineFromShaderLib;
            this.fsSourceBody = fsSourceBody + this.fsSourceBodyFromShaderLib;
        }

        private _buildVsSource(){
            this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceVarDeclare() + this._buildVsSourceFuncDeclare() + this._buildVsSourceFuncDefine() + this._buildVsSourceBody();
        }

        private _buildFsSource(){
            this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceVarDeclare() + this._buildFsSourceFuncDeclare() + this._buildFsSourceFuncDefine() + this._buildFsSourceBody();
        }

        private _buildVsSourceTop(){
            return this._getPrecisionSource() + this.vsSourceTop;
        }

        private _buildVsSourceDefine(){
            return this._buildSourceDefine(this.vsSourceDefineList) + this.vsSourceDefine;
        }

        private _buildVsSourceVarDeclare(){
            return this._generateAttributeSource() + this._generateUniformSource(this.vsSourceVarDeclare, this.vsSourceFuncDefine, this.vsSourceBody) + this.vsSourceVarDeclare;
        }

        private _buildVsSourceFuncDeclare(){
            return this.vsSourceFuncDeclare;
        }

        private _buildVsSourceFuncDefine(){
            return this.vsSourceFuncDefine;
        }

        private _buildVsSourceBody(){
            return ShaderSnippet.main_begin + this.vsSourceBody + ShaderSnippet.main_end;
        }

        private _buildFsSourceTop(){
            return this._getPrecisionSource() + this.fsSourceTop;
        }

        private _buildFsSourceDefine(){
            return this._buildSourceDefine(this.fsSourceDefineList) + this.fsSourceDefine;
        }

        private _buildFsSourceVarDeclare(){
            return this._generateUniformSource(this.fsSourceVarDeclare, this.fsSourceFuncDefine, this.fsSourceBody) + this.fsSourceVarDeclare;
        }

        private _buildFsSourceFuncDeclare(){
            return this.fsSourceFuncDeclare;
        }

        private _buildFsSourceFuncDefine(){
            return this.fsSourceFuncDefine;
        }

        private _buildFsSourceBody(){
            return ShaderSnippet.main_begin + this.fsSourceBody + ShaderSnippet.main_end;
        }

        private _buildSourceDefine(defineList:wdCb.Collection<SourceDefine>){
            var result = "";

            defineList.forEach((define:SourceDefine) => {
                if(define.value === void 0){
                    result += `#define ${define.name}\n`;
                }
                else{
                    result += `#define ${define.name} ${define.value}\n`;
                }
            });

            return result;
        }

        private _getPrecisionSource(){
            var precision = GPUDetector.getInstance().precision,
                result = null;

            switch (precision){
                case GPUPrecision.HIGHP:
                    result = ShaderChunk.highp_fragment.top;
                    break;
                case GPUPrecision.MEDIUMP:
                    result = ShaderChunk.mediump_fragment.top;
                    break;
                case GPUPrecision.LOWP:
                    result = ShaderChunk.lowp_fragment.top;
                    break;
                default:
                    //Log.error(true, Log.info.FUNC_INVALID("precision"));
                    result = "";
                    break;
            }

            return result;
        }

        private _generateAttributeSource(){
            var result = "";

            this.attributes.filter((data:ShaderData, key:string) => {
                return !!data;
            }).forEach((data:ShaderData, key:string) => {
                result += `attribute ${VariableTypeTable.getVariableType(data.type)} ${key};\n`;
            });

            return result;
        }

        private _generateUniformSource(sourceVarDeclare:string, sourceFuncDefine:string, sourceBody:string){
            var result = "",
                self = this;

            this.uniforms.filter((data:ShaderData, key:string) => {
                return !!data && data.type !== VariableType.STRUCTURE && data.type !== VariableType.STRUCTURES && !self._isExistInSource(key, sourceVarDeclare) && (self._isExistInSource(key, sourceFuncDefine) || self._isExistInSource(key, sourceBody));
                }).forEach((data:ShaderData, key:string) => {
                    result += `uniform ${VariableTypeTable.getVariableType(data.type)} ${key};\n`;
                });

            return result;
        }

        private _isExistInSource(key:string, source:string){
            return source.indexOf(key) !== -1;
        }

        private _convertArrayToArrayBuffer(type:VariableType, value:Array<any>|Float32Array|Float64Array) {
            var num = this._getBufferNum(type);

            if(JudgeUtils.isArray(value)){
                return ArrayBuffer.create(new Float32Array(value), num, BufferType.FLOAT);
            }
            else if(JudgeUtils.isFloatArray(value)){
                return ArrayBuffer.create(value, num, BufferType.FLOAT);
            }
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
                    Log.error(true, Log.info.FUNC_UNEXPECT("VariableType", type));
                    break;
            }

            return num;
        }
    }

    export type SourceDefine = {
        name:string;
        value:any;
    }
}
