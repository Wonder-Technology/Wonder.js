/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Shader{
        public static create(){
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public program:Program = Program.create();
        //public attributes:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        //public uniforms:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        //public vsSource:string = "";
        //public fsSource:string = "";

        private _attributes:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        get attributes(){
            return this._attributes;
        }
        set attributes(attributes:dyCb.Hash<ShaderData>){
            if(this._isNotEqual(attributes, this._attributes)){
                this._definitionDataDirty = true;
            }
            this._attributes = attributes;
        }

        private _uniforms:dyCb.Hash<ShaderData> = dyCb.Hash.create<ShaderData>();
        get uniforms(){
            return this._uniforms;
        }
        set uniforms(uniforms:dyCb.Hash<ShaderData>){
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

        private _definitionDataDirty:boolean = false;
        private _libs: dyCb.Collection<ShaderLib> = dyCb.Collection.create<ShaderLib>();
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

        public initWhenCreate(){
            this.addLib(CommonShaderLib.create());
        }

        public init(){
            //this.initProgram();
        }

        //public initProgram(){
        //    //this.buildDefinitionData();
        //
        //    //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
        //    //this.program.initWithShader(this);
        //}

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            this._libs.forEach((lib:ShaderLib) => {
                lib.update(program, quadCmd, material);
            });


            this.buildDefinitionData();
            if(this._definitionDataDirty){
                //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
                this.program.initWithShader(this);

                this._definitionDataDirty = false;
            }

            program.sendAttributeDataFromCustomShader();
            program.sendUniformDataFromCustomShader();

            material.textureManager.sendData(program);
        }

        private _isDefinitionDataDirty(){

        }

        public hasLib(lib:ShaderLib){
            return this._libs.hasChild(lib);
        }

        public addLib(lib:ShaderLib){
            this._libs.addChild(lib);
        }

        public getLib(libClass:Function){
            return this._libs.findOne((lib:ShaderLib) => {
                return lib instanceof libClass;
            });
        }

        public removeLib(lib:ShaderLib);
        public removeLib(func:Function);

        public removeLib(arg){
            return this._libs.removeChild(arguments[0]);
        }

        public removeAllLibs(){
            this._libs.removeAllChildren();
        }

        public sortLib(func:(a:ShaderLib, b:ShaderLib) => any){
            this._libs = this._libs.sort(func);
        }

        //public clearSource(){
        //    this.vsSource = "";
        //    this.fsSource = "";
        //
        //    //todo refactor? invoke "clear" method?
        //    //this._sourceBuilder = ShaderSourceBuilder.create();
        //    this._sourceBuilder.clearShaderDefinition();
        //}


        public read(definitionData:ShaderDefinitionData){
            this._sourceBuilder.read(definitionData);
        }

        public buildDefinitionData(){
            //this.clearSource();
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

        private _isNotEqual(list1:dyCb.Hash<ShaderData>, list2:dyCb.Hash<ShaderData>){
            var result = false;

            list1.forEach((data:ShaderData, key:string) => {
                var list2Data = list2.getChild(key);

                if(!list2Data || data.type !== list2Data.type || data.value !== list2Data.value){
                    result = true;
                    return dyCb.$BREAK;
                }
            });

            return result;
        }
    }

    export type ShaderData = {
        type:VariableType;
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
        attributes:ShaderData|dyCb.Hash<ShaderData>;
        uniforms:ShaderData|dyCb.Hash<ShaderData>;
    }
}
