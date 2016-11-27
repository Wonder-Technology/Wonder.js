import os
import math

from fbx import *
from globalDefine import *




# #####################################################
# Helpers
# #####################################################
def getRadians(v):
    return ((v[0]*math.pi)/180, (v[1]*math.pi)/180, (v[2]*math.pi)/180)

# def getHex(c):
#     color = (int(c[0]*255) << 16) + (int(c[1]*255) << 8) + int(c[2]*255)
#     return int(color)


# #####################################################
# Object Name Helpers
# #####################################################
def hasUniqueName(o, class_id):
    scene = o.GetScene()
    object_name = o.GetName()
    object_id = o.GetUniqueID()

    object_count = scene.GetSrcObjectCount(FbxCriteria.ObjectType(class_id))

    for i in range(object_count):
        other = scene.GetSrcObject(FbxCriteria.ObjectType(class_id), i)
        other_id = other.GetUniqueID()
        other_name = other.GetName()

        if other_id == object_id:
            continue
        if other_name == object_name:
            return False

    return True

def getObjectId(o, forcePrefix = True, defaultName = "defaultName"):
    return _getId(o, FbxNode.ClassId, "Object", forcePrefix, defaultName)

def getMaterialId(o, forcePrefix = True, defaultName = "defaultMaterialName"):
    return _getId(o, FbxSurfaceMaterial.ClassId, "Material", forcePrefix, defaultName)

def getAnimationId(animStack, forcePrefix = True, defaultName = "defaultAnimName"):
    name = animStack.GetName()

    if name:
        return name

    return _getId(animStack, FbxAnimStack.ClassId, "Animation", forcePrefix, defaultName)


def getTextureId(t, forcePrefix = True):
    if type(t) is FbxFileTexture:
        texture_file = t.GetFileName()
        # texture_id = os.path.splitext(os.path.basename(texture_file))[0]
        texture_id = getBaseName(texture_file).split(".")[0]
    else:
        texture_id = t.GetName()
        if texture_id == "_empty_":
            texture_id = ""
    prefix = ""
    # if option_prefix or force_prefix:
    if forcePrefix:
        prefix = "Texture_%s_" % t.GetUniqueID()
        if len(texture_id) == 0:
            prefix = prefix[0:len(prefix)-1]
    return prefix + texture_id


def getBaseName(uri):
    index = uri.rfind( '/' )
    if index == -1:
        index = uri.rfind( '\\' )

    return uri[ index+1 : len(uri) ]


import urlparse
import posixpath

def getRelativeUrl(destination, source):
    u_dest = urlparse.urlsplit(destination)
    u_src = urlparse.urlsplit(source)

    _uc1 = urlparse.urlunsplit(u_dest[:2] + tuple('' for i in range(3)))
    _uc2 = urlparse.urlunsplit(u_src[:2] + tuple('' for i in range(3)))

    if _uc1 != _uc2:
        ## This is a different domain
        return destination

    _relpath = posixpath.relpath(u_dest.path, posixpath.dirname(u_src.path))

    return urlparse.urlunsplit(('', '', _relpath, u_dest.query, u_dest.fragment))


def getSamplerId(textureId):
    return textureId.replace("Texture_", "Sampler_")

def getImageId(textureId):
    return textureId.replace("Texture_", "Image_")

def _getId(o, classId, typeName, forcePrefix = False, defaultName = "defaultMaterialName"):
    if not o:
        return ""

    object_name = o.GetName()
    object_id = o.GetUniqueID()

    if not forcePrefix:
        forcePrefix = not hasUniqueName(o, classId)

    prefix = ""
    # if option_prefix or force_prefix:
    if forcePrefix:
        prefix = "%s_%s_" % (typeName,object_id)


    name = prefix + object_name

    if name == "":
        return defaultName

    return name

def getName(o):
    return o.GetName()

def setName(o, dict):
    name = o.GetName()

    if name != None and name != "":
        dict["name"] = name

def getPrefixedName(o, prefix):
    return (prefix + '_%s_') % o.GetUniqueID() + o.GetName()


def addFloor(list, data, digit = PRECISE_DIGIT):
    list.append(floorValue(data, digit))

def floorValue(value, digit = PRECISE_DIGIT):
    d = pow(10, digit)

    return math.floor(d * value) / d

def addVector2Data(list, vec2Data):
    list.append(roundUtil(vec2Data[0]))
    list.append(roundUtil(vec2Data[1]))

    return list

def addVector3Data(list, vec3Data):
    list.append(roundUtil(vec3Data[0]))
    list.append(roundUtil(vec3Data[1]))
    list.append(roundUtil(vec3Data[2]))

    return list



def addVector4Data(list, vec4Data, digit = PRECISE_DIGIT):
    list.append(roundUtil(vec4Data[0], digit))
    list.append(roundUtil(vec4Data[1], digit))
    list.append(roundUtil(vec4Data[2], digit))
    list.append(roundUtil(vec4Data[3], digit))

    return list

def roundUtil(data, digit = PRECISE_DIGIT):
    if math.fabs(data) < 0.0001:
        return 0

    return round(data, digit)


def convertDegreeToRadians(a):
    return a * math.pi / 180.0

#define GLTF_ANGLE(a) \
# GetIOSettings ()->GetBoolProp (IOSN_FBX_GLTF_ANGLEINDEGREE, false) ? a : DEG2RAD(a)


def convertHFOVToVFOV(h, ar):

    return 2.0 * math.atan ((ar) * math.tan ((h * FBXSDK_PI_DIV_180) * 0.5)) * FBXSDK_180_DIV_PI


# def getGLTFAngle(angle):
#     sdkManager.GetIOSettings().GetBoolProp (IOSN_FBX_GLTF_ANGLEINDEGREE, false) ? a : DEG2RAD(a)
#
#
#

