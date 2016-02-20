module wd{
    export class Shader{
        public static create(){
        	var obj = new this();

        	return obj;
        }

        private _attributes:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        get attributes(){
            return this._attributes;
        }
        set attributes(attributes:wdCb.Hash<ShaderData>){
            if(this._isNotEqual(attributes, this._attributes)){
                this._definitionDataDirty = true;
            }
            this._attributes = attributes;
        }

        private _uniforms:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        get uniforms(){
            return this._uniforms;
        }
        set uniforms(uniforms:wdCb.Hash<ShaderData>){
            if(this._isNotEqual(uniforms, this._uniforms)){
                this._definitionDataDirty = true;
            }
            this._uniforms = uniforms;
        }

        private _vsSource:string = "";
        get vsSource(){
            return this._vsSource;
        }
        set vsSource(vsSource:string){
            if(vsSource !== this._vsSource){
                this._definitionDataDirty = true;
            }
            this._vsSource = vsSource;
        }

        private _fsSource:string = "";
        get fsSource(){
            return this._fsSource;
        }
        set fsSource(fsSource:string){
            if(fsSource !== this._fsSource){
                this._definitionDataDirty = true;
            }
            this._fsSource = fsSource;
        }

        get dirty(){
            return this.libDirty || this._definitionDataDirty;
        }

        public program:Program = Program.create();
        public libDirty:boolean = true;

        private _definitionDataDirty:boolean = true;
        private _libs: wdCb.Collection<ShaderLib> = wdCb.Collection.create<ShaderLib>();
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

        public init(){
            this._libs.forEach((lib:ShaderLib) => {
                lib.init();
            });
        }

        public dispose(){
            this.program.dispose();
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();

            this._libs.forEach((lib:ShaderLib) => {
                lib.dispose();
            });
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            if(this.libDirty){
                this.buildDefinitionData(quadCmd, material);
            }

            if(this._definitionDataDirty){
                //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
                this.program.initWithShader(this);
            }

            this.program.use();

            this._libs.forEach((lib:ShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            program.sendAttributeDataFromCustomShader();
            program.sendUniformDataFromCustomShader();

            material.mapManager.sendData(program);

            this.libDirty = false;
            this._definitionDataDirty = false;
        }

        public hasLib(lib:ShaderLib);
        public hasLib(_class:Function);

        public hasLib(...args){
            if(args[0] instanceof ShaderLib){
                let lib:ShaderLib = args[0];

                return this._libs.hasChild(lib);
            }
            else{
                let _class = args[0];

                return this._libs.hasChildWithFunc((lib:ShaderLib) => {
                    return lib instanceof _class;
                })
            }
        }

        @ensure(function(){
            var self = this;

            this._libs.forEach((lib:ShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        })
        public addLib(lib:ShaderLib){
            this._libs.addChild(lib);

            lib.shader = this;

            this.libDirty = true;
        }

        @ensure(function(){
            var self = this;

            this._libs.forEach((lib:ShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        })
        public addShaderLibToTop(lib:ShaderLib){
            this._libs.unShiftChild(lib);

            lib.shader = this;

            this.libDirty = true;
        }

        public getLib(libClass:Function){
            return this._libs.findOne((lib:ShaderLib) => {
                return lib instanceof libClass;
            });
        }

        public getLibs(){
            return this._libs;
        }

        public removeLib(lib:ShaderLib);
        public removeLib(func:Function);

        public removeLib(...args){
            this.libDirty = true;

            return this._libs.removeChild(args[0]);
        }

        public removeAllLibs(){
            this.libDirty = true;

            this._libs.removeAllChildren();
        }

        public sortLib(func:(a:ShaderLib, b:ShaderLib) => any){
            this.libDirty = true;

            this._libs = this._libs.sort(func);
        }

        public read(definitionData:ShaderDefinitionData){
            this._sourceBuilder.read(definitionData);

            this.libDirty = true;
        }

        public buildDefinitionData(quadCmd:QuadCommand, material:Material){
            this._libs.forEach((lib:ShaderLib) => {
                lib.setShaderDefinition(quadCmd, material);
            });

            this._sourceBuilder.clearShaderDefinition();

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
                Log.log(gl.getShaderInfoLog(shader));
                Log.log("attributes:\n", this.attributes);
                Log.log("uniforms:\n", this.uniforms);
                Log.log("source:\n", source);
            }
        }

        private _isNotEqual(list1:wdCb.Hash<ShaderData>, list2:wdCb.Hash<ShaderData>){
            var result = false;

            list1.forEach((data:ShaderData, key:string) => {
                var list2Data = list2.getChild(key);

                if(!list2Data || data.type !== list2Data.type || data.value !== list2Data.value){
                    result = true;
                    return wdCb.$BREAK;
                }
            });

            return result;
        }
    }

    export type ShaderData = {
        type:EVariableType;
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
        attributes:ShaderData|wdCb.Hash<ShaderData>;
        uniforms:ShaderData|wdCb.Hash<ShaderData>;
    }
}
