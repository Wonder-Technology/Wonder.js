import THREE from "three";
// import { log } from "./log/Log";
import { createSphere, createPlane } from "./scene/Primitive";
import { getConfig, setConfig, setScene, getPass, getWebGPU } from "./data/Repo";
import { createCamera } from "./scene/Camera";
import { exec as init } from "./pipeline/InitPipeline";
import { exec as update } from "./pipeline/UpdatePipeline";
import { exec as render } from "./pipeline/RenderPipeline";
import { createRectAreaLight } from "./scene/AreaLight";

// import path from "path"
// import fs from "fs"
// import { performance } from 'perf_hooks';

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const { createCanvas } = require('canvas')

// import WebGPU from "wonder-webgpu";

let _buildScene = () => {
    let scene = new THREE.Scene();

    let camera = createCamera({
        localPosition: [0.01, 3.01, 12],
        lookAt: [0, 0, 0]
    });

    scene.add(createPlane({
        localPosition: [0, 0, -5],
        //   localEulerAngles: [-180, 0, 0],
        localEulerAngles: [0, 0, 0],
        width: 10,
        height: 10,
    }, {
        color: [0.7, 0.7, 0.7]
    }, null));
    // scene.add(createPlane({
    //     localPosition: [0, -5, 0],
    //     // localEulerAngles: [90, 0, 0],
    //     localEulerAngles: [-90, 0, 0],
    //     width: 10,
    //     height: 10,
    // }, null, {
    // }));
    // scene.add(createPlane({
    //     localPosition: [0, 5, 0],
    //     // localEulerAngles: [-90, 0, 0],
    //     localEulerAngles: [90, 0, 0],
    //     width: 10,
    //     height: 10,
    // }, {
    //     color: [0.7, 0.7, 0.7]
    // }));
    // scene.add(createPlane({
    //     localPosition: [-5, 0, 0],
    //     localEulerAngles: [0, 90, 0],
    //     width: 10,
    //     height: 10,
    // }, {
    //     color: [1.0, 0.0, 0.0]
    // }));
    // scene.add(createPlane({
    //     localPosition: [5, 0, 0],
    //     localEulerAngles: [0, -90, 0],
    //     // localEulerAngles: [0, 90, 0],
    //     width: 10,
    //     height: 10,
    // }, {
    //     color: [0.0, 1.0, 0.0]
    // }));

    // scene.add(createSphere({
    //     localPosition: [0, -3.9, 0],
    //     localEulerAngles: [0, 0, 0],
    //     radius: 1,
    // }, null, {
    // }));


    scene.add(createRectAreaLight({
        localPosition: [0, 4.99, 0],
        localEulerAngles: [90, 0, 0],
        width: 2,
        height: 2,
        lemit: [10.0, 10.0, 10.0]
    }));

    return [camera, scene];
}

// let _generateImage = async (imageDir) => {
//     let { width, height } = getConfig();
//     let canvas = createCanvas(width, height);
//     let context = canvas.getContext("2d");

//     let { commonDataBufferData } = getPass();

//     let [_, bufferData] = commonDataBufferData;
//     let totalSampleCount = bufferData[1];

//     let _getPixelColorData = async (totalSampleCount) => {
//         let { pixelBufferData, commonDataBufferData } = getPass();

//         let [buffer, bufferSize] = pixelBufferData;

//         let { device, queue } = getWebGPU();

//         // Get a GPU buffer for reading in an unmapped state.
//         const gpuReadBuffer = device.createBuffer({
//             size: bufferSize,
//             usage: WebGPU.GPUBufferUsage.COPY_DST | WebGPU.GPUBufferUsage.MAP_READ
//         });

//         let commandEncoder = device.createCommandEncoder({});

//         // Encode commands for copying buffer to buffer.
//         commandEncoder.copyBufferToBuffer(
//             buffer /* source buffer */,
//             0 /* source offset */,
//             gpuReadBuffer /* destination buffer */,
//             0 /* destination offset */,
//             bufferSize /* size */
//         );

//         // Submit GPU commands.
//         const gpuCommands = commandEncoder.finish();
//         queue.submit([gpuCommands]);


//         // Read buffer.
//         const gpuReadBufferView = await gpuReadBuffer.mapReadAsync();

//         return new Float32Array(gpuReadBufferView).map((value, index) => {
//             if (index % 4 !== 3) {
//                 return value / totalSampleCount;
//             }

//             return value;
//         });
//     }

//     let _flipY = (pixelColorData, width, height) => {
//         let pixelColorDataCopy = pixelColorData.slice();

//         for (let i = 0; i < pixelColorData.length; i += 4) {
//             let pixelIndex = i / 4;
//             let heightIndex = Math.floor(pixelIndex / width);
//             let pixelIndexInRow = pixelIndex % width;
//             let index = (height - heightIndex - 1) * width * 4 + pixelIndexInRow * 4;

//             pixelColorData[i] = pixelColorDataCopy[index];
//             pixelColorData[i + 1] = pixelColorDataCopy[index + 1];
//             pixelColorData[i + 2] = pixelColorDataCopy[index + 2];
//             pixelColorData[i + 3] = pixelColorDataCopy[index + 3];
//         }

//         return pixelColorData;
//     }

//     let pixelColorData = _flipY(await _getPixelColorData(totalSampleCount), width, height);

//     let imageData = context.createImageData(
//         width, height
//     );


//     for (let i = 0; i < imageData.data.length; i += 4) {
//         imageData.data[i] = pixelColorData[i] * 255;
//         imageData.data[i + 1] = pixelColorData[i + 1] * 255;
//         imageData.data[i + 2] = pixelColorData[i + 2] * 255;
//         imageData.data[i + 3] = pixelColorData[i + 3] * 255;
//     }

//     context.putImageData(
//         imageData, 0, 0
//     );

//     const imageBuffer = canvas.toBuffer('image/png')
//     fs.writeFileSync(path.join(imageDir, "image_" + String(totalSampleCount) + ".png"), imageBuffer)
// }

// let _loopAndGenerateImage = async (frameCount, isRender) => {
//     setConfig({ ...getConfig(), isRender });

//     let startTime = performance.now();

//     for (let i = 0; i < frameCount; i++) {
//         update();
//         render();

//         // console.log("目前渲染时间：", Math.floor((performance.now() - startTime) / 1000), "秒");
//         console.log("当前进度：", String(Math.floor(i / frameCount * 10000) / 100) + "%");
//     }

//     // console.log("总渲染时间：", Math.floor((performance.now() - startTime) / 1000), "秒");

//     await _generateImage(path.join(process.cwd(), "lessons/specular_reflection/output"));
// }

let _main = async () => {
    // setConfig({ width: 640, height: 480, isRender: true });
    setConfig({ width: 640, height: 480 });

    let [camera, scene] = _buildScene();

    camera.updateMatrixWorld();
    scene.updateMatrixWorld();

    setScene({
        camera,
        scene
    });

    await init();


    function frame() {
        update();
        render();

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    // await _loopAndGenerateImage(1, false);
    // await _loopAndGenerateImage(100, false);
    // await _loopAndGenerateImage(120, false);
    // await _loopAndGenerateImage(5000, false);
}

_main().then(() => {
    // console.log("当前进度：100%, 完成！");
});