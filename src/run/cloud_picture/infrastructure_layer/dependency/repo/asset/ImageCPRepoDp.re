open ImageCPPOType;

let setData = (id, data) => {
  let {dataMap} as po = CPRepo.getImage();

  CPRepo.setImage({
    ...CPRepo.getImage(),
    dataMap: dataMap->ImmutableHashMap.set(id, data),
  });
};

let getData = id => {
  CPRepo.getImage().dataMap->ImmutableHashMap.getNullable(id);
};
