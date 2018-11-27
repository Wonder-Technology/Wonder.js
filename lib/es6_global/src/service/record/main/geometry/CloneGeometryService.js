


function handleCloneComponent(sourceComponent, countRangeArr, record) {
  return /* tuple */[
          record,
          countRangeArr.map((function () {
                  return sourceComponent;
                }))
        ];
}

export {
  handleCloneComponent ,
  
}
/* No side effect */
