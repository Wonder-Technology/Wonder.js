module wd{
    export class ProceduralShader extends Shader{
        public static create(){
            var obj = new this();

            return obj;
        }
        //
        //private _attributes:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        //get attributes(){
        //    return this._attributes;
        //}
        //set attributes(attributes:wdCb.Hash<ShaderData>){
        //    if(this._isNotEqual(attributes, this._attributes)){
        //        this._definitionDataDirty = true;
        //    }
        //    this._attributes = attributes;
        //}
        //
        //private _uniforms:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        //get uniforms(){
        //    return this._uniforms;
        //}
        //set uniforms(uniforms:wdCb.Hash<ShaderData>){
        //    if(this._isNotEqual(uniforms, this._uniforms)){
        //        this._definitionDataDirty = true;
        //    }
        //    this._uniforms = uniforms;
        //}
        //
        //private _vsSource:string = "";
        //get vsSource(){
        //    return this._vsSource;
        //}
        //set vsSource(vsSource:string){
        //    if(vsSource !== this._vsSource){
        //        this._definitionDataDirty = true;
        //    }
        //    this._vsSource = vsSource;
        //}
        //
        //private _fsSource:string = "";
        //get fsSource(){
        //    return this._fsSource;
        //}
        //set fsSource(fsSource:string){
        //    if(fsSource !== this._fsSource){
        //        this._definitionDataDirty = true;
        //    }
        //    this._fsSource = fsSource;
        //}
        //
        //get dirty(){
        //    return this.libDirty || this._definitionDataDirty;
        //}
        //
        //public program:Program = Program.create();
        //public libDirty:boolean = true;
        //
        //private _definitionDataDirty:boolean = true;
        //private libs: wdCb.Collection<ProceduralShaderLib> = wdCb.Collection.create<ProceduralShaderLib>();
        //private _sourceBuilder:ShaderSourceBuilder = ShaderSourceBuilder.create();

        protected libs:wdCb.Collection<ProceduralShaderLib>;

        //public createVsShader(){
        //    var gl = DeviceManager.getInstance().gl;
        //
        //    return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        //}
        //
        //public createFsShader(){
        //    var gl = DeviceManager.getInstance().gl;
        //
        //    return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        //}
        //
        //public isEqual(other:Shader){
        //    return this.vsSource === other.vsSource
        //        && this.fsSource === other.fsSource;
        //}
        //
        //public init(){
        //    this.libs.forEach((lib:ProceduralShaderLib) => {
        //        lib.init();
        //    });
        //
        //    this.judgeRefreshShader();
        //}
        //
        //public dispose(){
        //    this.program.dispose();
        //    this.attributes.removeAllChildren();
        //    this.uniforms.removeAllChildren();
        //
        //    this.libs.forEach((lib:ProceduralShaderLib) => {
        //        lib.dispose();
        //    });
        //}

        public update(cmd:ProceduralCommand, material:Material){
            var program = this.program;

            this.judgeRefreshShader();

            this.program.use();

            this.libs.forEach((lib:ProceduralShaderLib) => {
                lib.sendShaderVariables(program, cmd, material);
            });

            //program.sendAttributeDataFromCustomShader();
            //program.sendUniformDataFromCustomShader();

            //material.mapManager.sendData(program);
        }

        //public judgeRefreshShader(){
        //    if(this.libDirty){
        //        this.buildDefinitionData(null, LightMaterial.create());
        //    }
        //
        //    if(this._definitionDataDirty){
        //        //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
        //        this.program.initWithShader(this);
        //    }
        //
        //
        //    this.libDirty = false;
        //    this._definitionDataDirty = false;
        //}
        //
        //public hasLib(lib:ProceduralShaderLib);
        //public hasLib(_class:Function);
        //
        //public hasLib(...args){
        //    if(args[0] instanceof ProceduralShaderLib){
        //        let lib:ProceduralShaderLib = args[0];
        //
        //        return this.libs.hasChild(lib);
        //    }
        //    else{
        //        let _class = args[0];
        //
        //        return this.libs.hasChildWithFunc((lib:ProceduralShaderLib) => {
        //            return lib instanceof _class;
        //        })
        //    }
        //}

        @ensure(function(){
            var self = this;

            this.libs.forEach((lib:ProceduralShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ProceduralShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));

            assert(this.libs.getCount() === 1, Log.info.FUNC_SHOULD("only has one ProceduralShaderLib"));
        })
        public addLib(lib:ProceduralShaderLib){
            this.libs.removeAllChildren();

            super.addLib(lib);
        }

        //@ensure(function(val, lib:ProceduralShaderLib){
        //    var self = this;
        //
        //    assert(JudgeUtils.isEqual(lib.shader, this.libs.getChild(0)), Log.info.FUNC_SHOULD("add shader lib to the top"));
        //
        //    this.libs.forEach((lib:ProceduralShaderLib) => {
        //        assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ProceduralShaderLib.shader to be this"));
        //    });
        //
        //    assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        //})
        //public addProceduralShaderLibToTop(lib:ProceduralShaderLib){
        //    this.libs.unShiftChild(lib);
        //
        //    lib.shader = this;
        //
        //    this.libDirty = true;
        //}
        //
        //public getLib(libClass:Function){
        //    return this.libs.findOne((lib:ProceduralShaderLib) => {
        //        return lib instanceof libClass;
        //    });
        //}
        //
        //public getLibs(){
        //    return this.libs;
        //}
        //
        //public removeLib(lib:ProceduralShaderLib);
        //public removeLib(func:Function);
        //
        //public removeLib(...args){
        //    this.libDirty = true;
        //
        //    return this.libs.removeChild(args[0]);
        //}
        //
        //public removeAllLibs(){
        //    this.libDirty = true;
        //
        //    this.libs.removeAllChildren();
        //}
        //
        //public sortLib(func:(a:ProceduralShaderLib, b:ProceduralShaderLib) => any){
        //    this.libDirty = true;
        //
        //    this.libs = this.libs.sort(func);
        //}

        //public read(definitionData:ShaderDefinitionData){
        //    this._sourceBuilder.read(definitionData);
        //
        //    this.libDirty = true;
        //}

        //public buildDefinitionData(cmd:ProceduralCommand, material:Material){
        //    this.libs.forEach((lib:ProceduralShaderLib) => {
        //        lib.setShaderDefinition(cmd, material);
        //    });
        //
        //    this._sourceBuilder.clearShaderDefinition();
        //
        //    this._sourceBuilder.build(this.libs);
        //
        //    this.attributes = this._sourceBuilder.attributes;
        //    this.uniforms = this._sourceBuilder.uniforms;
        //    this.vsSource = this._sourceBuilder.vsSource;
        //    this.fsSource = this._sourceBuilder.fsSource;
        //}
        //
        //private _initShader(shader, source){
        //    var gl = DeviceManager.getInstance().gl;
        //
        //    gl.shaderSource(shader, source);
        //    gl.compileShader(shader);
        //
        //    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        //        return shader;
        //    }
        //    else{
        //        Log.log(gl.getShaderInfoLog(shader));
        //        Log.log("attributes:\n", this.attributes);
        //        Log.log("uniforms:\n", this.uniforms);
        //        Log.log("source:\n", source);
        //    }
        //}
        //
        //private _isNotEqual(list1:wdCb.Hash<ShaderData>, list2:wdCb.Hash<ShaderData>){
        //    var result = false;
        //
        //    list1.forEach((data:ShaderData, key:string) => {
        //        var list2Data = list2.getChild(key);
        //
        //        if(!list2Data || data.type !== list2Data.type || data.value !== list2Data.value){
        //            result = true;
        //            return wdCb.$BREAK;
        //        }
        //    });
        //
        //    return result;
        //}
    }
}

