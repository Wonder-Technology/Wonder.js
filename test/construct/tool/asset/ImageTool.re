let getData = id => {
  DpContainer.unsafeGetImageRepoDp().getData(id)->OptionSt.fromNullable;
};

let setData = (id, data) => {
  DpContainer.unsafeGetImageRepoDp().setData(id->ImageIdVO.value, data);
};
