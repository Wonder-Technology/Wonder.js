module Engine3D{
    declare var gl:any;


    //todo 增加renderBuffer状态，并管理
    export class FrameBuffer{
        constructor(width, height){
            this._buffer = gl.createFramebuffer();
            this._width = width;
            this._height = height;
        }

        private _buffer = null;
        private _width = null;
        private _height = null;
        //Texture2D或CubeMap（应该提出两者的基类）
        private _texture:any = null;

        get texture(){return this._texture;}
        set texture(texture:any){
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


        attachTexture2D(type:string, texture){
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl[type], gl.TEXTURE_2D, texture, 0);
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

            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        public static create(width, height):FrameBuffer {
            var obj = new FrameBuffer(width, height);

            return obj;
        }
    }
}