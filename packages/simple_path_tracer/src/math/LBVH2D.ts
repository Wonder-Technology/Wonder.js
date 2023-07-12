import { layer } from "../type/LayerType"
import { dec2bin } from "../utils/BitUtils"
import { log } from "../utils/LogUtils"
import { computeCenter, create, t } from "./AABB2D"
import { qsort } from "./Array"
import * as Vector2 from "./Vector2"

type instanceIndex = number

type aabbData = { aabb: t, instanceIndex: instanceIndex, layer: layer }

type wholeAABBData = { aabb: t, maxLayer: layer }

// type leafAABBData = { aabb: t, instanceIndex: instanceIndex }

export type tree = {
	wholeAABBData: wholeAABBData,
	leafAllAABBData: Array<aabbData> | null,
	child1: tree | null,
	child2: tree | null
}

let _getGridXBitCount = () => 10

let _getGridYBitCount = () => 10

let _computeWholeAABBData = (allAABBData: Array<aabbData>, dataStartIndex, dataLength): wholeAABBData => {
	let worldMin = Vector2.create(
		Infinity,
		Infinity,
	)
	let worldMax = Vector2.create(
		-Infinity,
		-Infinity,
	)

	let maxLayer: layer = 0

	for (let i = dataStartIndex; i < dataStartIndex + dataLength; i++) {
		let { aabb, layer } = allAABBData[i]

		let aabbWorldMin = aabb.worldMin
		let aabbWorldMax = aabb.worldMax

		if (aabbWorldMin[0] < worldMin[0]) {
			worldMin[0] = aabbWorldMin[0]
		}
		if (aabbWorldMin[1] < worldMin[1]) {
			worldMin[1] = aabbWorldMin[1]
		}

		if (aabbWorldMax[0] > worldMax[0]) {
			worldMax[0] = aabbWorldMax[0]
		}
		if (aabbWorldMax[1] > worldMax[1]) {
			worldMax[1] = aabbWorldMax[1]
		}

		if (layer > maxLayer) {
			maxLayer = layer
		}
	}

	return {
		aabb: create(worldMin, worldMax),
		maxLayer
	}
}

let _buildGridPosition = ({ aabb }: wholeAABBData, allAABBData: Array<aabbData>) => {
	let { worldMin, worldMax } = aabb
	let minX = worldMin[0]
	let maxX = worldMax[0]
	let minY = worldMin[1]
	let maxY = worldMax[1]

	let stepX = (maxX - minX) / Math.pow(2, _getGridXBitCount())
	let stepY = (maxY - minY) / Math.pow(2, _getGridYBitCount())

	return allAABBData.map((aabbData) => {
		let [centerX, centerY] = computeCenter(aabbData.aabb)

		let gridPosition = [
			Math.floor((centerX - minX) / stepX),
			Math.floor((centerY - minY) / stepY)
		]

		return [aabbData, gridPosition]
	})
}

export let _mortonEncodeGridPositionByMagicbits = ([gridPositionX, gridPositionY]) => {
	// if(gridPositionX >= 1023 || gridPositionX >= 1023){
	// 	throw new Error("s")
	// }
	let index1 = gridPositionX
	let index2 = gridPositionY

	index1 &= 0x0000ffff
	index2 &= 0x0000ffff
	index1 |= (index1 << 8)
	index2 |= (index2 << 8)
	index1 &= 0x00ff00ff
	index2 &= 0x00ff00ff
	index1 |= (index1 << 4)
	index2 |= (index2 << 4)
	index1 &= 0x0f0f0f0f
	index2 &= 0x0f0f0f0f
	index1 |= (index1 << 2)
	index2 |= (index2 << 2)
	index1 &= 0x33333333
	index2 &= 0x33333333
	index1 |= (index1 << 1)
	index2 |= (index2 << 1)
	index1 &= 0x55555555
	index2 &= 0x55555555

	return (index1 | (index2 << 1))
}

let _mortonEncode = (allAABBDataWithGridPosition) => {
	return allAABBDataWithGridPosition.map(([aabbData, gridPosition]) => {
		return [aabbData, _mortonEncodeGridPositionByMagicbits(gridPosition)]
	})
}

let _sortByMorton = (allAABBDataWithMortonEncode) => {
	return qsort(allAABBDataWithMortonEncode, ([_, mortonEncode]) => {
		return mortonEncode
	})
}

// let _findHighest1BitIndex = (x) => {
// 	let bitIndex = 0

// 	while (x) {
// 		x >>= 1
// 		bitIndex++
// 	}

// 	return bitIndex
// }

export let _findBit = (x, index) => {
	// TODO requier check
	if (index > (_getGridXBitCount() + _getGridYBitCount()) || index < 1) {
		throw new Error("error")
	}

	return (x >> (index - 1)) & 1
}

let _convertToAllAABBData = (sortedAllAABBDataWithMortonEncode) => {
	return sortedAllAABBDataWithMortonEncode.map(([aabbData, _]) => aabbData)
}

let _binarySearchFirstChangeBitIndex = (sortedAllAABBDataWithMortonEncode,
	dataStartIndex, dataLength,
	index) => {
	let [_, maxMortonEncode] = sortedAllAABBDataWithMortonEncode[dataStartIndex + dataLength - 1]

	let maxValueBit = _findBit(maxMortonEncode, index)


	let lowIndex = dataStartIndex
	let highIndex = dataStartIndex + dataLength - 1

	let firstChangeBitIndex = null

	// TODO remove
	let count = 30

	while (lowIndex < highIndex && count > 0) {
		// log(lowIndex, highIndex, firstChangeBitIndex)

		count--

		let middleIndex = Math.floor((lowIndex + highIndex) / 2)

		let middleValueBit = _findBit(sortedAllAABBDataWithMortonEncode[middleIndex][1], index)


		// log("middleValueBit:", middleValueBit, maxValueBit, lowIndex, highIndex);


		if (middleValueBit < maxValueBit) {
			lowIndex = middleIndex
			firstChangeBitIndex = middleIndex

			if (lowIndex == highIndex - 1) {
				break
			}
		}
		else if (middleValueBit === maxValueBit) {
			highIndex = middleIndex
		}
		else {
			throw new Error("error")
		}
	}

	// TODO remove
	if (count === 0) {
		throw new Error("error")
	}

	// TODO ensure check
	if (firstChangeBitIndex === null) {
		throw new Error("error")
	}

	return firstChangeBitIndex
}

let _findSearchBitIndex = (sortedAllAABBDataWithMortonEncode,
	dataStartIndex, dataLength,
	searchBitIndex) => {
	let maxMortonEncode = sortedAllAABBDataWithMortonEncode[dataStartIndex + dataLength - 1][1]
	let minMortonEncode = sortedAllAABBDataWithMortonEncode[dataStartIndex][1]

	let result = searchBitIndex

	while (result > 0) {
		// log(
		// 	maxMortonEncode, dec2bin(maxMortonEncode), minMortonEncode, dec2bin(minMortonEncode), result,
		// 	_findBit(maxMortonEncode, result),
		// 	_findBit(minMortonEncode, result),
		// 	_findBit(2, 3),
		// 	_findBit(2, 2),
		// 	_findBit(2, 1)
		// );

		if (_findBit(maxMortonEncode, result) == _findBit(minMortonEncode, result)) {
			result -= 1
		}
		else {
			break
		}
	}

	return result
}

let _handleLeafNode = (node, sortedAllAABBData, dataStartIndex, dataLength) => {
	// TODO perf: not slice, just map to
	node.leafAllAABBData = sortedAllAABBData.slice(dataStartIndex, dataStartIndex + dataLength)
	node.child1 = null
	node.child2 = null
}

let _buildByLBVH = (node, minCount, maxDepth, depth, searchBitIndex, sortedAllAABBDataWithMortonEncode, sortedAllAABBData, dataStartIndex, dataLength): void => {
	// if (depth >= maxDepth || sortedAllAABBDataWithMortonEncode.length <= minCount || searchBitIndex < 1) {
	if (depth >= maxDepth || dataLength <= minCount || searchBitIndex < 1) {
		// node.leafAllAABBData = _convertToAllAABBData(sortedAllAABBDataWithMortonEncode)

		_handleLeafNode(node, sortedAllAABBData, dataStartIndex, dataLength)

		return
	}
	else {
		// log(sortedAllAABBDataWithMortonEncode,
		// 	dataStartIndex, dataLength,
		// 	searchBitIndex)
		searchBitIndex = _findSearchBitIndex(sortedAllAABBDataWithMortonEncode, dataStartIndex, dataLength, searchBitIndex)
		// log(searchBitIndex)

		if (searchBitIndex < 1) {
			_handleLeafNode(node, sortedAllAABBData, dataStartIndex, dataLength)
			return
		}


		let firstChangeBitIndex = _binarySearchFirstChangeBitIndex(sortedAllAABBDataWithMortonEncode, dataStartIndex, dataLength, searchBitIndex)
		// log("firstChangeBitIndex: ", firstChangeBitIndex)

		let child1StartIndex = dataStartIndex
		let child1Length = firstChangeBitIndex - dataStartIndex + 1

		let child2StartIndex = firstChangeBitIndex + 1
		let child2Length = dataLength - (firstChangeBitIndex - dataStartIndex + 1)

		// log("child1->wholeAABBData:", sortedAllAABBData, child1StartIndex, child1Length,

		// 	_computeWholeAABBData(sortedAllAABBData, child1StartIndex, child1Length)
		// );


		let child1 = {
			wholeAABBData: _computeWholeAABBData(sortedAllAABBData, child1StartIndex, child1Length),
			leafAllAABBData: null,
			child1: null,
			child2: null
		}
		let child2 = {
			wholeAABBData: _computeWholeAABBData(sortedAllAABBData, child2StartIndex, child2Length),
			leafAllAABBData: null,
			child1: null,
			child2: null
		}

		node.leafAllAABBData = null
		node.child1 = child1
		node.child2 = child2

		_buildByLBVH(child1, minCount, maxDepth, depth + 1, searchBitIndex - 1,
			sortedAllAABBDataWithMortonEncode, sortedAllAABBData,
			child1StartIndex,
			child1Length
		)
		_buildByLBVH(child2, minCount, maxDepth, depth + 1, searchBitIndex - 1,
			sortedAllAABBDataWithMortonEncode, sortedAllAABBData,
			child2StartIndex,
			child2Length
		)
	}
}

export let build = (allAABBData: Array<aabbData>, minCount = 5, maxDepth = 10): tree => {
	let wholeAABBData = _computeWholeAABBData(allAABBData, 0,
		allAABBData.length
	)
	let tree = {
		wholeAABBData,
		leafAllAABBData: null,
		child1: null,
		child2: null
	}


	let sortedAllAABBDataWithMortonEncode = _sortByMorton(
		_mortonEncode(_buildGridPosition(wholeAABBData, allAABBData))
	)

	_buildByLBVH(tree, minCount, maxDepth, 0, _getGridXBitCount() + _getGridYBitCount(), sortedAllAABBDataWithMortonEncode,
		_convertToAllAABBData(sortedAllAABBDataWithMortonEncode),
		0,
		sortedAllAABBDataWithMortonEncode.length

	)

	return tree
}


// export let buildByLBVH2 = (allAABBDataWithGridPosition, minCount = 5, maxDepth = 10): tree => {
// 	let wholeAABBData = _computeWholeAABBData(allAABBDataWithGridPosition.map(([aabbData, _]) => aabbData), 0,
// 		allAABBDataWithGridPosition.length
// 	)


// 	let tree = {
// 		wholeAABBData,
// 		leafAllAABBData: null,
// 		child1: null,
// 		child2: null
// 	}


// 	let sortedAllAABBDataWithMortonEncode = _sortByMorton(
// 		// _mortonEncode(_buildGridPosition(wholeAABBData, allAABBData, GRID_X_BIT_COUNT, GRID_Y_BIT_COUNT))
// 		_mortonEncode(allAABBDataWithGridPosition)
// 	)

// 	_buildByLBVH(tree, minCount, maxDepth, 0, _getGridXBitCount() + _getGridYBitCount(), sortedAllAABBDataWithMortonEncode,
// 		_convertToAllAABBData(sortedAllAABBDataWithMortonEncode),
// 		0,
// 		sortedAllAABBDataWithMortonEncode.length

// 	)

// 	return tree
// }