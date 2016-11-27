from fbx import *
from helper import *
from transformHelper import *

class KeyFrameAnimationParser(object):
    def __init__(self, output):
        self._output = output
        self._animationName = None
        self._globalSetting = None
        self._timeMode = None

    def parse(self, scene):
        animationDatas = {}
        self._output["animations"] = animationDatas

        self._globalSetting = scene.GetGlobalSettings()

        # 11->EMode.eFrames24
        self._timeMode = self._globalSetting.GetTimeMode() or 11
        # print (self._globalSetting.GetCustomFrameRate())

        for i in range(scene.GetSrcObjectCount(FbxCriteria.ObjectType(FbxAnimStack.ClassId))):
            animStack = scene.GetSrcObject(FbxCriteria.ObjectType(FbxAnimStack.ClassId), i)

            self._animStack = animStack

            animationData = {}

            self._animationName = getAnimationId(animStack)
            animationDatas[self._animationName] = animationData

            self._parseAnimationStackData(animStack, scene.GetRootNode(), animationData)

            # self._parseLayers(animStack, scene.GetRootNode(), animationData)
            # DisplayAnimation(lAnimStack, pScene->GetRootNode(), true);

        self._removeEmptyAnimationData()

    def _removeEmptyAnimationData(self):
        animations = self._output["animations"]

        for key, data in animations.items():
            if not data.has_key("channels"):
                del animations[key]

    def _parseAnimationStackData(self, animStack, node, animationData):
        startFrame = animStack.GetLocalTimeSpan().GetStart().GetFrameCount(self._timeMode)
        endFrame = animStack.GetLocalTimeSpan().GetStop().GetFrameCount(self._timeMode)
        animLengthInFrame = endFrame - startFrame + 1

        translationCurveNode = node.LclTranslation.GetCurveNode(animStack)
        rotationCurveNode = node.LclRotation.GetCurveNode(animStack)
        scalingCurveNode = node.LclScaling.GetCurveNode(animStack)

        # print (translationCurveNode, rotationCurveNode, scalingCurveNode)

        if self._hasCurveData(translationCurveNode) or self._hasCurveData(rotationCurveNode) or self._hasCurveData(scalingCurveNode):
            # TODO not support Constant interpolation?
            interpolation = self._parseInterpolation(self._getCurveWhichHasData(translationCurveNode, rotationCurveNode, scalingCurveNode))

            self._parseData(animLengthInFrame, startFrame, endFrame, node, interpolation, translationCurveNode, rotationCurveNode, scalingCurveNode, animationData)


            # print ("parse %s ", node.GetName() + "|" + self._animationName)


        for i in range(node.GetChildCount()):
            self._parseAnimationStackData(animStack, node.GetChild(i), animationData)

    def _hasCurveData(self, curveNode):
        # return curveNode and curveNode.GetCurveCount(0) > 0
        return curveNode

    def _getCurveWhichHasData(self, translationCurveNode, rotationCurveNode, scalingCurveNode):
        if self._hasCurveData(translationCurveNode):
            # if translationCurveNode:
            #     print (translationCurveNode.GetChannelsCount(), translationCurveNode.GetCurveCount(0), translationCurveNode.GetCurve(0))
            return translationCurveNode.GetCurve(0)


        if self._hasCurveData(rotationCurveNode):
            return rotationCurveNode.GetCurve(0)

        if self._hasCurveData(scalingCurveNode):
            return scalingCurveNode.GetCurve(0)

        return None

    def _isCamera(self, node):
        if node.GetCamera():
            return True

        return False

    def _parseData(self, animLengthInFrame, startFrame, endFrame, node, interpolation, translationCurveNode, rotationCurveNode, scalingCurveNode, animationData):
        timeList = []
        translationValueList = []
        rotationValueList = []
        scalingValueList = []

        isCamera = False

        if self._isCamera(node):
            isCamera = True

        for i in range(animLengthInFrame):
            time = FbxTime()
            time.SetFrame(startFrame + i, self._timeMode)


            addFloor(timeList, time.GetSecondDouble(), 3)
            currTransform = node.EvaluateLocalTransform(time)

            if self._hasCurveData(translationCurveNode):
                addVector3Data(translationValueList, currTransform.GetT())
            if self._hasCurveData(rotationCurveNode):
                fbxQ = None

                # camera transform should rotate -90 by y axis
                if isCamera:
                    fbxQ = rotate90ByYAxis(currTransform.GetQ())
                else:
                    fbxQ = currTransform.GetQ()

                addVector4Data(rotationValueList, fbxQ)

            if self._hasCurveData(scalingCurveNode):
                addVector3Data(scalingValueList, currTransform.GetS())

        if len(translationValueList) > 0:
            self._addData(animationData, getObjectId(node), "translation", interpolation, timeList, translationValueList)

        if len(rotationValueList) > 0:
            self._addData(animationData, getObjectId(node), "rotation", interpolation, timeList, rotationValueList)

        if len(scalingValueList) > 0:
            self._addData(animationData, getObjectId(node), "scale", interpolation, timeList, scalingValueList)


    def _parseInterpolation(self, curveWhichHasData):
        # print (curveWhichHasData)
        # return "LINEAR"
        # if curveX.KeyGetInterpolation(0) != curveY.KeyGetInterpolation(0) or curveX.KeyGetInterpolation(0) != curveZ.KeyGetInterpolation(0):
        #     raise AssertionError("the interpolation of one of animation->channels should be the same")

        # interpolation = curveWhichHasData.KeyGetInterpolation(0)
        #
        # if interpolation == FbxAnimCurveDef.eInterpolationConstant:
        #     return "CONSTANT"
        # elif interpolation == FbxAnimCurveDef.eInterpolationLinear:
        #     return "LINEAR"
        # elif interpolation == FbxAnimCurveDef.eInterpolationCubic:
        #     return "CUBIC"
        # else:
        #     raise AssertionError("unknow interpolation:%d" % interpolation)

        return "LINEAR"

    def _addData(self, animationData, nodeId, path, interpolation, timeList, valueList):
        channels = None

        if not animationData.has_key("channels"):
            channels = []
            animationData["channels"] = channels
        else:
            channels = animationData["channels"]


        if not animationData.has_key("parameters"):
            animationData["parameters"] = {}

        if not animationData.has_key("samplers"):
            animationData["samplers"] = {}

        if not animationData["parameters"].has_key("TIME"):
            animationData["parameters"]["TIME"] = timeList
        else:
            # TODO asset time data should be equal
            if len(animationData["parameters"]["TIME"]) != len(timeList):
                raise AssertionError("exist TIME.len should equal timeList.len")


        index = self._findParameterDataIndex(path, animationData)

        samplerId = self._getSamplerId(path, index)

        channels.append({
            "sampler": samplerId,
            "target": {
                "id": nodeId,
                "path": path
            }
        })

        # if animationData["parameters"].has_key(path):
        #     print(path)
        # raise AssertionError("parameters->%s shouldn't be defined before" % path)

        parameterDataKey = self._getParameterDataKey(path, index)

        animationData["parameters"][parameterDataKey] = valueList

        # if animationData["samplers"].has_key(samplerId):
        #     print(samplerId)
        # raise AssertionError("samplers->%s shouldn't be defined before" % samplerId)

        animationData["samplers"][samplerId] = {
            "input": "TIME",
            "interpolation": interpolation,
            "output": parameterDataKey
        }

    def _getParameterDataKey(self, path, index):
        if index == 0:
            return path

        return path + str(index)

    def _getSamplerId(self, path, index):
        if index == 0:
            return "%s_%s_sampler" % (self._animationName, path)

        return "%s_%s%d_sampler" % (self._animationName, path, index)


    def _findParameterDataIndex(self, path, animationData):
        parameters = animationData["parameters"]

        index = 0
        key = path

        while True:
            if not parameters.has_key(key):
                break

            index += 1
            key += str(index)

        return index

