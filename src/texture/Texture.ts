/// <reference path="../definitions.d.ts"/>
module dy{
    export abstract class Texture{
        get geometry(){
            return this.material.geometry;
        }

        public material:Material = null;
        public width:number = null;
        public height:number = null;
        public variableData:MapVariableData = null;
        public wrapS:TextureWrapMode = null;
        public wrapT:TextureWrapMode = null;
        public magFilter:TextureFilterMode = null;
        public minFilter:TextureFilterMode = null;

        protected target:TextureTarget = TextureTarget.TEXTURE_2D;
        protected glTexture:WebGLTexture = null;


        public abstract init();
        public abstract sendData(program:Program, unit:number);

        public bindToUnit (unit:number) {
            var gl = DeviceManager.getInstance().gl,
                maxUnit = GPUDetector.getInstance().maxTextureUnit;

            if(unit >= maxUnit){
                Log.warn("trying to use %d texture units, but GPU only supports %d units", unit, maxUnit);
            }

            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl[this.target], this.glTexture);

            return this;
        }

        public dispose(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteTexture(this.glTexture);
            delete this.glTexture;
        }

        public filterFallback(filter:TextureFilterMode) {
            if (filter === TextureFilterMode.NEAREST|| filter === TextureFilterMode.NEAREST_MIPMAP_MEAREST|| filter === TextureFilterMode.NEAREST_MIPMAP_LINEAR ) {
                return TextureFilterMode.NEAREST;
            }

            return TextureFilterMode.LINEAR;
        }

        protected sendSamplerVariable(type:VariableType, program:Program, unit:number){
            if(this.variableData){
                if(this.variableData.samplerVariableName){
                    program.sendUniformData(this.variableData.samplerVariableName, type, unit);
                }
                else if(this.variableData.samplerVariablePrefix){
                    program.sendUniformData(`${this.variableData.samplerVariablePrefix}${unit}`, type, unit);
                }
            }
            else{
                program.sendUniformData(type === VariableType.SAMPLER_2D ? `u_sampler2D${unit}` : `u_samplerCube${unit}`, type, unit);
            }
        }

        protected isSourcePowerOfTwo(){
            return this.isPowerOfTwo(this.width, this.height);
        }

        protected isPowerOfTwo(width:number, height:number){
            return JudgeUtils.isPowerOfTwo(width) && JudgeUtils.isPowerOfTwo(height);
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

