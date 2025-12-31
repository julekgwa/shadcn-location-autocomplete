export interface Response<T> {
  response: T;
  status: number;
}

export const buildQueryString = (
  params: Record<
    string,
    string | number | boolean | undefined | null | number[]
  >,
): string => {
  return Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    ) // skip empty
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
};

export async function fetcher<T>(
  url: string,
  options: RequestInit = {},
): Promise<Response<T>> {
  const res = await fetch(url, options);
  const response = await res.json();

  return {
    response: response as T,
    status: res.status,
  };
}
