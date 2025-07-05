interface Props {
  classNames?: string;
  color?: string;
  size?: string;
}

export default function ButtonLoading({
  classNames,
  color = "text-primary",
  size = "loading-sm",
}: Props) {
  return (
    <span
      className={`loading loading-spinner ${size} ${classNames} ${color}`}
    ></span>
  );
}
