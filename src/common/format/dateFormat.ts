import { DateTime } from 'luxon';

const HUMAN_DATE_FORMAT = 'LLL d, yyyy';

/**
 * This assumes that dates in the format `YYYY-MM-DD` or `Month DD, YYYY` are
 * treated as calendar dates, without timezone conversion.
 *
 * If parsing fails, return the original string;
 *
 * @param value - Either an ISO date or date in 'LLL d, yyyy' format (assuming en-US locale for parsing)
 * @returns the formatted date in en-US locale.
 */
export function formatDate(value: string) {
  const parsedDate = parseDate(value);

  if (!parsedDate.isValid) {
    console.log('ERROR!', value);
  }

  return parsedDate.isValid
    ? parsedDate.toFormat(HUMAN_DATE_FORMAT, { locale: 'en-US' }) // No internationalization requirements - ensures consistency.
    : value;
}

function parseDate(value: string) {
  const isoDateTime = DateTime.fromISO(value);
  if (isoDateTime.isValid) {
    return isoDateTime
  };

  return DateTime.fromFormat(value, HUMAN_DATE_FORMAT, { locale: 'en-US' }); // Assumes API always uses en-US
}
