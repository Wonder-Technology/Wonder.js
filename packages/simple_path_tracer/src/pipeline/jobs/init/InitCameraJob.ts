import { getWebGPU, setCamera } from "../../../data/Repo"
import { invert, createIdentityMatrix4 } from "../../../math/Matrix4";
import { scene, gameObject, basicCameraView, perspectiveCameraProjection } from "../../../scene/SceneGraphConverter";

let _buildCameraBufferData = device => {
    let bufferData = new Float32Array(16 + 16 + 4);
    let bufferSize = bufferData.byteLength;

    let buffer = device.createBuffer({
        size: bufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    return [buffer, bufferData];
}

let _updateCameraBufferData = (viewInverse, projectionInverse, near, far, [buffer, bufferData]) => {
    bufferData.set(viewInverse, 0);
    bufferData.set(projectionInverse, 16);
    bufferData[16 + 16] = near;
    bufferData[16 + 16 + 1] = far;

    buffer.setSubData(0, bufferData);
}

export let exec = () => {
    let { device } = getWebGPU();

    let [buffer, bufferData] = _buildCameraBufferData(device)

    let cameraGameObject = scene.getActiveCamera();

    let activeCameraView = gameObject.getBasicCameraView(cameraGameObject);
    let cameraProjection = gameObject.getPerspectiveCameraProjection(cameraGameObject) ;
    
    _updateCameraBufferData(
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

    setCamera({
        cameraBufferData: [buffer, bufferData]
    });
}