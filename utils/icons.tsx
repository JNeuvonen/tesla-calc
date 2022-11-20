type iconDefaultTypes = {
  width?: string;
  height?: string;
  fill?: string | undefined;
};

export const CalculatorIcon = ({
  width = "16px",
  height = "16px",
  fill = "#000000",
}: iconDefaultTypes) => {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <path d="M 11 4 C 9.347656 4 8 5.347656 8 7 L 8 43 C 8 44.652344 9.347656 46 11 46 L 39 46 C 40.652344 46 42 44.652344 42 43 L 42 7 C 42 5.347656 40.652344 4 39 4 Z M 14 9 L 36 9 L 36 17 L 14 17 Z M 24 12 L 24 14 L 26 14 L 26 12 Z M 28 12 L 28 14 L 30 14 L 30 12 Z M 32 12 L 32 14 L 34 14 L 34 12 Z M 14 24 L 18 24 L 18 28 L 14 28 Z M 20 24 L 24 24 L 24 28 L 20 28 Z M 26 24 L 30 24 L 30 28 L 26 28 Z M 32 24 L 36 24 L 36 28 L 32 28 Z M 14 30 L 18 30 L 18 34 L 14 34 Z M 20 30 L 24 30 L 24 34 L 20 34 Z M 26 30 L 30 30 L 30 34 L 26 34 Z M 32 30 L 36 30 L 36 34 L 32 34 Z M 14 36 L 18 36 L 18 40 L 14 40 Z M 20 36 L 24 36 L 24 40 L 20 40 Z M 26 36 L 30 36 L 30 40 L 26 40 Z M 32 36 L 36 36 L 36 40 L 32 40 Z" />
    </svg>
  );
};
