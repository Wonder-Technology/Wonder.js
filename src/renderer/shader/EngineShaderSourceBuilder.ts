module wd{
    //todo add custom define
    export class EngineShaderSourceBuilder extends ShaderSourceBuilder{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public vsSourceTop:string = "";
        public vsSourceDefine:string = "";
        public vsSourceVarDeclare:string = "";
        public vsSourceFuncDeclare:string = "";
        public vsSourceFuncDefine:string = "";
        public vsSourceBody:string = "";

        public fsSourceTop:string = "";
        public fsSourceDefine:string = "";
        public fsSourceVarDeclare:string = "";
        public fsSourceFuncDeclare:string = "";
        public fsSourceFuncDefine:string = "";
        public fsSourceBody:string = "";

        public vsSourceDefineList:wdCb.Collection<SourceDefine> = wdCb.Collection.create<SourceDefine>();
        public fsSourceDefineList:wdCb.Collection<SourceDefine> = wdCb.Collection.create<SourceDefine>();

        @require(function(libs:wdCb.Collection<EngineShaderLib>){
            assert(this.vsSource === null, Log.info.FUNC_SHOULD("vsSource", "be null"));
            assert(this.fsSource === null, Log.info.FUNC_SHOULD("fsSource", "be null"));
        })
        public build(libs:wdCb.Collection<EngineShaderLib>){
            this._readLibSource(libs);

            //todo refactor
            if(this.vsSource === null){
                this._buildVsSource();
            }
            if(this.fsSource === null){
                this._buildFsSource();
            }

            this.convertAttributesData();
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
            this.vsSource = null;

            this.fsSourceTop = "";
            this.fsSourceDefine = "";
            this.fsSourceVarDeclare = "";
            this.fsSourceFuncDeclare = "";
            this.fsSourceFuncDefine = "";
            this.fsSourceBody = "";
            this.fsSource = null;
        }

        private _readLibSource(libs:wdCb.Collection<EngineShaderLib>){
            var self = this,
                vsSource = null,
                fsSource = null,
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

            //todo refactor
            var setSourceLibs = libs.filter((lib:EngineShaderLib) => {
                return lib.vsSource !== null || lib.fsSource !== null;
            });

            var setVsSourceLib = setSourceLibs.findOne((lib:EngineShaderLib) => {
                return lib.vsSource !== null;
            });

            if(setVsSourceLib){
                vsSource = setVsSourceLib.vsSource;
            }

            var setFsSourceLib = setSourceLibs.findOne((lib:EngineShaderLib) => {
                return lib.fsSource !== null;
            });

            if(setFsSourceLib){
                fsSource = setFsSourceLib.fsSource;
            }




            libs.forEach((lib:EngineShaderLib) => {
                self.attributes.addChildren(lib.attributes);
                self.uniforms.addChildren(lib.uniforms);

                if(vsSource === null){
                    vsSourceTop += lib.vsSourceTop;
                    vsSourceDefine += lib.vsSourceDefine;
                    vsSourceVarDeclare += lib.vsSourceVarDeclare;
                    vsSourceFuncDeclare += lib.vsSourceFuncDeclare;
                    vsSourceFuncDefine += lib.vsSourceFuncDefine;
                    vsSourceBody += lib.vsSourceBody;

                    self.vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                }

                if(fsSource === null){
                    fsSourceTop += lib.fsSourceTop;
                    fsSourceDefine += lib.fsSourceDefine;
                    fsSourceVarDeclare += lib.fsSourceVarDeclare;
                    fsSourceFuncDeclare += lib.fsSourceFuncDeclare;
                    fsSourceFuncDefine += lib.fsSourceFuncDefine;
                    fsSourceBody += lib.fsSourceBody;

                    self.fsSourceDefineList.addChildren(lib.fsSourceDefineList);
                }
            });


            //todo set custom shader

            /*! ensure shader lib's code is before custom shader's source */
            //this.attributes.addChildren(this.attributesFromEngineShaderLib);
            //this.uniforms.addChildren(this.uniformsFromEngineShaderLib);


            if(vsSource !== null){
                this.vsSource = vsSource;
            }
            else{
                //this.vsSourceTop = vsSourceTop + this.vsSourceTopFromEngineShaderLib;
                //this.vsSourceDefine = vsSourceDefine + this.vsSourceDefineFromEngineShaderLib;
                //this.vsSourceVarDeclare = vsSourceVarDeclare + this.vsSourceVarDeclareFromEngineShaderLib;
                //this.vsSourceFuncDeclare = vsSourceFuncDeclare + this.vsSourceFuncDeclareFromEngineShaderLib;
                //this.vsSourceFuncDefine = vsSourceFuncDefine + this.vsSourceFuncDefineFromEngineShaderLib;
                //this.vsSourceBody = vsSourceBody + this.vsSourceBodyFromEngineShaderLib;

                this.vsSourceTop = vsSourceTop;
                this.vsSourceDefine = vsSourceDefine;
                this.vsSourceVarDeclare = vsSourceVarDeclare;
                this.vsSourceFuncDeclare = vsSourceFuncDeclare;
                this.vsSourceFuncDefine = vsSourceFuncDefine;
                this.vsSourceBody = vsSourceBody;
            }


            if(fsSource !== null){
                this.fsSource = fsSource;
            }
            else{
                //this.fsSourceTop = fsSourceTop + this.fsSourceTopFromEngineShaderLib;
                //this.fsSourceDefine = fsSourceDefine + this.fsSourceDefineFromEngineShaderLib;
                //this.fsSourceVarDeclare = fsSourceVarDeclare + this.fsSourceVarDeclareFromEngineShaderLib;
                //this.fsSourceFuncDeclare = fsSourceFuncDeclare + this.fsSourceFuncDeclareFromEngineShaderLib;
                //this.fsSourceFuncDefine = fsSourceFuncDefine + this.fsSourceFuncDefineFromEngineShaderLib;
                //this.fsSourceBody = fsSourceBody + this.fsSourceBodyFromEngineShaderLib;

                this.fsSourceTop = fsSourceTop;
                this.fsSourceDefine = fsSourceDefine;
                this.fsSourceVarDeclare = fsSourceVarDeclare;
                this.fsSourceFuncDeclare = fsSourceFuncDeclare;
                this.fsSourceFuncDefine = fsSourceFuncDefine;
                this.fsSourceBody = fsSourceBody;
            }
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
                case EGPUPrecision.HIGHP:
                    result = ShaderChunk.highp_fragment.top;
                    break;
                case EGPUPrecision.MEDIUMP:
                    result = ShaderChunk.mediump_fragment.top;
                    break;
                case EGPUPrecision.LOWP:
                    result = ShaderChunk.lowp_fragment.top;
                    break;
                default:
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
                return !!data && data.type !== EVariableType.STRUCTURE && data.type !== EVariableType.STRUCTURES && !self._isExistInSource(key, sourceVarDeclare) && (self._isExistInSource(key, sourceFuncDefine) || self._isExistInSource(key, sourceBody));
            }).forEach((data:ShaderData, key:string) => {
                result += `uniform ${VariableTypeTable.getVariableType(data.type)} ${key};\n`;
            });

            return result;
        }

        private _isExistInSource(key:string, source:string){
            return source.indexOf(key) !== -1;
        }
    }
}
