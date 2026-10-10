function checkObjectIsEmpty(obj) {
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) return false;
  }
  return true;
}

function isStringEmpty(str) {
  return typeof str !== "string" || str.trim().length === 0;
}

export { checkObjectIsEmpty, isStringEmpty };
