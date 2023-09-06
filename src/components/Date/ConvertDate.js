function ConvertDate(date) {

  let parts = date.split('.');
  let day = parts[0];
  let month = parts[1];
  let year = parts[2];

  return year + '-' + month + '-' + day;
}

export default ConvertDate;