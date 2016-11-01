from fbx import *
from helper import *

import operator

def enum(**enums):
    return type('Enum', (), enums)

LayerKey = enum(TEXCOORD=1, NORMAL=2, COLOR=3)

def parsePrimitiveData(node):
    mesh = node.GetNodeAttribute()

    vertices, verticeIndices = getVerticeData(mesh)

    texCoords, texCoordIndices = getTexCoordData(mesh)

    normals, normalIndices = getNormalData(mesh)


    return {
        "attributes": {
            "POSITION": vertices,
            "NORMAL": normals,
            "COLOR": [  ],
            "TEXCOORD": texCoords
        },
        "verticeIndices": verticeIndices,
        "normalIndices":normalIndices,
        "texCoordIndices":texCoordIndices,
        "colorIndices":[]
    }




def convertVectorToList(vectorList):
    resultList = []

    count = len(vectorList)

    for i in range(count):
        data = vectorList[i]

        if(isinstance(data, FbxVector4)):
            resultList.append(data[0])
            resultList.append(data[1])
            resultList.append(data[2])
        elif(isinstance(data, FbxVector2)):
            resultList.append(data[0])
            resultList.append(data[1])
        else:
            raise AssertionError("not support data")

    return resultList

def getVertices(mesh):
    return convertVectorToList(mesh.GetControlPoints())


def getVerticeIndices(mesh):
    indices = []

    poly_count = mesh.GetPolygonCount()

    for poly_index in range(poly_count):
        poly_size = mesh.GetPolygonSize(poly_index)
        for vertex_index in range(poly_size):
            control_point_index = mesh.GetPolygonVertex(poly_index, vertex_index)
            indices.append(control_point_index)

    return indices


def getVerticeData(mesh):
    controlPoints = mesh.GetControlPoints()

    poly_count = mesh.GetPolygonCount()

    indices = []

    for p in range(poly_count):
        poly_size = mesh.GetPolygonSize(p)

        for v in range(poly_size):
            control_point_index = mesh.GetPolygonVertex(p, v)

            indices.append(control_point_index)

    return convertVectorToList(controlPoints), indices



def getTexCoordData(mesh):
    poly_count = mesh.GetPolygonCount()

    indices = []

    dict = {}

    value = None
    index = None

    for p in range(poly_count):
        poly_size = mesh.GetPolygonSize(p)

        for v in range(poly_size):
            control_point_index = mesh.GetPolygonVertex(p, v)
            for l in range(mesh.GetElementUVCount()):
                texCoordData = mesh.GetElementUV(l)

                mappingMode = texCoordData.GetMappingMode()
                referenceMode = texCoordData.GetReferenceMode()

                if mappingMode == FbxLayerElement.eByControlPoint:
                    if referenceMode == FbxLayerElement.eDirect:
                        index = control_point_index
                        value = texCoordData.GetDirectArray().GetAt(index)
                    elif referenceMode == FbxLayerElement.eIndexToDirect:
                        index = texCoordData.GetIndexArray().GetAt(control_point_index)
                        value = texCoordData.GetDirectArray().GetAt(index)
                elif mappingMode == FbxLayerElement.eByPolygonVertex:
                    index = mesh.GetTextureUVIndex(p, v)
                    if referenceMode == FbxLayerElement.eDirect or \
                                    referenceMode == FbxLayerElement.eIndexToDirect:
                        value = texCoordData.GetDirectArray().GetAt(index)
                else:
                    print("unsupported mapping mode")

                indices.append(index)

                # dict[generateTexCoordKey(value)] = index
                dict[index] = value

    values = getValuesFromDict(dict, LayerKey.TEXCOORD)

    return values, indices



def getNormalData(mesh):
    poly_count = mesh.GetPolygonCount()

    indices = []

    dict = {}

    value = None
    index = None

    vertexId = 0

    for p in range(poly_count):
        poly_size = mesh.GetPolygonSize(p)

        for v in range(poly_size):
            for l in range(mesh.GetElementNormalCount()):
                data = mesh.GetElementNormal(l)

                mappingMode = data.GetMappingMode()
                referenceMode = data.GetReferenceMode()

                if mappingMode == FbxLayerElement.eByPolygonVertex:
                    if referenceMode == FbxLayerElement.eDirect:
                        index = vertexId
                        value = data.GetDirectArray().GetAt(index)
                    if referenceMode == FbxLayerElement.eIndexToDirect:
                        index = data.GetIndexArray().GetAt(vertexId)
                        value = data.GetDirectArray().GetAt(index)
                else:
                    print("unsupported mapping mode")

                indices.append(index)

                # dict[generateNormalKey(value)] = index
                dict[index] = value

            vertexId += 1

    values = getValuesFromDict(dict, LayerKey.NORMAL)

    return values, indices




def generateTexCoordKey(texCoord):
    return (round(texCoord[0], 6), round(texCoord[1], 6))

def generateNormalKey(normal):
    return (round(normal[0], 6), round(normal[1], 6), round(normal[2], 6))

def getValuesFromDict(dict, layerKey):
    values = []

    if layerKey == LayerKey.TEXCOORD:
        for key, value in sorted(dict.items(), key = operator.itemgetter(0)):
            # print (key)
            values.append(value[0])
            values.append(value[1])
    elif layerKey == LayerKey.NORMAL or \
            layerKey == LayerKey.COLOR:
        for key, value in sorted(dict.items(), key = operator.itemgetter(0)):
            # if(key < 1000):
            #     print (key)
            # print (key)
            values.append(value[0])
            values.append(value[1])
            values.append(value[2])

    print (len(values))
    return values
