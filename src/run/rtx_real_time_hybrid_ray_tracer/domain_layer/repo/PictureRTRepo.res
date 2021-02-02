let getSize = () => RTRepo.getPicture().size

let setSize = size => RTRepo.setPicture({...RTRepo.getPicture(), size: size->Some})
