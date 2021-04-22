new Vue({
    el:"#app-author",
    data: {
        aboutAut:true,
        courses:false,
        sub:true,
        isActivePlus:true,
    },
    computed:{
        subText: function(){
            
            if(this.sub==true){
                return ' Подписаться'
            }
            if(this.sub==false){
                return ' Вы подписаны'
            } 
            
        }
    },
    

    
})
    
