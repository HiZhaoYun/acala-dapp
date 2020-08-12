import useRequest from '@umijs/use-request';

export const useRequestChart = (sql: string) => {
  const data = useRequest(() => ({
    method: 'GET',
    url: `http://39.99.168.67:8086/query?q=${sql}`
  }));

  return (data as any)?.data?.results?.[0]?.series;
};
