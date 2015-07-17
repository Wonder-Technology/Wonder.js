/// <reference path="../definitions.d.ts"/>
module Engine3D {
    export class Scene extends GameObject{
        public static create(camera:Camera, vsSource:string, fsSource:string) {
            var obj = new this(camera);

            obj.initWhenCreate(vsSource, fsSource);

            return obj;
        }

        //private _meshes:dyCb.Collection = dyCb.Collection.create();

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
            super();

            this._camera = camera;
        }

        public initWhenCreate(vsSource:string, fsSource:string){
            this._program = Program.create(vsSource, fsSource)
        }

        //public add(meshesArr:Mesh[]) {
        //    this._meshes.addChilds(meshesArr);
        //}

        public run() {
            var self = this;

            this._camera.pushMatrix();
            this._camera.onStartLoop();

            this._camera.run();

            this._program.use();

            this.forEach((mesh)=> {
                self._setData(mesh);

                mesh.update();

                mesh.draw();
            });


            this._camera.onEndLoop();
            this._camera.popMatrix();
        }

        public init(){
            this.position = Position.create(0, 0, 0);
        }


        private _setData(mesh){
            this._program.setUniformData("u_mvpMatrix", UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(mesh));
        }

        private _computeMvpMatrix(mesh):Matrix{
            return mesh.matrix.copy().applyMatrix(this._camera.computeVpMatrix());
        }
    }
}
