import { DateTime } from "luxon";

export const formatToLocalTime = (secs, offset, format = "cccc,dd LLL yyyy' | Local time: 'hh:mm a") => {
    return DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);
};
