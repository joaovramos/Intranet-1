/**************************************************************************
                Intranet - DAVÓ SUPERMERCADOS
 * Criado em: 05/10/2011 por Rodrigo Alfieri
 * Descrição: jQuery para deixar inserir no multibox dinamicamente
           
***************************************************************************/

$(function(){    

    //Ao mudar o focus para o proximo campo filtra os produtos
    $("#TemplateArea").live("change", function(){
        //Verifica se compo de Template Area não está em branco caso sim, limpa os campos do formulário de filtro
        if($("#TemplateArea").val()=="")  
        {
            //Labels
            $("#labelProdutos").css('display','none');
            $("#labelCodigo").css('display','none');
            $("#labelDescricao").css('display','none');
            $("#labelDepartamento").css('display','none');
            $("#labelSecao").css('display','none');
            $("#labelGrupo").css('display','none');
            $("#labelSubGrupo").css('display','none');

            //Campos
            $("#Produtos").css('display','none');
            $("#ProdutoCodigo").css('display','none');
            $("#ProdutoDescricao").css('display','none');
            $("#ProdutoDepartamento").css('display','none');
            $("#ProdutoSecao").css('display','none');
            $("#ProdutoGrupo").css('display','none');
            $("#ProdutoSubGrupo").css('display','none');              
            
        }else        
            {
                //caso não, mostra os elementos do formulário
                
                //Labels
                $("#labelProdutos").css('display','block');
                $("#labelCodigo").css('display','block');
                $("#labelDescricao").css('display','block');
                $("#labelDepartamento").css('display','block');
                $("#labelSecao").css('display','block');
                $("#labelGrupo").css('display','block');
                $("#labelSubGrupo").css('display','block');

                
                //Campos
                $("#Produtos").css('display','block');
                $("#ProdutoCodigo").css('display','block');
                $("#ProdutoDescricao").css('display','block');
                $("#ProdutoDepartamento").css('display','block');
                $("#ProdutoSecao").css('display','block');
                $("#ProdutoGrupo").css('display','block');
                $("#ProdutoSubGrupo").css('display','block');                
                
            }
        retornaProdutos();    
        
    })
    
    //Ao mudar o focus para o proximo campo filtra os produtos
    $("#ProdutoCodigo").live("change", function(){
        
        retornaProdutos();    
        
    })

    //Ao mudar o focus para o proximo campo filtra os produtos
    $("#ProdutoDescricao").live("change", function(){
        
        retornaProdutos();    
        
    })

    //Ao clicar no Combo de Departamento filtra os produtos
    $("#ProdutoDepartamento").live("change", function(){
        var depto   =   $(this).val();
        $.getJSON("?router=T0034/js.classificacao", {Depto:depto}, function(dados){
            $("#ProdutoSecao").html(dados);
        })
        
        $("#ProdutoGrupo").empty();
        $("#ProdutoSubGrupo").empty();        
        
        retornaProdutos();    
        
    })

    //Ao clicar no Combo de Secao filtra os produtos
    $("#ProdutoSecao").live("change", function(){
        var depto   =   $("#ProdutoDepartamento").val();
        var secao   =   $(this).val();
        $.getJSON("?router=T0034/js.classificacao", {Depto:depto,Secao:secao}, function(dados){
            $("#ProdutoGrupo").html(dados);
        })
        
        $("#ProdutoSubGrupo").empty();        
        
        retornaProdutos();    
        
    })

    //Ao clicar no Combo de Grupo filtra os produtos
    $("#ProdutoGrupo").live("change", function(){
        var depto   =   $("#ProdutoDepartamento").val();
        var secao   =   $("#ProdutoSecao").val();
        var grupo   =   $(this).val();

        $.getJSON("?router=T0034/js.classificacao", {Depto:depto,Secao:secao,Grupo:grupo}, function(dados){
            $("#ProdutoSubGrupo").html(dados);
        })
        
        retornaProdutos();    
        
    })

    //Ao clicar no Combo de SubGrupo filtra os produtos
    $("#ProdutoSubGrupo").live("change", function(){
        
        retornaProdutos();    
        
    })

     
})
//Função para buscar os produtos no banco e retorna no multibox
function retornaProdutos()
{     
        var PainelCodigo            =   $("#PainelCodigo").val()        ;
        var TemplateCodigo          =   $("#TemplateCodigo").val()      ;
        var AreaTemplate            =   $("#TemplateArea").val()        ;
        var ProdutoCodigo           =   $("#ProdutoCodigo").val()       ;
        var ProdutoDescricao        =   $("#ProdutoDescricao").val()    ;
        var ProdutoDepartamento     =   $("#ProdutoDepartamento").val() ;
        var ProdutoSecao            =   $("#ProdutoSecao").val()        ;
        var ProdutoGrupo            =   $("#ProdutoGrupo").val()        ;
        var ProdutoSubGrupo         =   $("#ProdutoSubGrupo").val()     ;

        //Limpa Multibox
        $("#Produtos").find("option").remove();
        
        $.getJSON("?router=T0034/js.produtos"
                 ,{
                            PainelCodigo:PainelCodigo
                         ,  TemplateCodigo:TemplateCodigo
                         ,  AreaTemplate:AreaTemplate
                         ,  ProdutoCodigo:ProdutoCodigo
                         ,  ProdutoDescricao:ProdutoDescricao
                         ,  ProdutoDepartamento:ProdutoDepartamento
                         ,  ProdutoSecao:ProdutoSecao
                         ,  ProdutoGrupo:ProdutoGrupo
                         ,  ProdutoSubGrupo:ProdutoSubGrupo
                  }
                 ,  function(dados){
                     if(dados==null)
                         {
                             var option =   "<option></option>";
                             //Preenche Multibox
                             $("#Produtos").append(option); 
                         }
                     else
                         {
                             $.each(dados, function(i,item){
                                 var option = "<option value='"+item[0]+"-"+item[1]+"'>"+item[0]+"-"+item[1]+" "+item[2];
                                 if (item[3]==null)
                                     option +=  "</option>";
                                 else
                                     option +=  "(Com Foto)</option>"; 
                                 //Preenche Multibox
                                 $("#Produtos").append(option); 
                                 
                             })                             
                         }
                 })                        
}

/* -------- Controle de versões - js.classificacao.php --------------
 * 1.0.0 - 28/09/2011   --> Liberada a versão
*/