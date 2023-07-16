// import { getAllRenderGameObjectData } from "../scene/Scene";
// import { getC, getR, getW } from "../scene/Geometry"
// import { computeRingAABB } from "../math/AABB2D";
// import { createBuffer } from "../webgpu/Buffer";
// import { getColor } from "../scene/Material";
// import { getLayer, getLocalPosition } from "../scene/Transform";
import * as BVH2D from "../math/MiddleBVH2D";
import * as Acceleration from "../math/Acceleration";
import { flatten } from "../math/Array";
import { applyMatrix4 } from "../pipeline/jobs/utils/Vector4Utils";
import { setFromVertices } from "../math/AABB";
import { scene, gameObject as gameObjectConverter, geometry as geometryConverter, transform as transformConverter, brdfLambertianMaterial as brdfLambertianMaterialConverter, brdfSpecularReflectionMaterial as brdfSpecularReflectionMaterialConverter, areaLight as areaLightConverter } from "../scene/SceneGraphConverter";
import { createBuffer } from "../pipeline/jobs/utils/Buffer";
import { concat } from "../pipeline/jobs/utils/Uint32ArrayUtils";
// import { concat } from "../utils/Uint32ArrayUtils";

// let _addPaddingData = () => {
// return 1 as any
// }

let _convertVerticesFromLocalToWorld = (vertices, index, localToWorldMatrix) => {
    let result = applyMatrix4(
        [vertices[index * 3], vertices[index * 3 + 1], vertices[index * 3 + 2], 1.0], localToWorldMatrix
    );

    result.pop();

    return result;
}


export let buildSceneAccelerationStructureBufferData = (device) => {
    let allRenderGeometryData = gameObjectConverter.getAllGameObjectGeometryData(scene.getScene());

    let allAABBData =
        allRenderGeometryData.reduce((result, [gameObject, geometry], geometryIndex) => {
            let vertices = geometryConverter.getVertices(geometry);
            let indices = geometryConverter.getIndices(geometry);

            let localToWorldMatrix = transformConverter.getLocalToWorldMatrix(gameObjectConverter.getTransform(gameObject));

            // console.log(
            //     vertices, indices
            // )

            let primitiveIndex = 0;

            for (let i = 0; i < indices.length; i += 3) {
                let index0 = indices[i];
                let index1 = indices[i + 1];
                let index2 = indices[i + 2];

                // console.log(
                //     index0, index1, index2
                // )

                let worldVertices0 = _convertVerticesFromLocalToWorld(vertices, index0, localToWorldMatrix);
                let worldVertices1 = _convertVerticesFromLocalToWorld(vertices, index1, localToWorldMatrix);
                let worldVertices2 = _convertVerticesFromLocalToWorld(vertices, index2, localToWorldMatrix);

                let aabb = setFromVertices(
                    worldVertices0.concat(worldVertices1, worldVertices2)
                );

                result.push(
                    {
                        aabb,
                        primitiveIndex,
                        // TODO use instanceIndex
                        instanceIndex: geometryIndex,
                        triangle: {
                            p0WorldPosition: worldVertices0,
                            p1WorldPosition: worldVertices1,
                            p2WorldPosition: worldVertices2,
                        }
                    }
                )

                primitiveIndex += 1;
            }

            return result
        }, [])

    // ( console as any ).profile("build")
    let a1 = performance.now();

    let tree = BVH2D.build(allAABBData, 5, 10)
    let [topLevelArr, bottomLevelArr] = Acceleration.build(tree);

    let a2 = performance.now();

    // ( console as any ).profileEnd()

    // add padding
    topLevelArr = topLevelArr.map((data) => {
        data.push(0)
        data.push(0)

        return data
    })

    let topLevelBufferData = new Float32Array(flatten(topLevelArr))

    let a3 = performance.now()
    // // add padding
    // bottomLevelArr = bottomLevelArr.map((data) => {
    //     data.push(0)
    //     data.push(0)
    //     data.push(0)

    //     return data
    // })
    let a4 = performance.now()

    let bottomLevelBufferData = new Float32Array(flatten(bottomLevelArr))


    console.log(a2 - a1, a3 - a2, a4 - a3)


    let topLevelBuffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, topLevelBufferData)


    let bottomLevelBuffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bottomLevelBufferData)


    return [
        topLevelBuffer, topLevelBufferData.byteLength,
        bottomLevelBuffer, bottomLevelBufferData.byteLength
    ];
}

let _findIndex = (component, components) => {
    return components.reduce((result, c, index) => {
        if (c === component) {
            result = index;
        }

        return result;
    }, -1);
};

let _setMat3Data = (bufferDataArr, index, mat3) => {
    bufferDataArr[index] = mat3[0];
    bufferDataArr[index + 1] = mat3[1];
    bufferDataArr[index + 2] = mat3[2];
    bufferDataArr[index + 3] = 0.0;

    bufferDataArr[index + 4] = mat3[3];
    bufferDataArr[index + 5] = mat3[4];
    bufferDataArr[index + 6] = mat3[5];
    bufferDataArr[index + 7] = 0.0;


    bufferDataArr[index + 8] = mat3[6];
    bufferDataArr[index + 9] = mat3[7];
    bufferDataArr[index + 10] = mat3[8];
    bufferDataArr[index + 11] = 0.0;
}

export let buildSceneInstanceDataBufferData = (device) => {
    let allRenderGameObjects = gameObjectConverter.getAllGeometryGameObjects(scene.getScene());
    let allRenderGeometries = gameObjectConverter.getAllGameObjectGeometries(scene.getScene());
    let allRenderBRDFLambertianMaterials = gameObjectConverter.getAllGameObjectBRDFLambertianMaterials(scene.getScene());
    let allRenderBRDFSpecularReflectionMaterials = gameObjectConverter.getAllGameObjectBRDFSpecularReflectionMaterials(scene.getScene());

    let bufferDataArr = allRenderGameObjects.reduce((bufferDataArr, gameObject) => {
        let materialType = null;
        let materialIndex = null;
        let material = gameObjectConverter.getBRDFLambertianMaterial(gameObject);

        if (material !== null) {
            materialType = brdfLambertianMaterialConverter.getType(material);
            materialIndex = _findIndex(material, allRenderBRDFLambertianMaterials);
        }
        else {
            material = gameObjectConverter.getBRDFSpecularReflectionMaterial(gameObject);
            materialType = brdfSpecularReflectionMaterialConverter.getType(material);
            materialIndex = _findIndex(material, allRenderBRDFSpecularReflectionMaterials);
        }

        bufferDataArr.push(
            _findIndex(gameObjectConverter.getGeometry(gameObject), allRenderGeometries),
            materialIndex,
            materialType,
            0.0
        );

        // console.log(materialIndex, materialType)

        _setMat3Data(bufferDataArr, bufferDataArr.length, transformConverter.getNormalMatrix(gameObjectConverter.getTransform(gameObject)));

        return bufferDataArr;
    }, []);

    let bufferData = new Float32Array(bufferDataArr);

    // console.log(bufferData)

    let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}

let _computeVertexCount = vertices => vertices.length / 3;

let _computeFaceCount = indices => indices.length;

export let buildPointIndexBufferData = (device) => {
    let allRenderGeometries = gameObjectConverter.getAllGameObjectGeometries(scene.getScene());

    let [bufferDataArr, _vertexIndex, _faceIndex] = allRenderGeometries.reduce(([bufferDataArr, vertexIndex, faceIndex], geometry) => {
        bufferDataArr.push(
            vertexIndex,
            faceIndex
        );

        return [
            bufferDataArr,
            vertexIndex + _computeVertexCount(
                geometryConverter.getVertices(geometry)
            ),
            faceIndex + _computeFaceCount(
                geometryConverter.getIndices(geometry)
            )
        ];
    }, [[], 0, 0]);

    // let bufferData = new Uint32Array(bufferDataArr);
    let bufferData = new Float32Array(bufferDataArr);

    // console.log(bufferData)

    let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}

export let buildVertexBufferData = (device) => {
    let allRenderGeometries = gameObjectConverter.getAllGameObjectGeometries(scene.getScene());

    let bufferDataArr = allRenderGeometries.reduce((bufferDataArr, geometry) => {
        let normals = geometryConverter.getNormals(geometry);

        for (let i = 0; i < normals.length; i += 3) {
            bufferDataArr.push(
                normals[i],
                normals[i + 1],
                normals[i + 2],
                0.0
            )
        }

        return bufferDataArr;
    }, []);

    let bufferData = new Float32Array(bufferDataArr);

    // console.log(bufferData)

    let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}

export let buildIndexBufferData = (device) => {
    let allRenderGeometries = gameObjectConverter.getAllGameObjectGeometries(scene.getScene());

    let bufferDataArr = allRenderGeometries.reduce((bufferDataArr, geometry) => {
        let indices = geometryConverter.getIndices(geometry);

        return concat(bufferDataArr, indices)
    }, []);

    // let bufferData = new Uint32Array(bufferDataArr);
    let bufferData = new Float32Array(bufferDataArr);

    // console.log(bufferData)

    let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}

let _convertBoolToFloat = boolValue => boolValue ? 1.0 : 0.0;

//refer to: [Require buffer bindings to have non-zero size](https://github.com/gpuweb/gpuweb/pull/2419)
let _addDefaultBRDFLambertianMaterial = (bufferDataArr) => {
    bufferDataArr.push(
        0, 0, 0, 0
    );

    return bufferDataArr
}

export let buildBRDFLambertianMaterialBufferData = (device) => {
    let allRenderBRDFLambertianMaterials = gameObjectConverter.getAllGameObjectBRDFLambertianMaterials(scene.getScene());

    let bufferDataArr = allRenderBRDFLambertianMaterials.reduce((bufferDataArr, material) => {
        let diffuseColor = brdfLambertianMaterialConverter.getDiffuseColor(material);

        bufferDataArr.push(
            diffuseColor[0],
            diffuseColor[1],
            diffuseColor[2],
        );
        bufferDataArr.push(
            _convertBoolToFloat(brdfLambertianMaterialConverter.isRectAreaLight(material))
        );

        return bufferDataArr;
    }, []);

    let i = allRenderBRDFLambertianMaterials.length
    while (i <= 10) {
        bufferDataArr = _addDefaultBRDFLambertianMaterial(bufferDataArr)

        i += 1
    }

    let bufferData = new Float32Array(bufferDataArr);

    let buffer = createBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}

let _addDefaultBRDFSpecularMaterial = (bufferDataArr) => {
    bufferDataArr.push(
        0, 0, 0, 0
    );

    return bufferDataArr
}

export let buildBRDFSpecularReflectionMaterialBufferData = (device) => {
    let allRenderBRDFSpecularReflectionMaterials = gameObjectConverter.getAllGameObjectBRDFSpecularReflectionMaterials(scene.getScene());

    let bufferDataArr = allRenderBRDFSpecularReflectionMaterials.reduce((bufferDataArr, material) => {
        bufferDataArr.push(
            _convertBoolToFloat(brdfSpecularReflectionMaterialConverter.isRectAreaLight(material)),
            0,
            0,
            0
        );

        return bufferDataArr;
    }, []);

    let i = allRenderBRDFSpecularReflectionMaterials.length
    while (i <= 10) {
        bufferDataArr = _addDefaultBRDFSpecularMaterial(bufferDataArr)

        i += 1
    }

    let bufferData = new Float32Array(bufferDataArr);

    // console.log("aa:",bufferData);

    // let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)
    let buffer = createBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}


export let buildRectAreaLightBufferData = device => {
    let light = areaLightConverter.getRectAreaLight(scene.getScene())

    let bufferData = null;
    if (!light) {
        bufferData = new Float32Array(4 + 4 + 3 * 4 + 4 * 4);
    }
    else {
        let gameObject = areaLightConverter.getGameObject(light);
        let transform = gameObjectConverter.getTransform(gameObject);

        let bufferDataArr = [];

        bufferDataArr = bufferDataArr.concat(areaLightConverter.getLemit(light));
        bufferDataArr.push(0);

        let [width, height] = areaLightConverter.getSize(light);
        bufferDataArr.push(
            -width / 2,
            width / 2,
            -height / 2,
            height / 2
        );

        _setMat3Data(bufferDataArr, bufferDataArr.length, transformConverter.getNormalMatrix(transform));

        let localToWorldMatrix = transformConverter.getLocalToWorldMatrix(transform);
        bufferDataArr = bufferDataArr.concat(localToWorldMatrix);

        bufferData = new Float32Array(bufferDataArr);
    }

    let buffer = createBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData.byteLength];
}