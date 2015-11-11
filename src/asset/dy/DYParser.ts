/// <reference path="../../definitions.d.ts"/>
module dy {
    var _setTwoComponentData = (targetData:Array<number>, sourceData:Array<number>, index:number) => {
        var data = _getTwoComponentData(sourceData, index);
        targetData.push(data.x);
        targetData.push(data.y);
    }

    var _getTwoComponentData = (sourceData:Array<number>, index:number) => {
        var startIndex = 2 * index;

        return Vector2.create(
            sourceData[startIndex],
            sourceData[startIndex + 1]
        );
    }

    var _setThreeComponentData = (targetData:Array<number>|dyCb.Collection<number>, sourceData:Array<number>, index:number) => {
        var data = _getThreeComponentData(sourceData, index);

        if(targetData instanceof dyCb.Collection){
            targetData.addChild(data.x);
            targetData.addChild(data.y);
            targetData.addChild(data.z);
        }
        else{
            let target = <Array<number>>targetData;

            target.push(data.x);
            target.push(data.y);
            target.push(data.z);
        }
    }

    var _getThreeComponentData = (sourceData:Array<number>, index:number) => {
        var startIndex = 3 * index;

        return Vector3.create(
            sourceData[startIndex],
            sourceData[startIndex + 1],
            sourceData[startIndex + 2]
        );
    }

    export class DYParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:DYFileParseData = <any>{};

        public parse(json:DYFileJsonData):DYFileParseData {
            this._parseMetadata(json);
            this._parseScene(json);
            this._parseMaterial(json);
            this._parseObject(json);

            return this._data;
        }

        private _parseMetadata(json:DYFileJsonData) {
            this._data.metadata = <any>json.metadata;
        }

        private _parseObject(json:DYFileJsonData) {
            var parse = null,
                self = this;

            this._data.objects = dyCb.Collection.create<any>(json.objects);

            parse = (object:any) => {
                if(self._isObjectContainer(object)){
                    object.isContainer = true;
                }
                else{
                    object.isContainer = false;

                    self._parseFromIndices(object);

                    //if(!self._hasData(object.normals)) {
                    //    object.normals = this._computeNormal(object.vertices, object.indices);
                    //}
                    //if(self._hasData(object.morphTargets)){
                    //    object.morphTargets.forEach((target:{name:string,vertices:dyCb.Collection<number>,normals?:dyCb.Collection<number>}) => {
                    //        if(!self._hasData(target.normals)){
                    //            target.normals = this._computeNormal(target.vertices, object.indices);
                    //        }
                    //    })
                    //}
                }

                if (object.children) {
                    object.children = dyCb.Collection.create<any>(object.children);
                    object.children.forEach((child:any) => {
                        child.parent = object;

                        parse(child);
                    })
                }
            };


            this._data.objects.forEach((object:any) => {
                //top's parent is null
                object.parent = null;

                parse(object);

                self._removeObjectContainerData(object);
            });
        }

        private _isObjectContainer(object:DYFileJsonObjectData){
            return !this._hasData(object.verticeIndices);
        }

        private _parseFromIndices(object:any){
            this._addDuplicateVertexDataToMakeItIndependent(object);
            this._removeRebundantIndiceData(object);
        }

        @Out(function(returnValue, object){
            assert(object.vertices && object.vertices instanceof dyCb.Collection && object.vertices.getCount() > 0, Log.info.FUNC_MUST_NOT_BE("vertices", "empty"));
            assert(object.indices && object.indices instanceof dyCb.Collection && object.indices.getCount() > 0, Log.info.FUNC_MUST_NOT_BE("indices", "empty"));
            assert(object.uvs && object.uvs instanceof dyCb.Collection, Log.info.FUNC_SHOULD("uvs", "be Collection"));
            //if(this._hasData(object.normals)){
            assert(object.normals instanceof dyCb.Collection, Log.info.FUNC_SHOULD("if object has normals, then it", "be Collection"));
            //}
        })
        private _addDuplicateVertexDataToMakeItIndependent(object:any){
            var vertices = [],
                uvs = [],
                normals = [],
                colors = [],
                morphTargets = [],
                verticeIndices = [],
                objectVertices = this._findData(object, "vertices"),
                objectUVs = this._findData(object, "uvs"),
                objectNormals = this._findData(object, "normals"),
                objectColors = this._findData(object, "colors"),
                objectMorphTargets = this._findData(object, "morphTargets");


            if(this._hasData(objectMorphTargets)){
                this._initMorphTargets(morphTargets, objectMorphTargets);
            }

            for(let i = 0,len = object.verticeIndices.length; i < len; i++){
                let verticeIndice = object.verticeIndices[i];

                _setThreeComponentData(vertices, objectVertices, verticeIndice);

                if(this._hasData(objectUVs)) {
                    this._setUV(uvs, objectUVs, object.uvIndices, i, verticeIndice);
                }

                if(this._hasData(objectNormals)) {
                    this._setNormal(normals, objectNormals, object.normalIndices, i);
                }


                if(this._hasData(objectColors)) {
                    _setThreeComponentData(colors, objectColors, verticeIndice);
                }

                if(this._hasData(objectMorphTargets)){
                    this._setMorphTargets(morphTargets, objectMorphTargets, verticeIndice, object.normalIndices, i);
                }

                verticeIndices.push(i);
            }

            object.vertices = dyCb.Collection.create<number>(vertices);
            object.uvs = dyCb.Collection.create<number>(uvs);
            object.colors = dyCb.Collection.create<number>(colors);
            object.indices = dyCb.Collection.create<number>(verticeIndices);

            //if(this._hasData(normals)) {
            object.normals = dyCb.Collection.create<number>(normals);
            //}

            object.morphTargets = dyCb.Collection.create<any>(morphTargets);
        }

        @Out(function(returnValue, object){
            assert(!object.verticeIndices, Log.info.FUNC_SHOULD("object.verticeIndices", "be removed"));
            assert(!object.uvIndices, Log.info.FUNC_SHOULD("object.uvIndices", "be removed"));
            assert(!object.normalIndices, Log.info.FUNC_SHOULD("object.normalIndices", "be removed"));
        })
        private _removeRebundantIndiceData(object:DYFileJsonObjectData){
            delete object.verticeIndices;
            delete object.uvIndices;
            delete object.normalIndices;
        }

        private _removeObjectContainerData(object:DYFileParseObjectData){
            var remove = null;

            remove = (object:DYFileParseObjectData) => {
                if(object.isContainer){
                    delete object.vertices;
                    delete object.uvs;
                    delete object.normals;
                    delete object.colors;
                }

                if(object.children){
                    object.children.forEach((child:any) => {
                        remove(child);
                    })
                }
            };

            remove(object);
        }

        private _findData(object:DYFileParseObjectData, dataName:string){
            var data = null;

            do{
                data = object[dataName];
            }
            while(!data && (object = object.parent) !== null);

            return data;
        }


        private _initMorphTargets(targetMorphTargets:Array<any>, sourceMorphTargets:Array<any>){
            for(let frame of sourceMorphTargets){
                targetMorphTargets.push({
                    name: frame.name,
                    vertices: dyCb.Collection.create<number>(),
                    normals: dyCb.Collection.create<number>()
                });
            }

            return targetMorphTargets;
        }

        private _setUV(targetUVs:Array<number>, sourceUVs:Array<number>, uvIndices:Array<number>, index:number, verticeIndice:number){
            var uvIndice = null;

            if(!uvIndices || uvIndices.length === 0){
                _setTwoComponentData(targetUVs, sourceUVs, verticeIndice);
                return;
            }

            uvIndice = uvIndices[index];

            targetUVs.push(sourceUVs[uvIndice*2], sourceUVs[uvIndice*2 + 1]);
        }

        private _setNormal(targetNormals:Array<number>|dyCb.Collection<number>, sourceNormals:Array<number>, normalIndices:Array<number>, index:number){
            var normalIndice = null,
                normals = null;

            if(!normalIndices || normalIndices.length === 0){
                _setThreeComponentData(targetNormals, sourceNormals, normalIndice);
                return;
            }

            normalIndice = normalIndices[index];

            normals = [sourceNormals[normalIndice * 3], sourceNormals[normalIndice * 3 + 1], sourceNormals[normalIndice * 3 + 2]];

            if(targetNormals instanceof dyCb.Collection){
                targetNormals.addChildren(normals);
            }
            else{
                let target = <Array<number>>targetNormals;

                target.push(normals[0], normals[1], normals[2]);
            }
        }

        private _setMorphTargets(targetMorphTargets:Array<any>, sourceMorphTargets:Array<any>, verticeIndice:number, normalIndices:Array<number>, index:number){
            for (let i = 0, len = sourceMorphTargets.length; i < len; i++){
                let sourceFrame = sourceMorphTargets[i];

                _setThreeComponentData(targetMorphTargets[i].vertices, sourceFrame.vertices, verticeIndice);

                if(this._hasData(sourceFrame.normals)){
                    this._setNormal(targetMorphTargets[i].normals, sourceFrame.normals, normalIndices, index);
                }
            }
        }

        @In(function(data){
            if(data){
                assert(data instanceof dyCb.Collection || JudgeUtils.isArray(data), Log.info.FUNC_SHOULD("data",  "be Array or Collection"));
            }
        })
        private _hasData(data:any){
            return data && ((data.length && data.length > 0) || (data.getCount && data.getCount() > 0))
        }

        private _parseScene(json:DYFileJsonData) {
            this._data.scene = <any>json.scene;

            if (json.scene.ambientColor) {
                this._data.scene.ambientColor = this._createColor(json.scene.ambientColor);
            }
        }

        private _parseMaterial(json:DYFileJsonData) {
            this._data.materials = dyCb.Hash.create<any>(json.materials);

            this._data.materials.forEach((material:any) => {
                if (material.diffuseColor) {
                    material.diffuseColor = this._createColor(material.diffuseColor);
                }
                if (material.specularColor) {
                    material.specularColor = this._createColor(material.specularColor);
                }
            });
        }

        private _createColor(colorArr:Array<number>) {
            return Color.create(`rgb(${colorArr.join(",").replace(/^(\d+),/g, "$1.0,").replace(/,(\d+),/g, ",$1.0,").replace(/,(\d+)$/g, ",$1.0")})`);
        }

        //private _parseMorphTargetNormal(m:{vertices;normals?}, indices) {
        //    m.normals = <any>this._parseNormal(m.vertices, indices, m.normals);
        //}
        //
        //private _parseNormal(vertices:dyCb.Collection<number>, indices:dyCb.Collection<number>, normals:Array<number>) {
        //    if (normals && normals.length > 0) {
        //        return dyCb.Collection.create<number>(normals);
        //    }
        //
        //    return this._computeNormal(vertices, indices);
        //}

        private _computeNormal(vertices:dyCb.Collection<number>, indices:dyCb.Collection<number>) {
            var count = indices.getCount(),
                normals = dyCb.Collection.create<number>(),
                compute = null;

            compute = (startIndex:number) => {
                var p0 = Vector3.create(vertices.getChild(indices.getChild(startIndex) * 3), vertices.getChild(indices.getChild(startIndex) * 3 + 1), vertices.getChild(indices.getChild(startIndex) * 3 + 2)),
                    p1 = Vector3.create(vertices.getChild(indices.getChild(startIndex + 1) * 3), vertices.getChild(indices.getChild(startIndex + 1) * 3 + 1), vertices.getChild(indices.getChild(startIndex + 1) * 3 + 2)),
                    p2 = Vector3.create(vertices.getChild(indices.getChild(startIndex + 2) * 3), vertices.getChild(indices.getChild(startIndex + 2) * 3 + 1), vertices.getChild(indices.getChild(startIndex + 2) * 3 + 2)),
                    v0 = Vector3.create().sub2(p2, p1),
                    v1 = Vector3.create().sub2(p0, p1),
                    result = null;

                result = Vector3.create().cross(v0, v1).normalize();

                normals.addChild(result.x);
                normals.addChild(result.y);
                normals.addChild(result.z);
                normals.addChild(result.x);
                normals.addChild(result.y);
                normals.addChild(result.z);
                normals.addChild(result.x);
                normals.addChild(result.y);
                normals.addChild(result.z);

                if (count > startIndex + 3) {
                    compute(startIndex + 3);
                }
            };

            compute(0);

            return normals;
        }
    }
}

