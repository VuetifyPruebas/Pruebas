class ApiService{
    baseURL = 'http://localhost:3000/api/tipoDoc';
    async getAll(){
    const response = await fetch(this.baseURL);
    return response.json();
    }

    async create(NewTD) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NewTD)
        }
        const response = await fetch(this.baseURL, requestOptions);
        return response.json();
    }
    async delete(TDid) {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`${this.baseURL}/${TDid}`, requestOptions);
        return response.json();

        }
}


const app = new Vue({
    el: "#app",
    data: {
        
        TipoDocumentos: [],
        apiService: null,
        newTipD:{}
    },
   async created() {
        /* fetch('http://localhost:3000/api/tipoUsuario')
            .then(response => response.json())
            .then(json => this.TipoUsuarios=json)
            .catch(err => console.log(err)); */
        this.apiService = new ApiService();
        this.TipoDocumentos=await this.apiService.getAll();
    },
   methods: {
       sendTD: async  function() {
           await this.apiService.create(this.newTipD)
           this.TipoDocumentos = await this.apiService.getAll();
           this.newTipD={}
       },
       ClickEliminar: async function (idTD) {
           /* console.log(idTU) */
           await this.apiService.delete(idTD);
           this.TipoDocumentos = await this.apiService.getAll();
       }
   }
})
