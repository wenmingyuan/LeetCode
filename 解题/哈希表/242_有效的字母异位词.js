// https://leetcode-cn.com/problems/valid-anagram/

/* 自己的思路         通过        和答案差不多

    用 Map 存储 s 中每个字母出现的次数，遍历 t 的字符，在 Map 中查找
      若查找不到，返回 false
      若查找到了，将 Map 中 key 对应的 value 减一
    遍历 Map
      若有 value 不为 0，返回 false
    返回 true
*/
var isAnagram = function(s, t) {
  let map = new Map();

  for (let e of s) {
    let val = map.get(e) === undefined ? 0 : map.get(e);
    map.set(e, val + 1);
  }
  for (let e of t) {
    if (map.get(e) === undefined) return false;
    map.set(e, map.get(e) - 1);
  }
  for (let e of map) {
    if (e[1] !== 0) return false;
  }
  return true;
};

/* 答案在最开始先判断 s 和 t 的长度是否相等，若不相等直接返回 false
  另外答案使用的不是 Map，而是长度为 26 的数组（因为题目中说了 s 和 t 中只有字母）
  那么如何根据字母获取数组索引？答案是这么做的：s.codePointAt(i) - 'a'.codePointAt(0)    我不打算深入研究了
  https://leetcode-cn.com/problems/valid-anagram/solution/you-xiao-de-zi-mu-yi-wei-ci-by-leetcode-solution/
*/
