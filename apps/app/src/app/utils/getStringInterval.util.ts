/** DATE-FNS */
import { formatDuration, intervalToDuration } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

function getStringInterval(
  start: Date,
  end: Date,
  currentLang: string
): string {
  const duration = intervalToDuration({
    start,
    end,
  });

  const format =
    duration.days && duration.days > 1
      ? ['days', 'hours']
      : ['hours', 'minutes', 'seconds'];
  const formattedDuration = formatDuration(duration, {
    format,
    locale: currentLang === 'fr' ? fr : enUS,
  });
  return formattedDuration !== '' ? formattedDuration : '0s';
}

export default getStringInterval;
