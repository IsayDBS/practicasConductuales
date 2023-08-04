var jsFlecha = (function (jspsych){
    "use strict"

    const info = {
        name: 'Flecha',
        parameters:{
            direccion: { //posicion de la imagen
                type: jspsych.ParameterType.INT,
                default: -1,
            }
        }
    }

    class Flecha{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial){

            let arrows =  ['↑','↓' ,'→',' ←'];

            var flecha = trial.direccion;

            if(flecha == -1){
                flecha = jsPsych.randomization.randomInt(0,3);
            }

            var html_content = `
            <div style="font-size: 50px;">
                <p>${arrows[flecha]}</p>   
            </div>
            `

            console.log(html_content);

            display_element.innerHTML = html_content;

            this.jsPsych.pluginAPI.setTimeout(() =>{
                this.jsPsych.pluginAPI.clearAllTimeouts();
                display_element.innerHTML = "";
                var trial_data = {
                    rt: info.rt,
                    arrow: arrows[flecha],
                };
    
                this.jsPsych.finishTrial(trial_data);
            }, 2000);

        }

    }

    Flecha.info = info;

    return Flecha;
    
})(jsPsychModule)