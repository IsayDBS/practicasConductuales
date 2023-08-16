/*
*Priming Task se basa en la idea de relación de eventos 
*en el cual se da una palabra, después se presentan una imagen al azar
* y tiene que apretar el usuario cual es el que tiene mas relacion con la palabra
*
*/

var jsPsych = initJsPsych({
    on_finish: function(){
        jsPsych.data.get().localSave('csv','informacion.csv');
    },
});
