let _getBlockEdgeLength = () => 32

let computeHorizentalBlocksCount = window => {
  let blockEdgeLength = _getBlockEdgeLength()

  let blockWidth = (WebGPUCoreDpRunAPI.unsafeGet().window.getWidth(window) + 31) / blockEdgeLength

  blockWidth + 1
}

let computeVerticalBlocksCount = window => {
  let blockEdgeLength = _getBlockEdgeLength()

  let blockHeight = (WebGPUCoreDpRunAPI.unsafeGet().window.getHeight(window) + 31) / blockEdgeLength

  blockHeight + 1
}
