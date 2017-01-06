from utils import *
from parseMesh import *
from AssetParser import *
from MaterialParser import *
from KeyFrameAnimationParser import *
from CameraParser import *
from LightParser import *
from TransformParser import *
from SkinSkeletonParser import *
from fbx import *
from globalDefine import *

class Parser(object):
    def __init__(self, converter):
        self._converter = converter
        self._fbxAllNodes = {}


    def parse(self, scene, fileUrl):
        output = {}

        self._assetParser = AssetParser()
        self._materialParser = MaterialParser(output, fileUrl)
        self._keyFrameAnimationParser = KeyFrameAnimationParser(output)
        self._cameraParser = CameraParser()
        self._lightParser = LightParser()
        self._transformParser = TransformParser()
        self._skinSkeletonParser = SkinSkeletonParser()

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

        output["skins"] = {}

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
            self._listNodes(node)

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
            # if nodeId == "Object_86_monster":
            #     print (node.EvaluateLocalTransform())
            # print ("not handle null node attribute")
            # pass
            self._transformParser.parseCameraNode(nodeData, node)
        else:
            attributeType = nodeAttribute.GetAttributeType()

            if attributeType == FbxNodeAttribute.eNurbs or \
            attributeType == FbxNodeAttribute.eNurbsSurface or \
            attributeType == FbxNodeAttribute.ePatch:
                self._transformParser.parseCameraNode(nodeData, node)
                print ("not support attributeType:%s" % attributeType)
                return

            if attributeType == FbxNodeAttribute.eMesh:
                self._transformParser.parseBasicNode(nodeData, node)

                mesh = node.GetNodeAttribute()

                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "mesh", "meshes")


                self._skinSkeletonParser.checkHasSkin(mesh)

                if self._skinSkeletonParser.hasSkin:
                    self._skinSkeletonParser.createSkin(output)


                parseMesh(mesh, data, self._skinSkeletonParser)


                if self._skinSkeletonParser.hasSkin:
                    self._skinSkeletonParser.parse(nodeData, self._fbxAllNodes)

                self._skinSkeletonParser.reset()

                self._materialParser.parse(mesh, data)

            elif attributeType == FbxNodeAttribute.eSkeleton:
                self._transformParser.parseBasicNode(nodeData, node)

                self._skinSkeletonParser.setJointName(node, nodeData)

            elif attributeType == FbxNodeAttribute.eLight:
                self._transformParser.parseBasicNode(nodeData, node)

                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "light", "lights")

                self._lightParser.parse(node, data)

            elif attributeType == FbxNodeAttribute.eCamera:
                self._transformParser.parseCameraNode(nodeData, node)
                data = self._handleNodeAttribute(output, node, nodeId, nodeData, "camera", "cameras")

                self._cameraParser.parse(node, data)

            else:
                self._transformParser.parseCameraNode(nodeData, node)

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

    def _listNodes(self, node):
        self._fbxAllNodes[getObjectId(node)] = node

        for k in range(node.GetChildCount()):
            self._listNodes(node.GetChild(k))

