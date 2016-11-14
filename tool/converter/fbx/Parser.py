from helper import *
from parseMesh import *
from parseMaterial import *
from fbx import *

class Parser(object):
    def __init__(self, converter):
        self._converter = converter

    def parse(self, scene, filename):
        # TODO parse nodes, meshes(geometry data)

        output = {}


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
            for i in range(node.GetChildCount()):
                nodeChild = node.GetChild(i)

                sceneNodes.append(getObjectId(nodeChild))

                self._parseContentHierarchy(nodeChild, output)

    def _parseContentHierarchy(self, node, output):
        nodeId = getObjectId(node)
        nodeData = {}
        output["nodes"][nodeId] = nodeData

        setName(node, nodeData)

        nodeAttribute = node.GetNodeAttribute()

        if nodeAttribute == None:
            print ("not handle null node attribute")
            pass
        else:
            # nodeData = {}
            # output.nodes[getObjectId(node)] = nodeData

            # self._parseNode(node, output)

            attribute_type = nodeAttribute.GetAttributeType()

            if attribute_type == FbxNodeAttribute.eNurbs or \
            attribute_type == FbxNodeAttribute.eNurbsSurface or \
            attribute_type == FbxNodeAttribute.ePatch:
                print ("not support attribute_type:%s" % attribute_type)
                return

            if attribute_type == FbxNodeAttribute.eMesh:

                # if attribute_type != FbxNodeAttribute.eMesh:
                #     self._converter.Triangulate(node.GetNodeAttribute(), True)
                mesh = node.GetNodeAttribute()
                meshId = getObjectId(mesh, False, nodeId + "_mesh")

                nodeData["mesh"] = meshId

                meshData = {}

                output["meshes"][meshId] = meshData

                setName(mesh, meshData)


                parseMesh(mesh, meshData)

                parseMaterial(mesh, meshData, output)


        nodeData["children"] = []

        for i in range(node.GetChildCount()):
            nodeChild = node.GetChild(i)

            nodeData["children"].append(getObjectId(nodeChild))

            self._parseContentHierarchy(nodeChild, output)
