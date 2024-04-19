function addTypeMediaContent(content, type) {
  const newContent = content.map((item) => ({ ...item, type }));

  return newContent;
}

export {
  addTypeMediaContent,
};
