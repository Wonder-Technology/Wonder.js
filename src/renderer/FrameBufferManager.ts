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
        
        get gl(){
            return DeviceManager.getInstance().gl;
        }

        public texture:WebGLTexture = null;

        private _width:number = null;
        private _height:number = null;
        private _buffer = null;

        public bind(){
            var gl = this.gl;
            
            if(this._buffer){
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
                gl.viewport(0, 0, this._width, this._height);
            }
        }

        public unBind(){
            var view = DeviceManager.getInstance().view,
                gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.viewport(
                0, 0,
                view.width, view.height);
        }

        public init(texture:WebGLTexture){
            var gl = this.gl,
                fb = gl.createFramebuffer();

            this.texture = texture;

            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

            this._attachTexture(this.texture);

            this._attachRenderBuffer("DEPTH_ATTACHMENT", this._createRenderBuffer());

            this._check();

            this._buffer = fb;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        private _createRenderBuffer(){
            var gl = this.gl,
                renderBuffer = gl.createRenderbuffer();

            dyCb.Log.error(!renderBuffer, "Failed to create renderbuffer object");

            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._width, this._height);

            return renderBuffer;
        }

        private _attachTexture(texture:WebGLTexture){
            var gl = this.gl;
            
            //todo support mipmap?
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
                texture,
                0);
        }

        private _attachRenderBuffer(type:string, renderBuffer){
            var gl = this.gl;

            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        }

        private _check(){
            var gl = this.gl,
                e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

            if (e !== gl.FRAMEBUFFER_COMPLETE) {
                dyCb.Log.error(true, `Frame buffer object is incomplete:${e.toString()}`);
            }
        }
    }
}