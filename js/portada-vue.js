/*=======================INICIO: CLIMA Y COORDENADAS==================================*/

navigator.geolocation.getCurrentPosition(function(position) {  
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const Digital=new Date();
	const hours=Digital.getHours();
  const clima = new Vue({
    el: '#clima',
    mounted(){
      this.getClima()
    },
    data: {
      temp: '',
      wind: '',
      classicon: '',
      city: '',
      message: ''
    },
    methods:{
      getClima(){
        const url = 'https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=0b4f760cc9eef21a66f5d9eaf4250024';
        axios.get(url).then(response =>{
          let tempe = parseInt(response.data.body.main.temp - 273.15);
          if (hours>6 && hours<19){
            var icon = 'wi-owm-day-' + response.data.body.weather[0].id;
          }else{
            var icon = 'wi-owm-night-' + response.data.body.weather[0].id;
          }
          this.temp = tempe + '°C';
          this.classicon = icon;
          this.wind = '<i class="fab fa-font-awesome-flag"></i>'+ ' ' + response.data.body.wind.speed + 'Mph';
          this.city = response.data.body.name;
          this.message = 'fade-in';
        })
      }
    }
  });
});
/*===============================fIN: CLIMA Y COORDENADAS==================================*/
/*=======================INICIO: BOX FLOTADOR==================================*/

const hablarVue = new Vue({
  el: '#hablar',
  data: {
    info: 'oculto',
    skill: 'oculto',
    contact: 'oculto',
    classinfo: '',
    classSkill: '',
    classContact: '',
    showInfo: false,
    showSkill: false,
    showContact: false,
    itemskill: [
      { nameSkill: 'Diseño Web', icon: 'fa-gratipay',     barra: 'width: 0%' },
      { nameSkill: 'Laravel',    icon: 'fa-laravel',   barra: 'width: 0%' },
      { nameSkill: 'Drupal',     icon: 'fa-drupal',    barra: 'width: 0%' },
      { nameSkill: 'Wordpress',  icon: 'fa-wordpress', barra: 'width: 0%' },
      { nameSkill: 'Node',       icon: 'fa-node-js',   barra: 'width: 0%' },
      { nameSkill: 'Vue',        icon: 'fa-vuejs',     barra: 'width: 0%' },
      { nameSkill: 'Linux',      icon: 'fa-linux',     barra: 'width: 0%' }
    ],
    formType: true,
    message: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      comments: '',
      serverResponse: ''
    },
    services: [
      { id: null, name: 'Selecciona un servicio' },
      { id: 1, name: 'Diseño Gráfico' },
      { id: 2, name: 'Diseño Web' },
      { id: 3, name: 'Programación Web' },
      { id: 4, name: 'Programación Móvil' },
      { id: 5, name: 'Marketing Digital' }
    ],
    formats: {
      name: '',
      email: ''
    },
    serverResponse: false
  },
  mounted(){
    this.hablar_show(0)
  },
  computed: {
    formTitle () {
      return ( this.formType ) ? 'opinión' : 'presupuesto'
    }
  },
  methods:{
    hablar_show(num){
      var v = this;
      if (num == 0){
        this.contact = 'oculto',
        setTimeout(function () {
          v.hablar_show(1);
        }, 2000);
      }
      if (num == 1){
        this.contact = 'oculto',
        this.info = 'fade-in',
        setTimeout(function () {
          v.hablar_show(2);
        }, 5000);
      }
      if (num == 2){
        this.info = 'fade-out',
        setTimeout(function () {
          v.hablar_show(3);
        }, 2000);
      }
      if (num == 3){
        this.info = 'oculto',
        this.skill = 'fade-in',
        setTimeout(function () {
          v.hablar_show(4);
        }, 5000);
      }
      if (num == 4){
        this.skill = 'fade-out',
        setTimeout(function () {
          v.hablar_show(5);
        }, 2000);
      }
      if (num == 5){
        this.skill = 'oculto',
        this.contact = 'fade-in',
        setTimeout(function () {
          v.hablar_show(6);
        }, 5000);
      }
      if (num == 6){
        this.contact = 'fade-out';
        setTimeout(function () {
          v.hablar_show(0);
        }, 700);
      }
    },
    showBarInfo(){
      var v = this;
      v.classSkill = '',
      v.classContact = '',
      v.showInfo = true,
      setTimeout(function () {
        v.classinfo = 'barra_abierta'
      }, 100);
    },
    showBarSkill(){
      var v = this;
      v.classinfo = '',
      v.classContact = '',
      v.showSkill = true,
      setTimeout(function () {
        v.classSkill = 'barra_abierta',
        v.itemskill[0].barra = 'width: 70%',
        v.itemskill[1].barra = 'width: 10%',
        v.itemskill[2].barra = 'width: 40%',
        v.itemskill[3].barra = 'width: 70%',
        v.itemskill[4].barra = 'width: 0%',
        v.itemskill[5].barra = 'width: 20%',
        v.itemskill[6].barra = 'width: 50%'
      }, 100);
     
    },
    showBarContact(){
      var v = this;
      v.classinfo = '',
      v.classSkill = '',
      v.showContact = true,
      setTimeout(function () {
        v.classContact = 'barra_abierta'
      }, 100);
     
    },
    closeInfo(){
      var v = this;
      v.classinfo = '',
      setTimeout(function () {
        v.showInfo = false
      }, 1000);
    },
    closeSkill(){
      var v = this;
      v.classSkill = '',
      setTimeout(function () {
        v.showSkill = false
      }, 1000);
    },
    closeContact(){
      var v = this;
      v.classContact = '',
      setTimeout(function () {
        v.showContact = false
      }, 1000);
    },
    validateData (e) {
      let input = e.target,
        expression

      if (input.pattern) {
        let regex = new RegExp(input.pattern)
        expression = !regex.exec(input.value)
      } else {
        expression = !input.value
      }

      if (expression) {
        this.message[input.name] = `Dato incorrecto, ${input.title}`
      } else {
        this.message[input.name] = ''
      }
    },
    sendForm (e) {
      alert('Enviando Form')
      let form = document.getElementById('ContactForm'),
        formData = new FormData(form)

      axios.post('./server.php',formData)
      .then(response => {
          console.log(response)
          this.message.serverResponse = response.data
          this.serverResponse = true
        })
        .catch(error => {
          console.log(error)
          this.message.serverResponse = error
          this.serverResponse = false
        })
    }
  }
})