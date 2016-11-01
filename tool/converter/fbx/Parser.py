from helper import *
from parsePrimitiveData import *
from fbx import *

class Parser(object):
    def __init__(self, converter):
        self._converter = converter

    def parse(self, scene, filename):
        # TODO parse nodes, meshes(geometry data)


        # global_settings = scene.GetGlobalSettings()
        # objects, nobjects = generate_scene_objects(scene)

        # textures = generate_texture_dict(scene)
        # materials = generate_material_dict(scene)
        # geometries = generate_geometry_dict(scene)
        meshes = self._parseMesh(scene)

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



        output = {
            "meshes": meshes
        }

        return output

    def _parseMesh(self, scene):
        meshPrimitives = []

        mesh_dict = {}

        node = scene.GetRootNode()

        mesh_name = getObjectName(node)

        mesh_dict[mesh_name] = {
         "primitives": meshPrimitives
        }

        if node:
            for i in range(node.GetChildCount()):
                self._parseMeshHierarchy(node.GetChild(i), meshPrimitives)

        return mesh_dict

    # TODO fix bug?

    def _parseMeshHierarchy(self, node, meshPrimitives):
        if node.GetNodeAttribute() == None:
            pass
        else:
            attribute_type = (node.GetNodeAttribute().GetAttributeType())
            if attribute_type == FbxNodeAttribute.eMesh or \
                            attribute_type == FbxNodeAttribute.eNurbs or \
                            attribute_type == FbxNodeAttribute.eNurbsSurface or \
                            attribute_type == FbxNodeAttribute.ePatch:

                if attribute_type != FbxNodeAttribute.eMesh:
                    self._converter.Triangulate(node.GetNodeAttribute(), True)

                primitiveData = parsePrimitiveData(node)

                meshPrimitives.append(
                    {
                        "attributes": primitiveData["attributes"],
                        "verticeIndices": primitiveData["verticeIndices"],
                        "normalIndices":primitiveData["normalIndices"],
                        "texCoordIndices":primitiveData["texCoordIndices"],
                        "colorIndices":primitiveData["colorIndices"]
                    }
                )

        for i in range(node.GetChildCount()):
            self._parseMeshHierarchy(node.GetChild(i), meshPrimitives)
