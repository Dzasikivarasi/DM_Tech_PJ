import { ChangeEvent } from "react";

type FilterSelectProps = {
  title: string;
  value: number | undefined;
  handleInputChange: (value: number, type: "minRating") => void;
  handleKeyDown: () => void;
};

export default function FilterSelect({
  title,
  value,
  handleInputChange,
  handleKeyDown,
}: FilterSelectProps): JSX.Element {
  const onInputChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newValue = Number(e.target.value);
    handleInputChange(newValue, "minRating");
  };

  return (
    <label>
      {title}
      <select
        value={value === undefined ? "" : value}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      >
        <option value="">...</option>
        <option value={1}>1★</option>
        <option value={2}>2★</option>
        <option value={3}>3★</option>
        <option value={4}>4★</option>
        <option value={5}>5★</option>
      </select>
    </label>
  );
}
