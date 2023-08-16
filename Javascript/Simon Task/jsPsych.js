/*
*Simon Task es una prueba la cual consiste en responder a una tarea
*dada las instrucciones, sin dar atención a las distracciones que
* aparecen en el experimento
*/
var jsPsych = initJsPsych({
  on_finish: function(){
      jsPsych.data.get().localSave('csv','informacion.csv');
  },
});
