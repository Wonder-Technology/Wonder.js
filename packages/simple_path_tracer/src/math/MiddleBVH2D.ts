import { computeCenter, create, t } from "./AABB"
import { qsort } from "./Array"
import * as Vector3 from "./Vector3"

type instanceIndex = number

type triangle = {
	p0WorldPosition: [number, number, number],
	p1WorldPosition: [number, number, number],
	p2WorldPosition: [number, number, number],
}

type aabbData = { aabb: t, primitiveIndex: number, instanceIndex: instanceIndex, triangle: triangle }

type wholeAABBData = { aabb: t }

export type tree = {
	wholeAABBData: wholeAABBData,
	leafAllAABBData: Array<aabbData> | null,
	child1: tree | null,
	child2: tree | null
}

let _computeWholeAABB = (allAABBData: Array<aabbData>) => {
	let [worldMin, worldMax] = allAABBData.reduce(([worldMin, worldMax], { aabb }) => {
		let aabbWorldMin = aabb.worldMin
		let aabbWorldMax = aabb.worldMax

		if (aabbWorldMin[0] < worldMin[0]) {
			worldMin[0] = aabbWorldMin[0]
		}
		if (aabbWorldMin[1] < worldMin[1]) {
			worldMin[1] = aabbWorldMin[1]
		}
		if (aabbWorldMin[2] < worldMin[2]) {
			worldMin[2] = aabbWorldMin[2]
		}

		if (aabbWorldMax[0] > worldMax[0]) {
			worldMax[0] = aabbWorldMax[0]
		}
		if (aabbWorldMax[1] > worldMax[1]) {
			worldMax[1] = aabbWorldMax[1]
		}
		if (aabbWorldMax[2] > worldMax[2]) {
			worldMax[2] = aabbWorldMax[2]
		}

		// TODO refactor(rescript): change to immutable
		return [worldMin, worldMax]
	}, [
		Vector3.create(
			Infinity,
			Infinity,
			Infinity,
		),
		Vector3.create(
			-Infinity,
			-Infinity,
			-Infinity,
		)
	])

	return { aabb: create(worldMin, worldMax) }
}

let _sort = (getAxiz, allAABBData: Array<aabbData>) => {
	return qsort(allAABBData, ({ aabb }) => getAxiz(computeCenter(aabb)))
}


let _build = (node, minCount, maxDepth, depth, getAxizFuncs, getAxizFuncIndex, allAABBData): void => {
	if (depth >= maxDepth || allAABBData.length <= minCount) {
		// node.wholeAABB = _computeWholeAABB(sortedAllAABBData)
		node.leafAllAABBData = allAABBData
		node.child1 = null
		node.child2 = null

		return
	}
	else {
		let sortedAllAABBData = _sort(getAxizFuncs[getAxizFuncIndex % 2], allAABBData)
		// console.log(sortedAllAABBData);


		// let splitIndex = _findMiddleIndex(getAxizFuncs[getAxizFuncIndex % 2], allAABBData)
		let splitIndex = Math.floor(allAABBData.length / 2)

		let arr1 = sortedAllAABBData.slice(0, splitIndex)
		let arr2 = sortedAllAABBData.slice(splitIndex, sortedAllAABBData.length)
		// console.log(splitIndex, arr1, arr2)

		let child1 = {
			wholeAABB: _computeWholeAABB(arr1),
			leafAllAABBData: null,
			child1: null,
			child2: null
		}
		let child2 = {
			wholeAABB: _computeWholeAABB(arr2),
			leafAllAABBData: null,
			child1: null,
			child2: null
		}

		// node.wholeAABB = _computeWholeAABB(sortedAllAABBData)
		node.leafAllAABBData = null
		node.child1 = child1
		node.child2 = child2

		_build(child1, minCount, maxDepth, depth + 1, getAxizFuncs, getAxizFuncIndex + 1, arr1)
		_build(child2, minCount, maxDepth, depth + 1, getAxizFuncs, getAxizFuncIndex + 1, arr2)
	}
}

//by middle
export let build = (allAABBData: Array<aabbData>, minCount = 5, maxDepth = 10): tree => {
	let tree: tree = {
		wholeAABBData: _computeWholeAABB(allAABBData),
		leafAllAABBData: null,
		child1: null,
		child2: null
	}

	_build(tree, minCount, maxDepth, 1, [
		(vec2) => vec2[0],
		(vec2) => vec2[1],
		(vec2) => vec2[2]
	], 0, allAABBData)

	return tree
}