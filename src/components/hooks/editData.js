import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axios";

export const useDataEdit = (url) => {
  return useMutation((data) => api.put(url, data));
};
