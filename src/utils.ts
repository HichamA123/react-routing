import { Bounce, toast, ToastOptions } from "react-toastify";


// TODO use unique salts, or better: move logic to backend
// hashes password using basic sha-256 hashing algortihm
export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Hash the password
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert byte array to hex string
  return hashHex
}

export const toastProps: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
}

export enum ToastTypes {
  SUCCESS,
  ERROR,
}

//should only be called inside a react component
export function triggerToast (message: string, type: ToastTypes) {
  switch (type) {
    case ToastTypes.SUCCESS:
      toast.success(message, toastProps)
      break
    case ToastTypes.ERROR:
      toast.error(message, toastProps)
      break
    default:
      toast.warn(message, toastProps)
      console.warn("toast type not defined")
      break
  }
}