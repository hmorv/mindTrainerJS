//constante que determina el nivel máximo en el juego y, a la vez, la longitud de los arrays.
const nivelMaximo = 100;

//variables globales
//tabla almacena la secuencia aleatoria que reproduce el juego
var tabla = new Array(nivelMaximo);
//tjugador almacena la secuencia introducida por el jugador
var tjugador = new Array(nivelMaximo);
//nivel del juego.
var nivelActual = 1;
//indica los clicks realizados sobre el tablero.
var elementoActual = 0;

//el efecto al pulsar sobre un div se consigue modificando la propiedad css opacity.
//mouseleave evita que el div se quede pulsado si se suelta el ratón fuera del área.
$(document).ready(function () {
    $("#forma1").mousedown(function () { $("#forma1").css("opacity", "1"); });
    $("#forma1").mouseup(function () { $("#forma1").css("opacity", "0.6"); });
    $("#forma1").mouseleave(function () {$("#forma1").css("opacity", "0.6");});
    $("#forma2").mousedown(function () {$("#forma2").css("opacity", "1");});
    $("#forma2").mouseup(function () {$("#forma2").css("opacity", "0.6");});
    $("#forma2").mouseleave(function () { $("#forma2").css("opacity", "0.6");});
    $("#forma3").mousedown(function () {$("#forma3").css("opacity", "1");});
    $("#forma3").mouseup(function () {$("#forma3").css("opacity", "0.6");});
    $("#forma3").mouseleave(function () {$("#forma3").css("opacity", "0.6");});
    $("#forma4").mousedown(function () {$("#forma4").css("opacity", "1");});
    $("#forma4").mouseup(function () {$("#forma4").css("opacity", "0.6");});
    $("#forma4").mouseleave(function () {$("#forma4").css("opacity", "0.6");});
});

//al clicar sobre uno de los 4 div del juego se dispara el código que evalua la secuencia introducida y hace avanzar el juego.
$(document).ready(function () {
    $("#forma1").click(function () { leerDiv(1); })
    $("#forma2").click(function () { leerDiv(2); })
    $("#forma3").click(function () { leerDiv(3); })
    $("#forma4").click(function () { leerDiv(4); })
});


function inicializarSecuencia(t) {
    //Esta funcion inicializa la tabla con valores aleatorios(1-4) de la tabla que se pasa como parametro.
    for (var i = 0; i < t.length; i++) {
        t[i] = Math.floor((Math.random() * 4) + 1);
    }
}

function reiniciarVariables() {
    //funcion que reinicia los valores de las variables globales para poder reiniciar la partida.
    nivelActual = 1;
    elementoActual = 0;
    limpiarTabla(tjugador);
}
function mostrarElementoSecuencia(n) {
    //Esta funcion muestra la secuencia que debe imitar el jugador; recibe como parámetro el nivel actual de la partida.
    //la constante tiempo determina el tiempo que tarda en aumentar la opacidad a 1 y la variable tiempo2 configura el settimeout para
    //que no se solapen los elementos mostrados.
    const tiempo = 100;
    var l = 0;
    var tiempo2 = 1000;
    
    while (l < n) {
        //Cada iteracion ilumina un div.
        switch (tabla[l]) {
            case 1:
                $(document).ready(function () {
                    setTimeout(function () {
                        $("#forma1").animate({ opacity: 1 }, tiempo);
                        $("#forma1").animate({ opacity: 0.6 });
                    }, tiempo2);
                });
                setTimeout(function () { document.getElementById('b').play(); }, tiempo2); clearTimeout();
                break;
            case 2:
                $(document).ready(function () {
                    setTimeout(function () {
                        $("#forma2").animate({ opacity: 1 }, tiempo);
                        $("#forma2").animate({ opacity: 0.6 });
                    }, tiempo2);
                });
                setTimeout(function () { document.getElementById('c').play(); }, tiempo2); clearTimeout();
                break;
            case 3:
                $(document).ready(function () {
                    setTimeout(function () {
                        $("#forma3").animate({ opacity: 1 }, tiempo);
                        $("#forma3").animate({ opacity: 0.6 });
                    }, tiempo2);
                });
                setTimeout(function () { document.getElementById('d').play(); }, tiempo2); clearTimeout();
                break;
            case 4:
                $(document).ready(function () {
                    setTimeout(function () {
                        $("#forma4").animate({ opacity: 1 }, tiempo);
                        $("#forma4").animate({ opacity: 0.6 });
                    }, tiempo2);
                });
                setTimeout(function () { document.getElementById('g').play(); }, tiempo2); clearTimeout();
                break;
            default:
                break;
        }
        l++;
        tiempo2 = tiempo2 + 1000;
    }
    setTimeout(function () { clearTimeout() }, 500);
}

function limpiarTabla(t) {
    //esta funcion vacia el array recibido como parametro
    t.length = 0;
}


function comparacion(t1, t2, n) {
    //con esta funcion se compara la secuencia reproducida con la introducida por el jugador, devuelve un booleano.
    var i=0;
    while ((t1[i] == t2[i]) && (i < n)) {
        i++;
    }
    if (i==n)
        return true;
    else
        return false;
}

function leerDiv(n)
{
    //funcion que se dispara con el evento click: introduce el valor (1-4) del div clicado en la tabla tjugador
    //una vez guardado el valor, se incrementa la variable global elementoActual en 1.
    tjugador[elementoActual] = n;
    elementoActual++;

    //AQUI COMIENZA LO DIVERTIDO!
    if(elementoActual==nivelActual)
    {
        if (comparacion(tabla, tjugador, nivelActual)) {
            //si la comparacion tiene exito, avanzamos en el nivel de juego
            nivelActual++;
            limpiarTabla(tjugador);
            elementoActual = 0;
            document.getElementById("level").innerHTML = nivelActual;
            //mostramos la siguiente secuencia
            mostrarElementoSecuencia(nivelActual);
        }
        else
        {
            //si se comete un error...
            document.getElementById("level").innerHTML = "OH YOU MISSED IT!";
            reiniciarVariables();
        }   
    }    
}

function pulsarStart() {
    //acciones a llevar a cabo una vez el usuario inicia la partida.
    reiniciarVariables();
    document.getElementById("level").innerHTML = nivelActual;
    inicializarSecuencia(tabla);
    mostrarElementoSecuencia(nivelActual);
}

function pulsarReplay() {
    //Con este boton se repite la secuencia mostrada. Reiniciamos elementoActual para que no se almacenen las pulsaciones ya realizadas antes del replay.
    elementoActual = 0;
    mostrarElementoSecuencia(nivelActual);
}