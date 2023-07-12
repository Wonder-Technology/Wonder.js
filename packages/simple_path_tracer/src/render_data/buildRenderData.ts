import { getAllRenderGameObjectData } from "../scene/Scene";
import { getC, getR, getW } from "../scene/Geometry"
import { computeRingAABB } from "../math/AABB2D";
import { createBuffer } from "../webgpu/Buffer";
import { getColor } from "../scene/Material";
import { getLayer, getLocalPosition } from "../scene/Transform";
import * as BVH2D from "../math/LBVH2D";
import * as Acceleration from "../math/Acceleration";
import { flatten } from "../math/Array";

// let _addPaddingData = () => {
// return 1 as any
// }

export let buildSceneAccelerationStructureBufferData = (state, device) => {
	// TODO use pipe
	let allAABBData = getAllRenderGameObjectData(state).map(([gameObject, transform, geometry, material], instanceIndex) => {
		let c = getC(geometry, state)
		let w = getW(geometry, state)
		let r = getR(geometry, state)

		let localPosition = getLocalPosition(transform, state)
		let layer = getLayer(transform, state)

		return {
			aabb: computeRingAABB(localPosition, c, r, w),
			instanceIndex,
			layer
		}
	});

	// ( console as any ).profile("build")
	let a1 = performance.now();

	let tree = BVH2D.build(allAABBData, 5, 10)
	let [topLevelArr, bottomLevelArr] = Acceleration.build(tree);

	let a2 = performance.now();

	// ( console as any ).profileEnd()

	let topLevelBufferData = new Float32Array(flatten(topLevelArr))

	let a3 = performance.now()
	// add padding
	bottomLevelArr = bottomLevelArr.map((data) => {
		data.push(0)
		data.push(0)

		return data
	})
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

export let buildSceneInstanceDataBufferData = (state, device) => {
	let bufferDataArr = getAllRenderGameObjectData(state).reduce((bufferDataArr, [gameObject, transform, geometry, material]) => {
		let localPosition = getLocalPosition(transform, state)

		bufferDataArr.push(
			geometry,
			material,
			localPosition[0],
			localPosition[1],
		);

		return bufferDataArr;
	}, [])

	let bufferData = new Float32Array(bufferDataArr);

	// console.log(bufferData)

	let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

	return [buffer, bufferData.byteLength];

}

export let buildSceneGeometryDataBufferData = (state, device) => {
	let bufferDataArr = getAllRenderGameObjectData(state).reduce((bufferDataArr, [gameObject, transform, geometry, material], geometryIndex) => {
		let c = getC(geometry, state)
		let w = getW(geometry, state)
		let r = getR(geometry, state)

		bufferDataArr.push(
			c[0],
			c[1],
			w,
			r
		);

		return bufferDataArr;
	}, [])

	let bufferData = new Float32Array(bufferDataArr);

	// console.log(bufferData)

	let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

	return [buffer, bufferData.byteLength];
}

export let buildSceneMaterialDataBufferData = (state, device) => {
	let bufferDataArr = getAllRenderGameObjectData(state).reduce((bufferDataArr, [gameObject, transform, geometry, material], geometryIndex) => {
		let color = getColor(geometry, state)

		bufferDataArr.push(
			color[0],
			color[1],
			color[2],
			0.0
		);

		return bufferDataArr;
	}, [])

	let bufferData = new Float32Array(bufferDataArr);

	// console.log(bufferData)

	let buffer = createBuffer(device, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, bufferData)

	return [buffer, bufferData.byteLength];
}