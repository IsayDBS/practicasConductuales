/*
* La prueba visual de arreglo (TAV) es un experimento, en el cual el usuario
* intenta percibir los cambios entre dos imagenes, en este caso, es una colección de cuadrados
* de diferentes colores, al cambio de imagen, uno estará circulado, y el usuario debe mencionar
* a través del teclado si hubo cambio en el color lo más rápido posible
*/
var jsPsych = initJsPsych({
  on_finish: function(){
      jsPsych.data.get().localSave('csv','informacion.csv');
  },
});
