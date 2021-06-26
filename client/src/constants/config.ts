declare global {
  interface ImportMeta {
    env: {
      MODE: string;
      SNOWPACK_PUBLIC_GRAPHQL_PATH: string;
    };
  }
}

const { MODE, SNOWPACK_PUBLIC_GRAPHQL_PATH } = import.meta.env;

export const config = {
  DEV: MODE === 'development',
  GRAPHQL_PATH: SNOWPACK_PUBLIC_GRAPHQL_PATH,
};
