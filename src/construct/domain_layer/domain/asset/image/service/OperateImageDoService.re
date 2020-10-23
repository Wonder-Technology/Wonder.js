let getData = id => {
  DpContainer.unsafeGetImageRepoDp().getData(id->ImageIdVO.value);
};

let setData = (id, data) => {
  DpContainer.unsafeGetImageRepoDp().setData(id->ImageIdVO.value, data);
};
