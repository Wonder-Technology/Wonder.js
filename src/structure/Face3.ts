/// <reference path="../filePath.d.ts"/>
module dy {
    export class Face3{
        public static create(aIndex:number, bIndex:number, cIndex:number, faceNormal:Vector3 = Vector3.create(), vertexNormals:wdCb.Collection<Vector3> = wdCb.Collection.create<Vector3>()) {
        	var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);

        	return obj;
        }

        constructor(aIndex:number, bIndex:number, cIndex:number, faceNormal:Vector3, vertexNormals:wdCb.Collection<Vector3>){
            this.aIndex = aIndex;
            this.bIndex = bIndex;
            this.cIndex = cIndex;
            this.faceNormal = faceNormal;
            this.vertexNormals = vertexNormals;
        }

        public aIndex:number = null;
        public bIndex:number = null;
        public cIndex:number = null;
        public faceNormal:Vector3 = null;
        public vertexNormals:wdCb.Collection<Vector3> = null;

        public copy(){
            var copyFaceNormal = this.faceNormal ? this.faceNormal.copy() : null,
                copyVertexNormals = null;

            if(this.vertexNormals){
                copyVertexNormals = wdCb.Collection.create();

                this.vertexNormals.forEach((vertexNormal:Vector3) => {
                    copyVertexNormals.addChild(vertexNormal.copy());
                });
            }

            return Face3.create(this.aIndex, this.bIndex, this.cIndex, copyFaceNormal, copyVertexNormals);
        }
    }
}

