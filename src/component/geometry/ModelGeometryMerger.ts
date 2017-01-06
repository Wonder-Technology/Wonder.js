module wd{
    export class ModelGeometryMerger{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public merge(targetGeometry:ModelGeometry, sourceGeometry:Geometry, transform:ThreeDTransform){
            var sourceModelGeometryData:ModelGeometryDataType = this._getSourceModelGeometryData(targetGeometry),
                targetModelGeometryData:ModelGeometryDataType = this._getTargetModelGeometryData(sourceGeometry);

            sourceModelGeometryData = this._initModelGeometryData(sourceModelGeometryData);

            targetGeometry.faces = this._mergeTransformedFace(sourceModelGeometryData.faces, targetModelGeometryData.faces, transform, sourceModelGeometryData.vertices.length / 3);
            targetGeometry.vertices = this._mergeData(sourceModelGeometryData.vertices, this._transformVertices(targetModelGeometryData.vertices, transform));

            targetGeometry.texCoords = this._mergeData(sourceModelGeometryData.texCoords, targetModelGeometryData.texCoords);
            targetGeometry.colors = this._mergeData(sourceModelGeometryData.colors, targetModelGeometryData.colors);

            //todo merge morph data? merge custom data?

            targetGeometry.jointIndices = this._mergeData(sourceModelGeometryData.jointIndices, targetModelGeometryData.jointIndices);
            targetGeometry.jointWeights = this._mergeData(sourceModelGeometryData.jointWeights, targetModelGeometryData.jointWeights);
        }

        private _getSourceModelGeometryData(targetGeometry:ModelGeometry):ModelGeometryDataType{
            if(targetGeometry.geometryData !== null){
                return targetGeometry.geometryData;
            }

            return {
                vertices: targetGeometry.vertices,
                texCoords: targetGeometry.texCoords,
                colors: targetGeometry.colors,
                jointIndices: targetGeometry.jointIndices,
                jointWeights: targetGeometry.jointWeights,
                faces: targetGeometry.faces
            }
        }

        private _initModelGeometryData(geometryData:ModelGeometryDataType){
            return {
                vertices: geometryData.vertices || [],
                texCoords: geometryData.texCoords || [],
                colors: geometryData.colors || [],
                jointIndices: geometryData.jointIndices || [],
                jointWeights: geometryData.jointWeights || [],
                faces: geometryData.faces || []
            }
        }

        private _getTargetModelGeometryData(targetGeometry:Geometry):ModelGeometryDataType{
            if(targetGeometry.geometryData !== null){
                return targetGeometry.geometryData;
            }

            if(targetGeometry instanceof ModelGeometry){
                return {
                    vertices: targetGeometry.vertices,
                    texCoords: targetGeometry.texCoords,
                    colors: targetGeometry.colors,
                    jointIndices: targetGeometry.jointIndices,
                    jointWeights: targetGeometry.jointWeights,
                    faces: targetGeometry.faces
                }
            }

            return targetGeometry.computeData();
        }

        @require(function(vertices:Array<number>, targetTransform:ThreeDTransform){
            assert(vertices && vertices.length > 0, Log.info.FUNC_MUST("vertices.count", "> 0"));
        })
        private _transformVertices(vertices:Array<number>, targetTransform:ThreeDTransform){
            var modelMatrix = targetTransform.localToWorldMatrix,
                resultVertices:Array<number> = [];

            for (let i = 0, len = vertices.length; i < len; i += 3) {
                let transformedVec3 = Vector3.create(vertices[i], vertices[i + 1], vertices[i + 2]).applyMatrix4(modelMatrix);

                resultVertices.push(transformedVec3.x, transformedVec3.y, transformedVec3.z);
            }

            return resultVertices;
        }

        private _mergeTransformedFace(sourceFaces:Array<Face3>, targetFaces:Array<Face3>, targetTransform:ThreeDTransform, sourceVertexOffset:number){
            var normalMatrix:Matrix3 = null;

            if(!targetFaces){
                return sourceFaces;
            }

            normalMatrix = targetTransform.normalMatrix;

            for(let face of targetFaces){
                let clonedFace = Face3.create(face.aIndex + sourceVertexOffset, face.bIndex + sourceVertexOffset, face.cIndex + sourceVertexOffset);

                if(face.hasFaceNormal()){
                    clonedFace.faceNormal = face.faceNormal.clone().applyMatrix3(normalMatrix);
                }

                if(face.vertexNormals){
                    let clonedVertexNormals = wdCb.Collection.create<Vector3>();

                    face.vertexNormals.forEach((normal:Vector3) => {
                        clonedVertexNormals.addChild(normal.clone().applyMatrix3(normalMatrix));
                    });

                    clonedFace.vertexNormals = clonedVertexNormals;
                }

                sourceFaces.push(clonedFace);
            }

            return sourceFaces;
        }

        private _mergeData(source:Array<number>, target:Array<number>){
            if(!target){
                return source;
            }

            return source.concat(target);
        }

        private _mergeFace(source:Array<Face3>, target:Array<Face3>){
            return GeometryUtils.mergeFace(source, target);
        }
    }
}
