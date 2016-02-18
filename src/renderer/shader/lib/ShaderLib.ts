module wd{
    export abstract class ShaderLib{
        public type:string = ABSTRACT_ATTRIBUTE;
        public shader:Shader = null;

        public attributes:wdCb.Hash<ShaderVariable> = wdCb.Hash.create<ShaderVariable>();
        public uniforms:wdCb.Hash<ShaderVariable> = wdCb.Hash.create<ShaderVariable>();
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
        public vsSourceDefineList:wdCb.Collection<any> = wdCb.Collection.create<any>();
        public fsSourceDefineList:wdCb.Collection<any> = wdCb.Collection.create<any>();

        public abstract sendShaderVariables(program: Program, quadCmd:QuadCommand, material:Material);

        @virtual
        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            var vs = null,
                fs = null;

            this._clearShaderDefinition();

            vs = this.getVsChunk();
            fs = this.getFsChunk();

            vs && this.setVsSource(vs);
            fs && this.setFsSource(fs);
        }

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }

        protected getVsChunk();
        protected getVsChunk(type:string);

        protected getVsChunk(...args){
            var type = args.length === 0 ? this.type : args[0];

            return this._getChunk(type, EShaderLibType.vs);
        }

        protected getFsChunk();
        protected getFsChunk(type:string);

        protected getFsChunk(...args){
            var type = args.length === 0 ? this.type : args[0];

            return this._getChunk(type, EShaderLibType.fs);
        }

        protected setVsSource(vs:GLSLChunk, operator:string="="){
            this._setSource(vs, EShaderLibType.vs, operator);
        }

        protected setFsSource(fs:GLSLChunk, operator:string="="){
            this._setSource(fs, EShaderLibType.fs, operator);
        }

        protected addAttributeVariable(variableArr:Array<string>){
            this._addVariable(this.attributes, variableArr);
        }

        protected addUniformVariable(variableArr:Array<string>){
            this._addVariable(this.uniforms, variableArr);
        }

        protected sendAttributeData(program:Program, name:string, data:any){
            program.sendAttributeData(name, EVariableType.BUFFER, data);
        }

        @require(function(program:Program, name:string, data:any){
            assert(!!VariableLib[name], `${name} should exist in VariableLib`);
        })
        protected sendUniformData(program:Program, name:string, data:any){
            program.sendUniformData(name, VariableLib[name].type, data);
        }

        private _clearShaderDefinition(){
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

        private _getChunk(type:string, sourceType:EShaderLibType){
            var key = null;

            if(type.indexOf(".glsl") > -1){
                key =  `${wdCb.PathUtils.basename(type, ".glsl")}`;
            }
            else{
                if(sourceType === EShaderLibType.vs){
                    key = `${type}_vertex`;
                }
                else{
                    key = `${type}_fragment`;
                }
            }

            return ShaderChunk[key] ? ShaderChunk[key] : ShaderChunk.empty;
        }

        private _setSource(chunk:GLSLChunk, sourceType:EShaderLibType, operator:string) {
            if(!chunk){
                return;
            }

            switch (operator){
                case "+":
                    this[`${sourceType}SourceTop`] += chunk.top;
                    this[`${sourceType}SourceDefine`] += chunk.define;
                    this[`${sourceType}SourceVarDeclare`] += chunk.varDeclare;
                    this[`${sourceType}SourceFuncDeclare`] += chunk.funcDeclare;
                    this[`${sourceType}SourceFuncDefine`] += chunk.funcDefine;
                    this[`${sourceType}SourceBody`] += chunk.body;
                    break;
                case "=":
                    this[`${sourceType}SourceTop`] = chunk.top;
                    this[`${sourceType}SourceDefine`] = chunk.define;
                    this[`${sourceType}SourceVarDeclare`] = chunk.varDeclare;
                    this[`${sourceType}SourceFuncDeclare`] = chunk.funcDeclare;
                    this[`${sourceType}SourceFuncDefine`] = chunk.funcDefine;
                    this[`${sourceType}SourceBody`] = chunk.body;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("opertor:", operator));
                    break;
            }
        }

        private _addVariable(target:wdCb.Hash<ShaderVariable>, variableArr:Array<string>){
            variableArr.forEach((variable:string) => {
                Log.assert(VariableLib[variable], Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));

                target.addChild(variable, VariableLib[variable]);
            });
        }
    }

    enum EShaderLibType{
        vs=<any>"vs",
        fs=<any>"fs"
    }
}
