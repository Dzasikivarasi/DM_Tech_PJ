import { ChangeEvent, FocusEvent } from "react";

type FilterInputProps = {
  title: string;
  type: "minPrice" | "maxPrice" | "minRating";
  value: number | undefined;
  handleInputChange: (
    value: number,
    type: "minPrice" | "maxPrice" | "minRating"
  ) => void;
};

export default function FilterInput({
  title,
  type,
  value,
  handleInputChange,
}: FilterInputProps): JSX.Element {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = Number(e.target.value);
    handleInputChange(newValue, type);
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  return (
    <label>
      {title}
      <input
        type="number"
        value={value === undefined ? "" : value}
        onChange={onInputChange}
        onFocus={onFocus}
        placeholder="..."
      />
    </label>
  );
}
