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
        return arg.reduce((a, b) => a + (o[b] || b), "");
    });
    return res;
}

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

console.log(formatDate(1624454900520, 'yyyy.MM.dd HH(时)'))
