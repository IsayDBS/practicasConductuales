var jsImagen = (function (jspsych){
    "use strict"

    const info = {
        name: 'Imagen',
        parameters:{
            posicion: { //posicion de la imagen
                type: jspsych.ParameterType.STRING,
                default: undefined,
            },
            imagen: { //imagen a usar
                type: jspsych.ParameterType.IMAGE, 
                default: undefined,
            },
        }
    }

    class Imagen{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial){

            var html_content = null

            if(trial.posicion === "left" || trial.posicion === "right"){
                html_content = `<div style='width: 1100px;'>
                    <div style='float: ${trial.posicion};'>
                        <img src="${trial.imagen}"></img>
                    </div>
                </div>`
            }else{
                html_content = `
                    <div style='${trial.posicion}: -150px; position: relative'>
                        <img src="${trial.imagen}"></img>
                    </div>
                `
            }

            display_element.innerHTML = html_content

            const after_key_response = (info) => {
                display_element.innerHTML = '';
                var correcto = null;
                var llave = '';

                if(trial.posicion == "top"){
                    llave = 'w';
                }else if(trial.posicion == "bottom"){
                    llave = 's';
                }else if(trial.posicion == "right"){
                    llave = 'd';
                }else if(trial.posicion == "left"){
                    llave = 'a';
                }

                correcto = this.jsPsych.pluginAPI.compareKeys(llave, info.key);

                let data = {
                    rt: info.rt,
                    correcto: correcto,
                }

                console.log(info.rt);
                console.log(correcto);

                this.jsPsych.finishTrial(data);
            }

            this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_key_response,
                valid_responses: ['w','a','s','d'],
                persist: false,});

        }

    }

    Imagen.info = info;

    return Imagen;
    
})(jsPsychModule)