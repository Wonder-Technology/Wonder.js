/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class MorphGeometryData extends GeometryData{
        public static create(geometry:Geometry) {
            var obj = new this(geometry);

            return obj;
        }

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
                geometry.computeMorphNormals();
            }

            return geometry.morphFaceNormals;
        }

        private _morphTargets:wdCb.Hash<DYFileParseMorphTargetsData> = null;
        get morphTargets(){
            return this._morphTargets;
        }
        set morphTargets(morphTargets:wdCb.Hash<DYFileParseMorphTargetsData>){
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
                var faceNormalList = wdCb.Collection.create<Array<number>>(),
                    vertexNormalList = wdCb.Collection.create<Array<number>>();

                frames.forEach((vertices:Array<number>) => {
                    let tempGeometryData = MorphGeometryData.create(geometry),
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

        public hasMorphFaceNormals(){
            return this.geometry.morphFaceNormals.getCount() > 0;
        }

        public hasMorphVertexNormals(){
            return this.geometry.morphVertexNormals.getCount() > 0;
        }

        protected onChangeFace(){
            this._morphNormalDirty = true;
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
    }
}

