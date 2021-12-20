import { prepare, init, update, render, registerWorkPlugin, setIsDebug as setIsDebugDirector } from "../packages/wonder-facade/src/DirectorAPI";
import { create as createGameObject, getTransform, addGeometry, addBasicCameraView, addPBRMaterial, addPerspectiveCameraProjection } from "../packages/wonder-facade/src/GameObjectAPI";
import { lookAt, setLocalPosition } from "../packages/wonder-facade/src/TransformAPI";
import { create as createGeometry, setVertices, setIndices } from "../packages/wonder-facade/src/GeometryAPI";
import { create as createPBRMaterial, setDiffuseColor } from "../packages/wonder-facade/src/PBRMaterialAPI";
import { create as createBasicCameraView, active } from "../packages/wonder-facade/src/BasicCameraViewAPI";
import { create as createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "../packages/wonder-facade/src/PerspectiveCameraProjectionAPI";
import { getData as getDataTest1 } from "../packages/wonder-work-plugin-test1/src/Main";
import { getData as getDataInitWebGPU } from "../packages/wonder-work-plugin-init-webgpu/src/Main";
import { getExn } from "../packages/wonder-commonlib-ts/src/NullableUtils";
// import { getData as getDataOutline } from "../packages/wonder-component-outline/src/Main";

function _registerWorkPlugins() {
	registerWorkPlugin(getDataTest1(), [
		{
			pipelineName: "init",
			insertElementName: "init_root_wonder",
			insertAction: "after"
		},
		{
			pipelineName: "update",
			insertElementName: "update_root_wonder",
			insertAction: "after"
		},
		{
			pipelineName: "render",
			insertElementName: "render_root_wonder",
			insertAction: "before"
		}
	])
	registerWorkPlugin(getDataInitWebGPU(canvas), [
		{
			pipelineName: "init",
			insertElementName: "init_test1_wonder",
			insertAction: "after"
		}
	])

}

// function _registerComponents() {
// 	registerComponent(getDataOutline())
// }

// function _initComponents() {
// 	createAndSetAllComponentPOs()
// }

function _setPluginData(isDebug: boolean) {
	setIsDebugDirector(isDebug)
}

function _createCubeGameObject() {
	let gameObject = createGameObject();
	let geometry = createGeometry();
	let vertices = new Float32Array([
		1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
		1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
		-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
		-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
	])

	let indices = new Uint32Array([
		0, 1, 2, 0, 2, 3,
		4, 5, 6, 4, 6, 7,
		8, 9, 10, 8, 10, 11,
		12, 13, 14, 12, 14, 15,
		16, 17, 18, 16, 18, 19,
		20, 21, 22, 20, 22, 23
	])
	setVertices(geometry, vertices);
	setIndices(geometry, indices);
	addGeometry(gameObject, geometry);

	let material = createPBRMaterial();
	setDiffuseColor(material, [1.0, 0.0, 0.0]);
	addPBRMaterial(gameObject, material);


	// let outlineComponentName = "Outline"
	// let outline = createComponent(outlineComponentName)

	// setComponentData(outlineComponentName, outline, "outlineColor", [1.0, 0.0, 0.0])

	// console.log(getComponentData(outlineComponentName, outline, "outlineColor"))

	// addComponent(outlineComponentName, gameObject, outline)

	// console.log(
	// 	hasComponent(outlineComponentName, gameObject),
	// 	getComponent(outlineComponentName, gameObject),
	// 	getComponentGameObjects(outlineComponentName, outline),
	// 	getAllComponents(outlineComponentName)
	// )

	return gameObject;
}


let _createCameraGameObject = () => {
	let gameObject = createGameObject();

	let cameraView = createBasicCameraView();
	active(cameraView);
	addBasicCameraView(gameObject, cameraView);

	let cameraProjection = createPerspectiveCameraProjection();
	setFovy(cameraProjection, 30);
	setAspect(cameraProjection, canvas.width / canvas.height);
	setNear(cameraProjection, 1);
	setFar(cameraProjection, 100);
	addPerspectiveCameraProjection(gameObject, cameraProjection);

	let transform = getExn(getTransform(gameObject))

	setLocalPosition(transform, [0, 0, 2])
	lookAt(transform, [0, 0, 0])

	return gameObject;
}



function _frame() {
	update().then(() => {
		render().then(() => {
			requestAnimationFrame(() => {
				_frame()
			});
		})
	})
}

let isDebug = true

let canvas = document.querySelector("#canvas") as HTMLCanvasElement;

canvas.style.width = canvas.width + " px";
canvas.style.height = canvas.height + " px";

prepare({
	transformCount: 10,
	geometryCount: 10,
	geometryPointCount: 100,
	pbrMaterialCount: 10,
	directionLightCount: 1,
	float9Array1: new Float32Array(), float32Array1: new Float32Array(),
	isDebug: isDebug
})

_registerWorkPlugins()



_setPluginData(isDebug)




init().then(() => {
	console.log("finish init")

	_frame();
})