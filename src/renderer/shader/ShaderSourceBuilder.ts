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
        public vsSourceHead:string = "";
        public vsSourceBody:string = "";
        public fsSource:string = "";
        public fsSourceHead:string = "";
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

            this.vsSourceHead = definitionData.vsSourceHead || "";
            this.vsSourceBody = definitionData.vsSourceBody || "";
            this.fsSourceHead = definitionData.fsSourceHead || "";
            this.fsSourceBody = definitionData.fsSourceBody || "";
        }

        public build(libs:dyCb.Collection<ShaderLib>){
            var self = this,
                vsHead = "",
                vsBody = "",
                fsHead = "",
                fsBody = "";

            libs.forEach((lib:ShaderLib) => {
                self.attributes.addChildren(lib.attributes);
                self.uniforms.addChildren(lib.uniforms);
                vsHead += lib.vsSourceHead;
                vsBody += lib.vsSourceBody;
                fsHead += lib.fsSourceHead;
                fsBody += lib.fsSourceBody;
                self.vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                self.fsSourceDefineList.addChildren(lib.fsSourceDefineList);
            });

            //ensure shader lib's code is before custom shader's source
            this.vsSourceHead = vsHead + this.vsSourceHead;
            this.vsSourceBody = vsBody + this.vsSourceBody;
            this.fsSourceHead = fsHead + this.fsSourceHead;
            this.fsSourceBody = fsBody + this.fsSourceBody;

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

        private _buildVsSource(){
            this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceHead() + this._buildVsSourceBody();
        }

        private _buildFsSource(){
            this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceHead() + this._buildFsSourceBody();
        }

        private _buildVsSourceTop(){
            return this._getPrecisionSource();
        }

        private _buildVsSourceDefine(){
            return this._buildSourceDefine(this.vsSourceDefineList);
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
            return this._buildSourceDefine(this.fsSourceDefineList);
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

            this.attributes
                .filter((data:ShaderData, key:string) => {
                    return !!data;
                })
                .forEach((data:ShaderData, key:string) => {
                if(!data){
                    return;
                }

                result += `attribute ${VariableTable.getVariableType(data.type)} ${key};\n`;
            });

            return result;
        }

        private _generateUniformSource(sourceHead:string, sourceBody:string){
            var result = "",
                self = this;

            this.uniforms
                .filter((data:ShaderData, key:string) => {
                    return !!data && data.type !== VariableType.STRUCTURE && data.type !== VariableType.STRUCTURES && self._isExistInSource(key, sourceHead, sourceBody);
                })
                .forEach((data:ShaderData, key:string) => {
                    result += `uniform ${VariableTable.getVariableType(data.type)} ${key};\n`;
                });

            return result;
        }

        private _isExistInSource(key:string, sourceHead:string, sourceBody:string){
            return sourceHead.indexOf(key) !== -1 || sourceBody.indexOf(key) !== -1;
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
