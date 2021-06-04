function calculTime(time) {
    console.log(time)
    let without_milliseconds = time.split('.')
    let time_list = without_milliseconds[0].split(':')
    if (time_list[0] == '00') {
        time_list.shift()
    }
    return time_list.join(':')
}

function sclonLessons(n, text_forms) {
    if (n == 0) {
        return '';
    }
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

// function sclonLessons(n) {

//     let text = '';
//     if (n == 0) {
//         return text;
//     }
//     n = Math.abs(n) % 100;
//     var n1 = n % 10;
//     if (n > 10 && n < 20) { text = ' уроков'; }
//     if (n1 > 1 && n1 < 5) { text = ' урока'; }
//     if (n1 == 1) { text = ' урок'; }

//     return n + text;
// }

function timeToChM(time) {
    let new_time = '';
    let without_milliseconds = time.split('.')
    let time_list = without_milliseconds[0].split(':')
    time_list.pop()
    if (time_list[0] != '00') {
        new_time += Number(time_list[0]) + 'ч ';
    }

    return new_time + Number(time_list[1]) + 'м';
}


export { calculTime, sclonLessons, timeToChM };