var Engine3D;
(function (Engine3D) {
    //todo 增加renderBuffer状态，并管理
    var FrameBuffer = (function () {
        function FrameBuffer(width, height) {
            this._buffer = null;
            this._width = null;
            this._height = null;
            //Texture2D或CubeMap（应该提出两者的基类）
            this._texture = null;
            this._buffer = gl.createFramebuffer();
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(FrameBuffer.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (texture) {
                this._texture = texture;
            },
            enumerable: true,
            configurable: true
        });
        FrameBuffer.prototype.createRenderBuffer = function (type) {
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
        };
        FrameBuffer.prototype.attachTexture2D = function (type, texture) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl[type], gl.TEXTURE_2D, texture, 0);
        };
        FrameBuffer.prototype.attachRenderBuffer = function (type, renderBuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        };
        FrameBuffer.prototype.check = function () {
            // Check if FBO is configured correctly
            var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (gl.FRAMEBUFFER_COMPLETE !== e) {
                console.log('Frame buffer object is incomplete: ' + e.toString());
            }
        };
        FrameBuffer.prototype.bind = function () {
            if (this._buffer) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
                gl.viewport(0, 0, this._width, this._height);
            }
        };
        FrameBuffer.prototype.unBind = function () {
            // Unbind the buffer object
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            //gl.drawingBufferWidth || gl.canvas.width,
            //gl.drawingBufferHeight || gl.canvas.height);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        FrameBuffer.create = function (width, height) {
            var obj = new FrameBuffer(width, height);
            return obj;
        };
        return FrameBuffer;
    })();
    Engine3D.FrameBuffer = FrameBuffer;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=FrameBuffer.js.map