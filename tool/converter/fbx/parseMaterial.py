from fbx import *
from helper import *

def parseMaterial(mesh, meshData, output):
    node = mesh.GetNode()

    materialDatas = {}
    output["materials"] = materialDatas

    textureDatas = {}
    output["textures"] = textureDatas

    imageDatas = {}
    output["images"] = imageDatas

    samplerDatas = {}
    output["samplers"] = samplerDatas

    if node:
        materialCount = node.GetMaterialCount()

        # TODO support multi materials
        if materialCount > 1:
            print ("not support multi materials! only use the first material")

    # for i in range(materialCount):
        material = node.GetMaterial(0)
        materialId = getMaterialId(material)

        #Get the implementation to see if it's a hardware shader.
        implementation = GetImplementation(material, "ImplementationHLSL")
        implementation_type = "HLSL"

        if not implementation:
                          implementation = GetImplementation(material, "ImplementationCGFX")
                          implementation_type = "CGFX"

        # output = None
        # material_params = None
        # material_type = None

        if implementation:
                      # TODO support shader material
                      print("not support Shader materials")

        elif material.GetClassId().Is(FbxSurfacePhong.ClassId):
            _addMaterialDataToMesh(materialId, meshData)
            materialData = {}
            materialDatas[materialId] = materialData
            _parsePhongMaterial(material, materialData, textureDatas, samplerDatas, imageDatas)
        elif material.GetClassId().Is(FbxSurfaceLambert.ClassId):
            _addMaterialDataToMesh(materialId, meshData)
            materialData = {}
            materialDatas[materialId] = materialData
            _parseLambertMaterial(material, materialData, textureDatas, samplerDatas, imageDatas)

        else:
            print ("Unknown type of Material"), materialId


def _addMaterialDataToMesh(materialId, meshData):
    primitiveData = meshData["primitives"][0]

    primitiveData["material"] = materialId
    # TODO parse material mode
    primitiveData["mode"] = 4


def _parseLambertMaterial(material, materialData, textureDatas, samplerDatas, imageDatas):
    materialData["technique"] = "LAMBERT"

    valueData = {}
    materialData["values"] = valueData

    _parseMaterial(material, valueData, materialData, textureDatas, samplerDatas, imageDatas)



def _parsePhongMaterial(material, materialData, textureDatas, samplerDatas, imageDatas):
    materialData["technique"] = "PHONG"

    valueData = {}
    materialData["values"] = valueData



    specular = material.Specular.Get()
    specular = [specular[0], specular[1], specular[2]]


    shininess = material.Shininess.Get()

    # reflective = material.ReflectionFactor.Get()


    valueData["specular"] = specular
    valueData["shininess"] = shininess
    # valueData["reflective"] = reflective

    _parseMaterial(material, valueData, materialData, textureDatas, samplerDatas, imageDatas)



def _parseMaterial(material, valueData, materialData, textureDatas, samplerDatas, imageDatas):
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

    diffuse = material.Diffuse.Get()
    diffuse = [diffuse[0], diffuse[1], diffuse[2]]

    emissive = material.Emissive.Get()
    emissive = [emissive[0], emissive[1], emissive[2]]



    # valueData["ambient"] = ambient
    valueData["diffuse"] = diffuse
    valueData["emission"] = emissive

    _parseTexture(material, valueData, textureDatas, samplerDatas, imageDatas)



def _parseTexture(material, valueData, textureDatas, samplerDatas, imageDatas):
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
                            parseTextureForMaterialAndAddTextureData(texture, material_property, valueData, textureDatas, samplerDatas, imageDatas)
            else:
                # no layered texture simply get on the property
                texture_count = material_property.GetSrcObjectCount(FbxCriteria.ObjectType(FbxTexture.ClassId))
                for j in range(texture_count):
                    texture = material_property.GetSrcObject(FbxCriteria.ObjectType(FbxTexture.ClassId),j)
                    if texture:
                        # TODO finish
                        # textureId = getTextureId(texture, True)
                        # material_params[binding_types[str(material_property.GetName())]] = textureId
                        parseTextureForMaterialAndAddTextureData(texture, material_property, valueData, textureDatas, samplerDatas, imageDatas)


def parseTextureForMaterialAndAddTextureData(texture, material_property, valueData, textureDatas, samplerDatas, imageDatas):
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

    if mapStr and valueData[mapStr]:
        valueData[mapStr] = textureId

        addTextureData(textureId, texture, textureDatas, samplerDatas, imageDatas)

    else:
        print ("not support %s" % mapStr)

def addTextureData(id, texture, textureDatas, samplerDatas, imageDatas):
    if textureDatas.get(id, None) != None:
        return

    textureData = {}

    textureDatas[id] = textureData

    # TODO parse cube map texture
    textureData["target"] = 3553

    # TODO parse format,internalFormat,type

    if type(texture) is FbxFileTexture:
        samplerId = getSamplerId(id)
        imageId = getImageId(id)
        textureData["sampler"] = samplerId
        textureData["source"] = imageId
        addSamplerData(samplerDatas, samplerId, texture)
        addImageData(imageDatas, imageId, texture)


    # TODO support procedural texture
    elif type(texture) is FbxProceduralTexture:
        print ("not support procedural texture")
        return

def addSamplerData(samplerDatas, id, texture):
    if samplerDatas.get(id, None) != None:
        return

    wrap_u = texture.GetWrapModeU()
    wrap_v = texture.GetWrapModeV()
    repeatRegion = [texture.GetTranslationU(), texture.GetTranslationV(), texture.GetScaleU(), texture.GetScaleV()]

    samplerDatas[id] = {
        "name": id,
        "wrapS": _getWrap(wrap_u),
        "wrapT": _getWrap(wrap_v),
        "repeatRegion": repeatRegion
    }


def _getWrap(wrapValue):
    if wrapValue == 0:
        return 10497
    elif wrapValue == 1:
        return 33071


def addImageData(imageDatas, id, texture):
    if imageDatas.get(id, None) != None:
        return

    uri = texture.GetRelativeFileName()

    if uri == "":
        uri = texture.GetFileName()
        index = uri.rfind( '/' )
        if index == -1:
            index = uri.rfind( '\\' )

        uri = uri[ index+1 : len(uri) ]


    imageDatas[id] = {
        "name": id,
        "uri": uri
    }



