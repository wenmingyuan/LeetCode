// https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/

/* 自己的思路     直接用 split(' ')转换为数组，再 join('%20') 转换回字符串     通过 */
var replaceSpace = function(s) {
  return s.split(' ').join('%20');
};

/* 答案的思路是：
     遍历字符串
       将每个字符放入数组中
       若遇到空格，则将 '%20' 放入数组中
     将数组转换回字符串

  https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/solution/mian-shi-ti-05-ti-huan-kong-ge-ji-jian-qing-xi-tu-/
*/

/* 知道答案思路后自己写的      和答案一样 */
var replaceSpace = function(s) {
  let arr = [];
  for (let e of s) {
    if (e === ' ') arr.push('%20');
    else arr.push(e);
  }
  return arr.join('');
}
