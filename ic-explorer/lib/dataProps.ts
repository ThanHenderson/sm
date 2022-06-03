export type DataProps<T> = {
  data: T | null,
  error: any | null
};

export type SSRReturn<T> = {
  props: DataProps<T>
};
