module wd {
    export class Face3{
        public static create(aIndex:number, bIndex:number, cIndex:number, faceNormal:Vector3 = null, vertexNormals:wdCb.Collection<Vector3> = wdCb.Collection.create<Vector3>()) {
        	var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);

        	return obj;
        }

        constructor(aIndex:number, bIndex:number, cIndex:number, faceNormal:Vector3, vertexNormals:wdCb.Collection<Vector3>){
            this.aIndex = aIndex;
            this.bIndex = bIndex;
            this.cIndex = cIndex;
            this._faceNormal = faceNormal;
            this.vertexNormals = vertexNormals;
        }

        private _faceNormal:Vector3 = null;
        get faceNormal(){
            return this._faceNormal !== null ? this._faceNormal : Vector3.create(0, 0, 0);
        }
        set faceNormal(faceNormal:Vector3){
            this._faceNormal = faceNormal;
        }

        public aIndex:number = null;
        public bIndex:number = null;
        public cIndex:number = null;
        public vertexNormals:wdCb.Collection<Vector3> = null;

        public hasFaceNormal(){
            return this._faceNormal !== null;
        }

        public hasVertexNormal(){
            return this.vertexNormals.getCount() > 0;
        }

        public clone(){
            var copyFaceNormal = this._faceNormal ? this._faceNormal.clone() : null,
                copyVertexNormals = null;

            if(this.vertexNormals){
                copyVertexNormals = wdCb.Collection.create();

                this.vertexNormals.forEach((vertexNormal:Vector3) => {
                    copyVertexNormals.addChild(vertexNormal.clone());
                });
            }

            return Face3.create(this.aIndex, this.bIndex, this.cIndex, copyFaceNormal, copyVertexNormals);
        }
    }
}

