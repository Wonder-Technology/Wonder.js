from quaternionHelper import *
from fbx import *

def rotate90ByYAxis(fbxQuaternion):
    q = setFromEulerAngles(0, -90, 0)
    fbxQ = FbxQuaternion(q[0], q[1], q[2], q[3])

    return fbxQuaternion * fbxQ
