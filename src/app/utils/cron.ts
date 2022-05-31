export class cron {
    cron!: any;
    tempo!: number;
    hh!:number;
    mm!:number;
    ss!:number;

    constructor(){
        var hh = 0;
        var mm = 0;
        var ss = 0;
        var tempo = 1000;//Quantos milésimos valem 1 segundo?   
    }

//Inicia o temporizador
start() {
    this.cron = setInterval(() => { this.timer(); }, this.tempo);
}

//Para o temporizador mas não limpa as variáveis
pause() {
    clearInterval(this.cron);
}

//Faz a contagem do tempo e exibição
timer() {
    this.ss++; //Incrementa +1 na variável ss

    if (this.ss == 59) { //Verifica se deu 59 segundos
        const ss = 0; //Volta os segundos para 0
        this.mm++; //Adiciona +1 na variável mm

        if (this.mm == 59) { //Verifica se deu 59 minutos
            const mm = 0;//Volta os minutos para 0
            this.hh++;//Adiciona +1 na variável hora
        }
    }

    //Cria uma variável com o valor tratado HH:MM:SS
    var format = (this.hh < 10 ? '0' + this.hh : this.hh) + ':' + (this.mm < 10 ? '0' + this.mm : this.mm) + ':' 
    + (this.ss < 10 ? '0' + this.ss : this.ss);

    //Retorna o valor tratado
    return format;
}
}