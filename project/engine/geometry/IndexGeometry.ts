/// <reference path="Geometry.ts"/>
/// <reference path="../render/ElementBuffer.ts"/>
module Engine3D{
    export class IndexGeometry extends Geometry{
        private _indices:ElementBuffer = null;
        get indices(){
            return this._indices;
        }
        set indices(indices:ElementBuffer){
            this._indices = indices;
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this._indices = this.computeIndicesBuffer();
        }

        protected computeIndicesBuffer():ElementBuffer{
            throw new Error("abstract method need override");
        }
    }
}

