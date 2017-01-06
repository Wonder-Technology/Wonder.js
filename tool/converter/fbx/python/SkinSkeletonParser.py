from fbx import *
from utils import *

class SkinSkeletonParser:
    def __init__(self):
        self.hasSkin = False
        self._currentSkinData = None
        self._currentSkinName = None
        self._clusters = {}

        pass

    def checkHasSkin(self, mesh):
        self.hasSkin = mesh.GetDeformerCount(FbxDeformer.eSkin) > 0

    def reset(self):
        self.hasSkin = False
        self._currentSkinData = None
        self._currentSkinName = None
        self._clusters = {}

    def createSkin(self, output):
        lSkinName = "skin_" + str(len(output["skins"].keys()))

        # https://github.com/KhronosGroup/glTF/issues/100
        self._currentSkinData = {
            # TODO parse from fbx
            # parse bind shape matrix:
            # http://www.gamedev.net/topic/574309-solved-fbx-animation-problems/
            # refer to babylonjs->SkinInfo.cpp->bindPoses ?
            "bindShapeMatrix" : [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            "inverseBindMatrices" :[],
            "jointNames" : []
        }

        output["skins"][lSkinName] = self._currentSkinData

        self._currentSkinName = lSkinName

        return lSkinName

    def getSkinAttributeData(self, mesh):
        lJoints = []
        lWeights = []
        # Count joint number of each vertex
        lJointCounts = []

        lControlPointsCount = mesh.GetControlPointsCount()

        pSkin = self._currentSkinData

        for i in range(lControlPointsCount):
            lWeights.append([0, 0, 0, 0])
            # lJoints.append([0, 0, 0, 0])
            lJoints.append([-1,-1,-1,-1])
            lJointCounts.append(0)

        for i in range(mesh.GetDeformerCount(FbxDeformer.eSkin)):
            lDeformer = mesh.GetDeformer(i, FbxDeformer.eSkin)

            for i2 in range(lDeformer.GetClusterCount()):
                lCluster = lDeformer.GetCluster(i2)
                lNode = lCluster.GetLink()
                lJointIndex = -1

                if not self._getJointName(lNode) in pSkin["jointNames"]:
                    lJointIndex = len(pSkin["jointNames"])
                    pSkin["jointNames"].append(self._getJointName(lNode))

                    self._clusters[self._getJointName(lNode)] = lCluster
                else:
                    lJointIndex = pSkin["jointNames"].index(self._getJointName(lNode))

                lControlPointIndices = lCluster.GetControlPointIndices()
                lControlPointWeights = lCluster.GetControlPointWeights()

                for i3 in range(lCluster.GetControlPointIndicesCount()):
                    lControlPointIndex = lControlPointIndices[i3]
                    lControlPointWeight = lControlPointWeights[i3]
                    lJointCount = lJointCounts[lControlPointIndex]
                    # At most binding four joint per vertex
                    if lJointCount <= 3:
                        # Joint index
                        lJoints[lControlPointIndex][lJointCount] = lJointIndex
                        ## Weight is FLOAT_3 because it is normalized
                        # if lJointCount < 3:
                        lWeights[lControlPointIndex][lJointCount] = lControlPointWeight
                        lJointCounts[lControlPointIndex] += 1


            # lWeights.append([0, 0, 0, 0])

            return self._flatData(lJoints), self._flatData(lWeights)

    def parse(self, nodeData, fbxAllNodes):
        roots = []

        nodeData["skeletons"] = roots
        nodeData["skin"] = self._currentSkinName

        lGLTFSkin = self._currentSkinData
        lClusters = self._clusters
        lExtraJoints = []

        # Find Root
        for lJointName in lGLTFSkin["jointNames"]:
            lCluster = lClusters[lJointName]
            lLink = lCluster.GetLink()
            lParent = lLink
            lRootFound = False
            # if lParent == None or not lParent.GetName() in lGLTFSkin["joints"]:
            #     if not lParent.GetName() in roots:
            #         roots.append(lLink.GetName())
            while not lParent == None:
                lSkeleton = lParent.GetSkeleton()
                if lSkeleton == None:
                    break
                # In case some skeleton is not a attached to any vertices(not a cluster)
                # PENDING
                if not self._getJointName(lParent) in lGLTFSkin["jointNames"] and not self._getJointName(lParent) in lExtraJoints:
                    lExtraJoints.append(self._getJointName(lParent))

                if lSkeleton.IsSkeletonRoot():
                    lRootFound = True
                    break
                lParent = lParent.GetParent()

            if lRootFound:
                if not self._getJointName(lParent) in roots:
                    roots.append(self._getJointName(lParent))
            else:
                # if IsSkeletonRoot not works well, try this way:
                # which do not have a parent or its parent is not in skin
                lParent = lLink.GetParent()
                if lParent == None or not self._getJointName(lParent) in lGLTFSkin["joints"]:
                    if not self._getJointName(lLink) in roots:
                        roots.append(self._getJointName(lLink))

        # TODO support multi root skeletons
        if len(roots) > 1:
            print("not support multi root skeletons, only use the first root skeleton")
        # lRootNode = fbxAllNodes[str(roots[0])]
        # lRootNodeTransform = lRootNode.GetParent().EvaluateGlobalTransform()




        lClusterGlobalInitMatrix = FbxAMatrix()
        lReferenceGlobalInitMatrix = FbxAMatrix()

        for i in range(len(lGLTFSkin["jointNames"])):
            lJointName = lGLTFSkin["jointNames"][i]
            lCluster = lClusters[lJointName]

            # Inverse Bind Pose Matrix
            lCluster.GetTransformMatrix(lReferenceGlobalInitMatrix)
            lCluster.GetTransformLinkMatrix(lClusterGlobalInitMatrix)
            # http://blog.csdn.net/bugrunner/article/details/7232291
            # m = lClusterGlobalInitMatrix.Inverse() * lReferenceGlobalInitMatrix * lRootNodeTransform
            m = lClusterGlobalInitMatrix.Inverse() * lReferenceGlobalInitMatrix


            for i in range(4):
                row = m.GetRow(i)
                addVector4Data(lGLTFSkin["inverseBindMatrices"], row)

        for i in range(len(lExtraJoints)):
            for x in [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]:
                lGLTFSkin["inverseBindMatrices"].append(x)

        lGLTFSkin["jointNames"] += lExtraJoints

    def setJointName(self, node, nodeData):
        nodeData["jointName"] = self._getJointName(node)

    def _getJointName(self, node):
        return getObjectId(node)

    def _flatData(self, skinPrimitiveData):
        result = []

        for x in skinPrimitiveData:
            result.append(x[0])
            result.append(x[1])
            result.append(x[2])
            result.append(x[3])

        return result

