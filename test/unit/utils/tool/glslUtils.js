var glslUtils = (function () {
    return {
        buildFakeGl: function (sandbox) {
            var LINK_STATUS = "link_status";
            var gl = {
                FLOAT: "FLOAT",

                DYNAMIC_DRAW: "DYNAMIC_DRAW",
                STATIC_DRAW: "STATIC_DRAW",

                LINES: "LINES",
                TRIANGLES: "TRIANGLES",

                ARRAY_BUFFER: "ARRAY_BUFFER",
                ELEMENT_ARRAY_BUFFER: "ELEMENT_ARRAY_BUFFER",

                REPEAT: "REPEAT",
                MIRRORED_REPEAT: "MIRRORED_REPEAT",
                CLAMP_TO_EDGE: "CLAMP_TO_EDGE",

                TEXTURE_WRAP_S: "TEXTURE_WRAP_S",
                TEXTURE_WRAP_T: "TEXTURE_WRAP_T",
                TEXTURE_MAG_FILTER: "TEXTURE_MAG_FILTER",
                TEXTURE_MIN_FILTER: "TEXTURE_MIN_FILTER",


                NEAREST: "NEAREST",
                NEAREST_MIPMAP_MEAREST: "NEAREST_MIPMAP_MEAREST",
                NEAREST_MIPMAP_LINEAR: "NEAREST_MIPMAP_LINEAR",
                LINEAR: "LINEAR",
                LINEAR_MIPMAP_NEAREST: "LINEAR_MIPMAP_NEAREST",
                LINEAR_MIPMAP_LINEAR: "LINEAR_MIPMAP_LINEAR",

                TEXTURE_2D: "TEXTURE_2D",
                TEXTURE_CUBE_MAP: "TEXTURE_CUBE_MAP",

                FRAMEBUFFER: "FRAMEBUFFER",
                RENDERBUFFER: "RENDERBUFFER",

                BROWSER_DEFAULT_WEBGL: "BROWSER_DEFAULT_WEBGL",
                NONE: "NONE",

                PACK_ALIGNMENT: "PACK_ALIGNMENT",
                UNPACK_ALIGNMENT: "UNPACK_ALIGNMENT",
                UNPACK_FLIP_Y_WEBGL: "UNPACK_FLIP_Y_WEBGL",
                UNPACK_PREMULTIPLY_ALPHA_WEBGL: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
                UNPACK_COLORSPACE_CONVERSION_WEBGL: "UNPACK_COLORSPACE_CONVERSION_WEBGL",

                COLOR_ATTACHMENT0: "COLOR_ATTACHMENT0",
                DEPTH_ATTACHMENT: "DEPTH_ATTACHMENT",

                UNSIGNED_SHORT: "UNSIGNED_SHORT",
                UNSIGNED_BYTE: "UNSIGNED_BYTE",


                DEPTH_COMPONENT: "DEPTH_COMPONENT",

                LINK_STATUS: LINK_STATUS,

                VERTEX_SHADER: "VERTEX_SHADER",
                FRAGMENT_SHADER: "FRAGMENT_SHADER",
                COMPILE_STATUS: "COMPILE_STATUS",


                // getActiveAttrib: sandbox.stub().returns(null),
                // getActiveUniform: sandbox.stub().returns(null),

                getShaderInfoLog: sandbox.stub().returns(null),

                getParameter: sandbox.stub().returns(null),
                getExtension: sandbox.stub().returns(null),

                scissor: sandbox.stub(),
                viewport: sandbox.stub(),

                checkFramebufferStatus: sandbox.stub(),
                framebufferRenderbuffer: sandbox.stub(),
                renderbufferStorage: sandbox.stub(),
                framebufferTexture2D: sandbox.stub(),
                createRenderbuffer: sandbox.stub(),
                createFramebuffer: sandbox.stub(),

                uniformMatrix4fv: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                getAttribLocation: sandbox.stub(),
                vertexAttribPointer: sandbox.stub(),
                enableVertexAttribArray: sandbox.stub(),
                disableVertexAttribArray: sandbox.stub(),
                uniform1i: sandbox.stub(),
                uniform2f: sandbox.stub(),
                uniform3f: sandbox.stub(),
                uniform4f: sandbox.stub(),
                uniformMatrix3fv: sandbox.stub(),
                uniform1f: sandbox.stub(),
                uniform1iv: sandbox.stub(),

                drawArrays: sandbox.stub(),
                drawElements: sandbox.stub(),

                generateMipmap: sandbox.stub(),
                pixelStorei: sandbox.stub(),
                texParameteri: sandbox.stub(),
                useProgram: sandbox.stub(),
                bindFramebuffer: sandbox.stub(),
                bindRenderbuffer: sandbox.stub(),
                createTexture: sandbox.stub().returns({}),
                texImage2D: sandbox.stub(),
                activeTexture: sandbox.stub(),
                bindTexture: sandbox.stub(),

                deleteShader: sandbox.stub(),
                deleteProgram: sandbox.stub(),
                deleteFramebuffer: sandbox.stub(),
                deleteRenderbuffer: sandbox.stub(),
                deleteTexture: sandbox.stub(),
                deleteBuffer: sandbox.stub(),

                bindAttribLocation: sandbox.stub(),
                linkProgram: sandbox.stub(),
                attachShader: sandbox.stub(),
                getProgramInfoLog: sandbox.stub(),
                getShaderParameter: sandbox.stub().returns(true),
                getProgramParameter: sandbox.stub().returns(true),
                compileShader: sandbox.stub(),
                shaderSource: sandbox.stub(),
                createShader: sandbox.stub(),
                bindBuffer: sandbox.stub(),
                bufferData: sandbox.stub(),
                bufferSubData: sandbox.stub(),
                createBuffer: sandbox.stub().returns({}),
                enable: sandbox.stub(),
                disable: sandbox.stub(),
                polygonOffset: sandbox.stub(),
                colorMask: sandbox.stub(),
                depthMask: sandbox.stub(),
                cullFace: sandbox.stub(),
                blendFunc: sandbox.stub(),
                blendEquation: sandbox.stub(),
                blendFuncSeparate: sandbox.stub(),
                blendEquationSeparate: sandbox.stub(),
                createProgram: sandbox.stub().returns({}),
                clearColor: sandbox.stub(),
                clear: sandbox.stub()
            }

            gl.getProgramParameter.withArgs(sinon.match.any, LINK_STATUS).returns(true);

            gl.getAttribLocation.returns(-1);
            gl.getUniformLocation.returns(null);

            return gl;
        }
    }
})();

