module wd{
    export abstract class Shader{
        private _attributes:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        get attributes(){
            return this._attributes;
        }
        set attributes(attributes:wdCb.Hash<ShaderData>){
            if(this._isNotEqual(attributes, this._attributes)){
                this.definitionDataDirty = true;
            }
            this._attributes = attributes;
        }

        private _uniforms:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        get uniforms(){
            return this._uniforms;
        }
        set uniforms(uniforms:wdCb.Hash<ShaderData>){
            if(this._isNotEqual(uniforms, this._uniforms)){
                this.definitionDataDirty = true;
            }
            this._uniforms = uniforms;
        }

        private _vsSource:string = "";
        get vsSource(){
            return this._vsSource;
        }
        set vsSource(vsSource:string){
            if(vsSource !== this._vsSource){
                this.definitionDataDirty = true;
            }
            this._vsSource = vsSource;
        }

        private _fsSource:string = "";
        get fsSource(){
            return this._fsSource;
        }
        set fsSource(fsSource:string){
            if(fsSource !== this._fsSource){
                this.definitionDataDirty = true;
            }
            this._fsSource = fsSource;
        }

        get dirty(){
            return this.libDirty || this.definitionDataDirty;
        }

        @ensureGetter(function(program:Program){
            assert(!!program, Log.info.FUNC_NOT_EXIST(`program\nits table key is:${this._getProgramTableKey()}`))
        })
        @cacheGetter(function(){
            return !this.dirty && this._cacheProgram !== null;
        }, function(){
            return this._cacheProgram;
        }, function(program:Program){
            this._cacheProgram = program;
        })
        get program(){
            return ProgramTable.getProgram(this._getProgramTableKey());
        }

        public libDirty:boolean = false;
        public definitionDataDirty:boolean = false;
        public mapManager:MapManager = MapManager.create();

        protected libs:wdCb.Collection<ShaderLib> = wdCb.Collection.create<ShaderLib>();
        protected sourceBuilder:ShaderSourceBuilder = this.createShaderSourceBuilder();

        private _cacheProgram:Program = null;
        private _cacheInstanceState:InstanceState = null;

        public abstract update(cmd:RenderCommand, material:Material);

        public createVsShader(){
            var gl = DeviceManager.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        }

        public createFsShader(){
            var gl = DeviceManager.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        }

        @execOnlyOnce("_isInit")
        public init(material:Material){
            this.libs.forEach((lib:ShaderLib) => {
                lib.init();
            });

            this.judgeRefreshShader(null, material);

            this.mapManager.init();
        }

        public dispose(){
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();

            this.libs.forEach((lib:ShaderLib) => {
                lib.dispose();
            });

            this.mapManager.dispose();

            this._clearAllCache();
        }

        public hasLib(lib:ShaderLib);
        public hasLib(_class:Function);

        public hasLib(...args){
            if(args[0] instanceof ShaderLib){
                let lib:ShaderLib = args[0];

                return this.libs.hasChild(lib);
            }
            else{
                let _class = args[0];

                return this.libs.hasChildWithFunc((lib:ShaderLib) => {
                    return lib instanceof _class;
                })
            }
        }

        @ensure(function(){
            var self = this;

            this.libs.forEach((lib:ShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        })
        public addLib(lib:ShaderLib){
            this.libs.addChild(lib);

            lib.shader = this;

            this.libDirty = true;
        }

        @ensure(function(val, lib:ShaderLib){
            var self = this;

            assert(JudgeUtils.isEqual(lib, this.libs.getChild(0)), Log.info.FUNC_SHOULD("add shader lib to the top"));

            this.libs.forEach((lib:ShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        })
        public addShaderLibToTop(lib:ShaderLib){
            this.libs.unShiftChild(lib);

            lib.shader = this;

            this.libDirty = true;
        }

        public getLib(libClass:Function){
            return this.libs.findOne((lib:ShaderLib) => {
                return lib instanceof libClass;
            });
        }

        public getLibs(){
            return this.libs;
        }

        public removeLib(lib:ShaderLib);
        public removeLib(func:Function);

        public removeLib(...args){
            this.libDirty = true;

            return this.libs.removeChild(args[0]);
        }

        public removeAllLibs(){
            this.libDirty = true;

            this.libs.removeAllChildren();
        }

        public sortLib(func:(a:ShaderLib, b:ShaderLib) => any){
            this.libDirty = true;

            this.libs.sort(func, true);
        }

        @ensure(function({
            isModelMatrixInstance,
            isNormalMatrixInstance,
            isHardwareInstance,
            isBatchInstance
            }){
            if(isNormalMatrixInstance){
                assert(isModelMatrixInstance === true, Log.info.FUNC_MUST_BE("modelMatrixInstance if is normalMatrixInstance"));
            }

            assert(!(isHardwareInstance && isBatchInstance), Log.info.FUNC_SHOULD_NOT("both be hardware insstance and batch instance"));
        })
        @cache(function(){
            return !this.dirty && this._cacheInstanceState;
        }, function(){
            return this._cacheInstanceState;
        }, function(instanceState:InstanceState){
            this._cacheInstanceState = instanceState;
        })
        public getInstanceState(){
            var isModelMatrixInstance = false,
                isNormalMatrixInstance = false,
                isHardwareInstance = false,
                isBatchInstance = false;

            this.libs.forEach((lib:ShaderLib) => {
                if(!(lib instanceof InstanceShaderLib)){
                    return;
                }

                if(lib instanceof NormalMatrixHardwareInstanceShaderLib){
                    isNormalMatrixInstance = true;
                    isHardwareInstance = true;

                    return wdCb.$BREAK;
                }

                if(lib instanceof NormalMatrixBatchInstanceShaderLib){
                    isNormalMatrixInstance = true;
                    isBatchInstance = true;

                    return wdCb.$BREAK;
                }

                if(lib instanceof ModelMatrixHardwareInstanceShaderLib){
                    isModelMatrixInstance = true;
                    isHardwareInstance = true;

                    return;
                }

                if(lib instanceof ModelMatrixBatchInstanceShaderLib){
                    isModelMatrixInstance = true;
                    isBatchInstance = true;

                    return;
                }
            });

            return {
                isModelMatrixInstance:isModelMatrixInstance,
                isNormalMatrixInstance:isNormalMatrixInstance,
                isHardwareInstance:isHardwareInstance,
                isBatchInstance:isBatchInstance
            }
        }

        protected abstract createShaderSourceBuilder():ShaderSourceBuilder;
        protected abstract buildDefinitionData(cmd:RenderCommand, material:Material):void;


        protected judgeRefreshShader(cmd:RenderCommand, material:Material){
            if(this.libDirty){
                this.buildDefinitionData(cmd, material);
            }

            if(this.definitionDataDirty){
                //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
                this._registerAndUpdateProgram();
            }


            this.libDirty = false;
            this.definitionDataDirty = false;
        }

        private _registerAndUpdateProgram(){
            var key = this._getProgramTableKey();

            if(ProgramTable.hasProgram(key)){
                return;
            }

            ProgramTable.addProgram(key, Program.create());
            this._updateProgram();
        }

        private _updateProgram(){
            this.program.initWithShader(this);
        }

        private _getProgramTableKey(){
            return `${this.vsSource}\n${this.fsSource}`;
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

        private _clearAllCache(){
            this._cacheProgram = null;
            this._cacheInstanceState = null;
        }
    }

    export type ShaderData = {
        type:EVariableType;
        value?:any;
        textureId?:string;
    }

    type InstanceState = {
        isModelMatrixInstance:boolean;
        isNormalMatrixInstance:boolean;
        isHardwareInstance:boolean;
        isBatchInstance:boolean
    }
}
