


export class Utils{

    trataDatas(dataA:string){
        let dataNova : string;
        let dataAntiga = dataA;
        let ano = dataAntiga.substring(0,4);
        let mes = dataAntiga.substring(4,6);
        let dia = dataAntiga.substring(6,8);
        let hora = dataAntiga.substring(8,10);
        let minutos = dataAntiga.substring(10,12);
        dataNova = dia + "/" + mes  + "/" + ano + " " + hora + ":" + minutos;
        return dataNova;
    }
}