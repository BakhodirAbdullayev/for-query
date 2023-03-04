import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/axios";

export const useDataFetch = (keys, url, options) => {
  return useQuery(keys, () => api.get(url).then((r) => r?.data), {
    ...options,
  });
};
