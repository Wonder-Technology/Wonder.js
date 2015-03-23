var Engine3D;
(function (Engine3D) {
    //todo 支持mip map
    var Texture2D = (function () {
        function Texture2D(params, flipY) {
            this._texture = null;
            this._params = null;
            this._flipY = null;
            this._texture = gl.createTexture();
            this._params = params;
            this._flipY = flipY || false;
        }
        Object.defineProperty(Texture2D.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Texture2D.prototype.createTextureArea = function (image, width, height) {
            if (width && height) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
            else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        };
        Texture2D.prototype.bindToUnit = function (unit) {
            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
        };
        Texture2D.prototype.unBind = function () {
            gl.bindTexture(gl.TEXTURE_2D, null);
        };
        Texture2D.prototype.initWhenCreate = function () {
            var i = null;
            if (this._flipY) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image Y coordinate
            }
            gl.bindTexture(gl.TEXTURE_2D, this._texture); // Bind the object to target
            for (i in this._params) {
                if (this._params.hasOwnProperty(i)) {
                    gl.texParameteri(gl.TEXTURE_2D, gl[i], gl[this._params[i]]);
                }
            }
        };
        Texture2D.create = function (params, flipY) {
            var obj = new Texture2D(params, flipY);
            obj.initWhenCreate();
            return obj;
        };
        return Texture2D;
    })();
    Engine3D.Texture2D = Texture2D;
    var TextureCubeMap = (function () {
        function TextureCubeMap(params) {
            this._texture = null;
            this._params = null;
            this._texture = gl.createTexture();
            this._params = params;
            //this._flipY = flipY || false;
        }
        Object.defineProperty(TextureCubeMap.prototype, "texture", {
            //private _flipY:boolean = null;
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        TextureCubeMap.prototype.createTextureArea = function (imageArr, width, height) {
            var i = 0, len = 6;
            //立方图纹理需要设置六个方位上的纹理，为了方便区分，我设置了六个不同的纹理图像
            if (width && height) {
                for (i = 0; i < len; i++) {
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imageArr[i]);
                }
            }
            else {
                for (i = 0; i < len; i++) {
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageArr[i]);
                }
            }
        };
        TextureCubeMap.prototype.bindToUnit = function (unit) {
            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
        };
        TextureCubeMap.prototype.unBind = function () {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        };
        TextureCubeMap.prototype.initWhenCreate = function () {
            var i = null;
            //if(this._flipY){
            //    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
            //}
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture); // Bind the object to target
            for (i in this._params) {
                if (this._params.hasOwnProperty(i)) {
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl[i], gl[this._params[i]]);
                }
            }
        };
        TextureCubeMap.create = function (params) {
            var obj = new this(params);
            obj.initWhenCreate();
            return obj;
        };
        return TextureCubeMap;
    })();
    Engine3D.TextureCubeMap = TextureCubeMap;
})(Engine3D || (Engine3D = {}));
//function convertImageSize(image
//    //var texture = gl.createTexture();
//    //gl.bindTexture(gl.TEXTURE_2D, texture);
//    if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {
//        // Scale up the texture to the next highest power of two dimensions.
//        var canvas = document.createElement("canvas");
//        canvas.width = nextHighestPowerOfTwo(image.width);
//        canvas.height = nextHighestPowerOfTwo(image.height);
//        var ctx = canvas.getContext("2d");
//        ctx.drawImage(image, 0, 0, image.width, image.height);
//        image = canvas;
//    }
//    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
//    //gl.generateMipmap(gl.TEXTURE_2D);
//    //gl.bindTexture(gl.TEXTURE_2D, null);
//    //return texture;
//    return image;
//}
//
//function isPowerOfTwo(x) {
//    return (x & (x - 1)) == 0;
//}
//
//function nextHighestPowerOfTwo(x) {
//    --x;
//    for (var i = 1; i < 32; i <<= 1) {
//        x = x | x >> i;
//    }
//    return x + 1;
//}
//# sourceMappingURL=Texture.js.map