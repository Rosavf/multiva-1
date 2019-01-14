class TableSummary{

    readData(data){

        this.data=data;
        this.titles=["FACTOR HUMANO","GASTOS GENERALES"];
        this.headers=["CUENTA","CONCEPTO","OPERADORA","BANCO","CASA","GRUPO","SAVELLA","SERVICIOS","TOTAL"];
        this.dataset=[];

        if(this.data.length>0){

            let cube=[];

            this.data.forEach(cluster => {

                cluster.Super_Conceptos.forEach(matrix =>{
    
                    let square=[]
    
                    matrix.Cuentas.forEach(row=>{
        
                        let line=[];

                        line.push({value: row.Cuenta, key: row.Llave});

                        line.push({value: row.Concepto, key: row.Llave});
    
                        row.Modulos.forEach( modulo => {
    
                            line.push({value: modulo.Subtotal, key: modulo.Llave});
                            
                        });
                        
                    square.push(line);
                    
                    });
    
                    cube.push(square);
    
                });

                this.dataset.push(cube);
                
            });

        }

    }

    writeTable(divId){

        let table='';
        let body='';
        let head='';

        this.dataset.forEach(cluster => {

            let index=0;

            cluster.forEach(matrix => {

                table+='<tr><td>___</td></tr>';

                table+=this.titles[index];

                index++

                table+='<tr><td>___</td></tr>';


                table+='<tr>';

                this.headers.forEach(header=>{

                    table+='<th>';
                    table+=header;
                    table+='</th>';

                });

                table+='</tr>';



                matrix.forEach(row =>{

                    table+='<tr>';

                    for (let i = 0; i < row.length; i++) {

                        let cell=row[i];

                        console.log(cell);

                        if(i<=1){

                            table+='<td>';
                            table+=cell.value;
                            table+='</td>';

                        }

                        else{

                            table+='<td>';
                            table+=stdToEng(cell.value);
                            table+='</td>';

                        }


                        
                    }
                    
                    table+='</tr>';

                });


            });
            
        });

        $(divId).html(table);

    }




}