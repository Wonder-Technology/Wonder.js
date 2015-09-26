/// <reference path="../definitions.d.ts"/>
module dy{
    //todo refactor
    export class FrameBufferManager{
        public static create(width:number, height:number) {
        	var obj = new this(width, height);

        	return obj;
        }

        constructor(width:number, height:number){
            this._width = width;
            this._height = height;
        }

        private _buffer = null;

        private _texture:Texture = null;
        get texture(){return this._texture;}
        set texture(texture:Texture){
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
            var renderBuffer = Director.getInstance().gl.createRenderbuffer(); // Create a renderbuffer object
            if (!renderBuffer) {
                console.log('Failed to create renderbuffer object');
                //return error();
                return;
            }
            Director.getInstance().gl.bindRenderbuffer(Director.getInstance().gl.RENDERBUFFER, renderBuffer); // Bind the object to target
            Director.getInstance().gl.renderbufferStorage(Director.getInstance().gl.RENDERBUFFER, Director.getInstance().gl[type], this._width, this._height);

            return renderBuffer;
        }


        //attachTexture(){
        //    var ff = 0;
        //
        //    Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, this._buffers);
        //
        //    for (ff = 0; ff < 6; ++ff) {
        //        Director.getInstance().gl.framebufferTexture2D(
        //            Director.getInstance().gl.FRAMEBUFFER,
        //            Director.getInstance().gl.COLOR_ATTACHMENT0,
        //            TextureCubeMap.faceTargets[ff],
        //            this._texture.texture,
        //            0);
        //    }
        //    //Director.getInstance().gl.framebufferTexture2D(Director.getInstance().gl.FRAMEBUFFER, "COLOR_ATTACHMENT0", Director.getInstance().gl.TEXTURE_2D, texture, 0);
        //}
        attachRenderBuffer(type:string, renderBuffer){
            Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, this._buffer);
            Director.getInstance().gl.framebufferRenderbuffer(Director.getInstance().gl.FRAMEBUFFER, Director.getInstance().gl[type], Director.getInstance().gl.RENDERBUFFER, renderBuffer);
        }

        check(){
            // Check if FBO is configured correctly
            var e = Director.getInstance().gl.checkFramebufferStatus(Director.getInstance().gl.FRAMEBUFFER);
            if (Director.getInstance().gl.FRAMEBUFFER_COMPLETE !== e) {
                console.log('Frame buffer object is incomplete: ' + e.toString());
                //return error();
            }
        }

        bind(){
            if(this._buffer){
                Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, this._buffer);
                Director.getInstance().gl.viewport(0, 0, this._width, this._height);
            }
        }

        unBind(){
            var director = Director.getInstance(),
                gl = director.gl;

            // Unbind the buffer object
            Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, null);




            Director.getInstance().gl.viewport(
                0, 0,
                director.view.width, director.view.height);
            //Director.getInstance().gl.drawingBufferWidth || Director.getInstance().gl.canvas.width,
            //Director.getInstance().gl.drawingBufferHeight || Director.getInstance().gl.canvas.height);

            Director.getInstance().gl.bindTexture(Director.getInstance().gl.TEXTURE_2D, null);
            Director.getInstance().gl.bindRenderbuffer(Director.getInstance().gl.RENDERBUFFER, null);
        }

        init(){
            //todo not create texture every time
            this.createTexture();
            //this._texture =



            var depthBuffer = this.createRenderBuffer("DEPTH_COMPONENT16");


            var fb = Director.getInstance().gl.createFramebuffer();
            Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, fb);



            //todo support mipmap?
            Director.getInstance().gl.framebufferTexture2D(
                Director.getInstance().gl.FRAMEBUFFER,
                Director.getInstance().gl.COLOR_ATTACHMENT0,
                Director.getInstance().gl.TEXTURE_2D,
                //this._texture.getTexture(),
                this._texture,
                0);


            Director.getInstance().gl.framebufferRenderbuffer(
                Director.getInstance().gl.FRAMEBUFFER,
                Director.getInstance().gl.DEPTH_ATTACHMENT,
                Director.getInstance().gl.RENDERBUFFER,
                depthBuffer);

            this.check();

            this._buffer = fb;

            this.unBind();
        }
        createTexture(){
            //todo set more
            //tex.setParameter(Director.getInstance().gl.TEXTURE_MIN_FILTER, Director.getInstance().gl.LINEAR);
            //tex.setParameter(Director.getInstance().gl.TEXTURE_MAG_FILTER, Director.getInstance().gl.LINEAR);
            //tex.setParameter(Director.getInstance().gl.TEXTURE_WRAP_S, Director.getInstance().gl.CLAMP_TO_EDGE);
            //tex.setParameter(Director.getInstance().gl.TEXTURE_WRAP_T, Director.getInstance().gl.CLAMP_TO_EDGE);
            //var texture = Texture2D.create({
            //    "TEXTURE_MIN_FILTER":"LINEAR",
            //    "TEXTURE_MAG_FILTER":"LINEAR",
            //    "TEXTURE_WRAP_S": "CLAMP_TO_EDGE",
            //    "TEXTURE_WRAP_T": "CLAMP_TO_EDGE"
            //}, false);  //todo why not flipY?
            //
            //var index = 0;
            //
            //
            //if (!texture) {
            //    console.log('Failed to create the texture object');
            //    return null;
            //}
            //texture.bindToUnit(index);
            //
            //
            //texture.createTextureArea(null, this._width, this._height);
            //
            //
            //texture.unBind();


            var gl = Director.getInstance().gl;


            // Create a texture object and set its size and parameters
            var texture = gl.createTexture(); // Create a texture object
            if (!texture) {
                console.log('Failed to create texture object');
                //return error();
                return;
            }
            gl.bindTexture(gl.TEXTURE_2D, texture); // Bind the object to target

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            //todo read MirrorTexture's attri to set
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);


            this._texture = texture;
        }
    }
}