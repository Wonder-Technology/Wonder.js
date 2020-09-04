let map = ((x, y, z), func) => (x->func, y->func, z->func);

let collectResult = (resultData1, resultData2, resultData3) => {
  resultData1->Result.bind(data1 => {
    resultData2->Result.bind(data2 => {
      resultData3->Result.mapSuccess(data3 => {(data1, data2, data3)})
    })
  });
};
