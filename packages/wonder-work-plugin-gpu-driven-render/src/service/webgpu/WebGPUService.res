let getWebGPU = (): IWebGPUForJs.webgpu => {
  POContainer.unsafeGetPO().webgpu
}

let setWebGPU = (webgpu: IWebGPUForJs.webgpu): unit => {
  POContainer.setPO({
    ...POContainer.unsafeGetPO(),
    webgpu: webgpu,
  })
}
