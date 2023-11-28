


export const validateSesion = (dataLoginUser) => {
  if (dataLoginUser === null) {
    return false;
  } else if (
    typeof dataLoginUser === "object" &&
    Object.keys(dataLoginUser).length > 0
  ) {
    return true;
  } else {
    return false;
  }
};
