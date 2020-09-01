let addToDirtyList = (dirtyList, index) => dirtyList->ListSt.push(index);

let removeFromDirtyList = (dirtyList, index) =>
  dirtyList->ListSt.remove(index);
