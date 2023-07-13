import * as Vector3 from "../../src/math/Vector3"
import * as AABB from "../../src/math/AABB"
import { aabbData } from "../../src/math/MiddleBVH2D"


export let createAABB = (
	worldMinX = 0,
	worldMinY = 0,
	worldMinZ = 0,
	worldMaxX = 0,
	worldMaxY = 0,
	worldMaxZ = 0,
) => {
	return AABB.create(
		Vector3.create(
			worldMinX, worldMinY, worldMinZ
		),
		Vector3.create(
			worldMaxX, worldMaxY, worldMaxZ
		)
	)
}

export let createAABBData = (
	worldMinX = 0,
	worldMinY = 0,
	worldMinZ = 0,
	worldMaxX = 0,
	worldMaxY = 0,
	worldMaxZ = 0,
	primitiveIndex = 0,
	instanceIndex = 0,
	triangle = {
		p0WorldPosition: [0.1, 0.2, 0.3],
		p1WorldPosition: [0.1, 0.2, 0.3],
		p2WorldPosition: [0.1, 0.2, 0.3],
	}
): aabbData => {
	return {
		aabb: AABB.create(
			Vector3.create(
				worldMinX, worldMinY, worldMinZ
			),
			Vector3.create(
				worldMaxX, worldMaxY, worldMaxZ
			)

		),
		primitiveIndex,
		instanceIndex,
		triangle: triangle as any
	}
}

export let createWholeAABBData = (
	worldMinX = 0,
	worldMinY = 0,
	worldMinZ = 0,
	worldMaxX = 0,
	worldMaxY = 0,
	worldMaxZ = 0,

) => {
	return {
		aabb: AABB.create(
			Vector3.create(
				worldMinX, worldMinY, worldMinZ
			),
			Vector3.create(
				worldMaxX, worldMaxY, worldMaxZ
			)

		),
	}
}
