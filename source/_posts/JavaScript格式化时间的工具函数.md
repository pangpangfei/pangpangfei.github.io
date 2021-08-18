---
title: JavaScript格式化时间的工具函数
date: 2021-06-23 20:59:24
tags:
- JavaScript
- 工具函数
categories:
- JavaScript
---
每次新建项目都得去百度偷一个处理时间的函数，不如下次从自己博客里偷。
<!-- more -->
## 功能
讲一个能被Date实例化的数据转化为相应的格式
如：

被格式化的数据 | 格式化的规则 | 结果
------------ | ------------- | -------------
1997-09-21 | yyyy.MM.dd HH:mm:ss | 1997.09.21 08:00:00
Date.now() | yyyy-MM-dd | 2021-06-23
Date.now() | HH:mm:ss | 21:26:33
1624454900520 | yyyy年MM月dd日HH时mm分ss秒 | 2021年06月23日21时28分20秒

## 函数的定义
- 函数名
    - formatDate
- 参数
  - date
    - 被格式化的数据
    - 类型：Date
    - 默认值：Date.now()
  - fmt
    - 格式化的规则
    - 类型：String
    - 默认值：yyyy-MM-dd HH:mm:ss
### fmt不考虑的情况
间隔内容如前一个字母相同
如：
* yyyyyMM-dd HH:mm:ss
* yyyyyMMMdddHHHmmmsss
## 测试用例
* formatDate()
* formatDate('1997-09-21')
* formatDate(1624454900520, 'yyyy年MM月dd日HH时mm分ss秒')
* formatDate(1624454900520, 'yyyy.MM.dd HH(时)')
## 依赖函数
### 格式化数字（数字位数不够自动补0）
```JavaScript
/**
 * @description: 格式化数字，当数字小于某个位数的时候，前面补0
 * @param {Number} num 需要格式化的数字
 * @param {Numebr?:2} digit 位数
 * @return {String}
 */
function formatNumber(num, digit = 2) {
    if (typeof digit !== 'number' || digit < 2) {
        return num;
    }
    return num <= Number(new Array(digit - 1).fill(9).join(''))
        ? '0' + num
        : '' + num;
}
```
## 代码实现
```JavaScript
/**
 * @description: 格式化时间
 * @param {Date?:Date.now()} date 时间
 * @param {String?:yyyy-MM-dd HH:mm:ss} fmt 格式
 * @return {String}
 */
function formatDate(date = Date.now(), fmt = 'yyyy-MM-dd HH:mm:ss') {
    date = new Date(date);
    if (date.toString() === 'Invalid Date') {
        return '';
    }
    if (typeof fmt !== 'string' || !fmt.length) {
        return '';
    }

    const o = {
        yyyy: date.getFullYear(),
        MM: formatNumber(date.getMonth() + 1),
        dd: formatNumber(date.getDate()),
        HH: formatNumber(date.getHours()),
        mm: formatNumber(date.getMinutes()),
        ss: formatNumber(date.getSeconds())
    };
    const s = {
        '*': '\\*',
        '.': '\\.',
        '?': '\\?',
        '+': '\\+',
        '$': '\\$',
        '^': '\\^',
        '[': '\\[',
        ']': '\\]',
        '(': '\\(',
        ')': '\\)',
        '{': '\\{',
        '}': '\\}',
        '|': '\\|',
        '\\': '\\\\'
    };
    
    let regStr = '';
    let cur;
    for (const item of fmt) {
        if (cur !== item) {
            cur = item;
            if (regStr.length) {
                regStr += ')';
            }
            regStr += '(';
        }
        regStr += s[item] || item;
    }
    regStr += ')';
    const res = fmt.replace(new RegExp(regStr), (ign, ...arg) => {
        arg.length = arg.length - 2;
        return arg.reduce((a, b) => a + (o[b] || b), '');
    });
    return res;
}
```
## 实现思路
1. 将**date**转化为Date实例；
2. 校验参数的合法性；
3. 将**fmt**的每一项分组（如：yyyy-MM-dd -> (yyyy)(-)(MM)(-)(dd)），其中正则表达式的符号需要在前面加上\\，以此来作为后面需要用的正则表达式；
4. 将**fmt**中的所有的日期占位符替换成真实的日期。
