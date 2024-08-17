export const formatNumber = (count: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.ceil(count));
};

export function updateCount(
  number: number,
  action: "increment" | "decrement"
): number {
  if (action === "increment") {
    return number + 1;
  } else if (action === "decrement") {
    return number - 1;
  } else {
    throw new Error("Ошибка действия");
  }
}
