/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MorphGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }

        //@InGetter(function(){
            //assert(this.geometry instanceof ModelGeometry, Log.info.FUNC_SHOULD("geometry", "be ModelGeometry"));
        //})
        @cacheGetter(function(){
            return !this._morphNormalDirty && this._morphNormalCache;
        }, function(){
            return this._morphNormalCache;
        }, function(result){
            this._morphNormalCache = result;
        })
        get morphNormals():any {
            var geometry:ModelGeometry = <any>this.geometry;

            this._morphNormalDirty = false;

            if (geometry.isSmoothShading()) {
                if (!geometry.hasMorphVertexNormals()) {
                    geometry.computeMorphNormals();
                }

                return geometry.morphVertexNormals;
            }

            if (!geometry.hasMorphFaceNormals()) {
                //geometry.computeMorphFaceNormals();
                geometry.computeMorphNormals();
            }

            return geometry.morphFaceNormals;
        }

        private _morphTargets:dyCb.Hash<DYFileParseMorphTargetsData> = null;
        get morphTargets(){
            return this._morphTargets;
        }
        set morphTargets(morphTargets:dyCb.Hash<DYFileParseMorphTargetsData>){
            this._morphTargets = morphTargets;
            this._morphNormalDirty = true;
        }

        protected geometry:ModelGeometry;

        private _morphNormalCache:Array<number> = null;
        private _morphNormalDirty:boolean = true;


        public computeMorphNormals() {
                var geometry = this.geometry,
                self = this;

            this._morphTargets.forEach((frames:DYFileParseMorphTargetsData, animName) => {
                var faceNormalList = dyCb.Collection.create<Array<number>>();
                var vertexNormalList = dyCb.Collection.create<Array<number>>();


                frames.vertices.forEach((vertices:Array<number>) => {
                    var tempGeometryData = MorphGeometryData.create(geometry),
                        faceNormalsOfEachFrame = null,
                        vertexNormalsOfEachFrame = null;

                    tempGeometryData.vertices = vertices;
                    tempGeometryData.faces = self._copyFaces(geometry.faces);

                    tempGeometryData.computeFaceNormals();
                    tempGeometryData.computeVertexNormals();

                    [faceNormalsOfEachFrame, vertexNormalsOfEachFrame] = self._getMorphNormals(tempGeometryData);

                    faceNormalList.addChild(faceNormalsOfEachFrame);
                    vertexNormalList.addChild(vertexNormalsOfEachFrame);
                });

                geometry.morphFaceNormals.addChild(animName, faceNormalList);
                geometry.morphVertexNormals.addChild(animName, vertexNormalList);
            });
        }

        private _copyFaces(faces:Array<Face3>){
            var copyFaces = [];

            for (let face of faces){
                copyFaces.push(face.copy());
            }

            return copyFaces;
        }

        private _getMorphNormals(geometryData:MorphGeometryData){
            return [geometryData.normalsFromFaceNormal, geometryData.normalsFromVertexNormals];
        }

        @In(function(){
            //var hasFaceNormal = !this.faces[0].faceNormal.isZero();
            //
            //if(hasFaceNormal){
            //    for(let face of this.faces){
            //        assert(!face.faceNormal.isZero(), Log.info.FUNC_MUST_BE("faces", "either all has face normal data or all not"));
            //    }
            //}
            //else{
            //    for(let face of this.faces){
            //        assert(face.faceNormal.isZero(), Log.info.FUNC_MUST_BE("faces", "either all has face normal data or all not"));
            //    }
            //}
            //todo
        })
        public hasMorphFaceNormals(){
            return this.geometry.morphFaceNormals.getCount() > 0;
            //return this.faces[0].morphFaceNormals.filter((faceNormal:Vector3) => {
            //    return faceNormal.isZero();
            //}).getCount() === 0;
        }

        @In(function(){
            //var hasVertexNormal = this.faces[0].vertexNormals.getCount() > 0;
            //
            //if(hasVertexNormal){
            //    for(let face of this.faces) {
            //        assert(face.vertexNormals.getCount() > 0, Log.info.FUNC_MUST_BE("faces", "either all has vertex normal data or all not"));
            //    }
            //}
            //else{
            //    for(let face of this.faces) {
            //        assert(face.vertexNormals.getCount() === 0, Log.info.FUNC_MUST_BE("faces", "either all has vertex normal data or all not"));
            //    }
            //}
            //todo
        })
        public hasMorphVertexNormals(){
            return this.geometry.morphVertexNormals.getCount() > 0;
            //var result = false;
            //
            //this.faces[0].morphVertexNormals.forEach((vertexNormals:dyCb.Collection<dyCb.Collection<Vector3>>) => {
            //    if(vertexNormals.filter((vertexNormal:dyCb.Collection<Vector3>) => {
            //            return vertexNormal.getCount() > 0;
            //        }).getCount() > 0){
            //        result = true;
            //        return dyCb.$BREAK;
            //    }
            //});
            //
            //return result;
        }

        protected onChangeFace(){
            this._morphNormalDirty = true;
        }
    }
}

