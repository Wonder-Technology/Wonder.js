import { fatal } from "../log/Log";
import { getScene } from "../data/Repo";
import * as THREE from "three";

let _log = (param1, param2) => {
    console.log(param1, param2);
}

let _hasAttribute = (bufferGeometry, attributeName) => {
    return bufferGeometry.getAttribute(attributeName) !== undefined;
};

let _isGeometryHasVertexData = (bufferGeometry) => {
    let attribute = bufferGeometry.getAttribute("position");

    return attribute !== undefined && attribute.count > 0;
}

let _getExistPoints = (bufferGeometry, attributeName) => {
    if (_hasAttribute(bufferGeometry, attributeName)) {
        let result = bufferGeometry.getAttribute(attributeName).array;
        return result;
    }

    fatal(`${attributeName} should exist!`);
}

let _hasIndices = (bufferGeometry) => {
    return bufferGeometry.index !== null;
}

let _getExistIndices = (bufferGeometry) => {
    if (_hasIndices(bufferGeometry)) {
        return bufferGeometry.index.array;
    }

    fatal("geometry should has indices!");
}

let _getFromMatrix3 = (mat3) => {
    return mat3.elements;
}

let _getFromMatrix4 = (mat4) => {
    return mat4.elements;
}

export let scene = {
    getScene: () => getScene().scene,
    getActiveCamera: () => getScene().camera
}

export let gameObject = {
    getTransform: (gameObject) => {
        return gameObject;
    },
    getGeometry: (gameObject) => {
        return gameObject.geometry;
    },
    getBRDFLambertianMaterial: (gameObject) => {
        let material = gameObject.material;

        if (!material) {
            return null;
        }

        if (material.type === 0) {
            return material;
        }

        return null;
    },
    getBRDFSpecularReflectionMaterial: (gameObject) => {
        let material = gameObject.material;

        if (!material) {
            return null;
        }

        if (material.type === 1) {
            return material;
        }

        return null;
    },
    getBasicCameraView: (gameObject) => {
        return gameObject;
    },
    getPerspectiveCameraProjection: (gameObject) => {
        return gameObject;
    },
    getAllGeometryGameObjects: (scene) => {
        let result = [];

        scene.traverse((object) => {
            if (!object.geometry) {
                return;
            }

            let geometry = object.geometry;

            if (_isGeometryHasVertexData(geometry)) {
                result.push(object);
            }
        });

        return result;
    },
    getAllGameObjectGeometryData: (scene) => {
        let result = [];

        scene.traverse((object) => {
            if (!object.geometry) {
                return;
            }

            let geometry = object.geometry;

            if (_isGeometryHasVertexData(geometry)) {
                result.push([object, geometry]);
            }
        });

        return result;
    },
    getAllGameObjectGeometries: (scene) => {
        let result = [];

        scene.traverse((object) => {
            if (!object.geometry) {
                return;
            }

            let geometry = object.geometry;

            if (_isGeometryHasVertexData(geometry)) {
                result.push(geometry);
            }
        });

        return result;
    },
    getAllGameObjectBRDFLambertianMaterials: (scene) => {
        let result = [];

        scene.traverse((object) => {
            let material = gameObject.getBRDFLambertianMaterial(object);

            if (material === null) {
                return;
            }

            result.push(material);
        });

        return result;
    },
    getAllGameObjectBRDFSpecularReflectionMaterials: (scene) => {
        let result = [];

        scene.traverse((object) => {
            let material = gameObject.getBRDFSpecularReflectionMaterial(object);

            if (material === null) {
                return;
            }

            result.push(material);
        });

        return result;
    }
}

export let basicCameraView = {
    getGameObject: (cameraView) => {
        return cameraView;
    },
    getViewWorldToCameraMatrix: (cameraView) => {
        let result = _getFromMatrix4(cameraView.matrixWorldInverse);

        return result;
    },
    getActiveBasicCameraView: (activeCamera) => {
        return activeCamera;
    }

}

export let perspectiveCameraProjection = {
    getPMatrix: (cameraProjection) => {
        let result = _getFromMatrix4(cameraProjection.projectionMatrix);

        return result;
    },
    getFovy: (cameraProjection) => {
        let result = cameraProjection.fov;

        return result;
    },
    getAspect: (cameraProjection) => {
        let result = cameraProjection.aspect;

        return result;
    },
    getNear: (cameraProjection) => {
        let result = cameraProjection.near;

        return result;
    },
    getFar: (cameraProjection) => {
        let result = cameraProjection.far;

        return result;
    },
}

export let geometry = {
    getVertices: (geometry) => {
        return _getExistPoints(geometry, "position");
    },
    getNormals: (geometry) => {
        return _getExistPoints(geometry, "normal");
    },
    getIndices: (geometry) => {
        let result = _getExistIndices(geometry);

        return result;
    }
}

export let brdfLambertianMaterial = {
    getType: (material) => material.type,
    getDiffuseColor: (material) => {
        return !material.color ? [0.0, 0.0, 0.0] : material.color;
    },
    isRectAreaLight: (material) => {
        return material.isRectAreaLight;
    }
}

export let brdfSpecularReflectionMaterial = {
    getType: (material) => material.type,
    isRectAreaLight: (material) => {
        return material.isRectAreaLight;
    }
}

export let areaLight = {
    getGameObject: (light) => {
        return light;
    },
    getRectAreaLight: (scene) => {
        let result = null;

        scene.traverse((object) => {
            if (!object.lemit) {
                return;
            }

            result = object;
        });

        return result;
    },
    getLemit: (light) => {
        return light.lemit;
    },
    getSize: (light) => {
        return light.geometry_size;
    }
}

export let transform = {
    getLocalToWorldMatrix: (transform) => {
        let result = _getFromMatrix4(transform.matrixWorld);

        return result;
    },
    getNormalMatrix: (transform) => {
        let result = _getFromMatrix3(
            new THREE.Matrix3().getNormalMatrix(
                transform.matrixWorld
            )
        );

        // _log("getNormalMatrix:", result);
        return result;
    }
}