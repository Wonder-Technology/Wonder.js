/// <reference path="../definitions.d.ts"/>
module dy {
    export class Scene extends GameObject{
        public static create(camera:Camera, vsSource:string, fsSource:string) {
            var obj = new this(camera);

            obj.initWhenCreate(vsSource, fsSource);

            return obj;
        }

        //private _meshes:dyCb.Collection = dyCb.Collection.create();

        private _camera:GameObject = null;
        get camera() {
            return this._camera;
        }
        set camera(camera:GameObject) {
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
            super();

            this._camera = camera;
        }

        public initWhenCreate(vsSource:string, fsSource:string){
            this._program = Program.create(vsSource, fsSource)
        }

        //public add(meshesArr:Mesh[]) {
        //    this._meshes.addChildren(meshesArr);
        //}

        public run() {
            var self = this;
            var camera = this._camera.getComponent<Camera>(Camera);

            this._camera.onStartLoop();

            camera.update();

            this._program.use();

            this.forEach((mesh)=> {
                self._setData(mesh);

                mesh.update();

                mesh.draw();
            });


            this._camera.onEndLoop();
        }

        public init(){
        }


        private _setData(mesh){
            this._program.setUniformData("u_mvpMatrix", UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(mesh));
        }

        private _computeMvpMatrix(mesh):Matrix{
            //return mesh.transform.matrix.copy().applyMatrix(this._camera.computeVpMatrix());
            var camera = this._camera.getComponent<Camera>(Camera);
            return mesh.transform.localToWorldMatrix.copy().applyMatrix(camera.computeVpMatrix());
        }
    }
}
