from fbx import *
from utils import *

class LightParser(object):
    def __init__(self):
        pass

    def parse(self, node, lightData):
        light = node.GetLight()

        lightTypeData = {}

        lightTypeData["intensity"] = light.Intensity.Get() / 100

        lightTypeData["color"] = addVector3Data([], light.Color.Get())

        type = light.LightType.Get()

        ePoint = 0
        eDirectional = 1
        eSpot = 2
        eArea = 3
        eVolume = 4

        if type == ePoint:
            lightData["type"] = "point"
            self._addAttenuationData(lightTypeData, light)
        elif type == eDirectional:
            lightData["type"] = "directional"
        elif type == eSpot:
            print ("not support spot light")
        else:
            lightData["type"] = "ambient"

        lightData[lightData["type"]] = lightTypeData

    def _addAttenuationData(self, lightData, light):
        decayType = light.DecayType.Get()

        eLinear = 0
        eCubic = 1
        eQuadratic = 2
        eNone = 3

        if light.EnableFarAttenuation.Get():
            lightData["range"] = light.FarAttenuationEnd.Get()

        if decayType == eLinear:
            lightData["linearAttenuation"] = 1
        elif decayType == eCubic:
            # OpenGL doesn't support cubicU( so use quadratic
            lightData["quadraticAttenuation"] = 1
        elif decayType == eQuadratic:
            lightData["quadraticAttenuation"] = 1
        elif decayType == eNone:
            if light.EnableFarAttenuation.Get():
                raise AssertionError("shouldn't EnableFarAttenuation when DecayType == eNone")

            lightData["constantAttenuation"] = 1
