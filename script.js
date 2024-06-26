const remover = document.getElementsByClassName('remove')
for(var i = 0; i < remover.length; i++){
    remover[i].addEventListener("click", removerGastoLucro)
}

function removerGastoLucro(event){
    event.target.parentElement.parentElement.parentElement.remove()
}