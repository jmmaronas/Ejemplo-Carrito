const valorDolar=document.querySelector("#valorDolar")
fetch("https://api-dolar-argentina.herokuapp.com/api/dolaroficial")
.then(resp=>resp.json())
.then(data=>valorDolar.innerHTML=data.venta)