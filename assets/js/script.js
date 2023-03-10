import { fact } from "./functions.js";

const __DISPLAY = document.getElementById("screen");
let generalBtns = document.querySelectorAll(".gen-btn");
let exp_stack = [], isPrevNum = false, braceCnt = 0;

generalBtns.forEach(ele => {
    ele.addEventListener("click", e => {
        let val = e.target.value;
        try {
            switch (val) {
                case 'CLS':
                    resetAll();
                    break;
                case 'DEL':
                    pop();
                    break;
                case 'sq':
                    push('**');
                    push(2);
                    break;
                case 'FACT':
                    if (isPrevNum) factorial();
                    break;
                case 'LOG':
                    if (isPrevNum) logbase10();
                    break;
                case 'C':
                    resetAll()
                    break;
                case '=':
                    calculate();
                    break;
                default:
                    push(val);
                    break;
            }
        } catch (e) {
            resetAll("Invalid Value!" + e.message);
        }
    })
})

const factorial = () => {
    let pop = exp_stack.pop();
    exp_stack.push(fact(pop));
    refresh()
}

const push = (val) => {
    if (!isNaN(val)) {

        //append digits to previous number
        if (isPrevNum) val = (exp_stack.pop() * 10) + parseInt(val);

        isPrevNum = true;
        val = parseInt(val);
    } else {
        //prevent from entering operator at first
        if (exp_stack.length == 0 && val != '(') return;

        //change operators if TOP is already an operator
        if (!isPrevNum && val != '(' && val != ')' && val != '.') exp_stack.pop();

        if (val == '(') {
            braceCnt++;
            if (isPrevNum) exp_stack.push('*');
        }

        if (val == ')' && isPrevNum) {
            if (braceCnt <= 0) return;
            braceCnt--;
        }

        isPrevNum = false;
    }
    exp_stack.push(val);
    refresh();
}

const pop = () => {
    if (exp_stack.length == 0) return;

    if (isPrevNum) {
        let prev = exp_stack.pop();
        let new_prev = ((prev / 10) != 0) ? Math.round((prev / 10)) : 0;
        exp_stack.push(new_prev);
    } else {
        exp_stack.pop();
    }

    console.log(exp_stack);

    refresh();
}

const refresh = () => {
    __DISPLAY.value = exp_stack.join("");
}

const calculate = () => {
    console.log(braceCnt);
    //TOP is operator then pop until next number
    let TOP = exp_stack.at(-1);

    while (isNaN(TOP) && TOP != ')') TOP = exp_stack.at(-1);

    const res = eval(exp_stack.join(""));
    __DISPLAY.value = res;
    exp_stack = [res];
    isPrevNum = true;
}

const resetAll = (display = 0) => {
    __DISPLAY.value = display;
    exp_stack = [];
    isPrevNum = false;
}

const logbase10 = () => {
    let res = Math.log10(exp_stack.pop());
    exp_stack.push(res);
    refresh()
}