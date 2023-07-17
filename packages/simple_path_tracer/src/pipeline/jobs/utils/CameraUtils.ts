export let updateCameraBufferData = (device, viewInverse, projectionInverse, near, far, [buffer, bufferData]) => {
    bufferData.set(viewInverse, 0);
    bufferData.set(projectionInverse, 16);
    bufferData[16 + 16] = near;
    bufferData[16 + 16 + 1] = far;

    device.queue.writeBuffer(buffer, 0, bufferData)
}