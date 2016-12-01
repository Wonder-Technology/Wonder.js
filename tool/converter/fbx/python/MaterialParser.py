from fbx import *
from utils import *

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
                print ("no material")
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

            if implementation:
                # TODO support shader material
                print("not support Shader materials")

            elif material.GetClassId().Is(FbxSurfacePhong.ClassId):
                self._addMaterialDataToMesh(materialId, meshData)
                materialData = {}
                self._output["materials"][materialId] = materialData
                self._parsePhongMaterial(material, materialData)
            elif material.GetClassId().Is(FbxSurfaceLambert.ClassId):
                self._addMaterialDataToMesh(materialId, meshData)
                materialData = {}
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

        shininess = material.Shininess.Get()

        shininess *= 12
        valueData["shininess"] = shininess

        self._parseMaterial(material, valueData, materialData)



    def _parseMaterial(self, material, valueData, materialData):
        setName(material, materialData)

        # TODO support parse side
        # materialData["doubleSided"]

        transparency = 1.0 - material.TransparencyFactor.Get()

        transparency = 1.0 if transparency == 0 else transparency

        materialData["transparency"] = transparency

        if transparency < 1.0:
            materialData["transparent"] = True
        else:
            materialData["transparent"] = False

        self._setMaterialProperty(material.Diffuse.Get(), material.DiffuseFactor.Get(), valueData, "diffuse")


        self._setMaterialProperty(material.Emissive.Get(), material.EmissiveFactor.Get(), valueData, "emission")

        self._parseTexture(material, valueData)



    def _setMaterialProperty(self, property,factor, valueData, name):
        result = property

        result = [result[0], result[1], result[2]]

        if factor != 1:
            result[0] *= factor
            result[1] *= factor
            result[2] *= factor

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
                                self._parseTextureForMaterialAndAddTextureData(texture, material_property, valueData)
                else:
                    # no layered texture simply get on the property
                    texture_count = material_property.GetSrcObjectCount(FbxCriteria.ObjectType(FbxTexture.ClassId))
                    for j in range(texture_count):
                        texture = material_property.GetSrcObject(FbxCriteria.ObjectType(FbxTexture.ClassId),j)
                        if texture:
                            self._parseTextureForMaterialAndAddTextureData(texture, material_property, valueData)



    def _parseTextureForMaterialAndAddTextureData(self, texture, material_property, valueData):
        binding_types = {
            "DiffuseColor": "diffuse",
            "EmissiveColor": "emission",
            "AmbientColor": "lightMap", # "ambientMap",
            "SpecularColor": "specular",
            "NormalMap": "normalMap",
            "Bump": "normalMap",
            # TODO support reflectionMap, transparentMap(aoMap?),displacementMap,vectorDisplacementMap
        }


        textureId = getTextureId(texture, True)

        mapStr = binding_types[str(material_property.GetName())]

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

        isPremultipliedAlpha = texture.PremultiplyAlpha.Get()

        wrap_u = texture.GetWrapModeU()
        wrap_v = texture.GetWrapModeV()

        # TODO support texture rotation
        repeatRegion = [roundUtil(texture.GetTranslationU()), roundUtil(texture.GetTranslationV()), roundUtil(texture.GetScaleU()), roundUtil(texture.GetScaleV())]

        output["samplers"][id] = {
            "name": id,
            "isPremultipliedAlpha": isPremultipliedAlpha,
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

        absoluteUrl = texture.GetFileName()

        relativeUrl = texture.GetRelativeFileName()

        uri = None

        if relativeUrl != "" and relativeUrl != absoluteUrl:
            uri = relativeUrl
        else:
            uri = getRelativeUrl(absoluteUrl, self._fileUrl)


        output["images"][id] = {
            "name": id,
            "uri": uri.replace( "\\", "/" )
        }



