/* 自己写的 和答案一样
  ----------------------------------
  总趟数：nums.length - 1
  每趟的交换次数：nums.length - 第几趟
*/

function sort(nums) {
  for (let i = 1; i <= nums.length - 1; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let tmp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = tmp;
      }
    }
  }
}

let nums = [2,4,5,3,1];
sort(nums);
console.log(nums);
