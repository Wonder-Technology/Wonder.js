from fbx import *

# #####################################################
# Helpers
# #####################################################
def getRadians(v):
    return ((v[0]*math.pi)/180, (v[1]*math.pi)/180, (v[2]*math.pi)/180)

def getHex(c):
    color = (int(c[0]*255) << 16) + (int(c[1]*255) << 8) + int(c[2]*255)
    return int(color)


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

def getObjectName(o, force_prefix = False):
    if not o:
        return ""

    object_name = o.GetName()
    object_id = o.GetUniqueID()

    if not force_prefix:
        force_prefix = not hasUniqueName(o, FbxNode.ClassId)

    prefix = ""
    # if option_prefix or force_prefix:
    if force_prefix:
        prefix = "Object_%s_" % object_id

    return prefix + object_name

def getPrefixedName(o, prefix):
    return (prefix + '_%s_') % o.GetUniqueID() + o.GetName()
