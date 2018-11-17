open GeometryType;

let markPointDataDirtyForRestore = record => {
  record.isPointDataDirtyForRestore = true;

  record;
};