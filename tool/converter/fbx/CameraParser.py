from fbx import *
from utils import *

class CameraParser(object):
    def __init__(self, output):
        self._output = output

    def parse(self, node, cameraData):
        camera = node.GetCamera()

        projectionType = camera.ProjectionType.Get()

        cameraTypeData = {}

        if projectionType == 0:
            cameraData["type"] = "perspective"

            cameraTypeData["aspectRatio"] = floorValue(camera.FilmAspectRatio.Get())
            cameraTypeData["yfov"] = floorValue(self._getFovY(camera))
            cameraTypeData["zfar"] = floorValue(camera.FarPlane.Get())
            cameraTypeData["znear"] = floorValue(camera.NearPlane.Get())

            cameraData["perspective"] = cameraTypeData
        elif projectionType == 1:
            cameraData["type"] = "orthographic"

            cameraTypeData["xmag"] = floorValue(camera.OrthoZoom.Get())
            # FBX Collada reader set OrthoZoom using xmag and ymag each time they appear
            cameraTypeData["ymag"] = floorValue(camera.OrthoZoom.Get())
            cameraTypeData["zfar"] = floorValue(camera.FarPlane.Get())
            cameraTypeData["znear"] = floorValue(camera.NearPlane.Get())

            cameraData["orthographic"] = cameraTypeData



    def _getFovY(self, camera):
        apertureMode = camera.GetApertureMode()
        # Camera aperture modes. The aperture mode determines which values drive the camera aperture.
        # If the aperture mode is eHORIZONTAL_AND_VERTICAL, then the FOVX and FOVY is used.
        # If the aperture mode is eHORIZONTAL or eVERTICAL, then the FOV is used.
        # if the aperture mode is eFOCAL_LENGTH, then the focal length is used.

        # Get the aperture ratio
        filmWidth = camera.GetApertureWidth()
        filmHeight = camera.GetApertureHeight()
        # TODO why not width / height?
        apertureRatio = filmHeight / filmWidth

        focalAngle = None

        # print ("mode:", apertureMode)

        # FbxCamera::eHorizAndVert
        # Fit the resolution gate within the film gate
        if apertureMode == 0:
            focalAngle =  camera.FieldOfViewY.Get()

        # FbxCamera::eHorizontal:
        # Fit the resolution gate horizontally within the film gate
        elif apertureMode == 1:
            focalAngleX = camera.FieldOfView.Get()
            focalAngle = convertHFOVToVFOV (focalAngleX, apertureRatio)

        # FbxCamera::eVertical:
        # Fit the resolution gate vertically within the film gate
        elif apertureMode == 2:
            # focalAngle = camera.FieldOfView.Get()
            focalAngle = camera.FieldOfView.Get()
            pass
        # FbxCamera::eFocalLength:
        # Fit the resolution gate according to the focal length
        elif apertureMode == 3:
            # get HFOV
            focalAngleX = camera.ComputeFieldOfView(camera.FocalLength.Get())
            focalAngle = convertHFOVToVFOV (focalAngleX, apertureRatio)
        else:
            raise AssertionError("unknow apertureMode:%d" % apertureMode)

        return convertDegreeToRadians(focalAngle)
