import { ITime } from "../interfaces";

import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

// gets the total number of items in a paged response
export const getTotal = (response: any): number => {
  return response.total;
}

// gets the combined duration of a list of tracks
export const getTotalDuration = (tracks: any): string => {
  let list: any = tracks.items ? tracks.items : tracks;
  let totalDuration = 0;

  for (let track of list) {
    totalDuration += track.duration_ms ? track.duration_ms : 0;
  }
  
  return formatDurationLong(totalDuration);
}

// gets the year from a date
export const getYear = (dateString: string): string => {
  return dateString.slice(0, 4);
}

// formats a release date depending on its precision
export const formatReleaseDate = (releaseDate: string, precision: "year" | "month" | "day"): string => {
  const date = new Date(releaseDate);

  if (precision === "year") {
    return getYear(releaseDate);
  }

  if (precision === "month") {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(date);
  }

  if (precision === "day") {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
  }

  return releaseDate;
};

// converts a datetime object into a readable format
export const formatAddedAtDate = (dateString: string | Date): string => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (Date.now() - date.getTime() < 1000 * 60 * 60 * 24 * 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, "d MMM yyyy");
  }
};

// formats a millisecond duration into m:ss or h:mm:ss format
export const formatDuration = (milliseconds: number): string => {
  const time: ITime = getTimeFromMilliseconds(milliseconds);

  if (time.hours > 0) {
    return `${time.hours}:${time.remainingMinutes.toString().padStart(2, "0")}:${time.remainingSeconds.toString().padStart(2, "0")}`;
  }
  else {
    return `${time.minutes}:${time.remainingSeconds.toString().padStart(2, "0")}`;
  }
}

// formats a millisecond duration into [x hr, x min] or [x min, x sec] format
export const formatDurationLong = (milliseconds: number): string => {
  const time: ITime = getTimeFromMilliseconds(milliseconds);

  if (time.hours > 0) {
    return `${time.hours} hr, ${time.remainingMinutes} min`;
  }
  else if (time.minutes > 0) {
    return `${time.minutes} min, ${time.remainingSeconds} sec`;
  }
  else {
    return `${time.seconds} sec`
  }
}

// converts a time in milliseconds to a time object
export const getTimeFromMilliseconds = (milliseconds: number): ITime => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;

  const time: ITime = { seconds, minutes, hours, remainingSeconds, remainingMinutes };
  return time;
}

// capitalizes the first leter of a string
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};