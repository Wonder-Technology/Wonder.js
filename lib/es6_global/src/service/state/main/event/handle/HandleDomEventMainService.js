


function preventDefault (event){
    if (event.cancelable) {
      if (!event.defaultPrevented) {
          event.preventDefault();
      }
  }

  event.stopPropagation();
  };

export {
  preventDefault ,
  
}
/* No side effect */
