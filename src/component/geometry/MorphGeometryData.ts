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

        //@In(function(){
        //    assert(this.geometry instanceof ModelGeometry, Log.info.FUNC_SHOULD("geometry", "be ModelGeometry"));
        //})
        //public computeMorphFaceNormals() {
        //    //var vertices = this._vertices,
        //    var faces = this.faces,
        //        geometry = this.geometry,
        //        self = this;
        //
        //    this._morphTargets.forEach((frames:DYFileParseMorphTargetsData, animName) => {
        //        var faceNormalList = dyCb.Collection.create<Array<number>>();
        //
        //        frames.vertices.forEach((vertices:Array<number>) => {
        //            var normals = [];
        //
        //            for (let face of faces) {
        //                let faceNormal = self.computeFaceNormalsHelper(vertices, face.aIndex, face.bIndex, face.cIndex);
        //
        //                //todo extract method of Face3
        //                GeometryUtils.setThreeComponent(normals, faceNormal, face.aIndex);
        //                GeometryUtils.setThreeComponent(normals, faceNormal, face.bIndex);
        //                GeometryUtils.setThreeComponent(normals, faceNormal, face.cIndex);
        //            }
        //
        //            faceNormalList.addChild(normals);
        //        });
        //
        //        geometry.morphFaceNormals.addChild(animName, faceNormalList);
        //    });
        //}

        private _computeMorphFrameFaceNormals(vertices:Array<number>){
            var normals = [];

            for (let face of this.faces) {
                let faceNormal = this.computeFaceNormalsHelper(vertices, face.aIndex, face.bIndex, face.cIndex);

                //todo extract method of Face3
                GeometryUtils.setThreeComponent(normals, faceNormal, face.aIndex);
                GeometryUtils.setThreeComponent(normals, faceNormal, face.bIndex);
                GeometryUtils.setThreeComponent(normals, faceNormal, face.cIndex);
            }

            return normals;
        }

        private _computeMorphFrameVertexNormals(vertices:Array<number>, morphFaceNormals:Array<number>){
            var normals = [],
                vertexNormals = this.computeVertexNormalsHelper(vertices, morphFaceNormals);

            //for (let face of this.faces) {
            //    //    morphVertexNormals = dyCb.Collection.create<Vector3>([
            //    //        vertexNormals[face.aIndex],
            //    //        vertexNormals[face.bIndex],
            //    //        vertexNormals[face.cIndex]
            //    //    ]);
            //
            //    //GeometryUtils.setThreeComponent(normals, vertexNormals[0], face.aIndex);
            //    //GeometryUtils.setThreeComponent(normals, vertexNormals[1], face.bIndex);
            //    //GeometryUtils.setThreeComponent(normals, vertexNormals[2], face.cIndex);
            //    GeometryUtils.setThreeComponent(normals, vertexNormals[face.aIndex], face.aIndex);
            //    GeometryUtils.setThreeComponent(normals, vertexNormals[face.bIndex], face.bIndex);
            //    GeometryUtils.setThreeComponent(normals, vertexNormals[face.cIndex], face.cIndex);
            //}

            for (let v of vertexNormals){
                normals.push(v.x, v.y, v.z);
            }

            return normals;
        }

        public computeMorphNormals() {
            //var faces = this.faces,
                var geometry = this.geometry,
                //morphFaceNormals = this.geometry.morphFaceNormals,
                self = this;

            this._morphTargets.forEach((frames:DYFileParseMorphTargetsData, animName) => {
                var faceNormalList = dyCb.Collection.create<Array<number>>();
                var vertexNormalList = dyCb.Collection.create<Array<number>>();



                //GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(0), face.aIndex);
                //GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(1), face.bIndex);
                //GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(2), face.cIndex);

                frames.vertices.forEach((vertices:Array<number>, frameIndex:number) => {
                    //var normals = [];
                    //
                    //for (let face of faces) {
                    //    let faceNormal = self.computeFaceNormalsHelper(vertices, face.aIndex, face.bIndex, face.cIndex);
                    //
                    //    //todo extract method of Face3
                    //    GeometryUtils.setThreeComponent(normals, faceNormal, face.aIndex);
                    //    GeometryUtils.setThreeComponent(normals, faceNormal, face.bIndex);
                    //    GeometryUtils.setThreeComponent(normals, faceNormal, face.cIndex);
                    //}
                    //
                    //faceNormalList.addChild(normals);


                    var morphFaceNormals = self._computeMorphFrameFaceNormals(vertices);

                    faceNormalList.addChild(morphFaceNormals);
                    //
                    //var normals = [];
                    //
                    //
                    //var vertexNormals = self.computeVertexNormalsHelper(vertices, morphFaceNormals);
                    //    //morphVertexNormals = null;
                    //
                    //for (let face of faces) {
                    ////    morphVertexNormals = dyCb.Collection.create<Vector3>([
                    ////        vertexNormals[face.aIndex],
                    ////        vertexNormals[face.bIndex],
                    ////        vertexNormals[face.cIndex]
                    ////    ]);
                    //
                    //    GeometryUtils.setThreeComponent(normals, vertexNormals.getChild(0), face.aIndex);
                    //    GeometryUtils.setThreeComponent(normals, vertexNormals.getChild(1), face.bIndex);
                    //    GeometryUtils.setThreeComponent(normals, vertexNormals.getChild(2), face.cIndex);
                    //}
                    //
                    //vertexNormalList.addChild(normals);
                    vertexNormalList.addChild(self._computeMorphFrameVertexNormals(vertices, morphFaceNormals));
                });


                geometry.morphFaceNormals.addChild(animName, faceNormalList);
                geometry.morphVertexNormals.addChild(animName, vertexNormalList);




                //frames.vertices.forEach((vertice:Array<number>, index:number) => {
                //    var normals = vertexNormalList.addChild(self._computeVertexNormals(vertice, animName, index));
                //
                //
                //    for (let face of this._faces) {
                //        face.vertexNormals = dyCb.Collection.create<Vector3>([
                //            normals[face.aIndex],
                //            normals[face.bIndex],
                //            normals[face.cIndex]
                //        ]);
                //    }
                //}
                //
                //
                //
                //for (let face of faces) {
                //    face.morphVertexNormals.addChild(animName, vertexNormalList);
                //
                //    frames.vertices.forEach((vertice:Array<number>, index:number) => {
                //        var normals = vertexNormalList.addChild(self._computeVertexNormals(vertice, animName, index));
                //
                //
                //        for (let face of this._faces) {
                //            face.vertexNormals = dyCb.Collection.create<Vector3>([
                //                normals[face.aIndex],
                //                normals[face.bIndex],
                //                normals[face.cIndex]
                //            ]);
                //        }
                //    });
                //}
            });
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

