let create = () => JobEntity.create("update_textureArray");

let _addImageData = (result, imageId) => {
  switch (AssetRunAPI.getImageData(imageId)) {
  | Some(imageData) => [(imageId, imageData), ...result]
  | None => result
  };
};

let _getAllUsedImageIdAndData = () => {
  GameObjectRunAPI.getAllRenderPBRMaterials()
  ->ListSt.reduce(
      [],
      (result, material) => {
        let result =
          switch (PBRMaterialRunAPI.getDiffuseMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageData(result, imageId)
          };

        let result =
          switch (PBRMaterialRunAPI.getMetalRoughnessMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageData(result, imageId)
          };

        let result =
          switch (PBRMaterialRunAPI.getEmissionMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageData(result, imageId)
          };

        let result =
          switch (PBRMaterialRunAPI.getNormalMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageData(result, imageId)
          };

        result;
      },
    )
  ->ListSt.removeDuplicateItemsU(((imageId, _)) => imageId->ImageIdVO.value);
};

let _getLayerCount = allUsedImageIdAndData => {
  allUsedImageIdAndData
  ->ListSt.length
  ->Contract.ensureCheck(
      r => {
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|layer count:$r < 2048|j},
                ~actual={j|not|j},
              ),
              () => {
              r < 2048
            })
          )
        )
      },
      OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
    );
};

let _setMapBetweenImageIdToLayerIndex = allUsedImageIdAndData => {
  allUsedImageIdAndData
  ->ListSt.reduce(
      0,
      (layerIndex, (imageId, _)) => {
        TextureArrayWebGPUCPRepo.setLayerIndex(
          imageId->ImageIdVO.value,
          layerIndex,
        );

        layerIndex->succ;
      },
    )
  ->ignore;
};

let _buildWebGPUObjects = (device, (imageWidth, imageHeight, layerCount)) => {
  let format = "rgba8unorm-srgb";

  let textureArray =
    WebGPUCoreDpRunAPI.unsafeGet().device.createTexture(
      IWebGPUCoreDp.textureDescriptor(
        ~size={"width": imageWidth, "height": imageHeight, "depth": 1},
        ~arrayLayerCount=layerCount,
        ~mipLevelCount=1,
        ~sampleCount=1,
        ~dimension="2d",
        ~format,
        ~usage=
          WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
          lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.sampled,
      ),
      device,
    );

  let textureArrayView =
    WebGPUCoreDpRunAPI.unsafeGet().texture.createView(
      IWebGPUCoreDp.textureViewDescriptor(
        ~format,
        ~baseArrayLayer=0,
        ~arrayLayerCount=layerCount,
        ~dimension="2d-array",
        (),
      ),
      textureArray,
    );

  let textureSampler =
    WebGPUCoreDpRunAPI.unsafeGet().device.createSampler(
      IWebGPUCoreDp.samplerDescriptor(
        ~magFilter="linear",
        ~minFilter="linear",
        ~addressModeU="repeat",
        ~addressModeV="repeat",
        ~addressModeW="repeat",
      ),
      device,
    );

  (textureArray, textureArrayView, textureSampler);
};

let _scaleImageDataToBufferDataWithFixedSize =
    (
      {width, height, data}: ImagePOType.data,
      bytesPerRow,
      allUsedImageIdAndData,
      bufferData,
    ) => {
  ListSt.range(0, height - 1)
  ->ListSt.traverseResultM(yy => {
      ListSt.range(0, width - 1)
      ->ListSt.traverseResultM(xx => {
          let bufferDataIndex = xx * 4 + yy * bytesPerRow;
          let dataIndex = xx * 4 + yy * width * 4;

          ListResult.mergeResults([
            TypeArrayCPRepoUtils.setUint8_1(
              bufferDataIndex + 0,
              TypeArrayCPRepoUtils.getUint8_1(dataIndex + 0, data),
              bufferData,
            ),
            TypeArrayCPRepoUtils.setUint8_1(
              bufferDataIndex + 1,
              TypeArrayCPRepoUtils.getUint8_1(dataIndex + 1, data),
              bufferData,
            ),
            TypeArrayCPRepoUtils.setUint8_1(
              bufferDataIndex + 2,
              TypeArrayCPRepoUtils.getUint8_1(dataIndex + 2, data),
              bufferData,
            ),
            TypeArrayCPRepoUtils.setUint8_1(
              bufferDataIndex + 3,
              255,
              bufferData,
            ),
          ]);
        })
    })
  ->Result.mapSuccess(_ => ());
};

let _fillTextureArray =
    (
      (device, queue),
      textureArray,
      (imageWidth, imageHeight),
      allUsedImageIdAndData,
    ) => {
  open Js.Typed_array;

  let commandEncoder =
    WebGPUCoreDpRunAPI.unsafeGet().device.createCommandEncoder(
      IWebGPUCoreDp.commandEncoderDescriptor(),
      device,
    );

  let bytesPerRow =
    Js.Math.ceil_int(Number.dividInt(imageWidth * 4, 256)) * 256;

  let bufferData = Uint8Array.fromLength(bytesPerRow * imageHeight);

  let textureBuffer =
    WebGPUCoreDpRunAPI.unsafeGet().device.createBuffer(
      {
        "size": bufferData->Uint8Array.byteLength,
        "usage":
          WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_src
          lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst,
      },
      device,
    );

  allUsedImageIdAndData
  ->ListSt.traverseResultMi((layerIndex, (_, imageData)) => {
      _scaleImageDataToBufferDataWithFixedSize(
        imageData,
        bytesPerRow,
        allUsedImageIdAndData,
        bufferData,
      )
      ->Result.mapSuccess(() => {
          WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint8Data(
            0,
            bufferData,
            textureBuffer,
          );

          WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.copyBufferToTexture(
            {
              "buffer": textureBuffer,
              "bytesPerRow": bytesPerRow,
              "arrayLayer": 0,
              "mipLevel": 0,
              "imageHeight": 0,
            },
            {
              "texture": textureArray,
              "mipLevel": 0,
              "arrayLayer": layerIndex,
              "origin": {
                "x": 0,
                "y": 0,
                "z": 0,
              },
            },
            {"width": imageWidth, "height": imageHeight, "depth": 1},
            commandEncoder,
          );
        })
    })
  ->Result.mapSuccess(_ => {
      WebGPUCoreDpRunAPI.unsafeGet().queue.submit(
        [|
          WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.finish(
            commandEncoder,
          ),
        |],
        queue,
      )
    });
};

let _setWebGPUObjects = (textureArrayView, textureSampler) => {
  TextureArrayWebGPUCPRepo.setTextureArrayView(textureArrayView);
  TextureArrayWebGPUCPRepo.setTextureSampler(textureSampler);
};

let exec = () => {
  Tuple2.collectOption(WebGPUCPRepo.getDevice(), WebGPUCPRepo.getQueue())
  ->Result.bind(((device, queue)) => {
      let allUsedImageIdAndData = _getAllUsedImageIdAndData();

      _setMapBetweenImageIdToLayerIndex(allUsedImageIdAndData);

      let (imageWidth, imageHeight) = WebGPUCoreRunAPI.getTextureArraySize();

      _getLayerCount(allUsedImageIdAndData)
      ->Result.bind(layerCount => {
          let (textureArray, textureArrayView, textureSampler) =
            _buildWebGPUObjects(
              device,
              (imageWidth, imageHeight, layerCount),
            );

          _fillTextureArray(
            (device, queue),
            textureArray,
            (imageWidth, imageHeight),
            allUsedImageIdAndData,
          )
          ->Result.tap(() => {
              _setWebGPUObjects(textureArrayView, textureSampler)
            });
        });
    })
  ->WonderBsMost.Most.just;
};
