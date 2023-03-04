import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axios";

export const useDataAdd = (url, options) => {
  return useMutation((data) => api.post(url, data));
};
// export const useDataAdd = (url, data, options) => {
//   const postMutation = useMutation((data) => api.post(url, data));
//   return () => {
//     postMutation.mutate({ ...data }, { ...options });
//   };
// };
