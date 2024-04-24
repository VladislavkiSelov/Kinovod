function addTypeMediaContent(content, type) {
  const newContent = content.map((item) => ({ ...item, type }));

  return newContent;
}

function getParamsFilter(value) {
  const getParams = new URLSearchParams(value);
  const paramsObject = Object.fromEntries(getParams.entries());
  return paramsObject;
}

export {
  addTypeMediaContent,
  getParamsFilter
};
