export default function (date) {
  const options = { year: '2-digit', month: '2-digit' };
  const formatedDate = new Date(date).toLocaleDateString('pt-br', options);
  return formatedDate;
};
