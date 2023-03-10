export const fact = (num) => {
    let res = 1;
    while (num > 1) {
        res *= num--;
    }
    return res;
}