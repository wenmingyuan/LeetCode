/* 自己的思路  操作次数较多，就没有用这种方法
  遍历数组
    若当前元素为 0，则将当前位置后面的所有元素向前移动一位，将最后一位设成 0。
*/


/* 自己的思路  通过
  用 k 记录 0 的数目
  遍历数组，
    如果当前元素是 0，那么 k++
    否则，把索引为 i - k 的元素赋值为当前元素的值
  把数组的最后 k 位都赋值为 0
*/
// var moveZeroes = function(nums) {
//   let k = 0;
//   let len = nums.length;
//   for (let i = 0; i < len; i++) {
//     if (nums[i] === 0) k++;
//     else nums[i - k] = nums[i];
//   }
//   for (let i = len - k; i < len; i++) {
//     nums[i] = 0;
//   }
// }


/* 答案 两次遍历（覆盖法） 和我的解法差不多，区别在于答案用 j（索引）代替了我的 k（0 的数目），使得代码更容易理解 
  参考：https://leetcode-cn.com/problems/move-zeroes/solution/liang-chong-fang-fa-yi-ge-shi-zhi-jie-fu-gai-yi-ge/
*/
// var moveZeroes = function (nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//       if (nums[i] != 0) { // 遇到非0项
//           nums[j] = nums[i]; // 覆盖到j上
//           j++;    // j后移
//           // 其实上面两句可以合并成一句： nums[j++] = nums[i];
//       }
//   }
//   for (let i = j; i < nums.length; i++) { // 剩下的位置赋为0
//       nums[i] = 0;
//   }
// }


/* 自己理解了答案后写的 和答案一样 */
// var moveZeroes = function(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {  // 一开始写成 i !== 0 了...
//       nums[j] = nums[i];
//       j++;
//     }
//   }
//   for (let i = j; i < nums.length; i++) {
//     nums[i] = 0;
//   }
// }

/* ------------------------------------------------------------------------------------------------------------------------ */

/* 答案 一次遍历（交换法）
  交换法 和 覆盖法 的区别在于：
    覆盖法是先覆盖元素的值，最后再把末尾的元素变成 0。
    交换法就是不断地交换非零元素和 0 的位置，相当于在覆盖后马上把自己（用来覆盖别人的元素）变成 0，这样就不必再写一个循环来得到末尾的 0 了，因为交换会使 0 自动到末尾。
  JAVA 代码和动图参考：https://leetcode-cn.com/problems/move-zeroes/solution/dong-hua-yan-shi-283yi-dong-ling-by-wang_ni_ma/
*/
/* JAVA 代码 */
// class Solution {
// 	public void moveZeroes(int[] nums) {
// 		if(nums==null) {
// 			return;
// 		}
// 		//两个指针i和j
// 		int j = 0;
// 		for(int i=0;i<nums.length;i++) {
// 			//当前元素!=0，就把其交换到左边，等于0的交换到右边
// 			if(nums[i]!=0) {
// 				int tmp = nums[i];
// 				nums[i] = nums[j];
// 				nums[j++] = tmp;
// 			}
// 		}
// 	}
// }	


/* 理解了答案后写的 写完发现有问题 详见代码中的注释
  修改方法有 2 种：
    1. 写成答案那样，使用临时变量交换 2 个数，就不会出现问题了。
    2. 参考评论区：https://leetcode-cn.com/problems/move-zeroes/solution/dong-hua-yan-shi-283yi-dong-ling-by-wang_ni_ma/
  我用的方法 2
*/
var moveZeroes = function(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // 若第一个元素不是 0，下面的代码会把第一个元素变成 0，需要改成更下面的代码那样
      // nums[j] = nums[i];
      // nums[i] = 0;
      // j++;
      if (i > j) {  // 必须当 i 在 j 的前面时，才修改元素的值
        nums[j] = nums[i];
        nums[i] = 0;
      }
      j++;
    }
  }
}


/* 测试 */
let nums = [0,1,0,3,12];
moveZeroes(nums);
console.log(nums);
