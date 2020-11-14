open Js.Typed_array;

let create = () => JobEntity.create("update_textureArray");

let _addImageIdAndData = (result, imageId) => {
  switch (AssetRunAPI.getImageData(imageId)) {
  | Some(imageData) => [(imageId, imageData), ...result]
  | None => result
  };
};

let _getAllUsedImageIdAndData = sceneGameObject => {
  GameObjectRunAPI.getAllRenderBSDFMaterials(sceneGameObject)
  ->ListSt.reduce(
      [],
      (result, material) => {
        let result =
          switch (BSDFMaterialRunAPI.getSpecularMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageIdAndData(result, imageId)
          };

        let result =
          switch (BSDFMaterialRunAPI.getDiffuseMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageIdAndData(result, imageId)
          };

        let result =
          switch (
            BSDFMaterialRunAPI.getChannelRoughnessMetallicMapImageId(material)
          ) {
          | None => result
          | Some(imageId) => _addImageIdAndData(result, imageId)
          };

        let result =
          switch (BSDFMaterialRunAPI.getEmissionMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageIdAndData(result, imageId)
          };

        let result =
          switch (BSDFMaterialRunAPI.getNormalMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageIdAndData(result, imageId)
          };

        let result =
          switch (BSDFMaterialRunAPI.getTransmissionMapImageId(material)) {
          | None => result
          | Some(imageId) => _addImageIdAndData(result, imageId)
          };

        result;
      },
    )
  ->ListSt.removeDuplicateItemsU(((imageId, _)) => imageId->ImageIdVO.value);
};

let _getLayerCount = allUsedImageIdAndData => {
  let count = allUsedImageIdAndData->ListSt.length;

  (count === 0 ? 1 : count)
  ->Contract.ensureCheck(
      r => {
        open Contract;
        open Operators;

        let maxLayerCount =
          WebGPUCoreDpRunAPI.unsafeGet().capacity.getTextureArrayMaxLayerCount();

        test(
          Log.buildAssertMessage(
            ~expect={j|layer count:$r < $maxLayerCount|j},
            ~actual={j|not|j},
          ),
          () => {
          r < maxLayerCount
        });
      },
      ConfigDpRunAPI.unsafeGet().getIsDebug(),
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

let _buildWebGPUObjects =
    (device, (textureArrayLayerWidth, textureArrayLayerHeight, layerCount)) => {
  let format = "rgba8unorm";

  let textureArray =
    WebGPUCoreDpRunAPI.unsafeGet().device.createTexture(
      IWebGPUCoreDp.textureDescriptor(
        ~size={
          "width": textureArrayLayerWidth,
          "height": textureArrayLayerHeight,
          "depth": 1,
        },
        ~arrayLayerCount=layerCount,
        ~mipLevelCount=1,
        ~sampleCount=1,
        ~dimension="2d",
        ~format,
        ~usage=
          WebGPUCoreDpRunAPI.unsafeGet().textureUsage.copy_dst
          lor WebGPUCoreDpRunAPI.unsafeGet().textureUsage.sampled,
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

let _fillImageDataToBufferDataWithFixedSize =
    (
      (textureArrayLayerWidth, textureArrayLayerHeight),
      {width, height, data}: ImageRepoType.data,
      bytesPerRow,
    ) => {
  width == textureArrayLayerWidth && height == textureArrayLayerHeight
    ? {
      data;
    }
    : {
      let yy = ref(0);
      let xx = ref(0);

      let bufferData =
        Uint8Array.fromLength(bytesPerRow * textureArrayLayerHeight);

      while (yy^ < height) {
        xx := 0;

        while (xx^ < width) {
          let bufferDataIndex = xx^ * 4 + yy^ * bytesPerRow;
          let dataIndex = xx^ * 4 + yy^ * width * 4;

          TypeArrayCPRepoUtils.setUint8_1WithoutCheck(
            bufferDataIndex + 0,
            TypeArrayCPRepoUtils.getUint8_1(dataIndex + 0, data),
            bufferData,
          );
          TypeArrayCPRepoUtils.setUint8_1WithoutCheck(
            bufferDataIndex + 1,
            TypeArrayCPRepoUtils.getUint8_1(dataIndex + 1, data),
            bufferData,
          );
          TypeArrayCPRepoUtils.setUint8_1WithoutCheck(
            bufferDataIndex + 2,
            TypeArrayCPRepoUtils.getUint8_1(dataIndex + 2, data),
            bufferData,
          );
          TypeArrayCPRepoUtils.setUint8_1WithoutCheck(
            bufferDataIndex + 3,
            TypeArrayCPRepoUtils.getUint8_1(dataIndex + 3, data),
            bufferData,
          );

          xx := xx^ + 1;
        };

        yy := yy^ + 1;
      };

      bufferData;
    };
};

let _fillTextureArray =
    (
      (device, queue),
      textureArray,
      (textureArrayLayerWidth, textureArrayLayerHeight),
      allUsedImageIdAndData,
    ) => {
  let bytesPerRow =
    Js.Math.ceil_int(Number.dividInt(textureArrayLayerWidth * 4, 256)) * 256;

  let textureBuffer =
    WebGPUCoreDpRunAPI.unsafeGet().device.createBuffer(
      {
        "size":
          bytesPerRow * textureArrayLayerHeight * Uint8Array._BYTES_PER_ELEMENT,
        "usage":
          WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_src
          lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst,
      },
      device,
    );

  allUsedImageIdAndData->ListSt.forEachi((layerIndex, (_, imageData)) => {
    let commandEncoder =
      WebGPUCoreDpRunAPI.unsafeGet().device.createCommandEncoder(
        IWebGPUCoreDp.commandEncoderDescriptor(),
        device,
      );

    let bufferData =
      _fillImageDataToBufferDataWithFixedSize(
        (textureArrayLayerWidth, textureArrayLayerHeight),
        imageData,
        bytesPerRow,
      );

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
        "textureArrayLayerHeight": 0,
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
      {
        "width": textureArrayLayerWidth,
        "height": textureArrayLayerHeight,
        "depth": 1,
      },
      commandEncoder,
    );

    WebGPUCoreDpRunAPI.unsafeGet().queue.submit(
      [|
        WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.finish(commandEncoder),
      |],
      queue,
    );
  });
};

let _setWebGPUObjects = (textureArrayView, textureSampler) => {
  TextureArrayWebGPUCPRepo.setTextureArrayView(textureArrayView);
  TextureArrayWebGPUCPRepo.setTextureSampler(textureSampler);
};

let exec = () => {
  Tuple2.collectOption(WebGPUCPRepo.getDevice(), WebGPUCPRepo.getQueue())
  ->Result.bind(((device, queue)) => {
      let allUsedImageIdAndData =
        _getAllUsedImageIdAndData(SceneRunAPI.getSceneGameObject());

      _setMapBetweenImageIdToLayerIndex(allUsedImageIdAndData);

      let (textureArrayLayerWidth, textureArrayLayerHeight) =
        WebGPUCPAPI.getTextureArrayLayerSize();

      _getLayerCount(allUsedImageIdAndData)
      ->Result.mapSuccess(layerCount => {
          let (textureArray, textureArrayView, textureSampler) =
            _buildWebGPUObjects(
              device,
              (textureArrayLayerWidth, textureArrayLayerHeight, layerCount),
            );

          _fillTextureArray(
            (device, queue),
            textureArray,
            (textureArrayLayerWidth, textureArrayLayerHeight),
            allUsedImageIdAndData,
          );

          _setWebGPUObjects(textureArrayView, textureSampler);
        });
    })
  ->WonderBsMost.Most.just;
};
