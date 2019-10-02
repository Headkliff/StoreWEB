import { ToastsStore } from "react-toasts";

export function successToast(text) {
  return ToastsStore.success(text);
}

export function errorToast(text) {
  return ToastsStore.error(text);
}
