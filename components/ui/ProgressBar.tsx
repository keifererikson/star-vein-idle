interface ProgressBarProps extends React.HTMLAttributes<HTMLProgressElement> {
  start: number;
  duration: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  start,
  duration,
  className,
  ...props
}) => {
  return (
    <progress
      className={`progress ${className || ''}`}
      value={start}
      max={duration}
      {...props}
    ></progress>
  );
};
