$(document).ready(function () {
    //Mostramos el div Jugar cuando se pasa el raton por encima del div, ocultandolo si el cursor abandona esa zona
    $("#simon").mouseover(function () {
        $("#jugar").toggle("highlight")
    });
    $("#simon").mouseleave(function () {
        $("#jugar").toggle("highlight")
    });
    $("#simon").click(function () {
        window.location.href = '../Simon/tablero.html'
    });
});