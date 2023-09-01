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

const dbMailStatusEnum = {
  OpenScan: 'Open & Scan',
  Shred: 'Shredded',
  Notmine: 'Not Mine',
  'forward to me': 'Forward to Me',
  Pending: 'Pending',
  Done: 'Done',
  1: 'OpenScan',
  2: 'Shred',
};

const dbmailStatusColor = {
  OpenScan: '#308AF3',
  Shred: '#F67A49',
  Pending: '#F5BA4A',
  Notmine: '#EC5F5F',
  'forward to me': '#768eab',
  Done: '#0DAF28',
};

const fileType = {
  1: 'PDF',
  2: 'Image',
  PDF: 1,
  Image: 2,
};

const threadType = {
  1: 'document',
  2: 'thread',
  document: 1,
  thread: 2,
};

export {
  threadType,
  types,
  AlertTypes,
  mailStatusEnum,
  mailStatusColor,
  fileType,
  dbmailStatusColor,
  dbMailStatusEnum,
};
