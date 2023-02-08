export const removeDataFromStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

export const saveDataToStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromStorage = (key: string) => {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const ROLES = {
  ADMIN: "admin",
  USER:"user"
};

export const BANNER_LOCATIONS = {
  "TOP_SMALL": "TOP_SMALL",
  // "TOP_MEDIUM": "TOP_MEDIUM",
  // "TOP_LARGE": "TOP_LARGE",
  "BOTTOM_SLIDER": "BOTTOM_SLIDER",
};
export const BannersSizes:any = {
  "small": "100",
  "medium": "150",
  "big": "200",
  "none": "0",
};

export const CATEGORIES: any = [
  "ساکسیفون",
  "جز",
  "پیانو",
  "هارمونی"
]; 