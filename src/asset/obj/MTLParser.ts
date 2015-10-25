/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MTLParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        public materials:dyCb.Collection<MaterialModel> = dyCb.Collection.create<MaterialModel>();

        private _currentMaterial:MaterialModel;


        private _parseKey(line, pos){
            var key = (pos >= 0) ? line.substring(0, pos) : line;

            return key.toLowerCase();
        }

        private _parseValue(line, pos){
            var value = (pos >= 0) ? line.substring(pos + 1) : "";

            return value.trim();
        }

        public parse(fileContent:string) {
            const DELIMITER_PATTERN = /\s+/;
            var lines = fileContent.split('\n'),
                self = this;

            lines.forEach((line, i) => {
                var pos = null,
                    key = null,
                    value = null;

                line = line.trim();

                pos = line.indexOf(" ");
                key = self._parseKey(line, pos);
                value = self._parseValue(line, pos);

                // Blank line or comment
                if (line.length === 0 || line.charAt(0) === '#') {
                    return;
                }

                //This mtl keyword will create the new material
                if (key === "newmtl") {
                    this._currentMaterial = MaterialModel.create();
                    this._currentMaterial.name = value;

                    this.materials.addChild(this._currentMaterial);
                }
                else if (key === "kd") {
                    // Diffuse color (color under white light) using RGB values
                    this._setColor("diffuseColor", value.split(DELIMITER_PATTERN, 3));
                }
                else if (key === "ka") {
                    // Ambient color (color under shadow) using RGB values
                    //todo support
                }
                else if (key === "ks") {
                    // Specular color (color when light is reflected from shiny surface) using RGB values
                    this._setColor("specularColor", value.split(DELIMITER_PATTERN, 3));
                }
                else if (key === "ns") {
                    this._currentMaterial.shininess = parseFloat(value);
                }
                else if (key === "d") {
                    this._currentMaterial.opacity = parseFloat(value);
                }
                else if (key === "map_ka") {
                    // ambient map
                    //todo support
                }
                else if (key === "map_kd") {
                    // Diffuse map
                    this._currentMaterial.diffuseMapUrl = value;
                }
                else if (key === "map_ks") {
                    // Specular map
                    this._currentMaterial.specularMapUrl = value;
                }
                else if (key === "map_bump") {
                    // Bump map
                    this._currentMaterial.bumpMapUrl = value;
                }
                else if (key === "map_d") {
                    // The dissolve of the material

                    //todo support
                }
                else if (key === "illum") {
                    //todo support
                }
                else {
                    Log.log(`Unhandled expression at line : ${i}\nvalue:${line}`);
                }
            });
        }

        private _setColor(colorType:string, colorStrArr:Array<string>) {
            var color = Color.create(`rgb(${colorStrArr[0]},${colorStrArr[1]},${colorStrArr[2]}`);
            color.r = parseFloat(colorStrArr[0]);
            color.g = parseFloat(colorStrArr[1]);
            color.b = parseFloat(colorStrArr[2]);
            color.a = 1.0;

            this._currentMaterial[colorType] = color;
        }
    }

    export class MaterialModel {
        public static create() {
            var obj = new this();

            return obj;
        }

        public name:string = null;
        public diffuseColor:Color = null;
        public specularColor:Color = null;
        public opacity:number = null;
        public shininess:number = null;
        public diffuseMapUrl:string = null;
        public diffuseMap:Texture = null;
        public specularMapUrl:string = null;
        public specularMap:Texture = null;
        public bumpMapUrl:string = null;
        public bumpMap:Texture = null;
    }
}
