Vue.component('formvue', {
    template: `
        <div>
            <form id="ContactForm" class="ContactForm" @submit.prevent="sendForm">
                  <legend>¿Que deseas enviar?</legend>
                  <div align="center">
                    <input v-model="formType" :value="true" name="formType" type="radio" id="opinion">
                    <label for="opinion">Opinión</label>
                    <input v-model="formType" :value="false" name="formType" type="radio" id="budget">
                    <label for="budget">Presupuesto</label>
                  </div>
                  <legend>Formulario de <span>{{ formTitle }}</span></legend>
                  <input
                    @keyup="validateData"
                    type="text"
                    name="name"
                    title="Tu nombre"
                    placeholder="Escribe tu nombre"
                    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                    required>
                  <transition name="fade">
                    <span v-show="message.name" v-text="message.name" class="ContactForm-message u-error"></span>
                  </transition>
                  <input @keyup="validateData" type="email" name="email" title="Tu email" placeholder="Escribe tu email"
                    required>
                  <transition name="fade">
                    <span v-show="message.email" v-text="message.email" class="ContactForm-message  u-error"></span>
                  </transition>
                  <template v-if="!formType">
                      <input @keyup="validateData" type="tel" name="phone" title="Tu teléfono" placeholder="Escribe tu teléfono" pattern="^[0-9]+$" required>
                    <transition name="fade">
                      <span v-show="message.phone" v-text="message.phone" class="ContactForm-message  u-error"></span>
                    </transition>
                    <select name="services" required>
                      <option
                        v-for="service in services"
                        :value="service.id"
                        v-text="service.name"
                      ></option>
                    </select>
                  </template>
                  <template v-else>
                    <input @keyup="validateData" type="text" name="subject" title="Asunto a tratar" placeholder="Asunto a tratar" required>
                    <transition name="fade">
                    <span v-show="message.subject" v-text="message.subject" class="ContactForm-message u-error"></span>
                    </transition>
                  </template>
                  <textarea @keyup="validateData" name="comments" title="Tus comentarios" placeholder="Escribe tus comentarios" cols="50" rows="5" required></textarea>
                  <transition name="fade">
                    <span v-show="message.comments" v-text="message.comments" class="ContactForm-message u-error"></span>
                  </transition>
                  <input type="submit" value="Enviar">
                  <transition name="fade">
                    <span v-show="message.serverResponse" v-html="message.serverResponse"></span>
                  </transition>
              </form>
        </div>
    `,
    data () {
        return {
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
        }
    },
    methods:{
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
    },
    computed: {
        formTitle () {
        return ( this.formType ) ? 'opinión' : 'presupuesto'
        },
        responseClassCSS() {
        return [
            'ContactForm-message',
            (this.serverResponse) ? 'u-success' : 'u-error'
        ]
        },
        responseStyleCSS () {
        return {
            fontSize: '2rem',
            color: '#FFF'
        }
        }
    }
});