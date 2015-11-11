/// <reference path="../definitions.d.ts"/>
module dy {
    export class Face3{
        public static create(aIndex:number, bIndex:number, cIndex:number, faceNormal:Vector3 = Vector3.create(), vertexNormals:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>()) {
        	var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);

        	return obj;
        }

        constructor(aIndex:number, bIndex:number, cIndex:number, faceNormal:Vector3, vertexNormals:dyCb.Collection<Vector3>){
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
        public vertexNormals:dyCb.Collection<Vector3> = null;
        public morphFaceNormals:dyCb.Collection<Vector3> = null;
        public morphVertexNormals:dyCb.Collection<dyCb.Collection<Vector3>> = null;
    }
}

