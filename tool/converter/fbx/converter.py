'''
convert_to_threejs.py [source_file] [output_file] [options]

# TODO Options:
# TODO support:
lod
instance
shadow
space partition
terrain
'''


import os
import sys
# import math
# import operator
# import re
import json
# import types
# import shutil


from helper import *
from Parser import *
from globalDefine import *

# #####################################################
# Globals
# #####################################################

# sdkManager = None
# converter = None
# inputFolder = ""
# outputFolder = ""


# config params

option_triangulate = True
# option_textures = True
# option_copy_textures = True
# option_prefix = True
# option_geometry = False
option_forced_y_up = False
# option_default_camera = False
# option_default_light = False
# option_pretty_print = False





# #####################################################
# File Helpers
# #####################################################
def write_file(filepath, content):
    index = filepath.rfind('/')
    dir = filepath[0:index]

    if not os.path.exists(dir):
        os.makedirs(dir)

    out = open(filepath, "w")
    out.write(content.encode('utf8', 'replace'))
    out.close()





# from fbx import *
# import fbx

# from FbxCommon import *


# class Converter:
#     def __init__(self):
#         pass
#
#     def convert(self):
#         return 1


#a = FbxManager.Create()


# print(dir(FbxManager))



# sdk_manager, scene = InitializeSdkObjects()


# a = FbxManager.Create()


#print("aaa")





# #####################################################
# Triangulation
# #####################################################
def triangulate_node_hierarchy(node):
    node_attribute = node.GetNodeAttribute();

    if node_attribute:
        if node_attribute.GetAttributeType() == FbxNodeAttribute.eMesh or \
                        node_attribute.GetAttributeType() == FbxNodeAttribute.eNurbs or \
                        node_attribute.GetAttributeType() == FbxNodeAttribute.eNurbsSurface or \
                        node_attribute.GetAttributeType() == FbxNodeAttribute.ePatch:
            converter.Triangulate(node.GetNodeAttribute(), True);

        child_count = node.GetChildCount()
        for i in range(child_count):
            triangulate_node_hierarchy(node.GetChild(i))

def triangulate_scene(scene):
    node = scene.GetRootNode()
    if node:
        for i in range(node.GetChildCount()):
            triangulate_node_hierarchy(node.GetChild(i))












# #####################################################
# Generate Node Object
# #####################################################
def generate_object(node):
    # EType
    node_types = ["Unknown", "Null", "Marker", "Skeleton", "Mesh", "Nurbs", "Patch", "Camera",
                  "CameraStereo", "CameraSwitcher", "Light", "OpticalReference", "OpticalMarker", "NurbsCurve",
                  "TrimNurbsSurface", "Boundary", "NurbsSurface", "Shape", "LODGroup", "SubDiv", "CachedEffect", "Line"]

    transform = node.EvaluateLocalTransform()
    position = transform.GetT()
    scale = transform.GetS()
    rotation = getRadians(transform.GetR())
    quaternion = transform.GetQ()

    node_type = ""
    if node.GetNodeAttribute() == None:
        node_type = "Null"
    else:
        node_type = node_types[node.GetNodeAttribute().GetAttributeType()]

    name = getObjectName( node )
    output = {
        'fbx_type': node_type,
        'position': serializeVector3( position ),
        'quaternion': serializeVector4( quaternion ),
        'scale': serializeVector3( scale ),
        'visible': True
    }

    return output

# #####################################################
# Parse Scene Node Objects
# #####################################################
def generate_object_hierarchy(node, object_dict):
    object_count = 0
    if node.GetNodeAttribute() == None:
        object_data = generate_object(node)
    else:
        attribute_type = (node.GetNodeAttribute().GetAttributeType())
        # if attribute_type == FbxNodeAttribute.eMesh:
        #     object_data = generate_mesh_object(node)
        # elif attribute_type == FbxNodeAttribute.eLight:
        #     object_data = generate_light_object(node)
        # elif attribute_type == FbxNodeAttribute.eCamera:
        #     object_data = generate_camera_object(node)
        # else:
        #     object_data = generate_object(node)

    object_count += 1
    object_name = getObjectName(node)

    object_children = {}
    for i in range(node.GetChildCount()):
        object_count += generate_object_hierarchy(node.GetChild(i), object_children)

    if node.GetChildCount() > 0:
        # Having 'children' above other attributes is hard to read.
        # We can send it to the bottom using the last letter of the alphabet 'z'.
        # This letter is removed from the final output.
        # if option_pretty_print:
        #     object_data['zchildren'] = object_children
        # else:
            object_data['children'] = object_children

    object_dict[object_name] = object_data

    return object_count

def generate_scene_objects(scene):
    object_count = 0
    object_dict = {}

    # ambient_light = generate_ambient_light(scene)
    # if ambient_light:
    #     object_dict['AmbientLight'] = ambient_light
    #     object_count += 1
    #
    # if option_default_light:
    #     default_light = generate_default_light()
    #     object_dict['DefaultLight'] = default_light
    #     object_count += 1
    #
    # if option_default_camera:
    #     default_camera = generate_default_camera()
    #     object_dict['DefaultCamera'] = default_camera
    #     object_count += 1

    node = scene.GetRootNode()
    if node:
        for i in range(node.GetChildCount()):
            object_count += generate_object_hierarchy(node.GetChild(i), object_dict)

    return object_dict, object_count









# # #####################################################
# # Generate Embed Objects
# # #####################################################
# def generate_embed_dict_from_hierarchy(node, embed_dict):
#     if node.GetNodeAttribute() == None:
#         pass
#     else:
#         attribute_type = (node.GetNodeAttribute().GetAttributeType())
#         if attribute_type == FbxNodeAttribute.eMesh or \
#                         attribute_type == FbxNodeAttribute.eNurbs or \
#                         attribute_type == FbxNodeAttribute.eNurbsSurface or \
#                         attribute_type == FbxNodeAttribute.ePatch:
#
#             if attribute_type != FbxNodeAttribute.eMesh:
#                 converter.Triangulate(node.GetNodeAttribute(), True);
#
#             embed_object = generate_scene_output(node)
#             embed_name = getPrefixedName(node, 'Embed')
#             embed_dict[embed_name] = embed_object
#
#     for i in range(node.GetChildCount()):
#         generate_embed_dict_from_hierarchy(node.GetChild(i), embed_dict)
#
# def generate_embed_dict(scene):
#     embed_dict = {}
#     node = scene.GetRootNode()
#     if node:
#         for i in range(node.GetChildCount()):
#             generate_embed_dict_from_hierarchy(node.GetChild(i), embed_dict)
#     return embed_dict
#
#
#
#
#
#
#
#
#
# # #####################################################
# # Generate Mesh Object (for scene output format)
# # #####################################################
# def generate_scene_output(node):
#     mesh = node.GetNodeAttribute()
#
#     # This is done in order to keep the scene output and non-scene output code DRY
#     mesh_list = [ mesh ]
#
#     # Extract the mesh data into arrays
#     vertices, vertex_offsets = process_mesh_vertices(mesh_list)
#     # materials, material_offsets = process_mesh_materials(mesh_list)
#
#     # normals_to_indices = generate_unique_normals_dictionary(mesh_list)
#     # colors_to_indices = generate_unique_colors_dictionary(mesh_list)
#     # uvs_to_indices_list = generate_unique_uvs_dictionary_layers(mesh_list)
#
#     # normal_values = generate_normals_from_dictionary(normals_to_indices)
#     # color_values = generate_colors_from_dictionary(colors_to_indices)
#     # uv_values = generate_uvs_from_dictionary_layers(uvs_to_indices_list)
#     #
#     # # Generate mesh faces for the Three.js file format
#     # faces = process_mesh_polygons(mesh_list,
#     #                               normals_to_indices,
#     #                               colors_to_indices,
#     #                               uvs_to_indices_list,
#     #                               vertex_offsets,
#     #                               material_offsets)
#     #
#     # # Generate counts for uvs, vertices, normals, colors, and faces
#     # nuvs = []
#     # for layer_index, uvs in enumerate(uv_values):
#     #     nuvs.append(str(len(uvs)))
#     #
#     # nvertices = len(vertices)
#     # nnormals = len(normal_values)
#     # ncolors = len(color_values)
#     # nfaces = len(faces)
#     #
#     # # Flatten the arrays, currently they are in the form of [[0, 1, 2], [3, 4, 5], ...]
#     # vertices = [val for v in vertices for val in v]
#     # normal_values = [val for n in normal_values for val in n]
#     # color_values = [c for c in color_values]
#     # faces = [val for f in faces for val in f]
#     # uv_values = generate_uvs(uv_values)
#     #
#     # # Disable automatic json indenting when pretty printing for the arrays
#     # if option_pretty_print:
#     #     nuvs = NoIndent(nuvs)
#     #     vertices = ChunkedIndent(vertices, 15, True)
#     #     normal_values = ChunkedIndent(normal_values, 15, True)
#     #     color_values = ChunkedIndent(color_values, 15)
#     #     faces = ChunkedIndent(faces, 30)
#     #
#     # metadata = {
#     #     'vertices' : nvertices,
#     #     'normals' : nnormals,
#     #     'colors' : ncolors,
#     #     'faces' : nfaces,
#     #     'uvs' : nuvs
#     # }
#     #
#     # output = {
#     #     'scale' : 1,
#     #     'materials' : [],
#     #     'vertices' : vertices,
#     #     'normals' : [] if nnormals <= 0 else normal_values,
#     #     'colors' : [] if ncolors <= 0 else color_values,
#     #     'uvs' : uv_values,
#     #     'faces' : faces
#     # }
#     #
#     # if option_pretty_print:
#     #     output['0metadata'] = metadata
#     # else:
#     #     output['metadata'] = metadata
#
#
#     output = {
#         'vertices' : vertices
#     }
#
#     return output
#
#
#
#
#
#
#
#
#
#
# def process_mesh_vertices(mesh_list):
#     vertex_offset = 0
#     vertex_offset_list = [0]
#     vertices = []
#     for mesh in mesh_list:
#         node = mesh.GetNode()
#         mesh_vertices = extract_fbx_vertex_positions(mesh)
#
#         vertices.extend(mesh_vertices[:])
#         vertex_offset += len(mesh_vertices)
#         vertex_offset_list.append(vertex_offset)
#
#     return vertices, vertex_offset_list
#
#
#
#
#
#
# # #####################################################
# # Extract Fbx SDK Mesh Data
# # #####################################################
# def extract_fbx_vertex_positions(mesh):
#     control_points_count = mesh.GetControlPointsCount()
#     control_points = mesh.GetControlPoints()
#
#     # TODO not transform?
#
#     positions = []
#     for i in range(control_points_count):
#         tmp = control_points[i]
#         tmp = [tmp[0], tmp[1], tmp[2]]
#         positions.append(tmp)
#
#     node = mesh.GetNode()
#     if node:
#         t = node.GeometricTranslation.Get()
#         t = FbxVector4(t[0], t[1], t[2], 1)
#         r = node.GeometricRotation.Get()
#         r = FbxVector4(r[0], r[1], r[2], 1)
#         s = node.GeometricScaling.Get()
#         s = FbxVector4(s[0], s[1], s[2], 1)
#
#         hasGeometricTransform = False
#         if t[0] != 0 or t[1] != 0 or t[2] != 0 or \
#                         r[0] != 0 or r[1] != 0 or r[2] != 0 or \
#                         s[0] != 1 or s[1] != 1 or s[2] != 1:
#             hasGeometricTransform = True
#
#         if hasGeometricTransform:
#             geo_transform = FbxMatrix(t,r,s)
#         else:
#             geo_transform = FbxMatrix()
#
#         transform = None
#
#         if option_geometry:
#             # FbxMeshes are local to their node, we need the vertices in global space
#             # when scene nodes are not exported
#             transform = node.EvaluateGlobalTransform()
#             transform = FbxMatrix(transform) * geo_transform
#
#         elif hasGeometricTransform:
#             transform = geo_transform
#
#         if transform:
#             for i in range(len(positions)):
#                 v = positions[i]
#                 position = FbxVector4(v[0], v[1], v[2])
#                 position = transform.MultNormalize(position)
#                 positions[i] = [position[0], position[1], position[2]]
#
#     return positions
#
#
#
#
#
#
#
# # #####################################################
# # Generate Scene Output
# # #####################################################
# def extract_scene(scene, filename):
#     # TODO parse nodes, meshs(geometry data)
#
#
#     global_settings = scene.GetGlobalSettings()
#     # objects, nobjects = generate_scene_objects(scene)
#
#     # textures = generate_texture_dict(scene)
#     # materials = generate_material_dict(scene)
#     # geometries = generate_geometry_dict(scene)
#     embeds = generate_embed_dict(scene)
#
#     # ntextures = len(textures)
#     # nmaterials = len(materials)
#     # ngeometries = len(geometries)
#
#     # position = serializeVector3( (0,0,0) )
#     # rotation = serializeVector3( (0,0,0) )
#     # scale    = serializeVector3( (1,1,1) )
#
#     # camera_names = generate_camera_name_list(scene)
#     scene_settings = scene.GetGlobalSettings()
#
#     # This does not seem to be any help here
#     # global_settings.GetDefaultCamera()
#
#     # defcamera = camera_names[0] if len(camera_names) > 0 else ""
#     # if option_default_camera:
#     #     defcamera = 'default_camera'
#
#     # metadata = {
#     #     'formatVersion': 3.2,
#     #     'type': 'scene',
#     #     'generatedBy': 'convert-to-threejs.py',
#     #     'objects': nobjects,
#     #     'geometries': ngeometries,
#     #     'materials': nmaterials,
#     #     'textures': ntextures
#     # }
#     #
#     # transform = {
#     #     'position' : position,
#     #     'rotation' : rotation,
#     #     'scale' : scale
#     # }
#     #
#     # defaults = {
#     #     'bgcolor' : 0,
#     #     'camera' : defcamera,
#     #     'fog' : ''
#     # }
#     #
#     # output = {
#     #     'objects': objects,
#     #     'geometries': geometries,
#     #     'materials': materials,
#     #     'textures': textures,
#     #     'embeds': embeds,
#     #     'transform': transform,
#     #     'defaults': defaults,
#     # }
#     #
#     # if option_pretty_print:
#     #     output['0metadata'] = metadata
#     # else:
#     #     output['metadata'] = metadata
#
#
#
#     output = {
#         # 'embeds': embeds
#         "meshs": meshs
#     }
#
#     return output
#
#
#
#
#
#
#



if __name__ == "__main__":
    from optparse import OptionParser

    # try:
    from FbxCommon import *



    # except ImportError:
    #     import platform
        # msg = 'Could not locate the python FBX SDK!\n'
        # msg += 'You need to copy the FBX SDK into your python install folder such as '
        # if platform.system() == 'Windows' or platform.system() == 'Microsoft':
        #     msg += '"Python26/Lib/site-packages"'
        # elif platform.system() == 'Linux':
        #     msg += '"/usr/local/lib/python2.7/site-packages"'
        # elif platform.system() == 'Darwin':
        #     msg += '"/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages"'
        # msg += ' folder.'
        # print(msg)
        # sys.exit(1)


    usage = "Usage: %prog [source_file.fbx] [output_file.json] [options]"
    parser = OptionParser(usage=usage)


    parser.add_option('-t', '--triangulate', action='store_true', dest='triangulate', help="force quad geometry into triangles", default=True)
    parser.add_option('-y', '--force-y-up', action='store_true', dest='forceyup', help="ensure that the y axis shows up", default=False)


    (options, args) = parser.parse_args()

    option_triangulate = options.triangulate
    option_forced_y_up = options.forceyup


    manager, scene = InitializeSdkObjects()

    sdkManager = manager

    converter = FbxGeometryConverter(manager)



    # The converter takes an FBX file as an argument.
    if len(args) > 1:
        print("\nLoading file: %s" % args[0])

        # TODO extract genertor info
        #
        # # File format version numbers to be populated.
        # int lFileMajor, lFileMinor, lFileRevision;
        #
        # # Populate the FBX file format version numbers with the import file.
        # lImporter->GetFileVersion(lFileMajor, lFileMinor, lFileRevision);

        result = LoadScene(manager, scene, args[0])
    else:
        result = False
        # TODO remove threejs
        print("\nUsage: convert_fbx_to_threejs [source_file.fbx] [output_file.json]\n")


    if not result:
        print("\nAn error occurred while loading the file...")
    else:
        if option_triangulate:
            print("\nForcing geometry to triangles")
            triangulate_scene(scene)

        # TODO open?

        # axis_system = FbxAxisSystem.MayaYUp
        #
        # if not option_forced_y_up:
        #     # According to asset's coordinate to convert scene
        #     upVector = scene.GetGlobalSettings().GetAxisSystem().GetUpVector()
        #     if upVector[0] == 3:
        #         axis_system = FbxAxisSystem.MayaZUp
        #
        # axis_system.ConvertScene(scene)




        inputFolder = args[0].replace( "\\", "/" );
        index = args[0].rfind( "/" );
        inputFolder = inputFolder[:index]

        outputFolder = args[1].replace( "\\", "/" );
        index = args[1].rfind( "/" );
        outputFolder = outputFolder[:index]



        # print (inputFolder, outputFolder)

        # TODO master merge geometry

        # output_content = extract_scene(scene, os.path.basename(args[0]))
        output_content = Parser(converter).parse(scene, os.path.join(os.getcwd(), args[0]))

        #
        # output_content = {
        #     'aaa':'a',
        #     'bbb':'b'
        # }
        #
        #


        # print (output_content["attributes"])
        output_string = json.dumps(output_content, separators=(',', ': '), sort_keys=True)


        output_path = os.path.join(os.getcwd(), args[1])
        write_file(output_path, output_string)


    # Destroy all objects created by the FBX SDK.
    manager.Destroy()
    sys.exit(0)


