import dayjs from "dayjs";

export default function parseTime(str, format) {
  return dayjs(str).format(format);
}
