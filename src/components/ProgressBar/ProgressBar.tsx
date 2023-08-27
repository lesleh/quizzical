export interface ProgressBarProps {
  current: number;
  maximum: number;
  text?: string;
}

export function ProgressBar({ current, maximum, text }: ProgressBarProps) {
  return (
    <div className="my-4">
      <progress
        // TODO: Make this skinnable
        className="progress progress-secondary mb-1"
        value={current}
        max={maximum}
      ></progress>
      {text && <p>{text}</p>}
    </div>
  );
}
