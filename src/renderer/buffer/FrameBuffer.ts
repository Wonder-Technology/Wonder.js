/// <reference path="../../definitions.d.ts"/>
module dy{
    export class FrameBuffer{
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

        private _width:number = null;
        private _height:number = null;

        public createFrameBuffer(){
            return this.gl.createFramebuffer();
        }

        public bindFrameBuffer(buffer:WebGLFramebuffer){
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
        }

        public setViewport(){
            DeviceManager.getInstance().setViewport(0, 0, this._width, this._height);
        }

        public restoreViewport(){
            var deviceManager = DeviceManager.getInstance(),
                view = deviceManager.view;

            deviceManager.setViewport(0, 0, view.width, view.height);
        }

        public dispose(){
            this.unBind();
        }

        public unBind(){
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        public createRenderBuffer(){
            var gl = this.gl,
                renderBuffer = gl.createRenderbuffer();

            Log.error(!renderBuffer, "Failed to create renderbuffer object");

            return renderBuffer;
        }

        public attachTexture(glTarget:any, texture:WebGLTexture){
            var gl = this.gl;
            
            //todo support mipmap?
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                glTarget,
                texture,
                0);
        }

        public attachRenderBuffer(type:string, renderBuffer:WebGLRenderbuffer){
            var gl = this.gl;


            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._width, this._height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        }

        public check(){
            var gl = this.gl,
                e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

            if (e !== gl.FRAMEBUFFER_COMPLETE) {
                Log.error(true, `Frame buffer object is incomplete:${e.toString()}`);
            }
        }
    }
}