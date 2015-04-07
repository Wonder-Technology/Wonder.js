/// <reference path="Texture.ts"/>
var Engine3D;
(function (Engine3D) {
    var Texture2DFrameBuffer = (function () {
        function Texture2DFrameBuffer(width, height) {
            ////may be multi texture2D, so be also arr
            //private _buffers = null;
            this._buffer = null;
            this._texture = null;
            //todo private?
            this._width = null;
            this._height = null;
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(Texture2DFrameBuffer.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (texture) {
                this._texture = texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture2DFrameBuffer.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture2DFrameBuffer.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
            },
            enumerable: true,
            configurable: true
        });
        Texture2DFrameBuffer.prototype.createRenderBuffer = function (type) {
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
        Texture2DFrameBuffer.prototype.attachRenderBuffer = function (type, renderBuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        };
        Texture2DFrameBuffer.prototype.check = function () {
            // Check if FBO is configured correctly
            var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (gl.FRAMEBUFFER_COMPLETE !== e) {
                console.log('Frame buffer object is incomplete: ' + e.toString());
            }
        };
        Texture2DFrameBuffer.prototype.bind = function () {
            if (this._buffer) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffer);
                gl.viewport(0, 0, this._width, this._height);
            }
        };
        Texture2DFrameBuffer.prototype.unBind = function () {
            // Unbind the buffer object
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            //gl.drawingBufferWidth || gl.canvas.width,
            //gl.drawingBufferHeight || gl.canvas.height);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        Texture2DFrameBuffer.prototype.init = function () {
            this.createTexture();
            var depthBuffer = this.createRenderBuffer("DEPTH_COMPONENT16");
            var fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
            this.check();
            this._buffer = fb;
            this.unBind();
        };
        Texture2DFrameBuffer.prototype.createTexture = function () {
            //todo set more
            //tex.setParameter(gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //tex.setParameter(gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //tex.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            //tex.setParameter(gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            var texture = Engine3D.Texture2D.create({
                "TEXTURE_MIN_FILTER": "LINEAR",
                "TEXTURE_MAG_FILTER": "LINEAR",
                "TEXTURE_WRAP_S": "CLAMP_TO_EDGE",
                "TEXTURE_WRAP_T": "CLAMP_TO_EDGE"
            }, false); //todo why not flipY?
            var index = 0;
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);
            texture.createTextureArea(null, this._width, this._height);
            texture.unBind();
            this._texture = texture;
        };
        Texture2DFrameBuffer.prototype.initWhenCreate = function () {
        };
        Texture2DFrameBuffer.create = function (width, height) {
            var obj = new this(width, height);
            obj.initWhenCreate();
            return obj;
        };
        return Texture2DFrameBuffer;
    })();
    Engine3D.Texture2DFrameBuffer = Texture2DFrameBuffer;
    //todo add FrameBuffer class
    //todo 增加renderBuffer状态，并管理
    var CubeMapFrameBuffer = (function () {
        function CubeMapFrameBuffer(width, height) {
            this._buffers = null;
            this._texture = null;
            //todo private?
            this._width = null;
            this._height = null;
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
        Object.defineProperty(CubeMapFrameBuffer.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CubeMapFrameBuffer.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
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
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers);
            for (ff = 0; ff < 6; ++ff) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, Engine3D.TextureCubeMap.faceTargets[ff], this._texture.texture, 0);
            }
            //gl.framebufferTexture2D(gl.FRAMEBUFFER, "COLOR_ATTACHMENT0", gl.TEXTURE_2D, texture, 0);
        };
        CubeMapFrameBuffer.prototype.attachRenderBuffer = function (type, renderBuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        };
        CubeMapFrameBuffer.prototype.check = function () {
            // Check if FBO is configured correctly
            var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (gl.FRAMEBUFFER_COMPLETE !== e) {
                console.log('Frame buffer object is incomplete: ' + e.toString());
            }
        };
        CubeMapFrameBuffer.prototype.bind = function (index) {
            if (this._buffers) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._buffers[index]);
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
        CubeMapFrameBuffer.prototype.init = function () {
            this.createTexture();
            var depthBuffer = this.createRenderBuffer("DEPTH_COMPONENT16");
            var len = Engine3D.TextureCubeMap.faceTargets.length;
            for (var ff = 0; ff < len; ++ff) {
                var fb = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, Engine3D.TextureCubeMap.faceTargets[ff], this._texture.texture, 0);
                //
                //gl.framebufferTexture2D(
                //    gl.FRAMEBUFFER,
                //    gl.COLOR_ATTACHMENT0,
                //    tdl.textures.CubeMap.faceTargets[ff],
                //    tex.texture,
                //    0);
                //if (this.depth) {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
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
        CubeMapFrameBuffer.prototype.initWhenCreate = function () {
            this._buffers = [];
        };
        CubeMapFrameBuffer.create = function (width, height) {
            var obj = new this(width, height);
            obj.initWhenCreate();
            return obj;
        };
        return CubeMapFrameBuffer;
    })();
    Engine3D.CubeMapFrameBuffer = CubeMapFrameBuffer;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=FrameBuffer.js.map