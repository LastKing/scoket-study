/**
 * Created by Rain on 2016/2/25.
 */


function getStringLength(_str) {
  return _str.replace(/[^\u0000-\u00ff]/g, "tt").length;
}