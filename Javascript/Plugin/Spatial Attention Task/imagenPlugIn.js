/*
*Plugin Imagen, muestra una imagen en alguna dirección, ya sea arriba, abajo, izquierda o derecha
*/
var jsImagen = (function (jspsych){
    "use strict"

    const info = {
        name: 'Imagen',
        parameters:{
            posicion: { //posicion de la imagen
                type: ,
                default: ,
            },
            imagen: { //imagen a usar
                type: , 
                default: ,
            },
        }
    }

    class Imagen{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial){

            
        }

    }

    Imagen.info = info;

    return Imagen;
    
})(jsPsychModule)