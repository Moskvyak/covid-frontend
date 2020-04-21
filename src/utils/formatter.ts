function getThousandsGroupRegex(thousandsGroupStyle: string) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;

    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;

    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}

export function applyThousandSeparator(
  str: string,
  thousandSeparator: string,
  thousandsGroupStyle: string
) {
  const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  let index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str
      .substring(index, str.length)
      .replace(thousandsGroupRegex, '$1' + thousandSeparator)
  );
}
