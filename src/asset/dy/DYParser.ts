/// <reference path="../../definitions.d.ts"/>
module dy {
    var _setTwoComponentData = (sourceData:dyCb.Collection<number>, targetData:dyCb.Collection<number>|Array<number>, index:number) => {
        var data = _getTwoComponentData(sourceData, index);

        if(targetData instanceof dyCb.Collection){
            targetData.addChild(data.x);
            targetData.addChild(data.y);
        }
        else{
            let target:Array<number> = <Array<number>>targetData;

            target.push(data.x);
            target.push(data.y);
        }
    }

    var _getTwoComponentData = (sourceData:dyCb.Collection<number>, index:number) => {
        var startIndex = 2 * index;

        return Vector2.create(
            sourceData.getChild(startIndex),
            sourceData.getChild(startIndex + 1)
        );
    }

    var _setThreeComponentData = (sourceData:dyCb.Collection<number>, targetData:dyCb.Collection<number>|Array<number>, index:number) => {
        var data = _getThreeComponentData(sourceData, index);

        if(targetData instanceof dyCb.Collection){
            targetData.addChild(data.x);
            targetData.addChild(data.y);
            targetData.addChild(data.z);
        }
        else{
            let target:Array<number> = <Array<number>>targetData;

            target.push(data.x);
            target.push(data.y);
            target.push(data.z);
        }
    }

    var _getThreeComponentData = (sourceData:dyCb.Collection<number>, index:number) => {
        var startIndex = 3 * index;

        return Vector3.create(
            sourceData.getChild(startIndex),
            sourceData.getChild(startIndex + 1),
            sourceData.getChild(startIndex + 2)
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
                self._convertVNCUData(object);

                if(self._isObjectContainer(object)){
                    object.isContainer = true;
                }
                else{
                    object.isContainer = false;

                    self._parseFromIndices(object);

                    if(!self._hasNormals(object)){
                        object.normals = this._computeNormal(object.vertices, object.indices);
                    }
                }

                //todo parse morphTargets later

                //if (object.morphTargets) {
                //    for (let m of object.morphTargets) {
                //        m.vertices = dyCb.Collection.create<number>(<any>m.vertices);
                //        //morphTargets should only come from local, not from parent
                //        self._parseMorphTargetNormal(m, object.indices);
                //    }
                //}

                //object.colors = self._findAndConvertData(object, "colors");
                //object.uvs = self._findAndConvertData(object, "uvs");


                if (object.children) {
                    object.children = dyCb.Collection.create<any>(object.children);
                    object.children.forEach((child:any) => {
                        child.parent = object;

                        parse(child);
                    })
                }
            }


            this._data.objects.forEach((object:any) => {
                //top's parent is null
                object.parent = null;

                parse(object);
            });
        }

        private _isObjectContainer(object:any){
            return !object.indices || object.indices.length === 0;
        }

        private _parseFromIndices(object:any){
            this._addDuplicateVertexToMakeItIndependent(object);
        }

        private _addDuplicateVertexToMakeItIndependent(object:any){
            var vertices = [],
                uvs = [],
                normals = [],
                indices = [];

            for(let i = 0,len = object.indices.length; i < len; i++){
                let indice = object.indices[i];

                _setThreeComponentData(object.vertices, vertices, indice);
                this._setUV(uvs, object.uvs, object.uvIndices[i]);

                indices.push(i);

                if(this._hasNormals(object)){
                    _setThreeComponentData(object.normals, normals, indice);
                }
            }

            object.vertices = dyCb.Collection.create<number>(vertices);
            object.uvs = dyCb.Collection.create<number>(uvs);
            object.indices = dyCb.Collection.create<number>(indices);

            if(this._hasNormals(object)) {
                object.normals = dyCb.Collection.create<number>(normals);
            }
        }

        private _setUV(targetUVs, sourceUVs, uvIndice){
            targetUVs.push(sourceUVs.getChild(uvIndice*2), sourceUVs.getChild(uvIndice*2 + 1));
        }

        private _hasNormals(object:DYFileParseObjectData){
            return object.normals && object.normals.getCount() > 0;
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

        private _parseMorphTargetNormal(m:{vertices;normals?}, indices) {
            m.normals = <any>this._parseNormal(m.vertices, indices, m.normals);
        }

        //private _parseObjectNormal(object, hasVertices:boolean) {
        //    //if (!hasVertices) {
        //    //    object.normals = this._findAndConvertData(object, "normals");
        //    //    return;
        //    //}
        //
        //    object.normals = this._parseNormal(object.vertices, object.indices, object.normals);
        //}

        private _parseNormal(vertices:dyCb.Collection<number>, indices:dyCb.Collection<number>, normals:Array<number>) {
            if (normals && normals.length > 0) {
                return dyCb.Collection.create<number>(normals);
            }

            return this._computeNormal(vertices, indices);
        }

        private _computeNormal(vertices:dyCb.Collection<number>, indices:dyCb.Collection<number>) {
            var count = indices.getCount(),
                normals = dyCb.Collection.create<number>(),
                compute = null;

            compute = (startIndex:number) => {
                var p0 = Vector3.create(vertices.getChild(indices.getChild(startIndex)), vertices.getChild(indices.getChild(startIndex + 1)), vertices.getChild(indices.getChild(startIndex + 2))),
                    p1 = Vector3.create(vertices.getChild(indices.getChild(startIndex + 3)), vertices.getChild(indices.getChild(startIndex + 4)), vertices.getChild(indices.getChild(startIndex + 5))),
                    p2 = Vector3.create(vertices.getChild(indices.getChild(startIndex + 6)), vertices.getChild(indices.getChild(startIndex + 7)), vertices.getChild(indices.getChild(startIndex + 8))),
                    v0 = Vector3.create().sub2(p2, p1),
                    v1 = Vector3.create().sub2(p0, p1),
                    result = null;

                result = Vector3.create().cross(v0, v1).normalize();

                normals.addChild(result.x);
                normals.addChild(result.y);
                normals.addChild(result.z);

                if (count > startIndex + 9) {
                    compute(startIndex + 9);
                }
            };

            compute(0);

            return normals;
        }

        private _convertVNCUData(object:any) {
            //var data = null;
            var currentObject = object,
                dataNameArr = ["vertices", "uvs", "colors", "normals"];

            //do {
                //data = object.vertices;
            //}
            while (!object.vertices && currentObject !== null){
                currentObject = currentObject.parent;
            }


            
            if(!currentObject.uvs || !currentObject.colors){
                dyCb.Log.error(true, dyCb.Log.info.FUNC_SHOULD("object", "has uvs,colors with vertices"));
            }

            this._makeObjectHaveVertexData(object, currentObject, dataNameArr);
            this._convertData(object, dataNameArr);
        }

        private _makeObjectHaveVertexData(targetObject:any, sourceObject:any, dataNameArr:Array<string>){
            dataNameArr.forEach((name:string) => {
                targetObject[name] = sourceObject[name];
            });
        }

        private _convertData(object:any, dataNameArr:Array<string>){
            dataNameArr.forEach((name:string) => {
                let data:any = object[name];

                if (!(data instanceof dyCb.Collection)) {
                    object[name] = dyCb.Collection.create<number>(data);
                }
            });
        }
    }
}

