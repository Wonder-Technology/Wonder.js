from utils import *
from parseMesh import *
from MaterialParser import *
from KeyFrameAnimationParser import *
from CameraParser import *
from TransformParser import *
from fbx import *
from globalDefine import *

class Parser(object):
    def __init__(self, converter):
        self._converter = converter

    def parse(self, scene, fileUrl):
        output = {}

        self._materialParser = MaterialParser(output, fileUrl)
        self._keyFrameAnimationParser = KeyFrameAnimationParser(output)
        self._cameraParser = CameraParser(output)
        self._transformParser = TransformParser()


        # global_settings = scene.GetGlobalSettings()
        # objects, nobjects = generate_scene_objects(scene)

        # textures = generate_texture_dict(scene)
        # materials = generate_material_dict(scene)
        # geometries = generate_geometry_dict(scene)
        self._parseContent(scene, output)

        # ntextures = len(textures)
        # nmaterials = len(materials)
        # ngeometries = len(geometries)

        # position = serializeVector3( (0,0,0) )
        # rotation = serializeVector3( (0,0,0) )
        # scale    = serializeVector3( (1,1,1) )

        # camera_names = generate_camera_name_list(scene)
        # scene_settings = scene.GetGlobalSettings()

        # This does not seem to be any help here
        # global_settings.GetDefaultCamera()

        # defcamera = camera_names[0] if len(camera_names) > 0 else ""
        # if option_default_camera:
        #     defcamera = 'default_camera'

        # metadata = {
        #     'formatVersion': 3.2,
        #     'type': 'scene',
        #     'generatedBy': 'convert-to-threejs.py',
        #     'objects': nobjects,
        #     'geometries': ngeometries,
        #     'materials': nmaterials,
        #     'textures': ntextures
        # }
        #
        # transform = {
        #     'position' : position,
        #     'rotation' : rotation,
        #     'scale' : scale
        # }
        #
        # defaults = {
        #     'bgcolor' : 0,
        #     'camera' : defcamera,
        #     'fog' : ''
        # }
        #
        # output = {
        #     'objects': objects,
        #     'geometries': geometries,
        #     'materials': materials,
        #     'textures': textures,
        #     'meshes': meshes,
        #     'transform': transform,
        #     'defaults': defaults,
        # }
        #
        # if option_pretty_print:
        #     output['0metadata'] = metadata
        # else:
        #     output['metadata'] = metadata



        # output = {
        #     "meshes": meshes
        # }

        return output

    def _parseContent(self, scene, output):
        # meshPrimitives = []
        #
        # mesh_dict = {}

        node = scene.GetRootNode()

        output["nodes"] = {}
        output["meshes"] = {}
        # materialDatas = {}
        output["materials"] = {}


        output["cameras"] = {}

        # textureDatas = {}
        output["textures"] = {}

        # imageDatas = {}
        output["images"] = {}

        # samplerDatas = {}
        output["samplers"] = {}

        sceneName = scene.GetName()

        if sceneName == "":
            sceneName = "defaultScene"

        output["scene"] = sceneName

        sceneNodes = []
        output["scenes"] = {}
        output["scenes"][sceneName] = {
            "nodes": sceneNodes
        }

        # mesh_name = getObjectId(node)
        #
        # mesh_dict[mesh_name] = {
        #  "primitives": meshPrimitives
        # }

        if node:
            self._keyFrameAnimationParser.parse(scene)

            for i in range(node.GetChildCount()):
                nodeChild = node.GetChild(i)

                sceneNodes.append(getObjectId(nodeChild))

                self._parseContentHierarchy(nodeChild, output)

    def _parseContentHierarchy(self, node, output):
        nodeId = getObjectId(node)
        nodeData = {}
        output["nodes"][nodeId] = nodeData

        setName(node, nodeData)


        # Set PivotState to active to ensure ConvertPivotAnimationRecursive() execute correctly.
        # node.SetPivotState(eSourcePivot, ePivotActive)
        # node.SetPivotState(eDestinationPivot, ePivotActive)

        nodeAttribute = node.GetNodeAttribute()

        if nodeAttribute == None:
            print ("not handle null node attribute")
            pass
        else:
            # nodeData = {}
            # output.nodes[getObjectId(node)] = nodeData

            # self._parseNode(node, output)

            attributeType = nodeAttribute.GetAttributeType()

            # self._parseTransform(nodeData, node, attributeType)

            if attributeType == FbxNodeAttribute.eNurbs or \
            attributeType == FbxNodeAttribute.eNurbsSurface or \
            attributeType == FbxNodeAttribute.ePatch:
                print ("not support attributeType:%s" % attributeType)
                return


            if attributeType == FbxNodeAttribute.eMesh:
                self._transformParser.parseBasicNode(nodeData, node)

                # if attributeType != FbxNodeAttribute.eMesh:
                #     self._converter.Triangulate(node.GetNodeAttribute(), True)
                mesh = node.GetNodeAttribute()
                # meshId = getObjectId(mesh, False, nodeId + "_mesh")
                #
                # nodeData["mesh"] = meshId
                #
                # meshData = {}
                #
                # output["meshes"][meshId] = meshData
                #
                # setName(mesh, meshData)

                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "mesh", "meshes")


                parseMesh(mesh, data)

                self._materialParser.parse(mesh, data)
                # parseMaterial(mesh, meshData, output)

                # print ("materialId %s" % output["materials"])

            elif attributeType == FbxNodeAttribute.eCamera:
                self._transformParser.parseCameraNode(nodeData, node)
                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "camera", "cameras")
                # camera = node.GetNodeAttribute()
                # cameraId = getObjectId(camera, False, nodeId + "_camera")
                #
                # nodeData["camera"] = cameraId
                #
                # cameraData = {}
                #
                # output["cameras"][cameraId] = cameraData
                #
                # setName(camera, cameraData)

                self._cameraParser.parse(node, data)


        nodeData["children"] = []

        for i in range(node.GetChildCount()):
            nodeChild = node.GetChild(i)

            nodeData["children"].append(getObjectId(nodeChild))

            self._parseContentHierarchy(nodeChild, output)


    def _handleNodeAttribute(self, output, node, nodeId, nodeData, type, types):
        attribute = node.GetNodeAttribute()
        id = getObjectId(attribute, False, nodeId + "_%s" % type)

        nodeData[type] = id

        data = {}

        output[types][id] = data

        setName(attribute, data)

        return data
