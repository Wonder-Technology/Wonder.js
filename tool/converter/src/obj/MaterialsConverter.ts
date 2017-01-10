import Log = require("../../../ts/Log");
import wdCb = require("wdcb");

import ModelLoaderUtils = require("../../common/ModelLoaderUtils");

export class MaterialsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public materials:wdCb.Collection<MaterialModel> = wdCb.Collection.create<MaterialModel>();

    private _currentMaterial:MaterialModel;
    private _json:any = null;

    public convert(json:any, fileContent:string) {
        var lines = fileContent.split('\n');

        this._convertToMaterials(lines);

        this._json = json;

        this._json.textures = {};
        this._json.samplers = {};
        this._json.images = {};

        let materials = {};

        this.materials.forEach((material:MaterialModel) => {
            this._buildMaterialData(materials, material);
        });

        return materials;
    }

    private _buildMaterialData(materials:any, material:MaterialModel){
        var materialData:any = {},
            valueData:any = {};

        materialData.technique = "PHONG";

        if(material.opacity !== null || material.opacity !== void 0){
            if(material.opacity < 1){
                materialData.transparent = true;
            }
            else{
                materialData.transparent = false;
            }

            materialData.transparency = material.opacity;
        }

        if(!!material.diffuseMapUrl){
            this._addTextureData(valueData, "diffuse", material.diffuseMapUrl);
        }
        else{
            this._addData(valueData, "diffuse", material.diffuseColor);
        }

        if(!!material.specularMapUrl){
            this._addTextureData(valueData, "specular", material.specularMapUrl);
        }
        else{
            this._addData(valueData, "specular", material.specularColor);
        }

        if(!!material.emissionMapUrl){
            this._addTextureData(valueData, "emission", material.emissionMapUrl);
        }
        else{
            this._addData(valueData, "emission", material.emissionColor);
        }

        if(!!material.bumpMapUrl) {
            this._addTextureData(valueData, "normalMap", material.bumpMapUrl);
        }

        this._addData(valueData, "shininess", material.shininess);

        materialData.values = valueData;

        materials[material.name] = materialData;
    }

    private _addData(valueData:any, key:string, data:any){
        if(!!data){
            valueData[key] = data;
        }
    }

    private _addTextureData(valueData:any, key:string, mapUrl:string){
        //todo fix bug: if different mapUrls with the same name but different path, the id should be different!
        var id = ModelLoaderUtils.getNameByPath(mapUrl),
            textureName = `texture_${id}`,
            samplerName = `sampler_${id}`,
            imageName = `image_${id}`;

        valueData[key] = textureName;

        this._json.textures[textureName] = {
            sampler: samplerName,
            source: imageName,
            format: 6408,
            internalFormat: 6408,
            target: 3553,
            type: 5121
        };

        this._json.samplers[samplerName] = {
            minFilter:9986,
            magFilter:9729,
            wrapS:10497,
            wrapT:10497
        };

        this._json.images[imageName] = {
            name: imageName,
            uri: mapUrl
        };
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
            else if (key === "ke") {
                this._setColor("emissionColor", value.split(DELIMITER_PATTERN, 3));
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
            else if (key === "map_ke") {
                // Emission map
                this._currentMaterial.emissionMapUrl = value;
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
    public emissionColor:Array<number> = null;
    public opacity:number = null;
    public shininess:number = null;
    public diffuseMapUrl:string = null;
    public specularMapUrl:string = null;
    public emissionMapUrl:string = null;
    public bumpMapUrl:string = null;
}

