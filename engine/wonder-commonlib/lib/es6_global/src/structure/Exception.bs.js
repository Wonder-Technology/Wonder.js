


var throwErr = ((err) => {
    throw err;
});

var buildErr = ((message) => {
return new Error(message);
});

export {
  throwErr ,
  buildErr ,
  
}
/* No side effect */
