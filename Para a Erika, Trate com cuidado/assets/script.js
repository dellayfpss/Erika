confirm("Are you sure you want to delete?")
$(document).ready(function(){

    // Navegação dos botões mudaTela
$(".mudaTela").click(function() {
    const atual = $(this).closest(".tela");
    const atualId = atual.attr("id");
    if(!atualId) return;

    const numTela = parseInt(atualId.replace("tela",""));
    
    // Se for botão de tela1 e tiver id específico, pode ir para tela2 diretamente
    let proximaTela = numTela + 1;
    mudaTela(atual, proximaTela);
});

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) => {

    let titulo;
    let mensagem;

    switch(texto){
        case "5/5": 
            titulo = "05 de Maio de 2021"; 
            mensagem = "<p>Esse foi o dia que nos conhecemos...</p>";
            break;
        case "8/5": 
            titulo = "08 de Maio de 2021"; 
            mensagem = "<p>Foi o primeiro dia que saímos...</p>";
            break;
        case "15/5": 
            titulo = "15 de Maio de 2021"; 
            mensagem = "<p>Foi quando te vi com os cabelos cacheados...</p>";
            break;
        case "22/5": 
            titulo = "22 de Maio de 2021"; 
            mensagem = "<p>Lembro que eu fiquei o dia todo pensando...</p>";
            break;
        case "29/5": 
            titulo = "29 de Maio de 2021"; 
            mensagem = "<p>Essa foi a vez que mais rodamos a cidade...</p>";
            break;
        case "3/6": 
            titulo = "03 de Junho de 2021"; 
            mensagem = "<p>A minha ideia de nos vermos mais alguma vez...</p>";
            break;
        case "5/6": 
            titulo = "05 de Junho de 2021"; 
            mensagem = "<p>Acho que esse dia foi um pequeno marco...</p>";
            break;
        case "12/6": 
            titulo = "12 de Junho de 2021"; 
            mensagem = "<p>Ai ai... o que dizer desse dia?...</p>";
            break;
        case "13/6": 
            titulo = "13 de Junho de 2021"; 
            mensagem = "<p>Acordar e ver você ali...</p>";
            break;
        case "19/6": 
            titulo = "19 de Junho de 2021"; 
            mensagem = "<p><strong>Este momento está sendo escrito agora...</strong></p>";
            break;
        default:
            // Qualquer outro dia leva para a tela final
            titulo = "Dia especial";
            mensagem = "<p>O dia em que ela disse SIM!</p>";
            break;
    }

    // Sempre mostrar o pop-up
    mostraPopUp(true, titulo, mensagem);

    // Garantir que telaFinal seja verdadeira para ir para a tela de agradecimento
    telaFinal = true;
}


    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}