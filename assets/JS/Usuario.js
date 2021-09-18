

class ApiService{
    baseURL = 'http://localhost:3000/api/usuarios';
    async getAll(){
    const response = await fetch(this.baseURL);
        return response.json();
      
    }


    async create(NewU) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NewU)
        }
        const response = await fetch(this.baseURL, requestOptions);
        return response.json();
    }
    async delete(Uid) {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`${this.baseURL}/${Uid}`, requestOptions);
        return response.json();

        }
}

const app = new Vue({
    el: "#app",
    data: {
        Usuarios: [],
        apiService: null,
        newU:{}

    },
   async created() {
        this.apiService = new ApiService();
       this.Usuarios = await this.apiService.getAll();
    },
   methods: {
       sendU: async  function() {
           await this.apiService.create(this.newU)
           this.Usuarios = await this.apiService.getAll();
           this.newU={}
       },
       ClickEliminar: async function (idU) {
           /* console.log(idTU) */
           await this.apiService.delete(idU);
           this.Usuarios = await this.apiService.getAll();
       }
   }
})