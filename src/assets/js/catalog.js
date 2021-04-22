new Vue({
    el:"#app-catalog",
    data: {
        textFilter1:false,
        textFilter2:false,
        textFilter3:true,
        showSecCh:false,
        showThCh:false,
        showFilter:false,

        mobCatSt:false,
        mobCatNd:false,
        mobCatRd:false,

    },
    
    computed:{
        filterText: function(){
            
            if(this.textFilter1==true){
        
                return ' По рекомендациям'
            }
            if(this.textFilter2==true){
                
                return ' По рейтингу'
            }
            if(this.textFilter3==true){
                
                return ' По дате добавления'
            }
            
        }
    }
    
})

$(document).ready(function() {

    $('.rec-list').slick({
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
        ]
    });
    
})
/*function filterChoice() {
    if(document.getElementById("filter-choice").style.display=="block"){
        document.getElementById("filter-choice").style.display="none"
    }else{
        document.getElementById("filter-choice").style.display="block"
    }  
}
function filterSelected1() {
    if(document.getElementById("filter-btn-choice1").innerHTML===" По рекомендациям"){
        document.getElementById("filter-btn").innerHTML=" По рекомендациям"
        document.getElementById("filter-choice").style.display="none"
    }
}
function filterSelected2() {
    if(document.getElementById("filter-btn-choice2").innerHTML===" По дате добавления"){
        document.getElementById("filter-btn").innerHTML=" По дате добавления"
        document.getElementById("filter-choice").style.display="none"
    }
}
function filterSelected3() {
    if(document.getElementById("filter-btn-choice3").innerHTML===" По рейтингу"){
        document.getElementById("filter-btn").innerHTML=" По рейтингу"
        document.getElementById("filter-choice").style.display="none"
    }   
}*/



 
