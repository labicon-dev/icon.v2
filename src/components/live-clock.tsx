import { useLabClock } from '../lib/lab-clock';

function LiveClock() {
  const { date, label } = useLabClock();

  return (
    <time dateTime={date.toISOString()} className="text-accent">
      {label}
    </time>
  );
}

export default LiveClock;
