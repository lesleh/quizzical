export interface ProgressBarProps {
  current: number;
  maximum: number;
  text?: string;
}

export function ProgressBar({ current, maximum, text }: ProgressBarProps) {
  return (
    <div>
      <progress
        // TODO: Make this skinnable
        className="progress progress-secondary"
        value={current}
        max={maximum}
      ></progress>
      {text && <p>{text}</p>}
    </div>
  );
}
