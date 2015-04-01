/// <reference path="Texture.ts"/>
var Engine3D;
(function (Engine3D) {
    //todo add FrameBuffer class
    //todo 增加renderBuffer状态，并管理
    var CubeMapFrameBuffer = (function () {
        function CubeMapFrameBuffer(width, height) {
            this._buffer = null;
            this._width = null;
            this._height = null;
            this._texture = null;
            this._buffer = gl.createFramebuffer();
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(CubeMapFrameBuffer.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (texture) {
                this._texture = texture;
            },
            enumerable: true,
            configurable: true
        });
        CubeMapFrameBuffer.prototype.createRenderBuffer = function (type) {
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
        CubeMapFrameBuffer.prototype.attachTexture = function () {
            var ff = 0;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            for (ff = 0; ff < 6; ++ff) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, Engine3D.TextureCubeMap.faceTargets[ff], this._texture.texture, 0);
            }
            //gl.framebufferTexture2D(gl.FRAMEBUFFER, "COLOR_ATTACHMENT0", gl.TEXTURE_2D, texture, 0);
        };
        CubeMapFrameBuffer.prototype.attachRenderBuffer = function (type, renderBuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        };
        CubeMapFrameBuffer.prototype.check = function () {
            // Check if FBO is configured correctly
            var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (gl.FRAMEBUFFER_COMPLETE !== e) {
                console.log('Frame buffer object is incomplete: ' + e.toString());
            }
        };
        CubeMapFrameBuffer.prototype.bind = function () {
            if (this._buffer) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
                gl.viewport(0, 0, this._width, this._height);
            }
        };
        CubeMapFrameBuffer.prototype.unBind = function () {
            // Unbind the buffer object
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            //gl.drawingBufferWidth || gl.canvas.width,
            //gl.drawingBufferHeight || gl.canvas.height);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        CubeMapFrameBuffer.prototype.createTexture = function () {
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
            var texture = Engine3D.TextureCubeMap.create({
                "TEXTURE_MIN_FILTER": "LINEAR"
            });
            var index = 0;
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);
            //todo refactor?
            var arr = [];
            var len = Engine3D.TextureCubeMap.faceTargets.length;
            var i = 0;
            for (; i < len; i++) {
                arr.push(null);
            }
            texture.createTextureArea(arr, this._width, this._height);
            texture.unBind();
            this._texture = texture;
        };
        CubeMapFrameBuffer.create = function (width, height) {
            var obj = new this(width, height);
            return obj;
        };
        return CubeMapFrameBuffer;
    })();
    Engine3D.CubeMapFrameBuffer = CubeMapFrameBuffer;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=FrameBuffer.js.map