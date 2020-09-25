let getData = id => {
  DpContainer.unsafeGetImageRepoDp().getData(id)
};

let setData = (id, data) => {
  DpContainer.unsafeGetImageRepoDp().setData(id->ImageIdVO.value, data);
};
