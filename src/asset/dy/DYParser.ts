/// <reference path="../../definitions.d.ts"/>
//todo optimize:set vertice,normal presion?(use toFixed)
module dy {
    export class DYParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:DYFileParseData = <any>{};
        private _objectParser = DYObjectParser.create();

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
            this._objectParser.parse(this._data, json);
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
    }
}

