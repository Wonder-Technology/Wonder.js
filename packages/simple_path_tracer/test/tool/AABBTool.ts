import * as Vector2 from "../../src/math/Vector2"
import * as AABB2D from "../../src/math/AABB2D"
import { getMinLayer } from "../../src/utils/LayerUtils"


export let createAABB = (worldMinX = 0,
	worldMinY = 0, worldMaxX = 0, worldMaxY = 0,
) => {
	return AABB2D.create(
		Vector2.create(
			worldMinX, worldMinY
		),
		Vector2.create(
			worldMaxX, worldMaxY
		)
	)
}

export let createAABBData = (worldMinX = 0,
	worldMinY = 0, worldMaxX = 0, worldMaxY = 0,
	instanceIndex = 0,
	layer = getMinLayer()
) => {
	return {
		aabb: AABB2D.create(
			Vector2.create(
				worldMinX, worldMinY
			),
			Vector2.create(
				worldMaxX, worldMaxY
			)
		),
		instanceIndex,
		layer
	}
}

export let createWholeAABBData = (worldMinX = 0,
	worldMinY = 0, worldMaxX = 0, worldMaxY = 0,
	maxLayer = getMinLayer()
) => {
	return {
		aabb: AABB2D.create(
			Vector2.create(
				worldMinX, worldMinY
			),
			Vector2.create(
				worldMaxX, worldMaxY
			)
		),
		maxLayer
	}
}
