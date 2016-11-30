from utils import *
import math

def setFromEulerAngles(ex, ey, ez):
    # var
# sx, cx, sy, cy, sz, cz, halfToRad, \
# ex = eulerAngles.x, \
#      ey = eulerAngles.y, \
#           ez = eulerAngles.z;

    halfToRad =  convertDegreeToRadians(0.5)
    ex *= halfToRad
    ey *= halfToRad
    ez *= halfToRad

    sx = math.sin(ex)
    cx = math.cos(ex)
    sy = math.sin(ey)
    cy = math.cos(ey)
    sz = math.sin(ez)
    cz = math.cos(ez)

    result = []

    result.append(sx * cy * cz - cx * sy * sz)
    result.append(cx * sy * cz + sx * cy * sz)
    result.append(cx * cy * sz - sx * sy * cz)
    result.append(cx * cy * cz + sx * sy * sz)

    return result
