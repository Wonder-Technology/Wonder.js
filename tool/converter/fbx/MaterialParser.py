from fbx import *
from helper import *

class MaterialParser(object):
    def __init__(self, output, fileUrl):
        self._output = output
        self._fileUrl = fileUrl

    def parse(self, mesh, meshData):
        node = mesh.GetNode()

        if node:
            materialCount = node.GetMaterialCount()

            # TODO support multi materials
            if materialCount > 1:
                print ("not support multi materials! only use the first material")

            if materialCount == 0:
                return

            # for i in range(materialCount):
            material = node.GetMaterial(0)
            materialId = getMaterialId(material)

            #Get the implementation to see if it's a hardware shader.
            implementation = GetImplementation(material, "ImplementationHLSL")
            implementation_type = "HLSL"

            if not implementation:
                implementation = GetImplementation(material, "ImplementationCGFX")
                implementation_type = "CGFX"

            # self._output = None
            # material_params = None
            # material_type = None

            if implementation:
                # TODO support shader material
                print("not support Shader materials")

            elif material.GetClassId().Is(FbxSurfacePhong.ClassId):
                self._addMaterialDataToMesh(materialId, meshData)
                materialData = {}
                self._output["materials"][materialId] = materialData
                # print ("materialId %s" % materialId, materialDatas)
                self._parsePhongMaterial(material, materialData)
            elif material.GetClassId().Is(FbxSurfaceLambert.ClassId):
                self._addMaterialDataToMesh(materialId, meshData)
                materialData = {}
                # materialDatas[materialId] = materialData
                self._output["materials"][materialId] = materialData
                self._parseLambertMaterial(material, materialData)
            else:
                print ("Unknown type of Material"), materialId


    def _addMaterialDataToMesh(self, materialId, meshData):
        primitiveData = meshData["primitives"][0]

        primitiveData["material"] = materialId
        # TODO parse material mode
        primitiveData["mode"] = 4



    def _parseLambertMaterial(self, material, materialData):
        materialData["technique"] = "LAMBERT"

        valueData = {}
        materialData["values"] = valueData

        self._parseMaterial(material, valueData, materialData)


    def _parsePhongMaterial(self, material, materialData):
        materialData["technique"] = "PHONG"

        valueData = {}
        materialData["values"] = valueData


        self._setMaterialProperty(material.Specular.Get(), material.SpecularFactor.Get(), valueData, "specular")

        # specular = material.Specular.Get()
        # specular = [specular[0], specular[1], specular[2]]


        # _setMaterialProperty(material, FbxSurfaceMaterial.sSpecular, FbxSurfaceMaterial.sSpecularFactor, valueData, "specular")

        shininess = material.Shininess.Get()
        # shininess = material.FindProperty(FbxSurfaceMaterial.sShininess)

        # if shininess.IsValid():
        shininess *= 12
        valueData["shininess"] = shininess

        # reflective = material.ReflectionFactor.Get()


        # valueData["specular"] = specular
        # valueData["shininess"] = shininess
        # valueData["reflective"] = reflective

        self._parseMaterial(material, valueData, materialData)



    def _parseMaterial(self, material, valueData, materialData):
        setName(material, materialData)

        # TODO support parse side
        # materialData["doubleSided"]

        transparency = 1.0 - material.TransparencyFactor.Get()

        transparency = 1.0 if transparency == 0 else transparency

        materialData["transparency"] = transparency

        if transparency < 1.0:
            materialData["transparenct"] = True
        else:
            materialData["transparenct"] = False

        # ambient = material.Ambient.Get()
        # ambient = [ambient[0], ambient[1], ambient[2]]

        # _setMaterialProperty(material, FbxSurfaceMaterial.sDiffuse, FbxSurfaceMaterial.sDiffuseFactor, valueData, "diffuse")
        self._setMaterialProperty(material.Diffuse.Get(), material.DiffuseFactor.Get(), valueData, "diffuse")


        self._setMaterialProperty(material.Emissive.Get(), material.EmissiveFactor.Get(), valueData, "emission")

        # diffuse = material.Diffuse.Get()
        # diffuse = [diffuse[0], diffuse[1], diffuse[2]]
        #
        # emissive = material.Emissive.Get()
        # emissive = [emissive[0], emissive[1], emissive[2]]



        # valueData["ambient"] = ambient
        # valueData["diffuse"] = diffuse
        # valueData["emission"] = emissive

        self._parseTexture(material, valueData)



    def _setMaterialProperty(self, property,factor, valueData, name):
        # property = material.FindProperty(propertyName)
        # factorProperty = material.FindProperty(factorPropertyName)

        # if property.IsValid():
        # result = property.Get()
        result = property

        # if factorProperty.IsValid():
        # factor = factorProperty.Get()
        # factor = factorProperty

        result = [result[0], result[1], result[2]]

        if factor != 1:
            result[0] *= factor
            result[1] *= factor
            result[2] *= factor

        # print (dir(result))
        valueData[name] = result


    def _parseTexture(self, material, valueData):
        texture_count = FbxLayerElement.sTypeTextureCount()

        for texture_index in range(texture_count):
            material_property = material.FindProperty(FbxLayerElement.sTextureChannelNames(texture_index))

            if material_property.IsValid():
                #Here we have to check if it's layeredtextures, or just textures:
                layered_texture_count = material_property.GetSrcObjectCount(FbxCriteria.ObjectType(FbxLayeredTexture.ClassId))
                if layered_texture_count > 0:
                    for j in range(layered_texture_count):
                        layered_texture = material_property.GetSrcObject(FbxCriteria.ObjectType(FbxLayeredTexture.ClassId), j)
                        texture_count = layered_texture.GetSrcObjectCount(FbxCriteria.ObjectType(FbxTexture.ClassId))
                        for k in range(texture_count):
                            texture = layered_texture.GetSrcObject(FbxCriteria.ObjectType(FbxTexture.ClassId),k)
                            if texture:
                                # textureId = getTextureId(texture, True)
                                # material_params[binding_types[str(material_property.GetName())]] = textureId
                                self._parseTextureForMaterialAndAddTextureData(texture, material_property, valueData)
                else:
                    # no layered texture simply get on the property
                    texture_count = material_property.GetSrcObjectCount(FbxCriteria.ObjectType(FbxTexture.ClassId))
                    for j in range(texture_count):
                        texture = material_property.GetSrcObject(FbxCriteria.ObjectType(FbxTexture.ClassId),j)
                        if texture:
                            # TODO finish
                            # textureId = getTextureId(texture, True)
                            # material_params[binding_types[str(material_property.GetName())]] = textureId
                            self._parseTextureForMaterialAndAddTextureData(texture, material_property, valueData)



    def _parseTextureForMaterialAndAddTextureData(self, texture, material_property, valueData):
        binding_types = {
            "DiffuseColor": "diffuse",
            # "DiffuseFactor": "diffuseFactor",
            "EmissiveColor": "emission",
            # "EmissiveFactor": "emissiveFactor",
            "AmbientColor": "lightMap", # "ambientMap",
            # "AmbientFactor": "ambientFactor",
            "SpecularColor": "specular",
            # "SpecularFactor": "specularFactor",
            # "ShininessExponent": "shininessExponent",
            "NormalMap": "normalMap",
            # "Bump": "bumpMap",
            "Bump": "normalMap",
            # "ReflectionColor": "reflective",
            # "ReflectionFactor": "reflectionFactor",
            # TODO support reflectionMap, transparentMap(aoMap?),displacementMap,vectorDisplacementMap
            # "TransparentColor": "transparentMap",
            # "TransparencyFactor": "transparentFactor",
            # "DisplacementColor": "displacementMap",
            # "VectorDisplacementColor": "vectorDisplacementMap"
        }


        textureId = getTextureId(texture, True)

        mapStr = binding_types[str(material_property.GetName())]

        # print (mapStr, valueData)
        # if mapStr and valueData[mapStr]:
        if mapStr:
            valueData[mapStr] = textureId

            self._addTextureData(textureId, texture)

        else:
            print ("not support %s" % mapStr)


    def _addTextureData(self, id, texture):
        output = self._output

        if output["textures"].get(id, None) != None:
            return

        textureData = {}

        output["textures"][id] = textureData

        # TODO parse cube map texture
        textureData["target"] = 3553

        # TODO parse format,internalFormat,type

        if type(texture) is FbxFileTexture:
            samplerId = getSamplerId(id)
            imageId = getImageId(id)
            textureData["sampler"] = samplerId
            textureData["source"] = imageId
            self._addSamplerData(samplerId, texture)
            self._addImageData(imageId, texture)


        # TODO support procedural texture
        elif type(texture) is FbxProceduralTexture:
            print ("not support procedural texture")
            return




    def _addSamplerData(self, id, texture):
        output = self._output

        if output["samplers"].get(id, None) != None:
            return

        wrap_u = texture.GetWrapModeU()
        wrap_v = texture.GetWrapModeV()

        # TODO support texture rotation
        repeatRegion = [texture.GetTranslationU(), texture.GetTranslationV(), texture.GetScaleU(), texture.GetScaleV()]

        # print (id, texture.GetUVTranslation(), texture.GetScale())

        output["samplers"][id] = {
            "name": id,
            "wrapS": self._getWrap(wrap_u),
            "wrapT": self._getWrap(wrap_v),
            "repeatRegion": repeatRegion
        }


    def _getWrap(self, wrapValue):
        if wrapValue == 0:
            return 10497
        elif wrapValue == 1:
            return 33071


    def _addImageData(self, id, texture):
        output = self._output

        if output["images"].get(id, None) != None:
            return

        # uri = texture.GetRelativeFileName()

        # uri = getBaseName(texture.GetFileName())

        absoluteUrl = texture.GetFileName()

        relativeUrl = texture.GetRelativeFileName()

        uri = None

        if relativeUrl != "" and relativeUrl != absoluteUrl:
            uri = relativeUrl
        else:
            uri = getRelativeUrl(absoluteUrl, self._fileUrl)

        output["images"][id] = {
            "name": id,
            "uri": uri
        }



