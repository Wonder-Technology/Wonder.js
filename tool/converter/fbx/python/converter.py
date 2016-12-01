'''
converter.py [source_file] [output_file] [options]
'''


import os
import sys
import json


from utils import *
from Parser import *
from globalDefine import *

option_triangulate = True
option_forced_y_up = False





def write_file(filepath, content):
    index = filepath.rfind('/')
    dir = filepath[0:index]

    if not os.path.exists(dir):
        os.makedirs(dir)

    out = open(filepath, "w")
    out.write(content.encode('utf8', 'replace'))
    out.close()


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






if __name__ == "__main__":
    from optparse import OptionParser

    # try:
    from FbxCommon import *

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

        result = LoadScene(manager, scene, args[0])
    else:
        result = False
        print("\nUsage: converter.py [source_file.fbx] [output_file.json]\n")


    if not result:
        print("\nAn error occurred while loading the file...")
    else:
        if option_triangulate:
            print("\nForcing geometry to triangles")
            triangulate_scene(scene)


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



        output_content = Parser(converter).parse(scene, os.path.join(os.getcwd(), args[0]))

        output_string = json.dumps(output_content, separators=(',', ': '), sort_keys=True)


        output_path = os.path.join(os.getcwd(), args[1])
        write_file(output_path, output_string)

    # Destroy all objects created by the FBX SDK.
    manager.Destroy()
    sys.exit(0)


