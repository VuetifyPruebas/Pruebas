<template>
<div id="app" class="pa-10">
  <v-app id="inspire">
    <v-card class="mx-auto pa-10" min-heigth="100" min-width="1000"  elevation="10" shaped >

  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Nombre"
        rules="required|max:25|alpha_spaces|min:3"
      >
        <v-text-field
          v-model="form.nombreUsuario"
          :counter="25"
          :error-messages="errors"
          label="Nombre"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="Apellido"
        rules="required|max:25|alpha_spaces|min:4"
      >
        <v-text-field
          v-model="form.apellidoUsuario"
          :counter="25"
          :error-messages="errors"
          label="Apellido"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="Correo"
        rules="required|email"
      >
        <v-text-field
          v-model="form.correoUsuario"
          :error-messages="errors"
          label="correo"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >
        <v-autocomplete
          clearable
          v-model="form.idTipoDoc"
          :items="form.items"
          :error-messages="errors"
          label="Tipo Documento"
          data-vv-name="form.idTipoDoc"
          required
        >
        <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            No se encontraron
            <strong>datos</strong>
          </v-list-item-title>
        </v-list-item>
      </template>

        </v-autocomplete>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="NumeroDocumento"
        rules="required|max:10|numeric|min:5"
      >
        <v-text-field
          v-model="form.numeroDocumentoUsuario"
          :counter="10"
          :error-messages="errors"
          label="Numero Documento"
          required
        ></v-text-field>
      </validation-provider>

       <validation-provider
        v-slot="{ errors }"
        name="FechaNacimiento"
        rules="required|max:10|min:10"
      >
        <v-text-field
          type="date"
          v-model="form.fechaNacimientoUsuario"
          :counter="10"
          :error-messages="errors"
          label="Fecha Nacimiento"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="usuario"
        rules="required|max:10|alpha_dash|min:4"
      >
        <v-text-field
          v-model="form.username"
          :counter="10"
          :error-messages="errors"
          label="Nombre Usuario"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
      vid="confirmation"
        v-slot="{ errors }"
        name="contraseña"
        rules="required|min:8|alpha_dash"
      >
        <v-text-field
          v-model="form.password"
          :counter="20"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          :error-messages="errors"
          label="Contraseña"
          required
           @click:append="show1 = !show1"
        ></v-text-field>
       
        
      </validation-provider>
<!-- //prueba contra -->
      <validation-provider
        v-slot="{ errors }"
        name="contraseña"
        rules="required|confirmed:confirmation"
      >
        <v-text-field
          v-model="form.passwordV"
          :counter="20"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          :error-messages="errors"
          label="Contraseña Validacion"
          required
           @click:append="show1 = !show1"
        ></v-text-field>
       
        
      </validation-provider>

 

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
        @click="guardar"
      >
        Guardar
      </v-btn>
      <v-btn @click="clear">
        Limpiar
      </v-btn>
      
    </form>
  </validation-observer>
      
    </v-card>

   <v-snackbar
      v-model="snackbarData.snackbar"
      :timeout="snackbarData.timeout"
    >
      {{ snackbarData.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarData.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</div>
</template>

<script>
  import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import axios from 'axios';
  setInteractionMode('eager')
    extend('confirmed', {
    ...confirmed,
    message: 'El campo {_field_} no coincide ',
  })

   extend('alpha_dash', {
    ...alpha_dash,
    message: 'El campo {_field_} puede contener caracteres alfanuméricos, así como guiones y guiones bajos.',
  })

   extend('numeric', {
    ...numeric,
    message: 'El campo {_field_} solo debe contener numeros',
  })

  extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'El campo {_field_} solo debe tener caracteres alfabeticos y espacios',
  })

  extend('digits', {
    ...digits,
    message: 'El campo {_field_} debe tener {length} digitos. ({_value_})',
  })

  extend('required', {
    ...required,
    message: 'El campo {_field_} no puede estar vacio',
  })

  extend('max', {
    ...max,
    message: 'El campo {_field_} no puede tener más de {length} caracteres',
  })

  extend('min', {
    ...min,
    message: 'El campo {_field_} debe tener minimo {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: 'el campo {_field_} {_value_} no coincide {regex}',
  })

  extend('email', {
    ...email,
    message: 'El correo debe ser válido',
  })

  export default {

    components: {
      ValidationProvider,
      ValidationObserver,
    },
    
    data:function(){
        return {
          show1: false,
            tokenLogin: localStorage.getItem('token'),
            form:{
                "nombreUsuario": "",
                "apellidoUsuario": "",
                "correoUsuario": "",
                
                "idTipoDoc": null,
                  "items": [
                    'CC',
                    'CE',
                    'TI',
                  ],
                "numeroDocumentoUsuario": "",
                "fechaNacimientoUsuario": "",
    
                "username": "",
                "password":"",
                "passwordV":"",

                "idTipoDoc_FK":""
            
            },
            snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
            }
        }
    },

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.form = {
                "nombreUsuario": "",
                "apellidoUsuario": "",
                "correoUsuario": "",
                "idTipoDoc": null,
                  "items": [
                    
                  ],
                "numeroDocumentoUsuario": "",
                "fechaNacimientoUsuario": "",
    
                "username": "",
                "password":"",
                "passwordV":"",
            
                "idTipoDoc_FK":""
        }
        
        this.$refs.observer.reset()
      },

      guardar(){/* 
            this.form.token = localStorage.getItem("token"); */
            switch (this.form.idTipoDoc ) {
              case 'CC':
                      this.form.idTipoDoc_FK = 1
                break;
              case 'TI':
                      this.form.idTipoDoc_FK = 2
                break;
              case 'CE':
                      this.form.idTipoDoc_FK = 3
                break;
            }
            
            axios.post("http://localhost:3000/api/usuarios",this.form/* , {headers: { token:this.tokenLogin } } */)
            .then(res =>{
                console.log(res);
                if(res.status === 201){
                  this.Snackbar(res.data.success)
                }else{
                  

                  if(res.data.err.errors){
                    res.data.err.errors.forEach(element => {
                    
                      this.Snackbar(element.message)
                    });
                  }else if(res.data.err.errors[0].message){
                    this.Snackbar(res.data.err.errors[0].message)
                  }else{
                    console.log(res.data.err)
                    this.Snackbar(res.data.err)
                  }

                }
                
            })
        },
       
        Snackbar(texto) {
            
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            
        }, 
        mounted:function(){
        let direccion = "http://localhost:3000/api/tipoDoc/";
                axios.get(direccion/* ,{headers: { token:this.tokenLogin } } */).then( data =>{
                this.form.items = data.data;
                  }); 
    }
     
    },
  }
</script>