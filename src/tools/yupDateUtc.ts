export default function (value: any, originalValue: string) {
  // the reported date from yup is in local TZ, so we need to "shift" back to UTC
  const val = new Date(value);
  
  // if the local TZ is UTC, then the offset is going to be 0
  // if local TZ is +, then the offset is going to be negative
  const dateOffset = new Date().getTimezoneOffset() * -60000;

  // offset the time to UTC
  const utcDate = new Date(val.getTime() + dateOffset);
  return utcDate;
}