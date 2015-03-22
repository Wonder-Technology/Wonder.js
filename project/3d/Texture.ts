module Engine3D{
    declare var gl:any;

    export class Texture2D{
        constructor(params, flipY){
            this._texture = gl.createTexture();
            this._params = params;
            this._flipY = flipY || false;
        }

        private _texture = null;
        private _params:{} = null;
        private _flipY:boolean = null;

        get texture(){
            return this._texture;
        }

        createTextureArea(image, width, height):void{
            if(width && height){
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
            else{
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        }

        bindToUnit (unit) {
            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
        }

        unBind(){
            gl.bindTexture(gl.TEXTURE_2D, null);
        }

        initWhenCreate(){
            var i = null;

            if(this._flipY){
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
            }

            gl.bindTexture(gl.TEXTURE_2D, this._texture); // Bind the object to target

            for(i in this._params){
                if(this._params.hasOwnProperty(i)){
                    gl.texParameteri(gl.TEXTURE_2D, gl[i], gl[this._params[i]]);
                }
            }
        }

        public static create(params, flipY):Texture2D {
            var obj = new Texture2D(params, flipY);

            obj.initWhenCreate();

            return obj;
        }
    }

    //export class CubeMap{
    //
    //}
}
//function convertImageSize(image) {
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
