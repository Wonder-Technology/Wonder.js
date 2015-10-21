/// <reference path="../../definitions.d.ts"/>
module dy {
    export class MTLParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        public materials:dyCb.Collection<MaterialModel> = dyCb.Collection.create<MaterialModel>();

        private _currentMaterial:MaterialModel;

        public parse(fileContent:string){
                        //Split the lines from the file
            var lines = fileContent.split('\n');
            //Space char
            var delimiter_pattern = /\s+/;
            //Array with RGB colors
            var color : number[];
            //New material
            //var material : BABYLON.StandardMaterial;

            //Look at each line
            //for(var [line, i] of lines){
                lines.forEach((line, i) => {
                line = line.trim();

                // Blank line or comment
                if (line.length === 0 || line.charAt(0) === '#') {
                    //continue;
                    return;
                }

                //Get the first parameter (keyword)
                var pos = line.indexOf(' ');
                var key = (pos >= 0) ? line.substring(0, pos) : line;
                key = key.toLowerCase();

                //Get the data following the key
                var value : any = (pos >= 0) ? line.substring(pos + 1) : "";
                value = value.trim();

                //This mtl keyword will create the new material
                if (key === "newmtl") {
                    ////Check if it is the first material.
                    //// Materials specifications are described after this keyword.
                    //if (material){
                    //    //Add the previous material in the material array.
                    //    this.materials.push(material);
                    //}

                    this._currentMaterial = MaterialModel.create();

                    this._currentMaterial.name = value;

                    this.materials.addChild(this._currentMaterial);
                    ////Create a new material.
                    //// value is the name of the material read in the mtl file
                    //material = new BABYLON.StandardMaterial(value, scene);
                } else if (key === "kd") {
                    // Diffuse color (color under white light) using RGB values

                    //value  = "r g b"
                    //color = <number[]> value.split(delimiter_pattern, 3);
                    //color = [r,g,b]
                    //Set tghe color into the material
                    //material.diffuseColor = BABYLON.Color3.FromArray(color);
                    this._setColor(this._currentMaterial.diffuseColor, value.split(delimiter_pattern, 3));
                } else if (key === "ka") {
                    // Ambient color (color under shadow) using RGB values

                    //this._setColor(this._currentMaterial.ambientColor, value.split(delimiter_pattern, 3));

                    ////value = "r g b"
                    //color = <number[]> value.split(delimiter_pattern, 3);
                    ////color = [r,g,b]
                    ////Set tghe color into the material
                    //material.ambientColor = BABYLON.Color3.FromArray(color);

                    //todo supported

                } else if (key === "ks") {
                    // Specular color (color when light is reflected from shiny surface) using RGB values
                    //
                    ////value = "r g b"
                    //color = <number[]> value.split(delimiter_pattern, 3);
                    ////color = [r,g,b]
                    ////Set the color into the material
                    //material.specularColor = BABYLON.Color3.FromArray(color);

                    this._setColor(this._currentMaterial.specularColor, value.split(delimiter_pattern, 3));
                } else if (key === "ns") {

                    //value = "Integer"
                    //material.specularPower = value;

                    this._currentMaterial.shininess = parseFloat(value);
                } else if (key === "d") {
                    //d is dissolve for current material. It mean alpha for BABYLON
                    //material.alpha = value;

                    this._currentMaterial.alpha = parseFloat(value);
                    //Texture
                    //This part can be improved by adding the possible options of texture
                }

                else if (key === "map_ka") {
                    // ambient texture map with a loaded image
                    //We must first get the folder of the image
                    //todo supported
                }
                else if (key === "map_kd") {
                    // Diffuse texture map with a loaded image
                    //material.diffuseTexture = new BABYLON.Texture(rootUrl + value, scene);


                    this._currentMaterial.diffuseMapUrl = value;
                } else if (key === "map_ks") {
                    // Specular texture map with a loaded image
                    //We must first get the folder of the image
                    //material.specularTexture = new BABYLON.Texture(rootUrl + value, scene);


                    this._currentMaterial.specularMapUrl = value;
                } else if (key === "map_ns") {
                    //Specular
                    //Specular highlight component
                    //We must first get the folder of the image
                    //
                    //todo supported
                } else if (key === "map_bump") {
                    //The bump texture
                    //material.bumpTexture = new BABYLON.Texture(rootUrl + value, scene);

                    this._currentMaterial.bumpMapUrl = value;
                } else if (key === "map_d") {
                    // The dissolve of the material

                    //todo supported


                    //Options for illumination
                } else if (key === "illum") {
                    //todo supported

                    //Illumination
                    if (value === "0") {
                        //That mean Kd == Kd
                    } else if (value === "1") {
                        //Color on and Ambient on
                    } else if (value === "2") {
                        //Highlight on
                    } else if (value === "3") {
                        //Reflection on and Ray trace on
                    } else if (value === "4") {
                        //Transparency: Glass on, Reflection: Ray trace on
                    } else if (value === "5") {
                        //Reflection: Fresnel on and Ray trace on
                    } else if (value === "6") {
                        //Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
                    } else if (value === "7") {
                        //Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
                    } else if (value === "8") {
                        //Reflection on and Ray trace off
                    } else if (value === "9") {
                        //Transparency: Glass on, Reflection: Ray trace off
                    } else if (value === "10") {
                        //Casts shadows onto invisible surfaces
                    }
                } else {
                    Log.log(`Unhandled expression at line : ${i}\nvalue:${line}`);
                }
            });


            //At the end of the file, add the last material
            //this.materials.push(material);
        }

        private _setColor(targetColor:Color, colorStrArr:Array<string>){
            targetColor.r = parseFloat(colorStrArr[0]);
            targetColor.g = parseFloat(colorStrArr[1]);
            targetColor.b = parseFloat(colorStrArr[2]);

        }
    }

    export class MaterialModel{
        public static create() {
            var obj = new this();

            return obj;
        }

        public name:string = null;
        public diffuseColor:Color = null;
        public specularColor:Color = null;
        //public ambientColor:Color = null;
        public alpha:number = null;
        public shininess:number = null;
        public diffuseMapUrl:string = null;
        public diffuseMap:Texture = null;
        public specularMapUrl:string = null;
        public specularMap:Texture = null;
        public bumpMapUrl:string = null;
        public bumpMap:Texture = null;
    }
}
