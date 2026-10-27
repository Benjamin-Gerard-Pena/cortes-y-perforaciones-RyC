fetch('zona-superior.html')
.then(response => response.text())
.then(text => {
    document.getElementById('zona-superior').innerHTML = text;
})
