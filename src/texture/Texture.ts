module wd{
    export abstract class Texture{
        get geometry(){
            return this.material.geometry;
        }

        public material:Material = null;
        public width:number = null;
        public height:number = null;
        public variableData:MapVariableData = null;
        public wrapS:ETextureWrapMode = null;
        public wrapT:ETextureWrapMode = null;
        public magFilter:ETextureFilterMode = null;
        public minFilter:ETextureFilterMode = null;
        public glTexture:WebGLTexture = null;

        protected target:ETextureTarget = ETextureTarget.TEXTURE_2D;


        public abstract init();
        public abstract getSamplerName(unit:number):string;

        public bindToUnit (unit:number) {
            var gl = DeviceManager.getInstance().gl,
                maxUnit = GPUDetector.getInstance().maxTextureUnit;

            if(unit >= maxUnit){
                Log.warn(`trying to use ${unit} texture units, but GPU only supports ${maxUnit} units`);
            }

            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl[this.target], this.glTexture);

            return this;
        }

        public sendData(program:Program, pos:WebGLUniformLocation, unit:number){
            program.sendUniformData(pos, this.getSamplerType(), unit);

            this.sendOtherData(program, unit);
        }

        public dispose(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteTexture(this.glTexture);
            delete this.glTexture;
        }

        public filterFallback(filter:ETextureFilterMode) {
            if (filter === ETextureFilterMode.NEAREST|| filter === ETextureFilterMode.NEAREST_MIPMAP_MEAREST|| filter === ETextureFilterMode.NEAREST_MIPMAP_LINEAR ) {
                return ETextureFilterMode.NEAREST;
            }

            return ETextureFilterMode.LINEAR;
        }

        @virtual
        protected sendOtherData(program:Program, unit:number){
        }

        protected getSamplerNameByVariableData(unit:number, type?:VariableType){
            var samplerName:string = null;

            if(this.variableData){
                if(this.variableData.samplerVariableName){
                    samplerName = this.variableData.samplerVariableName;
                }
            }
            else{
                samplerName = type === VariableType.SAMPLER_2D ? `u_sampler2D${unit}` : `u_samplerCube${unit}`;
            }

            return samplerName;
        }

        protected getSamplerType():VariableType{
            var type = null;

            switch(this.target){
                case ETextureTarget.TEXTURE_2D:
                    type = VariableType.SAMPLER_2D;
                    break;
                case ETextureTarget.TEXTURE_CUBE_MAP:
                    type = VariableType.SAMPLER_CUBE;
                    break;
                default:
                    break;
            }

            return type;
        }

        @virtual
        protected isSourcePowerOfTwo(){
            return TextureUtils.isPowerOfTwo(this.width, this.height)
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            var gl = DeviceManager.getInstance().gl;

            if (isSourcePowerOfTwo){
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl[this.wrapS]);
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl[this.wrapT]);

                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[this.magFilter]);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[this.minFilter]);
            }
            else {
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[this.filterFallback(this.magFilter)]);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[this.filterFallback(this.minFilter)]);
            }
        }
    }
}

