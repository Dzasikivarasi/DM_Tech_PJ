export const formatNumber = (count: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.ceil(count));
};
