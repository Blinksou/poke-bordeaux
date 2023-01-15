/** DATE-FNS */
import { formatDuration, intervalToDuration } from "date-fns";

function getStringInterval(start: Date, end: Date) {
  const duration = intervalToDuration({
    start,
    end,
  });

  const format = (duration.days && duration.days > 1) ? ['days', 'hours'] : ['hours', 'minutes', 'seconds'];
  const formattedDuration = formatDuration(duration, {format});
  return formattedDuration !== '' ? formattedDuration : '0s';
}

export default getStringInterval;