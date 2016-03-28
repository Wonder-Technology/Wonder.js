module wd{
    export class FrameBuffer{
        public static create(width:number, height:number) {
        	var obj = new this(width, height);

        	return obj;
        }

        constructor(width:number, height:number){
            this.width = width;
            this.height = height;
        }
        
        get gl(){
            return DeviceManager.getInstance().gl;
        }

        public width:number = null;
        public height:number = null;

        private _originScissorTest:boolean = null;

        public createFrameBuffer(){
            return this.gl.createFramebuffer();
        }

        public bindFrameBuffer(buffer:WebGLFramebuffer){
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
        }

        public setViewport(){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.setViewport(0, 0, this.width, this.height);

            this._originScissorTest = deviceManager.scissorTest;
            deviceManager.scissorTest = false;
        }

        public restoreViewport(){
            var deviceManager = DeviceManager.getInstance(),
                view = deviceManager.view;

            deviceManager.setViewport(0, 0, view.width, view.height);
            deviceManager.scissorTest = this._originScissorTest;
        }

        public dispose(){
            this.unBind();
        }

        public unBind(){
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        @ensure(function(renderBuffer){
            Log.assert(!!renderBuffer, Log.info.FUNC_NOT_EXIST("renderbuffer object"));

        })
        public createRenderBuffer(){
            var gl = this.gl,
                renderBuffer = gl.createRenderbuffer();

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
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
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