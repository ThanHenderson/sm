export type DataProps<T> = {
  data: T | null,
  error: any | null
};

export type SSRReturn<T> = {
  props: DataProps<T>
};

const returnGetServerSidePropsFunction = <T>(callback: () => Promise<T>) => {
  const getServerSideProps = async (): Promise<SSRReturn<T>> => {
    try {
      const data = await callback();

      return {
        props: {
          data,
          error: null,
        },
      };
    } catch (err: any) {
      return { props: { data: null, error: err } };
    }
  };

  return getServerSideProps;
};
export default returnGetServerSidePropsFunction;
