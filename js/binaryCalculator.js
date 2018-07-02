class Calc {
    constructor(res) {
        this.res = res;
        this.availableOperators = ['+', '-', '*', '/'];
    }

    validOperator(operator) {
        let expression = this.currentExpression();

        return (expression !== '' &&
            /[0-9]/.test(expression.slice(-1)) &&
            this.availableOperators.find(el => el == operator) !== undefined);
    }

    clearExpression() {
        this.res.innerHTML = '';
    }

    currentExpression() {
        return this.res.innerHTML.trim();
    }

    addToExpression(val) {
        this.res.innerHTML += val;
    }

    solveExpression() {
        let parsed = this.currentExpression().match(/([0-9]+)([\+\-\*\/]|$)/g);
        let result = 0;
        let exp = '';
        parsed.forEach(function (part, i) {
            let digit_operator = part.match(/([0-9]+)([^\d]|$)/);
            exp += parseInt(digit_operator[1], 2).toString() + digit_operator[2]
        });

        try {
            result = (eval(exp)).toString(2);
        } catch (e) {
            result = NaN;
        }

        this.clearExpression();
        this.addToExpression(result);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let res = document.getElementById('res');
    let btn0 = document.getElementById('btn0');
    let btn1 = document.getElementById('btn1');
    let btnClr = document.getElementById('btnClr');
    let btnEql = document.getElementById('btnEql');
    let btnOperators = document.getElementsByClassName('operator');

    var calc = new Calc(res);

    for (let i = 0; i < btnOperators.length; i++) {
        btnOperators[i].addEventListener("click", operatorPressed);
    }

    btn0.addEventListener("click", operandPressed);
    btn1.addEventListener("click", operandPressed);
    btnClr.addEventListener("click", function () {
        calc.clearExpression()
    });
    btnEql.addEventListener("click", function () {
        calc.solveExpression()
    });

    function operatorPressed(e) {
        let btn = e.target || e.srcElement;

        if (calc.validOperator(btn.innerHTML))
            calc.addToExpression(btn.innerHTML);
    }

    function operandPressed(e) {
        let btn = e.target || e.srcElement;
        calc.addToExpression(btn.innerHTML);
    }
});
