module Engine3D{
    export class WebGLContext{
        public static view:IView = null;
        public static gl:any = null;

        public static createGL(canvasId:string){
            this.view = ViewWebGL.create(document.getElementById(canvasId));
            this.gl = this.view.getContext();
        }
    }
}
