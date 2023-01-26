var listaPalabras = ["PAN", "CERDO", "OVEJA", "CASA", "VACA", "CIERVO", "REMOTO"];
var posicionAleatoria = Math.floor(Math.random() * listaPalabras.length);
var palabraAleatoria = listaPalabras[posicionAleatoria];
var palabraMostrar = [];
var letras = [];
var letrasIncorrectas = [];
var letrasCorrectas = [];
var palabraCompleta = [];
var intentosRestantes = 8;
var input = document.getElementById("letra_ingresada");


document.getElementById("letra_ingresada").focus();


console.log(palabraAleatoria);

//DIVIDO LA PALABRA POR CARACTERES:
function dividirEnLetras() {
    letras = palabraAleatoria.split('');
    console.log(letras);
}

//PREPARO LA VISUAL DE LA PAGINA:
function prepararVisual() {
    document.getElementById("cantidad_letras").innerHTML = "Son "+letras.length+" letras"
    document.getElementById("intentos").innerHTML = intentosRestantes;      //MUESTRA LA CANTIDAD DE INTENTOS QUE TIENE EL JUGADOR
    for (var letra of letras) {             //INCORPORO LOS RENGLONES QUE REPRESENTAN LA CANTIDAD DE LETRAS
        palabraMostrar.push(" _____ ")
        document.getElementById("letras").innerHTML = palabraMostrar;
    }
}

//COMPARO LETRAS:
function compararLetras() {
    var letraIngresada = document.getElementById("letra_ingresada").value;
    letraIngresada = letraIngresada.toUpperCase();
    var buscaLetra = letras.includes(letraIngresada);
    var posicionLetra = letras.indexOf(letraIngresada);
    var posiciones = 0;

    //BUCLE PARA SABER LA POSICION DE LA LETRA INGRESADA:
    for (var i=posicionLetra; i<letras.length; i++) {
        posiciones = letras.indexOf(letraIngresada, i);
        console.log(posiciones);
        palabraMostrar[posiciones] = letraIngresada;
        document.getElementById("letras").innerHTML = palabraMostrar;
        document.getElementById("letra_ingresada").focus();
    }

    //PRIMERO COMPRUEBO QUE EL JUGADOR NO HAYA SELECCIONADO DOS VECES LA MISMA LETRA.
    if (letrasCorrectas.includes(letraIngresada) == true) {
        alert("No se puede seleccionar dos veces la misma letra.")
    }
    else if (letraIngresada == "") {
        alert("El campo no puede estar vacío.");
    }
    //SI LA LETRA ES CORRECTA:
    else if(buscaLetra === true) {
        
        //GUARDO LA LETRA EN EL ARRAY:
        letrasCorrectas.push(letraIngresada);
        document.getElementById("letrasOk").innerHTML = letrasCorrectas;
        
        //COMPRUEBO SI A LA PALABRA OCULTA LE QUEDAN RENGLONES. SI NO, EL JUGADOR GANO:
        if (palabraMostrar.includes(" _____ ") == false) {
            document.getElementById("resultado").innerHTML = "GANASTE";
            document.getElementById("boton").innerHTML = "<button type='button' class='btn btn-secondary' onclick='volverAJugar()'>VOLVER A JUGAR</button>";
            document.getElementById("boton_jugar").disabled = true;
        }
        
    //SI ES INCORRECTA, LA GUARDO EN EL ARRAY "LETRASINCORRECTAS" Y LA MUESTRO:  
    } else {
        console.log("no");
        letrasIncorrectas.push(letraIngresada);
        console.log(letrasIncorrectas);
        document.getElementById("letrasMal").innerHTML = letrasIncorrectas;
        //POR CADA ERROR, SE CARGA UNA PARTE NUEVA DE LA IMAGEN DEL AHORCADO:
        for (i=1;i<=letrasIncorrectas.length;i++) {
            intentosRestantes = 8-i;
            switch (intentosRestantes) {
                case 7:
                    document.getElementById("imagen").innerHTML = "<img src='img/7.jpg' alt=''>";
                    break;
                case 6:
                    document.getElementById("imagen").innerHTML = "<img src='img/6.jpg' alt=''>";
                    break;
                case 5:
                    document.getElementById("imagen").innerHTML = "<img src='img/5.jpg' alt=''>";
                    break;
                case 4:
                    document.getElementById("imagen").innerHTML = "<img src='img/4.jpg' alt=''>";
                    break;
                case 3:
                    document.getElementById("imagen").innerHTML = "<img src='img/3.jpg' alt=''>";
                    break;
                case 2:
                    document.getElementById("imagen").innerHTML = "<img src='img/2.jpg' alt=''>";
                    break;
                case 1:
                    document.getElementById("imagen").innerHTML = "<img src='img/1.jpg' alt=''>";
                    break;
                default:
                    break;
            }
            
        }
        document.getElementById("intentos").innerHTML = intentosRestantes;
        if (intentosRestantes == 0) {
            document.getElementById("resultado").innerHTML = "PERDISTE!, la palabra era: "+palabraAleatoria;
            document.getElementById("imagen").innerHTML = "<img src='img/0.jpg' alt=''>";
            document.getElementById("boton").innerHTML = "<button type='button' class='btn btn-secondary' onclick='volverAJugar()'>VOLVER A JUGAR</button>";
            document.getElementById("boton_jugar").disabled = true;
        }
    }

    
    
}


//SI PULSA EL BOTON, SE RECARGA LA PAGINA
function volverAJugar() {
    location.reload(true);
}

//SI PULSA INTRO, SE ENVIA LA LETRA ELEGIDA
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("boton_jugar").click();
        input.value = "";
    }
})




dividirEnLetras();
prepararVisual();