/// <reference path="Camera.ts"/>
/// <reference path="Mesh.ts"/>
/// <reference path="Program.ts"/>
/// <reference path="math/Matrix.ts"/>
module Engine3D {
    export class Scene {
        public static create(camera:Camera, vsSource:string, fsSource:string) {
            var obj = new this(camera);

            obj.initWhenCreate(vsSource, fsSource);

            return obj;
        }

        private _meshes:Mesh[] = [];

        private _camera:Camera = null;
        get camera() {
            return this._camera;
        }
        set camera(camera:Camera) {
            this._camera = camera;
        }

        private _program:Program = null;
        get program() {
            return this._program;
        }
        set program(program:Program) {
            this._program = program;
        }

        constructor(camera) {
            this._camera = camera;
        }

        public initWhenCreate(vsSource:string, fsSource:string){
            this._program = Program.create(vsSource, fsSource)
        }

        public add(meshesArr:Mesh[]) {
            this._meshes = this._meshes.concat(meshesArr);
        }

        public run() {
            var self = this;

            this._program.use();

            this._meshes.forEach((mesh)=> {
                self._setData(mesh);

                mesh.draw(self._program);
            });
        }

        public init(){
            //todo move to render
            WebGLContext.gl.clearColor(0, 0, 0, 1);
        }

        private _setData(mesh){
            this._program.setUniformData("u_mvpMatrix", UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(mesh));
        }

        private _computeMvpMatrix(mesh):Matrix{
            return mesh.matrix.copy().applyMatrix(this._camera.computeVpMatrix());
        }
    }
}
