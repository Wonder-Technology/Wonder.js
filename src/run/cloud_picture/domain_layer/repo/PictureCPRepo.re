let getSize = () => {
  CPRepo.getPicture().size;
};

let setSize = size => {
  CPRepo.setPicture({...CPRepo.getPicture(), size: size->Some});
};
