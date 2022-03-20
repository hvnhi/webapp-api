// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hashids = require('hashids/cjs');
const hashids = new Hashids('webapp.api', 15);
import empty from 'is-empty';
import _slugify from 'slugify';

export function encodeId(idNumber: number): string {
  return hashids.encode(idNumber);
}

export function decodeId(idString: string): string {
  const ids = hashids.decode(idString);
  return ids.length ? `${ids[0]}` : null;
}

export function isEmpty(obj = {}): string {
  return empty(obj);
}

export function slugify(s: string): string {
  if (!s) {
    return '';
  }

  let str = s.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  str = str.replace(/ + /g, ' ');
  str = str.trim();

  return _slugify(str);
}
