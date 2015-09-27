/// <reference path="../definitions.d.ts"/>
module dy{
    export abstract class Texture implements ITextureAsset{
        //private _generateMipmaps:boolean = null;
        //get generateMipmaps(){
        //    return this._generateMipmaps;
        //}
        //set generateMipmaps(generateMipmaps:boolean){
        //    if(!generateMipmaps){
        //        this.minFilter = this.filterFallback(this.minFilter);
        //        this.magFilter = this.filterFallback(this.magFilter);
        //    }
        //
        //    this._generateMipmaps = generateMipmaps;
        //}

        protected p_sourceRegionMethod:TextureSourceRegionMethod = null;
        get sourceRegionMethod(){
            return this.p_sourceRegionMethod;
        }
        set sourceRegionMethod(sourceRegionMethod:TextureSourceRegionMethod){
            this.p_sourceRegionMethod = sourceRegionMethod;
        }

        get geometry(){
            return this.material.geometry;
        }


        public material:Material = null;
        public variableData:MapVariableData = null;

        public generateMipmaps:boolean = null;
        public width:number = null;
        public height:number = null;
        public format:TextureFormat = null;
        public source:any = null;
        public repeatRegion:RectRegion = null;
        public sourceRegion:RectRegion = null;
        public sourceRegionMapping:TextureSourceRegionMapping = null;
        public flipY:boolean = null;
        public premultiplyAlpha:boolean = null;
        public unpackAlignment:number = null;
        public wrapS:TextureWrapMode = null;
        public wrapT:TextureWrapMode = null;
        public magFilter:TextureFilterMode = null;
        public minFilter:TextureFilterMode = null;
        public type:TextureType = null;
        public mipmaps:dyCb.Collection<any> = null;
        public anisotropy:number = null;
        public needUpdate:boolean = null;

        protected target:TextureTarget = TextureTarget.TEXTURE_2D;
        protected glTexture:WebGLTexture = null;

        public init(){
            var gl = DeviceManager.getInstance().gl;
            //texture.addEventListener( "dispose", onTextureDispose );

            this.glTexture = gl.createTexture();

            //_this.info.memory.textures ++;

            return this;
        }

        public update(index:number){
            var gl = DeviceManager.getInstance().gl,
                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

            this.bindToUnit(index);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);


            //todo not set UNPACK_PREMULTIPLY_ALPHA_WEBGL,UNPACK_ALIGNMENT when cubemap?
            gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha );
            gl.pixelStorei( gl.UNPACK_ALIGNMENT, this.unpackAlignment );


            if(this.isCheckMaxSize()){
                this.clampToMaxSize();
            }

            this.setTextureParameters( gl[this.target], isSourcePowerOfTwo);

            this.allocateSourceToTexture(isSourcePowerOfTwo);

            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl[this.target]);
            }

            this.needUpdate = false;

            return this;
        }

        public sendData(program:Program, index:number){
            var sourceRegion = null;

            this.sendSamplerVariable(VariableType.SAMPLER_2D, program, index);

            if(this.sourceRegion && this.sourceRegionMethod === TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL){
                sourceRegion = this._convertSourceRegionToUV();
            }
            else{
                sourceRegion = RectRegion.create(0, 0, 1, 1);
            }
            program.sendUniformData("u_sourceRegion", VariableType.FLOAT_4, sourceRegion);

            program.sendUniformData("u_repeatRegion", VariableType.FLOAT_4, this.repeatRegion);

            return this;
        }

        public bindToUnit (unit:number) {
            var gl = DeviceManager.getInstance().gl,
                maxUnit = GPUDetector.getInstance().maxTextureUnit;

            if(unit >= maxUnit){
                dyCb.Log.warn("trying to use %d texture units, but GPU only supports %d units", unit, maxUnit);
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

        protected abstract allocateSourceToTexture(isSourcePowerOfTwo:boolean);

        protected isCheckMaxSize(){
            return true;
        }

        protected isSourcePowerOfTwo(){
            return this.isPowerOfTwo(this.width, this.height);
        }

        protected isPowerOfTwo(width:number, height:number){
            return JudgeUtils.isPowerOfTwo(width) && JudgeUtils.isPowerOfTwo(height);
        }

        protected sendSamplerVariable(type:VariableType, program:Program, index:number){
            if(this.variableData){
                if(this.variableData.samplerVariableName){
                    program.sendUniformData(this.variableData.samplerVariableName, type, index);
                }
                else if(this.variableData.samplerVariablePrefix){
                    program.sendUniformData(`${this.variableData.samplerVariablePrefix}${index}`, type, index);
                }
            }
            else{
                program.sendUniformData(type === VariableType.SAMPLER_2D ? `u_sampler2D${index}` : `u_samplerCube${index}`, type, index);
            }
        }

        protected clampToMaxSize(){
            this.source = this.clampToMaxSizeHelper(this.source, GPUDetector.getInstance().maxTextureSize);
        }

        protected clampToMaxSizeHelper (source:any, maxSize:number) {
            var maxDimension = null,
                newWidth = null,
                newHeight = null,
                canvas = null,
                ctx = null;

            if(!source){
                return null;
            }

            if(source.width <= maxSize && source.height <= maxSize) {
                return source;
            }


            // Warning: Scaling through the canvas will only work with sources that use
            // premultiplied alpha.

            maxDimension = Math.max( source.width, source.height );
            newWidth = Math.floor( source.width * maxSize / maxDimension );
            newHeight = Math.floor( source.height * maxSize / maxDimension );

            canvas = this._createResizedCanvas();

            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx = canvas.getContext( "2d" );
            ctx.drawImage( source, 0, 0, source.width, source.height, 0, 0, newWidth, newHeight );

            dyCb.Log.log(`source is too big (${source.width}x${source.height}). Resized to ${canvas.width}x${canvas.height}.`);

            return canvas;
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

            this._setAnisotropy(textureType);
        }

        private _setAnisotropy(textureType){
            var gpu = GPUDetector.getInstance(),
                gl = DeviceManager.getInstance().gl;

            if(!gpu.extensionTextureFilterAnisotropic){
                return;
            }
            //todo halfFloat/float for texture?(threejs->Ocean.js use it!)
            //if (this.type !== THREE.FloatType && texture.type !== THREE.HalfFloatType ) {


            if (this.anisotropy > 1) {
                gl.texParameterf(textureType, gpu.extensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(this.anisotropy, gpu.maxAnisotropy));
                //gl.texParameterf(textureType, 34046, Math.min(this.anisotropy, gpu.maxAnisotropy));
                //texture.__currentAnisotropy = texture.anisotropy;

                //}
            }
        }


        private _createResizedCanvas(){
            return document.createElement( "canvas" );
        }

        private _convertSourceRegionCanvasMapToUV(sourceRegion:RectRegion){
            var width = this.width,
                height = this.height,
                region:RectRegion = null;

            region = RectRegion.create(
                sourceRegion.x / width,
                sourceRegion.y / height,
                sourceRegion.width / width,
                sourceRegion.height / height
            );

            region.y = 1 - region.y - region.height;

            return region;
        }

        //todo optimize: add dirty cache
        private _convertSourceRegionToUV(){
            if(this.sourceRegionMapping === TextureSourceRegionMapping.CANVAS){
                return this._convertSourceRegionCanvasMapToUV(this.sourceRegion);
            }
            else if(this.sourceRegionMapping === TextureSourceRegionMapping.UV){
                return this.sourceRegion;
            }
        }
    }
}

