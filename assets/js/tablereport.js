class TableReport{

    constructor(tableId,jsonData){

        this.readData(jsonData);
        this.decodeData();
        this.tableHeaders();
        this.decodeFooters();
        this.tableBody();
        this.fullTable();
        this.printTable(tableId);

    }

    readData(jsonData){

        this.allData=JSON.parse(jsonData);
        this.data=this.allData.Datos;
        this.sumatorias=this.allData.Sumatorias;
        this.superConceptos=["FACTOR HUMANO","GASTOS GENERALES"];

    }

    decodeData(){

        // headers, llaves de desglose y matriz de datos
        this.headers = [];
        this.cluster = [];
        this.size = this.data.length;

        // si el tamano es mayor a 0 parseamos los datos
        if(this.size>0){

            // creamos encabezados
            let line=this.data[0];
            this.headers = [];
            let modulos=line.Modulos;

            //agregamos concepto al header
            this.headers.push("CONCEPTO");

            //agregamos meses al header
            modulos.forEach(modulo => {

                this.headers.push(modulo.Modulo);

            });

            this.headers.push("TOTAL")

            // iteramos superconceptos dados en parametros
            for (let i = 0; i < this.superConceptos.length; i++) {

                let superConcepto = this.superConceptos[i];

                //creamos matriz temporal e iteramos
                let matrix=[];

                this.data.forEach(line => {

                    //solo agregaremos datos a la matriz de coincidir el superconcepto
                    if(line.Super_Concepto == superConcepto){
                    
                        let row=[];

                        row.push(line.Concepto);

                        let modulos=line.Modulos;

                        modulos.forEach(modulo => {

                            let subtotal=modulo.Subtotal;
                            row.push(subtotal);

                        });

                        row.push(line.Total);

                        matrix.push(row);

                    }
                    //acaba el condicional

                });
                //terminamos de leer matriz

                this.cluster.push(matrix);

            }
            // fin de ciclo de superconceptos
            
        }
        // termina el condicional donde existen datos

    }

    decodeFooters(){

        this.footers=[];

        for (let i = 0; i < this.superConceptos.length; i++) {

            let line=[];

            line.push("SUMATORIA");

            this.sumatorias.forEach(sumatoria => {

                if(sumatoria.Super_Concepto==this.superConceptos[i]){

                    line.push(sumatoria.Sumatoria);

                }

            });

            this.footers.push(line);

        }


    }

    tableHeaders(){

        this.head = '';
        this.head += '<thead>';
        this.head += '<tr>';

        this.headers.forEach(header => {
            
            this.head += '<th>';
            this.head += header;
            this.head += '</th>';

        });

        this.head+='</tr>';
        this.head+='</thead>';

    }

    tableBody(){

        this.body='';

        this.body+='<tbody>';

        for (let h = 0; h < this.cluster.length; h++) {

            this.body+='<tr>';

            this.body+='</tr>';
            this.body+='<tr>';
            this.body+='<th>';
            this.body+=this.superConceptos[h];
            this.body+='</th>';
            this.body+='</tr>';
            this.body+='<tr>';

            this.body+='</tr>';

            let matrix=this.cluster[h];

            for(let i=0; i<matrix.length; i++){

                let line=matrix[i];

                this.body+='<tr>';

                for(let j=0; j<line.length; j++){
                    
                    let cell = line[j];

                    if(j==0){

                        this.body+='<td>';
                        this.body+=this.cluster[h][i][j];
                        this.body+='</td>';

                    }

                    else{

                        this.body+='<td>';
                        this.body+=stdToEng(this.cluster[h][i][j])
                        this.body+='</td>';

                    }

                }

                this.body+='</tr>';

            }

            //
            this.body+='<tr>';

            let footerLine =this.footers[h];

            for (let i = 0; i < footerLine.length; i++) {

                if(i==0){

                    this.body+='<th>';
                    this.body+=footerLine[i];
                    this.body+='</th>';

                }

                else{

                    this.body+='<th>';
                    this.body+=stdToEng(footerLine[i]);
                    this.body+='</th>';

                }
                
            }

        }

        this.body+='</tbody>'

    }

    fullTable(){

        this.table='';
        this.table+=this.head;
        this.table+=this.body;

    }

    printTable(tableId){

        $(tableId).html(this.table);
        
    }



}