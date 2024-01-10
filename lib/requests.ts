import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export function useIconPage(page: number) {
  let api = `/api/icons/lucide?page=${page}`;
  const { data, error, isLoading } = useSWR<string[]>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    icons: data,
    isLoading,
    isError: error,
  };
}
