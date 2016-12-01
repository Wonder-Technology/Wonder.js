from utils import *
from parseMesh import *
from AssetParser import *
from MaterialParser import *
from KeyFrameAnimationParser import *
from CameraParser import *
from LightParser import *
from TransformParser import *
from fbx import *
from globalDefine import *

class Parser(object):
    def __init__(self, converter):
        self._converter = converter

    def parse(self, scene, fileUrl):
        output = {}

        self._assetParser = AssetParser()
        self._materialParser = MaterialParser(output, fileUrl)
        self._keyFrameAnimationParser = KeyFrameAnimationParser(output)
        self._cameraParser = CameraParser()
        self._lightParser = LightParser()
        self._transformParser = TransformParser()

        self._assetParser.parse(scene, output)


        self._parseContent(scene, output)


        return output

    def _parseContent(self, scene, output):
        node = scene.GetRootNode()

        output["nodes"] = {}
        output["meshes"] = {}
        output["materials"] = {}


        output["cameras"] = {}
        output["lights"] = {}

        output["textures"] = {}

        output["images"] = {}

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
            attributeType = nodeAttribute.GetAttributeType()

            if attributeType == FbxNodeAttribute.eNurbs or \
            attributeType == FbxNodeAttribute.eNurbsSurface or \
            attributeType == FbxNodeAttribute.ePatch:
                print ("not support attributeType:%s" % attributeType)
                return


            if attributeType == FbxNodeAttribute.eMesh:
                self._transformParser.parseBasicNode(nodeData, node)

                mesh = node.GetNodeAttribute()

                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "mesh", "meshes")


                parseMesh(mesh, data)

                self._materialParser.parse(mesh, data)


            elif attributeType == FbxNodeAttribute.eLight:
                self._transformParser.parseBasicNode(nodeData, node)

                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "light", "lights")

                self._lightParser.parse(node, data)

            elif attributeType == FbxNodeAttribute.eCamera:
                self._transformParser.parseCameraNode(nodeData, node)
                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "camera", "cameras")

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
