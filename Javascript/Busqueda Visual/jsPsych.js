var jsPsych = initJsPsych({
  on_finish: function(){
    jsPsych.data.displayData();
  },
  extensions: [
    {type: jsPsychExtensionWebgazer}
  ]
});

var preload = {
  type: jsPsychPreload,
  images: ['img/blue.png']
}

var camera_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>Para participar en este experimento, necesitas dar permiso de acceder a tu cámara</p>
    <p>Si no permites el uso de la cámara, no puedes participar en el experimento<p>
    <p>Podría tomar hasta 30 segundos para tu cámara para funcionar</p>
  `,
  choices: ['Entendido'],
}

var init_camera = {
  type: jsPsychWebgazerInitCamera
}

var calibration_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>Ahora calibraremos la cámara, para que el software pueda usar la imagen de tus ojos para predecir a donde estas viendo</p>
    <p>Vas a ver una serie de puntos en la pantalla, ve cada punto y dale click en ellos.</p>
  `,
  choices: ['Entendido'],
}

var calibration = {
  type: jsPsychWebgazerCalibrate,
  calibration_points: [
    [25,25],[75,25],[50,50],[25,75],[75,75]
  ],
  repetitions_per_point: 2,
  randomize_calibration_order: true
}

var validation_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>Ahora, mediremos la precisión de la calibración.</p>
    <p>Ve cada punto cada vez que aparezca en la pantalla</p>
    <p style="font-weight: bold;">No necesitas darle click en los puntos esta vez.</p>
  `,
  choices: ['Entendido'],
  post_trial_gap: 1000
}

var validation = {
  type: jsPsychWebgazerValidate,
  validation_points: [
    [25,25],[75,25],[50,50],[25,75],[75,75]
  ],
  roi_radius: 200,
  time_to_saccade: 1000,
  validation_duration: 2000,
  data: {
    task: 'validate'
  }
}

var recalibrate_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>La precisión de la calibración no es la correcta</p>
    <p>Trataremos calibrarla una vez más</p>
    <p>En la siguiente pantalla, ve los puntas y dales click</p>
  `,
  choices: ['OK'],
}

var recalibrate = {
  timeline: [recalibrate_instructions, calibration, validation_instructions, validation],
  conditional_function: function(){
    var validation_data = jsPsych.data.get().filter({task: 'validate'}).values()[0];
    return validation_data.percent_in_roi.some(function(x){
      var minimum_percent_acceptable = 50;
      return x < minimum_percent_acceptable;
    });
  },
  data: {
    phase: 'recalibration'
  }
}

var calibration_done = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>Calibración completada</p>
  `,
  choices: ['OK']
}

var begin = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>The next screen will show an image to demonstrate adding the webgazer extension to a trial.</p>
    <p>Just look at the image while eye tracking data is collected. The trial will end automatically.</p>
    <p>Press any key to start.</p>
  `
}

var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'img/blue.png',
  choices: "NO_KEYS",
  trial_duration: 2000,
  extensions: [
    {
      type: jsPsychExtensionWebgazer, 
      params: {targets: ['#jspsych-image-keyboard-response-stimulus']}
    }
  ]
}

var show_data = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    var trial_data = jsPsych.data.getLastTrialData().values();
    var trial_json = JSON.stringify(trial_data, null, 2);
    return `<p style="margin-bottom:0px;"><strong>Trial data:</strong></p>
      <pre style="margin-top:0px;text-align:left;">${trial_json}</pre>`;
  },
  choices: "NO_KEYS"
};

jsPsych.run([
  preload, 
  camera_instructions, 
  init_camera, 
  calibration_instructions, 
  calibration, 
  validation_instructions, 
  validation, 
  recalibrate,
  calibration_done,
  begin, 
  trial, 
  show_data
]);