


let n1 = parseFloat(num1.value)
let n2 = parseFloat(num2.value)

function addNumber() {
    let num1 = document.getElementById("num1").value
let num2 = document.getElementById("num2").value
let report = document.getElementById("result")
     result = parseFloat(num1)+parseFloat(num2)
     console.log(num1)
    report.innerHTML += `<br/>${result}`
}
function subtractNumber() {
    let num1 = document.getElementById("num1").value
let num2 = document.getElementById("num2").value
let report = document.getElementById("result")
     result= parseFloat(num1)-parseFloat(num2)
    report.innerHTML += `<br/>${result}`
}
