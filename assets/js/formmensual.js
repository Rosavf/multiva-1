class FormMensual{

    readForm(){

        this.modulo = $("#selectModulo").val();

        this.tipo = $("#selectTipo").val();

    }

    getTipo(){

        return this.tipo;
    }

    getModulo(){

        return this.modulo;

    }

    getUrl(rootUrl){

        let url=rootUrl+"/"+this.tipo+"/"+this.modulo;

        return url;

    }

}