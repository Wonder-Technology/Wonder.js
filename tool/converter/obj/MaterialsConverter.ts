import Log = require("../common/Log");
import wdCb = require("wdcb");

export = class MaterialsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public materials:wdCb.Collection<MaterialModel> = wdCb.Collection.create<MaterialModel>();

    private _currentMaterial:MaterialModel;

    public convert(fileContent:string) {
        var lines = fileContent.split('\n'),
            result:any = {},
            self = this;

        this._convertToMaterials(lines);

        this.materials.forEach((material:MaterialModel) => {
            let materialData:any = {};

            materialData.type = "LightMaterial";
            materialData.diffuseColor = material.diffuseColor;
            materialData.specularColor = material.specularColor;
            materialData.diffuseMapUrl = material.diffuseMapUrl;
            materialData.specularMapUrl = material.specularMapUrl;
            materialData.normalMapUrl = material.bumpMapUrl;
            materialData.shininess = material.shininess;
            materialData.opacity = material.opacity;


            result[material.name] = materialData;
        });

        return result;
    }

    private _convertToMaterials(lines:Array<string>){
        const DELIMITER_PATTERN = /\s+/;
        var self = this;

        lines.forEach((line:string, i:number) => {
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

    private _parseKey(line, pos){
        var key = (pos >= 0) ? line.substring(0, pos) : line;

        return key.toLowerCase();
    }

    private _parseValue(line, pos){
        var value = (pos >= 0) ? line.substring(pos + 1) : "";

        return value.trim();
    }

    private _setColor(colorType:string, colorStrArr:Array<string>) {
        this._currentMaterial[colorType] = colorStrArr;
    }
}

class MaterialModel {
    public static create() {
        var obj = new this();

        return obj;
    }

    public name:string = null;
    public diffuseColor:Array<number> = null;
    public specularColor:Array<number> = null;
    public opacity:number = null;
    public shininess:number = null;
    public diffuseMapUrl:string = null;
    public specularMapUrl:string = null;
    public bumpMapUrl:string = null;
}

