function formatTime(seconds) {
 let arr=[]
  arr[0] = Math.floor(seconds / 3600);
  arr[1] = Math.floor((seconds%3600)  / 60);
  arr[2] = seconds % 60;

  let str=arr.join(':')

console.log(str);

}

// formatTime(3760)

function incrementString (s) {
    let index = s.length - 1;
    while (index >= 0 && /\d/.test(s[index])) {
      index--;
    }
    
   
    const prefix = s.slice(0, index + 1);
    const suffix = s.slice(index + 1);
    
    if (/\d/.test(suffix)) {
      const newSuffix = (parseInt(suffix) + 1).toString().padStart(suffix.length, '0');
      return prefix + newSuffix;
    } else {
   
      return s + "1";
    }}

//    console.log( incrementString("foo000"));

function persistence(num) {
    let count = 0;
    while (num >= 10) {
     
      const digits = num.toString().split("");
  
      num = digits.reduce((product, digit) => product * digit, 1);
  
      count++;
    }
  
    return count;
}

// persistence(85)


function pigIt(str){
  
let words=str.split(' ')
console.log(words);
let newstr=''
for(i=0;i<words.length;i++){
  
 if(words[i]!="!"){
 
   newstr+=words[i].slice(1)+words[i][0]+'ay '}
   else{
    newstr+="! "
   }
  
}
console.log(newstr);
}

// pigIt("hello ! bcncj !")


function addStrings(num1, num2) {

let first=parseInt(num1);
let second=parseInt(num2);
let sum=first+second;
let result=sum.toString()
console.log(result);
}


// addStrings('252','566')

let arr=[{"name":"raghh",
"phone":65545},{"name":"shagahha",
"phone":4565555445},{"name":"kljjkajsds",
"phone":545}]
let newarr={"name":"anu",
"phone":554645545444545454}
arr[1]={...arr[1],...newarr}

// console.log(arr);



