export let initJobExec: execFunc = (states) => {
    return callFunc(() => {
        let vertexBuffer = _createVertexBuffer()
        let indexBuffer = _createIndexBuffer()
        let materialBufferMap = _createAllMaterialBuffers()
        let cameraBuffer = _createCameraBuffer()
        let indirectBuffer = _createIndirectBuffer()
        let instanceBuffer = _createInstanceBuffer()

        let bindGroupMapWithoutMaterial = createAllBindGroupsWithoutMaterial()
        let bindGroupMapWithMaterial = createAllBindGroupsWithMaterial()

        let renderPipelineMapWithoutMaterial = createRenderPipelinesWithoutMaterial()
        let renderPipelineMapWithMaterial = createRenderPipelinesWithMaterial()


        let batches = initBatches()


        return states
    })
}


export let updateJobExec: execFunc = (states) => {
    return callFunc(() => {
        // TODO handle new geometry,material, transform 
        // TODO handle reinit material

        let batches = updateBatches(batches)
        updateIndirectBuffer(indirectBuffer, batches)
        updateInstanceBuffer(indirectBuffer, batches)

        return states
    })
}


export let renderJobExec: execFunc = (states) => {
    return callFunc(() => {
        execBatches(batches, buildPassState(...))
    })
}



type materialType = string

type bindGroupLayoutData = {
    binding: number,
    visibility: GPUShaderStage,
    materialType?: materialType
}

type vertexAttributeShaderLocationData = Array<number>

type vertexCode = string

type fragmentCode = string

type shaderName = string

function initShader(shaderName: shaderName): [vertexCode, fragmentCode, vertexAttributeShaderLocationData, bindGroupLayoutData] {
    //TODO implement
    return {} as any
}

type material = component

function getShaderName(material: material): shaderName {
    return getShaderNameFromWGSLPackage()
}

function getPipelineState(material: material): pipelineState {
    // getComponentData(material,dataName.depth)

    //TODO implement
    return {} as any
}

function createRenderPipelinesWithoutMaterial(allRenderPipelineData: Array<[shaderName, pipelineState, vertexBufferData]>): Record<renderPipelineName, renderPipeline> {
    return allRenderPipelineData.reduce((allRenderPipelines, [shaderName, vertexBufferData]) => {
        allRenderPipelines.push(
            device.createRenderPipeline({
                initShader(shaderName),
                vertexBufferData,
                pipelineState
            })
        )

        return allRenderPipelines
    }, [])
}

function createRenderPipelinesWithMaterial(allRenderPipelineData: Array<[shaderName, pipelineState, vertexBufferData]>): Record<renderPipelineName, renderPipeline> {
    return allRenderPipelineData.reduce((allRenderPipelines, [shaderName, vertexBufferData]) => {
        allRenderPipelines.push(
            device.createRenderPipeline({
                initShader(shaderName),
                vertexBufferData,
                pipelineState
            })
        )

        return allRenderPipelines
    }, [])
}






function _createVertexBuffer(allVertices: Array<Float32Array>, maxGeometryCount: number, maxGeometryPointCount: number): buffer {
    //TODO implement
    return {} as any
}

function _createIndexBuffer(allIndices: Array<Uint32Array>, maxGeometryCount: number, maxGeometryPointCount: number): buffer {
    //TODO implement
    return {} as any
}

function _createInstanceBuffer(allModelMatrices: Array<Float32Array>, maxInstanceCount: number): buffer {

    //TODO implement
    return {} as any
}

function _createAllMaterialBuffers(allRegisterdMaterialComponentData: Record<materialType, material>): Record<materialType, buffer> {
    //TODO implement
    return {} as any
}

function _createCameraBuffer(): buffer {
    //TODO implement
    return {} as any
}


function _createIndirectBuffer(): buffer {
    //TODO implement
    return {} as any
}


// function createAllBindGroupsWithMaterial(allBufferData:Array<Record<binding, buffer>> , binding): Record<group, bindGroup> {
function createAllBindGroupsWithMaterial(?): Record<group, bindGroup> {
    //TODO implement
    return {} as any
}

function createAllBindGroupsWithoutMaterial(?): Record<group, bindGroup> {
    //TODO implement
    return {} as any
}


function createBindGroup(layout, Array<[binding, buffer]>): [group, bindGroup] {
    //TODO implement
    return {} as any
}




type batch = {
    geometry: number,
    material: number
    materialType,
    count: number,
    // passState
}


function initBatches(
    // buildPassStateData
    maxBatchData
): Array<batch> {
    let renderBundleMap = createRenderBundles(maxBatchData)

    return createBatches(maxBatchData)
}

function updateBatches(
    batches: Array<batch>
): Array<batch> {
    return pipe(
        getAllRenderGameObjects,
        groupByGeometryAndMaterial,
        updateRenderBundles(renderBundleMap)
    )()
}


function updateIndirectBuffer(indirectBuffer, batches): indirectBuffer {
    // getIndirectBufferOffset(batches)

    VkDrawIndirectCommand * drawCommands = map_buffer(get_current_frame().indirectBuffer);


    //encode the draw data of each object into the indirect draw buffer
    for (int i = 0; i < count; i++)
    {
        RenderObject & object = objects[i];
        VkDrawIndirectCommand[i].vertexCount = object.mesh -> _vertices.size();
        VkDrawIndirectCommand[i].instanceCount = 1;
        VkDrawIndirectCommand[i].firstVertex = 0;
        VkDrawIndirectCommand[i].firstInstance = i; //used to access object matrix in the shader
    }

}

function updateInstanceBuffer(indirectBuffer, batches): indirectBuffer {
    // getInstanceBufferOffset(batches)
}


function updateInstanceBuffer(indirectBuffer, batches): indirectBuffer {
    // getInstanceBufferOffset(batches)
}



// function updateCameraBuffer() {
//     // TODO implement
// }

// function updateAllMaterialBuffers() {
//     // TODO implement
// }

// function updateGeometryBuffers() {
//     // TODO implement
// }

function buildPassState(): GPURenderPassDescriptor {
    //TODO implement
    return {} as any
}

function execBatches(batches, passState): void {
    /*
    // renderBundle1: setVertexBuffer, setIndexBuffer(with offset, size)
    // renderBundle2: setPipeline, setBindGroup(each bindGroup only its' material buffer not the same!)
    // renderBundle3:drawIndexedIndirect(of different indirectOffset) 
    */
    //    one renderBundle for each batch!



    const passEncoder = commandEncoder.beginRenderPass({
        passState
    })

    // passEncoder.executeBundles([renderBundle1]]);

    // for (int i = 0; i < batches; i++)
    // {
    //     passEncoder.executeBundles([map[renderBundle1Key], map[renderBundle2Key], map[renderBundle3Key]]);
    // }






    // let bundleArr = []

    // for (int i = 0; i < batches; i++)
    // {
    //     bundleArr = bundleArr.concat([map[renderBundle1Key], map[renderBundle2Key], map[renderBundle3Key]]);
    // }

    // passEncoder.executeBundles(bundleArr);






    let bundleArr = []

    for (let batchId = 0; batchId < batches; batchId++) {
        bundleArr = bundleArr.concat([renderBundleMap[batchId]]);
    }

    passEncoder.executeBundles(bundleArr);

    passEncoder.endPass();
}