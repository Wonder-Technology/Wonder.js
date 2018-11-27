let getAllAliveMaterials = (index, disposedIndexArray) =>
  AliveComponentService.getAllAliveComponents(
    index,
    disposedIndexArray,
    DisposeMaterialMainService.isAlive,
  );