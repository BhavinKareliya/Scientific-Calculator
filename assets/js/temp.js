

const DISPLAY = document.getElementById("screen");

var generalBtns = document.querySelectorAll(".gen-btn");

generalBtns.forEach(ele => {
    ele.addEventListener("click", e => {
        let val = e.target.value;
        try {
            switch (val) {
                case 'CLS':
                    screen.value = 0;
                    exp = []
                    break;
                case '=':
                    calculate();
                    break;
                case 'FACT':
                    if (exp.slice(-1) <= 9 && exp.slice(-1) >= 0) {
                        let fact = factorial();
                        exp.push(fact);
                        screen.value = fact;
                    }
                    break;
                default:
                    exp.push()
                    reprint();
            }
        } catch (e) {
            console.log(e)
            alert("execution failed due to:", e)
        }


    })
})

console.log()

const calculate = () => {
    join
    const res = eval(exp.join(""))
    screen.value = res;
    exp = [res];
    return res;
}

const factorial = (num) => {
    if (num >= 1)
        return factorial(num - 1) * num;
    else
        return 1;
}

const reprint = () => {
    console.log(exp)
    screen.value = exp.join("");
}