//todo optimize:set vertice,normal presion?(use toFixed)
module wd {
    export class WDParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:WDFileParseData = <any>{};
        private _objectParser = WDObjectParser.create();

        public parse(json:WDFileJsonData):WDFileParseData {
            this._parseMetadata(json);
            this._parseScene(json);
            this._parseMaterial(json);
            this._parseObject(json);

            return this._data;
        }

        private _parseMetadata(json:WDFileJsonData) {
            this._data.metadata = <any>json.metadata;
        }

        private _parseObject(json:WDFileJsonData) {
            this._objectParser.parse(this._data, json);
        }

        private _parseScene(json:WDFileJsonData) {
            this._data.scene = <any>json.scene;

            if (json.scene.ambientColor) {
                this._data.scene.ambientColor = this._createColor(json.scene.ambientColor);
            }
        }

        private _parseMaterial(json:WDFileJsonData) {
            this._data.materials = wdCb.Hash.create<any>(json.materials);

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

