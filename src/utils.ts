export const formatNumber = (count: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.ceil(count));
};

export function updateCount(
  number: number,
  action: "increment" | "decrement",
  maxQuantity: number = 10
): number {
  if (action === "increment") {
    return Math.min(number + 1, maxQuantity);
  } else if (action === "decrement") {
    return Math.max(number - 1, 0);
  } else {
    throw new Error("Ошибка действия");
  }
}
