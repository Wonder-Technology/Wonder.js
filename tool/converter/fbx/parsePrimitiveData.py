from fbx import *

import operator

def enum(**enums):
    return type('Enum', (), enums)

LayerKey = enum(TEXCOORD=1)

def parsePrimitiveData(node):
    mesh = node.GetNodeAttribute()

    vertices, verticeIndices = getVerticeData(mesh)

    texCoords, texCoordIndices = getTexCoordData(mesh)

    return {
        "attributes": {
            "POSITION": vertices,
            "NORMAL": [],
            "COLOR": [],
            "TEXCOORD": texCoords
        },
        "verticeIndices": verticeIndices,
        "normalIndices":[],
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

def getTexCoords(mesh):
    return convertVectorToList(getLayerData(mesh, LayerKey.TEXCOORD).GetDirectArray())


def getVerticeData(mesh):
    controlPoints = mesh.GetControlPoints()

    poly_count = mesh.GetPolygonCount()

    values = []
    indices = []

    for p in range(poly_count):
        poly_size = mesh.GetPolygonSize(p)

        for v in range(poly_size):
            control_point_index = mesh.GetPolygonVertex(p, v)

            indices.append(control_point_index)

    return convertVectorToList(controlPoints), indices



def getTexCoordData(mesh):
    poly_count = mesh.GetPolygonCount()

    values = []
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
                    print("unsupported mapping mode for polygon vertex")

                indices.append(index)

                dict[generateTexCoordKey(value)] = index

    for key, value in sorted(dict.items(), key = operator.itemgetter(1)):
        # print (key)
        values.append(key[0])
        values.append(key[1])

    return values, indices


def generateTexCoordKey(texCoord):
    return (round(texCoord[0], 6), round(texCoord[1], 6))

