/// <reference path="../definitions.d.ts"/>
module dy{
    export class FrameBufferManager{
        public static create(width:number, height:number) {
        	var obj = new this(width, height);

        	return obj;
        }

        constructor(width:number, height:number){
            this._width = width;
            this._height = height;
        }

        public texture:WebGLTexture = null;

        private _width:number = null;
        private _height:number = null;
        private _buffer = null;

        public bind(){
            if(this._buffer){
                Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, this._buffer);
                Director.getInstance().gl.viewport(0, 0, this._width, this._height);
            }
        }

        public unBind(){
            var director = Director.getInstance();

            Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, null);
            Director.getInstance().gl.bindTexture(Director.getInstance().gl.TEXTURE_2D, null);
            Director.getInstance().gl.bindRenderbuffer(Director.getInstance().gl.RENDERBUFFER, null);
            Director.getInstance().gl.viewport(
                0, 0,
                director.view.width, director.view.height);
        }

        public init(texture:WebGLTexture){
            var fb = Director.getInstance().gl.createFramebuffer();

            this.texture = texture;

            Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, fb);

            this._attachTexture(this.texture);

            this._attachRenderBuffer("DEPTH_ATTACHMENT", this._createRenderBuffer());

            this._check();

            this._buffer = fb;

            Director.getInstance().gl.bindFramebuffer(Director.getInstance().gl.FRAMEBUFFER, null);
        }

        private _createRenderBuffer(){
            var renderBuffer = Director.getInstance().gl.createRenderbuffer();

            dyCb.Log.error(!renderBuffer, "Failed to create renderbuffer object");

            Director.getInstance().gl.bindRenderbuffer(Director.getInstance().gl.RENDERBUFFER, renderBuffer);
            Director.getInstance().gl.renderbufferStorage(Director.getInstance().gl.RENDERBUFFER, Director.getInstance().gl.DEPTH_COMPONENT16, this._width, this._height);

            return renderBuffer;
        }

        private _attachTexture(texture:WebGLTexture){
            //todo support mipmap?
            Director.getInstance().gl.framebufferTexture2D(
                Director.getInstance().gl.FRAMEBUFFER,
                Director.getInstance().gl.COLOR_ATTACHMENT0,
                Director.getInstance().gl.TEXTURE_2D,
                texture,
                0);
        }

        private _attachRenderBuffer(type:string, renderBuffer){
            Director.getInstance().gl.framebufferRenderbuffer(Director.getInstance().gl.FRAMEBUFFER, Director.getInstance().gl[type], Director.getInstance().gl.RENDERBUFFER, renderBuffer);
        }

        private _check(){
            var e = Director.getInstance().gl.checkFramebufferStatus(Director.getInstance().gl.FRAMEBUFFER);

            if (e !== Director.getInstance().gl.FRAMEBUFFER_COMPLETE) {
                dyCb.Log.error(true, `Frame buffer object is incomplete:${e.toString()}`);
            }
        }
    }
}