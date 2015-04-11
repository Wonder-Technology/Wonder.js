module Engine3D{
    export class WebGLContext{
        public static canvas:any = null;
        public static gl:any = null;

        public static createGL(canvasId:string){
            this.canvas = document.getElementById(canvasId);
            this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
        }
    }
}
