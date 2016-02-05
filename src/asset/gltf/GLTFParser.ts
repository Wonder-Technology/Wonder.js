module wd{
    declare var ArrayBuffer:any;

    export class GLTFParser{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _data:IGLTFParseData = <any>{};
        private _arrayBufferMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _imageMap:wdCb.Hash<HTMLImageElement> = wdCb.Hash.create<HTMLImageElement>();
        private _json:IGLTFJsonData = null;

        public parse(json:IGLTFJsonData):IGLTFParseData{
            this._json = json;

            if(json.asset){
                this._parseMetadata();
            }

            this._parseObjects();

            return this._data;
        }

        public createLoadAllAssetsStream(url:string, json:IGLTFJsonData):wdFrp.Stream{
            return wdFrp.fromArray([
                    this._createLoadBuffersStream(url, json),
                    this._createLoadImageAssetStream(url, json)
                ])
                .mergeAll();
        }

        private _parseMetadata(){
            var metadata = <any>{},
                json = this._json;

            for(let i in json.asset){
                if(json.asset.hasOwnProperty(i)){
                    metadata[i] = json.asset[i];
                }
            }

            this._data.metadata = metadata;
        }

        private _parseObjects(){
            var self = this,
                json = this._json,
                objects = wdCb.Collection.create<IGLTFObjectData>();
            var parse = (node:IGLTFNode) => {
                var object:IGLTFObjectData = self._createObjectData();

                if(node.name){
                    object.name = node.name;
                }

                if(node.meshes && node.meshes.length > 0){
                    let mesh:IGLTFMesh = null;

                    if(node.meshes.length > 1){
                        Log.warn(Log.info.FUNC_NOT_SUPPORT("multi mesh(geometry), just use the first mesh(geometry)"));
                    }

                    mesh = json.meshes[node.meshes[0]];

                    if(mesh.name){
                        object.name = mesh.name;
                    }

                    self._parseGeometrys(object, mesh);
                }

                if(node.extensions){
                    if(node.extensions["KHR_materials_common"] && node.extensions["KHR_materials_common"].light){
                        object.components.addChild(self._parseLight(node.extensions["KHR_materials_common"].light));
                    }
                }

                if(node.camera){
                        object.components.addChild(self._parseCamera(node.camera));
                }

                if(node.matrix){
                    object.components.addChild(self._parseTransform(node.matrix));
                }
                else if(node.rotation && node.scale && node.translation){
                    object.components.addChild(self._parseTransform(node.translation, node.rotation, node.scale));
                }

                if(node.children){
                    for(let child of node.children){
                        object.children.addChild(parse(json.nodes[child]));
                    }
                }

                return object;
            }

            if(!json.scenes[json.scene]){
                this._data.objects = objects;

                return;
            }

            for(let nodeId of json.scenes[json.scene].nodes){
                objects.addChild(parse(json.nodes[nodeId]));
            }

            this._data.objects = objects;
        }

        private _parseGeometrys(object:IGLTFObjectData, mesh:IGLTFMesh){
            var json = this._json;
            //if mesh->primitives has multi ones, the primitives should be children of the node(one primitive is one child)

            //not use mesh.name

            if(mesh.primitives.length > 1){
                for(let primitive of mesh.primitives){
                    let childObject:IGLTFObjectData = this._createObjectData();

                    this._setChildObjectNameWithMultiPrimitives(childObject, primitive);

                    childObject.components.addChild(this._parseGeometry(primitive));

                    object.children.addChild(childObject);
                }

                //todo refactor?
                object.isContainer = true;
            }
            else{
                object.components.addChild(this._parseGeometry(mesh.primitives[0]));
            }
        }

        private _setChildObjectNameWithMultiPrimitives(object:IGLTFObjectData, primitive:IGLTFMeshPrimitive){
            object.name = primitive.material;
        }

        private _createObjectData(){
            return {
                isContainer: false,

                components:wdCb.Collection.create<IGLTFComponent>(),
                children: wdCb.Collection.create<IGLTFObjectData>()
            }
        }

        private _parseGeometry(primitive:IGLTFMeshPrimitive):IGLTFGeometry{
            var json = this._json,
                accessor:IGLTFAccessor = null,
                bufferArr:any = null,
                geometry:IGLTFGeometry = <any>{},
                vertices:Array<number> = null,
                texCoords:Array<number> = null,
                colors:Array<number> = null,
                normals:Array<number> = null,
                //indices:Array<number> = null,
                faces:Array<Face3> = null;


            //todo read accessor->byteStride for batch draw calls

            for(let semantic in primitive.attributes){
                if(primitive.attributes.hasOwnProperty(semantic)){
                    let attribute = primitive.attributes[semantic];

                    accessor = json.accessors[attribute];
                    bufferArr = this._getBufferArrFromAccessor(json, accessor);

                    if(semantic === "POSITION"){
                        vertices = [];

                        this._addGeometryData(vertices, bufferArr);
                    }
                    else if(semantic.indexOf("TEXCOORD_") > -1){
                        texCoords = [];

                        this._addGeometryData(texCoords, bufferArr);

                        this._normalizeTexCoords(texCoords);
                    }
                    else if(semantic === "NORMAL"){
                        normals = [];

                        for(let data of bufferArr){
                            normals.push(data);
                        }
                    }
                    else if(semantic === "COLOR"){
                        colors = [];

                        this._addGeometryData(colors, bufferArr);
                    }
                    //todo support JOINT, WEIGHT
                }
            }


            faces = this._getFaces(json, primitive.indices, normals);


            this._addData(geometry, "vertices", vertices);
            this._addData(geometry, "colors", colors);
            this._addData(geometry, "texCoords", texCoords);
            this._addData(geometry, "faces", faces);

            this._addData(geometry, "drawMode", this._parseDrawMode(primitive.mode));

            geometry.material = this._parseMaterial(primitive.material);

            return geometry;
        }

        private _addGeometryData(geometryData:Array<number>, sourceData:Array<number>){
            for(let i = 0, len = sourceData.length; i < len; i++){
                geometryData.push(sourceData[i]);
            }
        }

        private _parseMaterial(materialId:string):IGLTFMaterial{
            var json = this._json,
                materialData = null,
                materialExtension = null;

            if(!this._isUseKHRMaterialExtension()){
                Log.log("no KHR_materials_common extension found, will use default material instead");

                let material:IGLTFBasicMaterial = {
                    type:"BasicMaterial",

                    doubleSided:false
                };

                return material;
            }

            let material:IGLTFLightMaterial = <any>{};

            materialData = json.materials[materialId];

            Log.error(!materialData.extensions || !materialData.extensions.KHR_materials_common, Log.info.FUNC_SHOULD("materials", "define KHR_materials_common extensions"));

            materialExtension = materialData.extensions.KHR_materials_common;

            this._addData(material, "doubleSided", materialExtension.doubleSided);
            this._addData(material, "transparent", materialExtension.transparent);
            this._addData(material, "opacity", materialExtension.transparency);

            //todo parse jointCount

            //todo support functions

            material.type = this._getMaterialType(materialExtension.technique);

            material.lightModel = this._getLightModel(materialExtension.technique);

            this._addMaterialExtensionValues(material, materialExtension.values);


            return material;
        }

        private _isUseKHRMaterialExtension(){
            var extensionsUsed = this._json.extensionsUsed;

            if(!extensionsUsed){
                return false;
            }

            return extensionsUsed.indexOf("KHR_materials_common") > -1;
        }

        private _getMaterialType(technique:string){
            var type:string = null;

            switch (technique){
                case "PHONG":
                case "BLINN":
                case "CONSTANT":
                case "LAMBERT":
                    type = "LightMaterial";
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`technique:${technique}`));
                    break;
            }

            return type;
        }

        private _getLightModel(technique:string){
            var model:LightModel = null;

            switch (technique){
                case "PHONG":
                    model = LightModel.PHONG;
                    break;
                case "BLINN":
                    model = LightModel.BLINN;
                    break;
                case "CONSTANT":
                    model = LightModel.CONSTANT;
                    break;
                case "LAMBERT":
                    model = LightModel.LAMBERT;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`technique:${technique}`));
                    break;
            }

            return model;
        }

        private _addMaterialExtensionValues(material:IGLTFLightMaterial, values:any){
            if(!values){
                return;
            }

            if(values.ambient){
                Log.warn(Log.info.FUNC_NOT_SUPPORT("ambient of material"));
            }

            this._addMaterialLightColor(material, "diffuse", values.diffuse);
            this._addMaterialLightColor(material, "specular", values.specular);
            this._addMaterialLightColor(material, "emission", values.emission);

            if(values.shininess){
                material.shininess = values.shininess.value;
            }
        }

        private _addMaterialLightColor(material:IGLTFMaterial, colorName:string, colorData:{type;value}){
            if(colorData){
                if(this._isColor(colorData.type)){
                    material[`${colorName}Color`] = this._getColor(colorData.value);
                }
                else{
                    material[`${colorName}Map`] = this._getTexture(colorData.value);
                }
            }
        }

        private _isColor(type:number){
            return Number(type) === 35666;
        }

        private _getColor(value:Array<number>){
            var color = Color.create();

            color.r = Number(value[0]);
            color.g = Number(value[1]);
            color.b = Number(value[2]);

            if(value.length === 4){
                color.a = Number(value[3]);
            }

            return color;
        }

        @require(function(textureId:string){
            assert(!!this._json.textures[textureId], Log.info.FUNC_NOT_EXIST(`textureId:${textureId}`));
        })
        private _getTexture(textureId:string):Texture{
            var texture = this._json.textures[textureId],
                asset:TextureAsset = null;

            asset = this._createTextureAsset(texture.target, texture.source);


            if(texture.internalFormat !== texture.format){
                Log.warn(`texture.internalFormat(${texture.internalFormat}) !== texture.format(${texture.format}), here take texture.format value as their value`);
            }

            if(texture.format){
                asset.format = this._getTextureFormat(texture.format);
            }

            if(texture.type){
                asset.type = this._getTextureType(texture.type);
            }

            this._addTextureSampler(asset, texture.sampler);

            return asset.toTexture();
        }

        private _createTextureAsset(target:number, imageId:string){
            var asset:TextureAsset = null,
                source = this._imageMap.getChild(imageId);

            if(!source){
                Log.warn(`no image found in loader(id:${imageId})`);
            }

            switch (target){
                case 3553:
                    asset = ImageTextureAsset.create(source);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT("target except TEXTURE_2D"));
                    break;
            }

            return asset;
        }

        private _getTextureType(type:number){
            var textureType:TextureType = null;

            switch(type){
                case 5121:
                    textureType = TextureType.UNSIGNED_BYTE;
                    break;
                case 33635:
                    textureType = TextureType.UNSIGNED_SHORT_5_6_5;
                    break;
                case 32819:
                    textureType = TextureType.UNSIGNED_SHORT_4_4_4_4;
                    break;
                case 32820:
                    textureType = TextureType.UNSIGNED_SHORT_5_5_5_1;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture->type:${type}`));
                    break;
            }

            return textureType;
        }

        private _getTextureFormat(format:number){
            var textureFormat:TextureFormat = null;

            switch(format){
                case 6406:
                    textureFormat = TextureFormat.ALPHA;
                    break;
                case 6407:
                    textureFormat = TextureFormat.RGB;
                    break;
                case 6408:
                    textureFormat = TextureFormat.RGBA;
                    break;
                case 6409:
                    textureFormat = TextureFormat.LUMINANCE;
                    break;
                case 6410:
                    textureFormat = TextureFormat.LUMINANCE_ALPHA;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture->format:${format}`));
                    break;
            }

            return textureFormat;
        }

        @require(function(asset:TextureAsset, samplerId:string){
            assert(!!this._json.samplers[samplerId], Log.info.FUNC_NOT_EXIST(`samplerId:${samplerId}`));
        })
        private _addTextureSampler(asset:TextureAsset, samplerId:string){
            var sampler = this._json.samplers[samplerId];

            asset.wrapT = this._getTextureWrap(sampler.wrapT);
            asset.wrapS = this._getTextureWrap(sampler.wrapS);
            asset.minFilter = this._getTextureFilter(sampler.minFilter);
            asset.magFilter = this._getTextureFilter(sampler.magFilter);
        }

        private _getTextureFilter(filter:number){
            var textureFilter:TextureFilterMode = null;

            switch (filter){
                case 9728:
                    textureFilter = TextureFilterMode.NEAREST;
                    break;
                case 9729:
                    textureFilter = TextureFilterMode.LINEAR;
                    break;
                case 9984:
                    textureFilter = TextureFilterMode.NEAREST_MIPMAP_MEAREST;
                    break;
                case 9985:
                    textureFilter = TextureFilterMode.LINEAR_MIPMAP_NEAREST;
                    break;
                case 9986:
                    textureFilter = TextureFilterMode.NEAREST_MIPMAP_LINEAR;
                    break;
                case 9987:
                    textureFilter = TextureFilterMode.LINEAR_MIPMAP_LINEAR;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture filter:${filter}`));
                    break;
            }

            return textureFilter;
        }

        private _getTextureWrap(wrap:number){
            var textureWrap:TextureWrapMode = null;

            switch (wrap){
                case 33071:
                    textureWrap = TextureWrapMode.CLAMP_TO_EDGE;
                    break;
                case 33648:
                    textureWrap = TextureWrapMode.MIRRORED_REPEAT;
                    break;
                case 10497:
                    textureWrap = TextureWrapMode.REPEAT;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture wrap:${wrap}`));
                    break;
            }

            return textureWrap;
        }

        private _addData(target:Object, sourceName:string, sourceData:any){
            if(sourceData !== undefined && sourceData !== null){
                target[sourceName] = sourceData;
            }
        }

        @require(function(json:IGLTFJsonData, indices:string, normals:Array<number>){
            var accessor:IGLTFAccessor = null,
                bufferArr:any = null;

            if(!indices){
                return [];
            }

            accessor = json.accessors[indices];

            bufferArr = this._getBufferArrFromAccessor(json, accessor);

            assert(bufferArr.length % 3 === 0, Log.info.FUNC_SHOULD("indices' count", "3 times"));
        })
        private _getFaces(json:IGLTFJsonData, indices:string, normals:Array<number>){
            var accessor:IGLTFAccessor = null,
                bufferArr:any = null,
                face:Face3 = null,
                faces:Array<Face3> = [];

            if(!indices){
                return [];
            }

            accessor = json.accessors[indices];

            bufferArr = this._getBufferArrFromAccessor(json, accessor);

            for (let i = 0, len = bufferArr.length; i < len; i += 3) {
                let aIndex = bufferArr[i],
                    bIndex = bufferArr[i + 1],
                    cIndex = bufferArr[i + 2],
                    //indexArr = [i, i + 1, i + 2],
                    verticeIndiceArr = [aIndex, bIndex, cIndex];

                face = Face3.create(aIndex, bIndex, cIndex);

                //if (GeometryUtils.hasData(object.uvIndices) && GeometryUtils.hasData(objectUVs)) {
                //    this._setUV(uvs, objectUVs, object.uvIndices, indexArr, verticeIndiceArr);
                //}

                if (GeometryUtils.hasData(normals)) {
                    this._addNormalData(face.vertexNormals, normals, verticeIndiceArr);
                }

                faces.push(face);
            }

            return faces;
        }

        private _addNormalData(targetNormals:wdCb.Collection<Vector3>, sourceNormals:Array<number>, normalIndiceArr:Array<number>) {
            let [aIndex, bIndex, cIndex] = normalIndiceArr;

            targetNormals.addChildren(
                [
                    this._getThreeComponentData(sourceNormals, aIndex),
                    this._getThreeComponentData(sourceNormals, bIndex),
                    this._getThreeComponentData(sourceNormals, cIndex)
                ]
            );
        }

        private _getThreeComponentData(sourceData:Array<number>, index:number) {
            var startIndex = 3 * index;

            return Vector3.create(
                sourceData[startIndex],
                sourceData[startIndex + 1],
                sourceData[startIndex + 2]
            );
        }

        private _parseDrawMode(mode:number){
            var drawMode:DrawMode = null;

            if(!mode){
                return null;
            }

            switch(mode){
                case 0:
                    drawMode = DrawMode.POINTS;
                    break;
                case 1:
                    drawMode = DrawMode.LINES;
                    break;
                case 2:
                    drawMode = DrawMode.LINE_LOOP;
                    break;
                case 3:
                    drawMode = DrawMode.LINE_STRIP;
                    break;
                case 4:
                    drawMode = DrawMode.TRIANGLES;
                    break;
                case 5:
                    drawMode = DrawMode.TRIANGLE_STRIP;
                    break;
                case 6:
                    drawMode = DrawMode.TRANGLE_FAN;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`mode:${mode}`));
                    break;
            }

            return drawMode;
        }

        private _createLoadBuffersStream(filePath:string, json:IGLTFJsonData):wdFrp.Stream{
            var streamArr = [],
                id = null,
                buffer = null,
                self = this;

            for(id in json.buffers){
                if(json.buffers.hasOwnProperty(id)){
                    buffer = json.buffers[id];

                    if(this._isBase64(buffer.uri)){
                        this._arrayBufferMap.addChild(id, this._decodeArrayBuffer(buffer.uri));
                    }
                    else{
                        let url = ModelLoaderUtils.getPath(filePath, buffer.uri);

                        streamArr.push(
                            AjaxLoader.load(url, "arraybuffer")
                                .do((data:any) => {
                                    Log.error(!(data instanceof ArrayBuffer), Log.info.FUNC_SHOULD(`Buffer:${id}`, "be an array buffer"));
                                    Log.error(data.byteLength !== buffer.byteLength, Log.info.FUNC_SHOULD(`Buffer:${id}'s length is ${data.byteLength}, but it`, `be ${buffer.byteLength}`));

                                    self._arrayBufferMap.addChild(id, data);
                                })
                        );
                    }
                }
            }

            return wdFrp.fromArray(streamArr).mergeAll();
        }

        private _createLoadImageAssetStream(filePath:string, json:IGLTFJsonData):wdFrp.Stream{
            var streamArr = [],
                self = this;

            if(json.images){
                let id:string = null;

                for(id in json.images){
                    if(json.images.hasOwnProperty(id)){
                        let image = json.images[id];

                        if(this._isBase64(image.uri)){
                            this._imageMap.addChild(id, this._decodeArrayBuffer(image.uri));
                        }
                        else{
                            let url = ModelLoaderUtils.getPath(filePath, image.uri);

                            streamArr.push(
                                ImageLoader.load(url)
                                    .do((image:HTMLImageElement) => {
                                        self._imageMap.addChild(id, image);
                                    })
                            );
                        }
                    }
                }
            }

            return wdFrp.fromArray(streamArr).mergeAll();
        }

        ////todo support multi scenes?
        //private _parseScene(json:IGLTFJsonData){
        //    this._data.currentScene = json.scenes[json.scene];
        //}
        //
        //private _parseObject(name, data:Object){
        //    this._data[name] = data;
        //}
        //
        private _isBase64(uri: string): boolean{
            return uri.length < 5 ? false : uri.substr(0, 5) === "data:";
        }

        /**
         * Decode array buffer from base64
         */
        private _decodeArrayBuffer(base64Str: string){
            var base64 = base64Str.split(',')[1],
                decodedString = atob(base64),
                bufferLength = decodedString.length,
                arraybuffer = new Uint8Array(new ArrayBuffer(bufferLength));

            for (var i = 0; i < bufferLength; i++) {
                arraybuffer[i] = decodedString.charCodeAt(i);
            }

            return arraybuffer.buffer;
        }

        private _getBufferArrFromAccessor(json:IGLTFJsonData, accessor: IGLTFAccessor): any{
            var bufferView: IGLTFBufferView = json.bufferViews[accessor.bufferView];
            var arrayBuffer: any = this._arrayBufferMap.getChild(bufferView.buffer);

            var byteOffset = accessor.byteOffset + bufferView.byteOffset;
            var count = accessor.count * this._getAccessorTypeSize(accessor);

            switch (accessor.componentType) {
                case 5120:
                    return new Int8Array(arrayBuffer, byteOffset, count);
                case 5121:
                    return new Uint8Array(arrayBuffer, byteOffset, count);
                case 5122:
                    return new Int16Array(arrayBuffer, byteOffset, count);
                case 5123:
                    return new Uint16Array(arrayBuffer, byteOffset, count);
                case 5126:
                    return new Float32Array(arrayBuffer, byteOffset, count);
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`componentType:${accessor.componentType}`));
                    break;
            }
        }

        private _getAccessorTypeSize(accessor: IGLTFAccessor): number{
            var type = accessor.type;

            switch (type) {
                case "VEC2":
                    return 2;
                case "VEC3":
                    return 3;
                case "VEC4":
                    return 4;
                case "MAT2":
                    return 4;
                case "MAT3":
                    return 9;
                case "MAT4":
                    return 16;
                default:
                    return 1;
            }
        }

        private _normalizeTexCoords(texCoords:Array<number>){
            if (!texCoords) {
                return;
            }

            for (let i = 0, len = texCoords.length / 2; i < len; i++) {
                texCoords[i * 2 + 1] = 1.0 - texCoords[i * 2 + 1];
            }
        }

        @require(function(lightId:string){
            var lights = this._json.extensions["KHR_materials_common"].lights;
            assert(lights && lights[lightId], Log.info.FUNC_NOT_EXIST(`lightId:${lightId}`));
        })
        private _parseLight(lightId:string):IGLTFLight{
            var lightData = this._json.extensions["KHR_materials_common"].lights[lightId],
                light:IGLTFLight = <any>{};

            //todo intensity data?

            this._addData(light, "type", lightData.type);

            this._parseLightDataByType(light, lightData, light.type);

            return light;
        }

        private _parseLightDataByType(light:IGLTFLight, lightData:any, type:string){
            var data = lightData[type];

            switch (type){
                case "ambient":
                case "directional":
                    light.lightColor = this._getColor(data.color);
                    break;
                case "point":
                    light.lightColor = this._getColor(data.color);
                    this._addData(light, "distance", data.distance);
                    this._addData(light, "constantAttenuation", data.constantAttenuation);
                    this._addData(light, "linearAttenuation", data.linearAttenuation);
                    this._addData(light, "quadraticAttenuation", data.quadraticAttenuation);
                    break;
                    default:
                        //todo support spot
                    break;
            }
        }

        @require(function(cameraId:string){
            var cameras = this._json.cameras;
            assert(cameras && cameras[cameraId], Log.info.FUNC_NOT_EXIST(`cameraId:${cameraId}`));
        })
        private _parseCamera(cameraId:string):IGLTFCamera{
            var cameraData = this._json.cameras[cameraId],
                camera:IGLTFCamera = <any>{};

            //todo intensity data?

            this._parseCameraDataByType(camera, cameraData);

            return camera;
        }

        private _parseCameraDataByType(camera:IGLTFCamera, cameraData:any){
            var cameraComponent:any = null,
                type = cameraData.type,
                data:any = cameraData[type];

            switch (type){
                case "perspective":
                    data = cameraData[type];
                    cameraComponent = PerspectiveCamera.create();

                    cameraComponent.near = data.znear;
                    cameraComponent.far = data.zfar;

                    if(data.aspectRatio){
                        cameraComponent.aspect = data.aspectRatio;
                    }
                    else{
                        let view = DeviceManager.getInstance().view;

                        cameraComponent.aspect = view.width / view.height;
                    }

                    cameraComponent.fovy = data.yfov;

                    camera.camera = cameraComponent;
                    break;
                case "orthographic":
                    cameraComponent = OrthographicCamera.create();

                    cameraComponent.near = data.znear;
                    cameraComponent.far = data.zfar;
                    cameraComponent.left = -data.xmag;
                    cameraComponent.right = data.xmag;
                    cameraComponent.top = data.ymag;
                    cameraComponent.bottom = -data.ymag;

                    camera.camera = cameraComponent;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`camera type:${type}`));
                    break;
            }
        }

        private _parseTransform(matrix:Array<number>);
        private _parseTransform(translation:Array<number>, rotation:Array<number>, scale:Array<number>);

        private _parseTransform(...args){
            var transform:IGLTFTransform = <any>{};

            if(args.length === 1){
                let matrix:Array<number> = args[0];

                transform.matrix = Matrix4.create(new Float32Array(matrix));
            }
            else if(args.length === 3){
                let translation:Array<number> = args[0],
                    rotation:Array<number> = args[1],
                    scale:Array<number> = args[2];

                transform.position = Vector3.create(translation[0], translation[1], translation[2]);
                transform.rotation = Quaternion.create(rotation[0], rotation[1], rotation[2], rotation[3]);
                transform.scale = Vector3.create(scale[0], scale[1], scale[2]);
            }

            return transform;
        }
    }
}
