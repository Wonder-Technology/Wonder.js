/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class Texture2D{
        public static create(params:{}, flipY:boolean=true):Texture2D {
            var obj = new Texture2D(params, flipY);

            obj.initWhenCreate();

            return obj;
        }

        constructor(params:{}, flipY:boolean=true){
            this._params = params;
            this._flipY = flipY;
        }

        public image:HTMLImageElement = null;

        private _params:{} = null;
        private _flipY:boolean = null;
        private _texture:any = Director.getInstance().gl.createTexture();

        createTextureArea(width?:number, height?:number):void{
            var gl = Director.getInstance().gl;

            if(width && height){
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            }
            else{
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            }
        }

        public sendData(index){
            var gl = Director.getInstance().gl,
                program = Director.getInstance().stage.program;

            gl.uniform1i(program.getUniformLocation("u_sampler"), index);
        }

        bindToUnit (unit) {
            var gl = Director.getInstance().gl;

            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
        }

        initWhenCreate(){
            var i = null,
                gl = Director.getInstance().gl;

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
    }
}
