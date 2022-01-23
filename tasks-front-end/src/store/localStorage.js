export const loadState = (item) => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (item, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(item, serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const removeState = (item) => {
  localStorage.removeItem(item);
};
