
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false;
            }
        }
        return true;
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', 0);
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1 ;
    }

    gravar(d){
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros(){
        let despesas = [];
        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));

            if(despesa === null) continue;

            despesas.push(despesa);
        }

        return despesas;
    }

    pesquisar(despesa){
        
        let despesasFiltradas = this.recuperarTodosRegistros();

        // Filtro ano
        if( despesa.ano != '' ) 
            despesasFiltradas = despesasFiltradas.filter(d => despesa.ano == d.ano);

        // Filtro mês
        if( despesa.mes != '' ) 
            despesasFiltradas = despesasFiltradas.filter(d => despesa.mes == d.mes);

        // Filtro dia
        if( despesa.dia != '' ) 
            despesasFiltradas = despesasFiltradas.filter(d => despesa.dia == d.dia);

        // Filtro tipo
        if( despesa.tipo != '' ) 
            despesasFiltradas = despesasFiltradas.filter(d => despesa.tipo == d.tipo);

        // Filtro descrição
        if( despesa.descricao != '' ) 
            despesasFiltradas = despesasFiltradas.filter(d => despesa.descricao == d.descricao);

        // Filtro valor
        if( despesa.valor != '' ) 
            despesasFiltradas = despesasFiltradas.filter(d => despesa.valor == d.valor);

        console.log(despesasFiltradas);
    }
}

let bd = new Bd();

function cadastrarDespesa(){
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()){
        bd.gravar(despesa);

        document.getElementById('modalHeader').className = 'modal-header text-success';
        document.getElementById('modalLabel').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modalBody').innerHTML = 'Despesa foi cadastrada com sucesso!';
        document.getElementById('modalButton').className = 'btn btn-success';
        document.getElementById('modalButton').innerHTML = 'Voltar';
        $('#modalRegistraDespesa').modal('show');

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {
        document.getElementById('modalHeader').className = 'modal-header text-danger';
        document.getElementById('modalLabel').innerHTML = 'Erro na gravação';
        document.getElementById('modalBody').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.';
        document.getElementById('modalButton').className = 'btn btn-danger';
        document.getElementById('modalButton').innerHTML = 'Voltar e corrigir';

        $('#modalRegistraDespesa').modal('show');
    }
    
}

function carregaListaDespesas(){
    let despesas = bd.recuperarTodosRegistros();
    let listaDespesas = document.getElementById('listaDespesas');
    
    despesas.forEach(d => {
        // Cria a linha
        let linha = listaDespesas.insertRow();

        // Tratar os tipos
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'; break;
            case '2': d.tipo = 'Educação'; break;
            case '3': d.tipo = 'Lazer'; break;
            case '4': d.tipo = 'Saúde'; break;
            case '5': d.tipo = 'Esporte'; break;
            default: d.tipo = 'Não especificado'; break;
        }

        // Cria as colunas;
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;
    })

}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
    bd.pesquisar(despesa);
}