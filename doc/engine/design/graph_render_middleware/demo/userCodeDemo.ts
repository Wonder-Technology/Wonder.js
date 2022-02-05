


type graphRender = {

}




function _createScene(): {
pbr material:
// clearColor: loadValue

set diffuseMap


let material = createPBRMaterial();
setDiffuseMap(material, new Image());


custom material1:
depth on
// cull


let material = createCustomMaterial1();
setDepthTest(material, true)



cube geometry

sphere geometry

camera

direction light


two cubes, one sphere

}


export let initJobExec: execFunc = (states) => {
    return callFunc(() => {
        initAllUBOsAndSSBOs()

        //build all wgsl
        initAllShaders()

        initAllPipelines()

        initAllRenderBundles()


        return states
    })
}

export let updateJobExec: execFunc = (states) => {
    return callFunc(() => {
        // initNewUBOsAndSSBOs()
        // initNewShaders()
        // initNewPipelines()
        // initNewRenderBundles()

        updateUBOsAndSSBOs()

        let batches = buildBatches()
        updateIndirectBuffer(indirectBuffer, batches)
        updateInstanceBuffer(indirectBuffer, batches)

        return states
    })
}


export let renderJobExec: execFunc = (states) => {
    return callFunc(() => {
        // batches = [
        //     {
        //         data:[]
        //         type:"render"
        //     },
        //     {
        //         data:[]
        //         type:"compute"
        //     }
        // ]

        set pass state

        execBatches(batches)

        // batches.renderBatches.forEach(batchData => {
        // batches.forEach(batchData => {
        //     let {material, geometry} = batchData

        // // textureQuadPassDescriptor.colorAttachments[0].view = context
        // //   .getCurrentTexture()
        // //   .createView();
        // // debugViewPass.setPipeline(gBuffersDebugViewPipeline);
        // // debugViewPass.setBindGroup(0, gBufferTexturesBindGroup);
        // // debugViewPass.setBindGroup(1, canvasSizeUniformBindGroup);
        // // debugViewPass.draw(6);
        // // debugViewPass.endPass();
        // })

        return states
    })
}

