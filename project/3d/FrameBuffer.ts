/// <reference path="Texture.ts"/>
module Engine3D{
    declare var gl:any;


    //todo add FrameBuffer class
    //todo 增加renderBuffer状态，并管理
    export class CubeMapFrameBuffer{
        constructor(width, height){
            this._buffer = gl.createFramebuffer();
            this._width = width;
            this._height = height;
        }

        private _buffer = null;
        private _width = null;
        private _height = null;
        private _texture:TextureCubeMap = null;

        get texture(){return this._texture;}
        set texture(texture:TextureCubeMap){
            this._texture = texture;
        }

        createRenderBuffer(type){
            // Create a renderbuffer object and Set its size and parameters
            var renderBuffer = gl.createRenderbuffer(); // Create a renderbuffer object
            if (!renderBuffer) {
                console.log('Failed to create renderbuffer object');
                //return error();
                return;
            }
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer); // Bind the object to target
            gl.renderbufferStorage(gl.RENDERBUFFER, gl[type], this._width, this._height);

            return renderBuffer;
        }


        attachTexture(){
            var ff = 0;

            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);

            for (ff = 0; ff < 6; ++ff) {
                gl.framebufferTexture2D(
                    gl.FRAMEBUFFER,
                    gl.COLOR_ATTACHMENT0,
                    TextureCubeMap.faceTargets[ff],
                    this._texture.texture,
                    0);
            }
            //gl.framebufferTexture2D(gl.FRAMEBUFFER, "COLOR_ATTACHMENT0", gl.TEXTURE_2D, texture, 0);
        }
        attachRenderBuffer(type:string, renderBuffer){
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        }

        check(){
            // Check if FBO is configured correctly
            var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (gl.FRAMEBUFFER_COMPLETE !== e) {
                console.log('Frame buffer object is incomplete: ' + e.toString());
                //return error();
            }
        }

        bind(){
            if(this._buffer){
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
                gl.viewport(0, 0, this._width, this._height);
            }
        }

        unBind(){
            // Unbind the buffer object
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(
                0, 0,
                gl.canvas.width, gl.canvas.height);
                //gl.drawingBufferWidth || gl.canvas.width,
                //gl.drawingBufferHeight || gl.canvas.height);

            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        createTexture(){
            //var i = 0,
            //    len = 1;
            //var arr = [];
            //
            ////for(i = 0;i < len; i++){
            //arr.push({
            //    material: createMaterial(i, createReflectTexture(fboTexture, i)),
            //    //todo type should be DataType instead of string
            //    uniformData:{
            //        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
            //        "u_sampler":["TEXTURE_CUBE", "diffuse"]
            //    }
            //});
            ////}
            //
            //framebuffer.texture = arr;
            //
            //



            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            //todo set more
            //tex.setParameter(gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //tex.setParameter(gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //tex.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            //tex.setParameter(gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            var texture = TextureCubeMap.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            });

            var index = 0;


            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);




            //todo refactor?
            var arr = [];
            var len = TextureCubeMap.faceTargets.length;
            var i = 0;

            for(;i < len; i ++){
                arr.push(null);
            }

            texture.createTextureArea(arr, this._width, this._height);


            texture.unBind();


            this._texture = texture;
        }

        public static create(width, height){
            var obj = new this(width, height);

            return obj;
        }
    }
}