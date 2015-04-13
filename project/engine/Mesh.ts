/// <reference path="geometry/RectGeometry.ts"/>
/// <reference path="material/MeshMaterial.ts"/>
/// <reference path="math/Matrix.ts"/>
module Engine3D{
    export class Mesh{
        //todo be Geometry,Material(add baseClass Geometry,Material)
        public static create(gemo:RectGeometry, material: MeshMaterial):Mesh {
            var obj = new this(material, gemo);

            return obj;
        }

        private _matrix:Matrix = null;
        get matrix(){
            return this._matrix;
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        private _material:MeshMaterial = null;
        private _gemo:RectGeometry = null;

        constructor(material:MeshMaterial, gemo:RectGeometry){
            this._material = material;
            this._gemo = gemo;
            this._matrix = Matrix.create();
        }

        public draw(){
            this._createDrawCommand();
        }

        private _createDrawCommand(){
            var renderer = Director.getInstance().renderer,
                quadCmd = renderer.createQuadCommand();

            quadCmd.bufferData = {
                vertices: this._gemo.vertices,
                texCoords: this._gemo.texCoords,
                normals: this._gemo.normals,
                indices: this._gemo.indices
            };
            quadCmd.color = this._matrix.color;

            renderer.addCommand(quadCmd);
        }
    }
}
