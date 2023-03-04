import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axios";

export const useDelData = (url) => {
  return useMutation(() => api.delete(url));
};
