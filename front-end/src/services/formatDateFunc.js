export default function (date) {
  const newDateArr = date.replace('T', ' ').split(' ');
  const newDate = newDateArr[0].split('-');
  return `${newDate[2]}/${newDate[1]}`;
};
