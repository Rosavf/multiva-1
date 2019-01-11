class MyChart{

    constructor(){

        this.chart=null;

    }

    begin(label,type,labels,data){

        var ctx = document.getElementById("myChart").getContext('2d');
        this.chart = new Chart(ctx, {
            type: type,
            data: {

                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor:'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },

            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    }

    //
    end(){

        this.chart.destroy();

    }

}
