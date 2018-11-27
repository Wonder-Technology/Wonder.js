


function removeFromRenderLightArr(mappedIndex, renderLightArr) {
  return renderLightArr.filter((function (renderMappedIndex) {
                return renderMappedIndex !== mappedIndex;
              }));
}

export {
  removeFromRenderLightArr ,
  
}
/* No side effect */
