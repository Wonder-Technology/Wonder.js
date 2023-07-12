import { create } from "../math/Vector2"

let _getStride = () => {
	return 4
}

export let getC = (geometry, { geometryBuffer }) => {
	let offset = geometry * _getStride()

	return create(geometryBuffer[offset], geometryBuffer[offset + 1])
}


export let getW = (geometry, { geometryBuffer }) => {
	let offset = geometry * _getStride()

	return geometryBuffer[offset + 2]
}

export let getR = (geometry, { geometryBuffer }) => {
	let offset = geometry * _getStride()

	return geometryBuffer[offset + 3]
}