/// <reference path="Texture.ts"/>
module Engine3D{
    declare var gl:any;


    export class Texture2DFrameBuffer{
        constructor(width, height){
            this._width = width;
            this._height = height;
        }

        ////may be multi texture2D, so be also arr
        //private _buffers = null;
        private _buffer = null;
        private _texture:Texture2D = null;

        get texture(){return this._texture;}
        set texture(texture:Texture2D){
            this._texture = texture;
        }

        //todo private?
        private _width:number = null;
        get width(){
            return this._width;
        }
        set width(width:number){
            this._width = width;
        }

        private _height:number = null;
        get height(){
            return this._height;
        }
        set height(height:number){
            this._height = height;
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


        //attachTexture(){
        //    var ff = 0;
        //
        //    gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers);
        //
        //    for (ff = 0; ff < 6; ++ff) {
        //        gl.framebufferTexture2D(
        //            gl.FRAMEBUFFER,
        //            gl.COLOR_ATTACHMENT0,
        //            TextureCubeMap.faceTargets[ff],
        //            this._texture.texture,
        //            0);
        //    }
        //    //gl.framebufferTexture2D(gl.FRAMEBUFFER, "COLOR_ATTACHMENT0", gl.TEXTURE_2D, texture, 0);
        //}
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

            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        init(){
            this.createTexture();



            var depthBuffer = this.createRenderBuffer("DEPTH_COMPONENT16");


            var fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);



            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
                this._texture.texture,
                0);


            gl.framebufferRenderbuffer(
                gl.FRAMEBUFFER,
                gl.DEPTH_ATTACHMENT,
                gl.RENDERBUFFER,
                depthBuffer);

            this.check();

            this._buffer = fb;

            this.unBind();
        }




        createTexture(){
            //todo set more
            //tex.setParameter(gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //tex.setParameter(gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //tex.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            //tex.setParameter(gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            var texture = Texture2D.create({
                "TEXTURE_MIN_FILTER":"LINEAR",
                "TEXTURE_MAG_FILTER":"LINEAR",
                "TEXTURE_WRAP_S": "CLAMP_TO_EDGE",
                "TEXTURE_WRAP_T": "CLAMP_TO_EDGE"
            }, true);

            var index = 0;


            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);


            texture.createTextureArea(null, this._width, this._height);


            texture.unBind();


            this._texture = texture;
        }

        initWhenCreate(){
        }

        public static create(width, height){
            var obj = new this(width, height);

            obj.initWhenCreate();

            return obj;
        }
    }
    //todo add FrameBuffer class
    //todo 增加renderBuffer状态，并管理
    export class CubeMapFrameBuffer{
        constructor(width, height){
            this._width = width;
            this._height = height;
        }

        private _buffers = null;
        private _texture:TextureCubeMap = null;

        get texture(){return this._texture;}
        set texture(texture:TextureCubeMap){
            this._texture = texture;
        }

        //todo private?
        private _width:number = null;
        get width(){
            return this._width;
        }
        set width(width:number){
            this._width = width;
        }

        private _height:number = null;
        get height(){
            return this._height;
        }
        set height(height:number){
            this._height = height;
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

            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers);

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
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers);
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

        bind(index){
            if(this._buffers){
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers[index]);
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

        init(){
            this.createTexture();



            var depthBuffer = this.createRenderBuffer("DEPTH_COMPONENT16");



            var len = TextureCubeMap.faceTargets.length;
            for (var ff = 0; ff < len; ++ff) {
                var fb = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, fb);



                    gl.framebufferTexture2D(
                        gl.FRAMEBUFFER,
                        gl.COLOR_ATTACHMENT0,
                        TextureCubeMap.faceTargets[ff],
                        this._texture.texture,
                        0);


                //
                //gl.framebufferTexture2D(
                //    gl.FRAMEBUFFER,
                //    gl.COLOR_ATTACHMENT0,
                //    tdl.textures.CubeMap.faceTargets[ff],
                //    tex.texture,
                //    0);
                //if (this.depth) {
                    gl.framebufferRenderbuffer(
                        gl.FRAMEBUFFER,
                        gl.DEPTH_ATTACHMENT,
                        gl.RENDERBUFFER,
                        depthBuffer);
                //}


                //gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffers);
                //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);


                //var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
                //if (status != gl.FRAMEBUFFER_COMPLETE) {
                //    throw("gl.checkFramebufferStatus() returned " + WebGLDebugUtils.glEnumToString(status));
                //}
                this.check();

                this._buffers.push(fb);
            }
            //
            //
            //framebuffer.attachTexture();
            //framebuffer.attachRenderBuffer("DEPTH_ATTACHMENT", depthBuffer);
            //
            //
            //framebuffer.check();

            this.unBind();
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

        initWhenCreate(){
            this._buffers = [];
        }

        public static create(width, height){
            var obj = new this(width, height);

            obj.initWhenCreate();

            return obj;
        }
    }
}