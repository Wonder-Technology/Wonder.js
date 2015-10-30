/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DYParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:DYFileParseData = <any>{};

        public parse(json:DYFileJsonData):DYFileParseData {
            this.parseScene(json).parseMaterial(json).parseObject(json);

            return this._data;
        }

        public parseObject(json:DYFileJsonData) {
            this._data.objects = <any>json.objects;

            for (let i in this._data.objects) {
                if (this._data.objects.hasOwnProperty(i)) {
                    let object:any = this._data.objects[i];
                    //top's parent is null
                    object.parent = null;

                    this._parseObject(object);
                }
            }
        }

        private _parseObject(object:DYFileParseObjectData) {
            object.vertices = this._findAndConvertData(object, "vertices");
            object.indices = this._findAndConvertData(object, "indices");

            for (let m of object.morphTargets) {
                m.vertices = dyCb.Collection.create<number>(<any>m.vertices);

                this._parseMorphTargetNormal(m, object.indices);
            }

            object.colors = this._findAndConvertData(object, "colors");
            object.uvs = this._findAndConvertData(object, "uvs");

            this._parseObjectNormal(object);

            if(object.children){
                for(let i in object.children){
                    if(object.children.hasOwnProperty(i)){
                        let child = <any>object.children[i];

                        child.parent = object;
                        this._parseObject(child);
                    }
                }
            }
        }

        private _findAndConvertData(object:DYFileParseObjectData, dataName:string){
            var data = null;

            do{
                data = object[dataName];
            }
            while(!data && (object = object.parent) !== null);

            if(data instanceof dyCb.Collection){
                return data;
            }

            return dyCb.Collection.create<number>(data);
        }

        public parseScene(json:DYFileJsonData) {
            this._data.scene = <any>json.scene;

            if (json.scene.ambientColor) {
                this._data.scene.ambientColor = this._createColor(json.scene.ambientColor);
            }

            return this;
        }

        public parseMaterial(json:DYFileJsonData) {
            this._data.materials = <any>json.materials;

            for (let i in this._data.materials) {
                if (this._data.materials.hasOwnProperty(i)) {
                    let material:any = this._data.materials[i];

                    if (material.diffuseColor) {
                        material.diffuseColor = this._createColor(material.diffuseColor);
                    }
                    if (material.specularColor) {
                        material.specularColor = this._createColor(material.specularColor);
                    }
                }
            }

            return this;
        }

        private _createColor(colorArr:Array<number>) {
            return Color.create(`rgb(${colorArr.join(",").replace(/^([01]),/g, "$1.0,").replace(/,([01]),/g, ",$1.0,").replace(/,([01])$/g, ",$1.0")})`);
        }

        private _parseMorphTargetNormal(m:{vertices;normals?}, indices) {
            m.normals = <any>this._parseNormal(m.vertices, indices, m.normals);
        }

        private _parseObjectNormal(object) {
            object.normals = this._parseNormal(object.vertices, object.indices, object.normals);
        }

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
    }
}

