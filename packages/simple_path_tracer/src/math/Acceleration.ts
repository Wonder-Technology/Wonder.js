// import { layer } from "../type/LayerType"
// import { log } from "../utils/LogUtils"
import { tree } from "./MiddleBVH2D"

type wholeWorldMinX = number
type wholeWorldMinY = number
type wholeWorldMaxX = number
type wholeWorldMaxY = number

type leafInstanceOffset = number
// type leafInstanceCount = number
type leafInstanceCountAndMaxLayer = number
type child1Index = number
type child2Index = number

type topLevelNodeData = [
	wholeWorldMinX, wholeWorldMinY, wholeWorldMaxX, wholeWorldMaxY,
	leafInstanceOffset,
	// leafInstanceCount,
	// maxLayer,
	leafInstanceCountAndMaxLayer,
	child1Index,
	child2Index
]

type topLevelArr = Array<topLevelNodeData>


type worldMinX = number
type worldMinY = number
type worldMinZ = number
type worldMaxX = number
type worldMaxY = number
type worldMaxZ = number

type primitiveIndex = number
type instanceIndex = number

type worldPositionX = number
type worldPositionY = number
type worldPositionZ = number

// type bottomLevelArr = Array<[worldMinX, worldMinY, worldMaxX, worldMaxY, instanceIndex, layer]>
type bottomLevelArr = Array<[
	worldMinX, worldMinY, worldMinZ, worldMaxX, worldMaxY, worldMaxZ,
	primitiveIndex, instanceIndex,

	worldPositionX,
	worldPositionY,
	worldPositionZ,
	worldPositionX,
	worldPositionY,
	worldPositionZ,
	worldPositionX,
	worldPositionY,
	worldPositionZ,
]>

// let _merge24BitValueAnd8BitValue = (value1, value2) => {
// 	return (value1 << 8) | value2
// }

// let _getLeafInstanceCount = (
// 	leafInstanceCountAndMaxLayer: number
// ) => {
// 	return (leafInstanceCountAndMaxLayer >> 8) & 0xffffff
// }

// let _getMaxLayer = (
// 	leafInstanceCountAndMaxLayer: number
// ) => {
// 	return leafInstanceCountAndMaxLayer & 0xff
// }


// TODO refactor(rescript): not edit ref: topLevelArr, bottomLevelArr
// let _build = (node, topLevelArr, hierachyArr, bottomLevelArr): void => {
let _build = (node: tree, topLevelArr, child1Arr, child2Arr, bottomLevelArr: bottomLevelArr): void => {
	let { aabb } = node.wholeAABBData
	let { worldMin, worldMax } = aabb

	if (node.leafAllAABBData !== null) {
		// TODO require check
		if (node.leafAllAABBData.length >= 10000) {
			throw new Error("error")
		}
		// let leafInstanceCountAndMaxLayer = _merge24BitValueAnd8BitValue(node.leafAllAABBData.length, maxLayer)

		// // TODO remove
		// if(leafInstanceCountAndMaxLayer == 0){
		// 	throw new Error("error")
		// }

		topLevelArr.push(
			[
				worldMin[0],
				worldMin[1],
				worldMin[2],
				worldMax[0],
				worldMax[1],
				worldMax[2],
				bottomLevelArr.length,
				node.leafAllAABBData.length
			]
		)
		node.leafAllAABBData.reduce((arr, { aabb, primitiveIndex, instanceIndex, triangle }) => {
			let { worldMin, worldMax } = aabb

			let { p0WorldPosition, p1WorldPosition, p2WorldPosition } = triangle

			arr.push([
				worldMin[0],
				worldMin[1],
				worldMin[2],
				worldMax[0],
				worldMax[1],
				worldMax[2],
				primitiveIndex,
				instanceIndex,

				p0WorldPosition[0],
				p0WorldPosition[1],
				p0WorldPosition[2],
				p1WorldPosition[0],
				p1WorldPosition[1],
				p1WorldPosition[2],
				p2WorldPosition[0],
				p2WorldPosition[1],
				p2WorldPosition[2],
			])

			return arr
		}, bottomLevelArr)

		return
	}

	topLevelArr.push(
		[
			worldMin[0],
			worldMin[1],
			worldMin[2],
			worldMax[0],
			worldMax[1],
			worldMax[2],
			0,
			// _merge24BitValueAnd8BitValue(0, maxLayer)
			0
		]
	)
	let nodeIndex = topLevelArr.length - 1

	if (node.child1 !== null) {
		child1Arr[nodeIndex] = topLevelArr.length

		_build(node.child1, topLevelArr, child1Arr, child2Arr, bottomLevelArr)
	}

	if (node.child2 !== null) {
		child2Arr[nodeIndex] = topLevelArr.length

		_build(node.child2, topLevelArr, child1Arr, child2Arr, bottomLevelArr)
	}

	return
}

// let _getDepth = (topLevelArr) => {
// 	let rootNode = topLevelArr[0]

// 	let child1IndexOffset = 6
// 	let child2IndexOffset = 7

// 	let stackContainer = [rootNode]
// 	let stackSize = 1

// 	let stackSizeArr = []

// 	while (stackSize > 0) {
// 		let currentNode = stackContainer[stackSize - 1]

// 		stackSize -= 1

// 		if (_isLeafNode(currentNode)) {
// 			stackSizeArr.push(stackSize)
// 		}
// 		else {
// 			if (_hasChild(currentNode, child1IndexOffset)) {
// 				stackContainer[stackSize] = topLevelArr[currentNode[child1IndexOffset]]
// 				stackSize += 1
// 			}
// 			if (_hasChild(currentNode, child2IndexOffset)) {
// 				stackContainer[stackSize] = topLevelArr[currentNode[child2IndexOffset]]
// 				stackSize += 1
// 			}
// 		}
// 	}

// 	// let arr = qsort(stackSizeArr, (v) => v)

// 	return Math.max.apply(null, stackSizeArr)
// }

export let build = (tree: tree): [topLevelArr, bottomLevelArr] => {
	let topLevelArr = []
	let bottomLevelArr = []
	let child1Arr = []
	let child2Arr = []

	_build(tree, topLevelArr, child1Arr, child2Arr, bottomLevelArr)

	topLevelArr = topLevelArr.map((data, index) => {
		if (child1Arr[index] !== undefined) {
			data.push(child1Arr[index])
		}
		else {
			data.push(0)
		}

		if (child2Arr[index] !== undefined) {
			data.push(child2Arr[index])
		}
		else {
			data.push(0)
		}

		return data
	})

	return [topLevelArr, bottomLevelArr]
}

// type traverseResult = {
// 	isClosestHit: boolean,
// 	layer: layer,
// 	instanceIndex: instanceIndex | null
// }

// let _isPointIntersectWithAABB = (
// 	point,
// 	wholeWorldMinX, wholeWorldMinY, wholeWorldMaxX, wholeWorldMaxY,
// ) => {
// 	return point[0] > wholeWorldMinX && point[0] < wholeWorldMaxX && point[1] > wholeWorldMinY && point[1] < wholeWorldMaxY
// }

// let _isPointIntersectWithTopLevelNode = (point, node: topLevelNodeData) => {
// 	let [
// 		wholeWorldMinX, wholeWorldMinY, wholeWorldMaxX, wholeWorldMaxY,
// 	] = node

// 	return _isPointIntersectWithAABB(
// 		point,
// 		wholeWorldMinX, wholeWorldMinY, wholeWorldMaxX, wholeWorldMaxY,
// 	)
// }

// let _isLeafNode = (leafInstanceCount) => {
// 	// let leafInstanceCountOffset = 5

// 	// return node[leafInstanceCountOffset] !== 0

// 	return leafInstanceCount !== 0
// }

// let _handleIntersectWithLeafNode = (intersectResult, isIntersectWithInstance, point,
// 	leafInstanceCount, maxLayer, node: topLevelNodeData,
// 	bottomLevelArr: bottomLevelArr) => {
// 	let [
// 		wholeWorldMinX, wholeWorldMinY, wholeWorldMaxX, wholeWorldMaxY,
// 		leafInstanceOffset,
// 		// leafInstanceCount,
// 		// maxLayer
// 	] = node


// 	while (leafInstanceCount > 0) {
// 		// let [worldMinX, worldMinY, worldMaxX, worldMaxY, instanceIndex] = bottomLevelArr[leafInstanceOffset]
// 		let [worldMinX, worldMinY, worldMaxX, worldMaxY, instanceIndex, layer] = bottomLevelArr[leafInstanceOffset]

// 		if (_isPointIntersectWithAABB(
// 			point,
// 			worldMinX, worldMinY, worldMaxX, worldMaxY
// 		)) {
// 			if (isIntersectWithInstance(point, instanceIndex)) {
// 				// let layer = getInstanceLayer(instanceIndex)

// 				// if (!intersectResult.isClosestHit || layer >= intersectResult.layer) {
// 				if (!intersectResult.isClosestHit || layer > intersectResult.layer) {
// 					// log("hit")

// 					intersectResult.isClosestHit = true
// 					intersectResult.layer = layer
// 					intersectResult.instanceIndex = instanceIndex

// 					if (layer == maxLayer) {
// 						break
// 					}
// 				}
// 			}
// 		}

// 		leafInstanceCount -= 1
// 		leafInstanceOffset += 1
// 	}
// }

// let _hasChild = (node, childIndexOffset) => {
// 	return node[childIndexOffset] !== 0
// }

// export let traverse = (isIntersectWithInstance, point, topLevelArr: topLevelArr, bottomLevelArr: bottomLevelArr): traverseResult => {
// 	let rootNode = topLevelArr[0]

// 	let leafInstanceCountAndMaxLayerOffset = 5
// 	let child1IndexOffset = 6
// 	let child2IndexOffset = 7

// 	// let node = rootNode

// 	let stackContainer = [rootNode]
// 	let stackSize = 1

// 	let intersectResult: traverseResult = {
// 		isClosestHit: false,
// 		// layer: -1,
// 		layer: 0,
// 		instanceIndex: null
// 	}

// 	while (stackSize > 0) {
// 		let currentNode = stackContainer[stackSize - 1]

// 		stackSize -= 1

// 		let leafInstanceCountAndMaxLayer = currentNode[leafInstanceCountAndMaxLayerOffset]

// 		let maxLayer = _getMaxLayer(leafInstanceCountAndMaxLayer)

// 		if (maxLayer <= intersectResult.layer) {
// 			continue
// 		}

// 		// log("stackSize: ", stackSize)

// 		if (_isPointIntersectWithTopLevelNode(point, currentNode)) {
// 			// log(
// 			// 	"_isPointIntersectWithTopLevelNode true:",
// 			// 	currentNode,
// 			// 	_isLeafNode(currentNode),
// 			// 	_hasChild(currentNode, child1IndexOffset),
// 			// 	_hasChild(currentNode, child2IndexOffset),
// 			// )

// 			let leafInstanceCount = _getLeafInstanceCount(leafInstanceCountAndMaxLayer)


// 			if (_isLeafNode(leafInstanceCount)) {
// 				_handleIntersectWithLeafNode(intersectResult, isIntersectWithInstance, point, leafInstanceCount, maxLayer, currentNode, bottomLevelArr)

// 				// if (intersectResult.isClosestHit) {
// 				// 	break
// 				// }
// 			}
// 			else {
// 				// log("judge child")

// 				if (_hasChild(currentNode, child1IndexOffset)) {
// 					stackContainer[stackSize] = topLevelArr[currentNode[child1IndexOffset]]
// 					stackSize += 1
// 				}
// 				if (_hasChild(currentNode, child2IndexOffset)) {
// 					stackContainer[stackSize] = topLevelArr[currentNode[child2IndexOffset]]
// 					stackSize += 1
// 				}
// 			}
// 		}
// 	}

// 	return intersectResult
// }