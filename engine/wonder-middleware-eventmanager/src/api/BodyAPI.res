let getBodyExn = () => {
  ContainerManager.getPO()->BodyDoService.getBodyExn
}

let setBody = body => {
  ContainerManager.getPO()->BodyDoService.setBody(body)->ContainerManager.setPO
}
