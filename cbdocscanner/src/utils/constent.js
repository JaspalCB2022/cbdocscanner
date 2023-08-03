const types = {
  1: 'pdf',
  2: 'Images',
  PDF: 1,
  IMAGES: 2,
};

const AlertTypes = {
  normal: 'normal',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  custom: 'custom',
};

const mailStatusEnum = {
  openandscan: 1,
  shredded: 2,
  pending: 3,
  notmine: 4,
  1: 'Open & Scan',
  2: 'Shredded',
  3: 'Pending',
  4: 'Not Mine',
};
const mailStatusColor = {
  1: '#308AF3',
  2: '#F67A49',
  3: '#F5BA4A',
  4: '#EC5F5F',
};

export {types, AlertTypes, mailStatusEnum, mailStatusColor};
