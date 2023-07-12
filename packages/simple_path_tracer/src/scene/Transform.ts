import { create } from "../math/Vector2"

export let getLocalPosition = (transform, { transformBuffer }) => {
	let offset = transform * 3

	return create(transformBuffer[offset], transformBuffer[offset + 1])
}

export let getLayer = (transform, { transformBuffer }) => {
	let offset = transform * 3

	return transformBuffer[offset + 2]
}
