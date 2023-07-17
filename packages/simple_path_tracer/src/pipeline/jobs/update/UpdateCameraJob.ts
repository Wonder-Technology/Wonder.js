import { basicCameraView, gameObject, perspectiveCameraProjection, scene, transform } from "../../../scene/SceneGraphConverter";
import { invert, createIdentityMatrix4 } from "../../../math/Matrix4";
import { updateCameraBufferData } from "../utils/CameraUtils";
import { getCamera, getWebGPU } from "../../../data/Repo";

export let exec = () => {
    let { device } = getWebGPU();

    let cameraGameObject = scene.getActiveCamera();

    transform.update(gameObject.getTransform(cameraGameObject))


    let activeCameraView = gameObject.getBasicCameraView(cameraGameObject);
    let cameraProjection = gameObject.getPerspectiveCameraProjection(cameraGameObject);

    let { cameraBufferData } = getCamera()
    let [buffer, bufferData] = cameraBufferData

    updateCameraBufferData(
        device,
        invert(
            createIdentityMatrix4(),
            basicCameraView.getViewWorldToCameraMatrix(
                activeCameraView
            )
        ),
        invert(
            createIdentityMatrix4(),
            perspectiveCameraProjection.getPMatrix(
                cameraProjection
            )
        ),
        perspectiveCameraProjection.getNear(cameraProjection),
        perspectiveCameraProjection.getFar(cameraProjection),
        [buffer, bufferData]
    );
}