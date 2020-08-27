let getPipeline = () => {
  let po = CPContainerManager.getPO();

  po.pipeline;
};

let setPipeline = pipeline => {
  let po = CPContainerManager.getPO();

  {...po, pipeline} |> CPContainerManager.setPO;
};
