from fbx import *
from helper import *
# from parseIndiceData import *

import operator


#
# LayerKey = {
#     "TEXCOORD":1
# }

def enum(**enums):
    return type('Enum', (), enums)

LayerKey = enum(TEXCOORD=1)

# # Flatten the arrays, currently they are in the form of [[0, 1, 2], [3, 4, 5], ...]
# def flattenData(dataArr):
#     return [val for v in dataArr for val in v]

def parsePrimitiveData(node):
    mesh = node.GetNodeAttribute()

    # This is done in order to keep the scene output and non-scene output code DRY
    # mesh_list = [ mesh ]

    # Extract the mesh data into arrays
    # vertices, vertex_offsets = process_mesh_vertices(mesh_list)
    # vertices = process_mesh_vertices(mesh_list)

    vertices = getVertices(mesh)
    verticeIndices = getVerticeIndices(mesh)



    texCoords = getTexCoords(mesh)
    texCoordIndices = getTexCoordIndices(mesh)





    # vertices = []
    # texCoords = []
    # texCoordIndices = []
    # verticeIndices = []

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




def convertVectorToList(mesh, vectorList):
    resultList = []

    control_points_count = mesh.GetControlPointsCount()

    for i in range(control_points_count):
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
    return convertVectorToList(mesh, mesh.GetControlPoints())


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
    return convertVectorToList(mesh,getLayerData(mesh, LayerKey.TEXCOORD).GetDirectArray())




def getTexCoordIndices(mesh):
    return getLayerIndices(mesh, LayerKey.TEXCOORD)


def getLayerData(mesh, layerKey):
    layerCount = mesh.GetLayerCount()

    if(layerCount == 0):
        # print ("the %s data has no layer data")
        return []

    if(layerCount >= 2):
        print ("the %s data has %d layers, only use the first layer data" % layerKey, layerCount)

    layer = mesh.GetLayer(0)

    layerData = None

    if(layerKey == LayerKey.TEXCOORD):
        layerData = layer.GetUVs()

    # elif(layerKey == "texCoord"):
    #     layerData = layer.GetUVs()
    else:
        raise AssertionError("unknow %layerKey" % layerKey)

    return layerData


def getLayerIndices(mesh, layerKey):
        #   eNone             The mapping is undetermined.
        #   eByControlPoint   There will be one mapping coordinate for each surface control point/vertex.
        #   eByPolygonVertex  There will be one mapping coordinate for each vertex, for every polygon of which it is a part. This means that a vertex will have as many mapping coordinates as polygons of which it is a part.
        #   eByPolygon        There can be only one mapping coordinate for the whole polygon.
        #   eByEdge           There will be one mapping coordinate for each unique edge in the mesh. This is meant to be used with smoothing layer elements.
        #   eAllSame          There can be only one mapping coordinate for the whole surface.


        poly_count = mesh.GetPolygonCount()
        vertexId = 0

        layerData = getLayerData(mesh, layerKey)

        indices = []

        for p in range(poly_count):
            poly_size = mesh.GetPolygonSize(p)
            # poly_uvs = []

            for v in range(poly_size):
                control_point_index = mesh.GetPolygonVertex(p, v)

                if layerData.GetMappingMode() == FbxLayerElement.eByControlPoint:
                    if layerData.GetReferenceMode() == FbxLayerElement.eDirect:
                        indices.append(control_point_index)
                    elif layerData.GetReferenceMode() == FbxLayerElement.eIndexToDirect:
                        index = layerData.GetIndexArray().GetAt(control_point_index)
                        indices.append(index)
                elif layerData.GetMappingMode() == FbxLayerElement.eByPolygonVertex:
                    uv_texture_index = layerData.GetIndexArray().GetAt(vertexId)

                    if layerData.GetReferenceMode() == FbxLayerElement.eDirect or \
                                    layerData.GetReferenceMode() == FbxLayerElement.eIndexToDirect:
                        indices.append(uv_texture_index)
                else:
                    # elif layerData.GetMappingMode() == FbxLayerElement.eByPolygon or \
                    #                 layerData.GetMappingMode() ==  FbxLayerElement.eAllSame or \
                    #                 layerData.GetMappingMode() ==  FbxLayerElement.eNone:
                    print("unsupported uv mapping mode for polygon vertex")

                vertexId += 1
                # uv_indices.append(indices)

        # layered_uv_values.append(uv_values)
        # layered_uv_indices.append(uv_indices)

        return indices


