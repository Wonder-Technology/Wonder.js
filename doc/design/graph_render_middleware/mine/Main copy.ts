import { vertexShader, fragmentShader } from './sprite';
import { computeShader } from './updateSprites';
import { initCanvas } from './Utils';
import { addTime, showTime } from '../../../utils/CPUTimeUtils';
import { getSize } from '../../../utils/CanvasUtils';

const main = async () => {
  const instanceCount = 30000;

  document.querySelector("#instance_count").innerHTML = String(instanceCount);

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  const canvas: HTMLCanvasElement = initCanvas(document.querySelector("#canvas") as HTMLCanvasElement);

  const context: GPUCanvasContext = canvas.getContext('gpupresent') as GPUCanvasContext;

  const swapChainFormat = 'bgra8unorm';
  const swapChain = context.configureSwapChain({
    device,
    format: swapChainFormat,
  });

  const renderPipeline = device.createRenderPipeline({
    vertex: {
      module: device.createShaderModule({ code: vertexShader }),
      entryPoint: 'main',
      buffers: [
        {
          // instanced particles buffer
          arrayStride: 4 * 4,
          stepMode: 'instance',
          attributes: [
            {
              // instance position
              shaderLocation: 0,
              offset: 0,
              format: 'float32x2',
            },
            {
              // instance velocity
              shaderLocation: 1,
              offset: 2 * 4,
              format: 'float32x2',
            },
          ],
        },
        {
          // vertex buffer
          arrayStride: 2 * 4,
          stepMode: 'vertex',
          attributes: [
            {
              // vertex positions
              shaderLocation: 2,
              offset: 0,
              format: 'float32x2',
            },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({ code: fragmentShader }),
      entryPoint: 'main',
      targets: [
        {
          format: swapChainFormat,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  });

  const computePipeline = device.createComputePipeline({
    compute: {
      module: device.createShaderModule({ code: computeShader }),
      entryPoint: 'main',
    },
  });

  const renderPassDescriptor: any = {
    colorAttachments: [
      {
        view: undefined, // Assigned later
        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        storeOp: 'store',
      },
    ],
  };

  // prettier-ignore
  const vertexBufferData = new Float32Array([
    -0.01, -0.02, 0.01,
    -0.02, 0.0, 0.02,
  ]);

  const spriteVertexBuffer = device.createBuffer({
    size: vertexBufferData.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(spriteVertexBuffer.getMappedRange()).set(vertexBufferData);
  spriteVertexBuffer.unmap();

  const simParams = {
    deltaT: 0.04,
    rule1Distance: 0.1,
    rule2Distance: 0.025,
    rule3Distance: 0.025,
    rule1Scale: 0.02,
    rule2Scale: 0.05,
    rule3Scale: 0.005,
  };

  const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
  const simParamBuffer = device.createBuffer({
    size: simParamBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  function updateSimParams() {
    device.queue.writeBuffer(
      simParamBuffer,
      0,
      new Float32Array([
        simParams.deltaT,
        simParams.rule1Distance,
        simParams.rule2Distance,
        simParams.rule3Distance,
        simParams.rule1Scale,
        simParams.rule2Scale,
        simParams.rule3Scale,
      ])
    );
  }

  updateSimParams();

  const initialParticleData = new Float32Array(instanceCount * 4);
  for (let i = 0; i < instanceCount; ++i) {
    initialParticleData[4 * i + 0] = 2 * (Math.random() - 0.5);
    initialParticleData[4 * i + 1] = 2 * (Math.random() - 0.5);
    initialParticleData[4 * i + 2] = 2 * (Math.random() - 0.5) * 0.1;
    initialParticleData[4 * i + 3] = 2 * (Math.random() - 0.5) * 0.1;
  }

  const particleBuffers: GPUBuffer[] = new Array(2);
  const particleBindGroups: GPUBindGroup[] = new Array(2);
  for (let i = 0; i < 2; ++i) {
    particleBuffers[i] = device.createBuffer({
      size: initialParticleData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
      mappedAtCreation: true,
    });
    new Float32Array(particleBuffers[i].getMappedRange()).set(
      initialParticleData
    );
    particleBuffers[i].unmap();
  }

  for (let i = 0; i < 2; ++i) {
    particleBindGroups[i] = device.createBindGroup({
      layout: computePipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: simParamBuffer,
          },
        },
        {
          binding: 1,
          resource: {
            buffer: particleBuffers[i],
            offset: 0,
            size: initialParticleData.byteLength,
          },
        },
        {
          binding: 2,
          resource: {
            buffer: particleBuffers[(i + 1) % 2],
            offset: 0,
            size: initialParticleData.byteLength,
          },
        },
      ],
    });
  }

  let cpuTimeSumArr = [];

  let t = 0;

  setInterval(() => {
    let n1 = performance.now();

    renderPassDescriptor.colorAttachments[0].view = swapChain
      .getCurrentTexture()
      .createView();

    const commandEncoder = device.createCommandEncoder();
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(computePipeline);
      passEncoder.setBindGroup(0, particleBindGroups[t % 2]);
      passEncoder.dispatch(Math.ceil(instanceCount / 64));
      passEncoder.endPass();
    }
    {
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      let [width, height] = getSize();
      passEncoder.setViewport(0, 0, width, height, 0, 1);
      passEncoder.setPipeline(renderPipeline);
      passEncoder.setVertexBuffer(0, particleBuffers[(t + 1) % 2]);
      passEncoder.setVertexBuffer(1, spriteVertexBuffer);
      passEncoder.draw(3, instanceCount, 0, 0);
      passEncoder.endPass();
    }
    device.queue.submit([commandEncoder.finish()]);

    ++t;

    addTime(cpuTimeSumArr, n1);
  }, 16);

  showTime(cpuTimeSumArr);
};

window.addEventListener('DOMContentLoaded', main);