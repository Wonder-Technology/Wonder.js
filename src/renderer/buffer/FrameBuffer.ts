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
        private _glTarget:any = null;

        public createFrameBuffer(){
            return this.gl.createFramebuffer();
        }

        public bindFrameBuffer(buffer:WebGLFramebuffer){
            var gl = this.gl;

            //todo optimize: record last binded framebuffer to avoid duplicate bind?
            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
        }

        public setViewport(){
            var deviceManager = DeviceManager.getInstance();

            deviceManager.setViewport(0, 0, this.width, this.height);

            this._originScissorTest = deviceManager.scissorTest;
            deviceManager.scissorTest = false;
        }

        @ensure(function(){
            var deviceManager = DeviceManager.getInstance();

            assert(deviceManager.scissorTest !== null, Log.info.FUNC_SHOULD_NOT("DeviceManager->scissorTest", "be null"));
        })
        public restoreViewport(){
            var deviceManager = DeviceManager.getInstance(),
                view = deviceManager.view;

            deviceManager.setViewport(0, 0, view.width, view.height);
            deviceManager.scissorTest = this._originScissorTest;
        }

        public dispose(){
            this.unBindAll();
        }

        @require(function(){
            //assert(this._glTarget !== null, Log.info.FUNC_SHOULD("attachTexture before"));
        })
        public unBindAll(){
            var gl = this.gl;

            /*!
            not bind texture when initFrameBuffer(this method invoke unBindAll), so no need to unbind texture?

             gl.bindTexture(this._glTarget, null);

             TextureCache.clearAllBindTextureUnitCache();
             */

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        public unBindFrameBuffer(){
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            /*!
            need to unBind???

             gl.bindTexture(this._glTarget, null);
             TextureCache.clearBindTextureUnitCache(0);
             */
        }

        @ensure(function(renderBuffer){
            Log.assert(!!renderBuffer, Log.info.FUNC_NOT_EXIST("renderbuffer object"));

        })
        public createRenderBuffer(){
            var gl = this.gl,
                renderBuffer = gl.createRenderbuffer();

            return renderBuffer;
        }

        public attachTexture(glTarget:any, texture:WebGLTexture, attachType:EFrameBufferAttachType = EFrameBufferAttachType.COLOR_ATTACHMENT0){
            var gl = this.gl;

            //todo support mipmap?
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl[attachType],
                glTarget,
                texture,
                0);

            this._glTarget = glTarget;
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