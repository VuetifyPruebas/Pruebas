class ApiService{
    baseURL = 'http://localhost:3000/api/tipoUsuario';
    async getAll(){
    const response = await fetch(this.baseURL);
    return response.json();
    }

    async create(NewTU) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NewTU)
        }
        const response = await fetch(this.baseURL, requestOptions);
        return response.json();
    }
    async delete(TUid) {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`${this.baseURL}/${TUid}`, requestOptions);
        return response.json();

        }
}

const app = new Vue({
    el: "#app",
    data: {
        TipoUsuarios: [],
        apiService: null,
        newTipU:{}

    },
   async created() {
        /* fetch('http://localhost:3000/api/tipoUsuario')
            .then(response => response.json())
            .then(json => this.TipoUsuarios=json)
            .catch(err => console.log(err)); */
        this.apiService = new ApiService();
        this.TipoUsuarios=await this.apiService.getAll();
    },
   methods: {
       sendTU: async  function() {
           await this.apiService.create(this.newTipU)
           this.TipoUsuarios = await this.apiService.getAll();
           this.newTipU={}
       },
       ClickEliminar: async function (idTU) {
           /* console.log(idTU) */
           await this.apiService.delete(idTU);
           this.TipoUsuarios = await this.apiService.getAll();
       }
   }
})