var Perf_hooks = require("perf_hooks");

var THREE = require("../reference/three.js/build/three.js");

var { set: setConfigDp } = require("../lib/js/src/run/external_layer/api/dependency/ConfigDpCPAPI.bs.js");
var { set: setSceneGraphRepoDp } = require("../lib/js/src/run/external_layer/api/dependency/SceneGraphRepoDpCPAPI.bs.js");
var { set: setTimeDp } = require("../lib/js/src/run/external_layer/api/dependency/TimeDpCPAPI.bs.js");
var { set: setConfigDp } = require("../lib/js/src/run/external_layer/api/dependency/ConfigDpCPAPI.bs.js");

var { prepare, init } = require("../lib/js/src/run/external_layer/api/DirectorCPAPI.bs.js");


let camera, scene;
let mesh1, mesh2;


function _init() {
    camera = new THREE.PerspectiveCamera(70, 1.0, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();


    const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial();


    mesh1 = new THREE.Mesh(undefined, material);
    mesh1.position.y = 300;
    scene.add(mesh1);


    mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.x = 100;
    scene.add(mesh2);
}

function _isGeometryHasVertexData(geometry) {
    let attribute = geometry.getAttribute("position");

    return !!attribute && attribute.length > 0;
}

function _setAllDp() {
    setConfigDp({
        getIsDebug: (function () {
            return true;
        })
    });
    setTimeDp({
        getNow: (function () {
            return Perf_hooks.performance.now();
        })
    });

    var sceneGraphRepoDp = {
        sceneRepo: {
            getSceneGameObject: () => scene
        },
        gameObjectRepo: {
            getTransform: (gameObject) => {
                return gameObject;
            },
            getAllGeometryGameObjects: (scene) => {
                let result = [];

                scene.traverse(function (object) {
                    if (!object.geometry) {
                        return;
                    }

                    let geometry = object.geometry;

                    if (_isGeometryHasVertexData(geometry)) {
                        result.push(object);
                    }
                });

                return result;
            }
        },
        transformRepo: {
            getLocalToWorldMatrix: (transform) => {
                return transform.matrix;
            },
            getNormalMatrix: (transform) => {
                return transform.normalMatrix;
            },
            getLocalPosition: (transform) => {
                return transform.position;
            },
            getLocalRotation: (transform) => {
                return transform.quaternion;
            },
            getLocalScale: (transform) => {
                return transform.scale;
            },
            getPosition: (transform) => {
                let worldPosition = new THREE.Vector3();

                return transform.getWorldPosition(worldPosition);
            },
            getRotation: (transform) => {
                let worldRotation = new THREE.Quaternion();

                return transform.getWorldQuaternion(worldRotation);
            },
            getScale: (transform) => {
                let worldScale = new THREE.Vector3();

                return transform.getWorldScale(worldScale);
            },
        }
    };

    setSceneGraphRepoDp(sceneGraphRepoDp);
}

async function _main() {
    _init();

    _setAllDp();

    prepare([512, 256]);

    await init();
}

console.log("begin main");

_main().then(() => {
    console.log("finish main");
});