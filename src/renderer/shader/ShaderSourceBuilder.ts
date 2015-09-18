/// <reference path="../../definitions.d.ts"/>
module dy{
    //todo add custom define
    export class ShaderSourceBuilder{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public attributes:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        public uniforms:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
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
        public vsSourceDefineList:dyCb.Collection<SourceDefine> = dyCb.Collection.create<SourceDefine>();
        public fsSourceDefineList:dyCb.Collection<SourceDefine> = dyCb.Collection.create<SourceDefine>();

        public read(definitionData:ShaderDefinitionData){
            if(definitionData.attributes){
                this.attributes = <dyCb.Hash<ShaderData>>(definitionData.attributes instanceof dyCb.Hash ? definitionData.attributes : dyCb.Hash.create(definitionData.attributes));
            }

            if(definitionData.uniforms){
                this.uniforms = <dyCb.Hash<ShaderData>>(definitionData.uniforms instanceof dyCb.Hash ? definitionData.uniforms : dyCb.Hash.create(definitionData.uniforms));
            }

            this.vsSourceTop = definitionData.vsSourceTop || "";
            this.vsSourceDefine = definitionData.vsSourceDefine || "";
            this.vsSourceVarDeclare = definitionData.vsSourceVarDeclare || "";
            this.vsSourceFuncDeclare = definitionData.vsSourceFuncDeclare || "";
            this.vsSourceFuncDefine = definitionData.vsSourceFuncDefine || "";
            this.vsSourceBody = definitionData.vsSourceBody || "";

            this.fsSourceTop = definitionData.fsSourceTop || "";
            this.fsSourceDefine = definitionData.fsSourceDefine || "";
            this.fsSourceVarDeclare = definitionData.fsSourceVarDeclare || "";
            this.fsSourceFuncDeclare = definitionData.fsSourceFuncDeclare || "";
            this.fsSourceFuncDefine = definitionData.fsSourceFuncDefine || "";
            this.fsSourceBody = definitionData.fsSourceBody || "";
        }

        public build(libs:dyCb.Collection<ShaderLib>){
            var self = this;

            this._readLibSource(libs);

            this._buildVsSource();
            this._buildFsSource();

            this.attributes
                .filter((data:ShaderData) => {
                    return JudgeUtils.isArray(data.value) && data.value !== VariableCategory.ENGINE;
                })
                .forEach((data:ShaderData, key:string) => {
                    data.value = self._convertArrayToArrayBuffer(data.type, data.value);
            });
        }

        private _readLibSource(libs:dyCb.Collection<ShaderLib>){
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
            this.vsSourceTop = vsSourceTop + this.vsSourceTop;
            this.vsSourceDefine = vsSourceDefine + this.vsSourceDefine;
            this.vsSourceVarDeclare = vsSourceVarDeclare + this.vsSourceVarDeclare;
            this.vsSourceFuncDeclare = vsSourceFuncDeclare + this.vsSourceFuncDeclare;
            this.vsSourceFuncDefine = vsSourceFuncDefine + this.vsSourceFuncDefine;
            this.vsSourceBody = vsSourceBody + this.vsSourceBody;

            this.fsSourceTop = fsSourceTop + this.fsSourceTop;
            this.fsSourceDefine = fsSourceDefine + this.fsSourceDefine;
            this.fsSourceVarDeclare = fsSourceVarDeclare + this.fsSourceVarDeclare;
            this.fsSourceFuncDeclare = fsSourceFuncDeclare + this.fsSourceFuncDeclare;
            this.fsSourceFuncDefine = fsSourceFuncDefine + this.fsSourceFuncDefine;
            this.fsSourceBody = fsSourceBody + this.fsSourceBody;
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

        private _buildSourceDefine(defineList:dyCb.Collection<SourceDefine>){
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
                    //dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("precision"));
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
    }

    export type SourceDefine = {
        name:string;
        value:any;
    }
}
