class FormSummary{

    constructor(){

        

    }

    readForm(typeId,monthId){

        this.params = {

            type: $(typeId).val(),

            month: $(monthId).val()

        };

    }

    getParams(){

        return this.params;

    }

}