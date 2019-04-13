open StateDataMainType;

let isAlive = (script, {disposedIndexArray}: scriptRecord) =>
  DisposeComponentService.isAlive(script, disposedIndexArray);