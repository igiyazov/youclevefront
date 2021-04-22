new Vue({
    el:"#app-video",
    data: {
        showDisc:true,
        showDop:false,
        showCom:false,
        sub:true,
        save:true,
        like:false,
        likeShow:true,
        stars:false,
        isActivePlus:true,
        isActiveSave:true,
        isActiveDontSave:false,
        
        
    },
    computed:{
        subText: function(){
            
            if(this.sub==true){
                return ' Подписаться'
            }
            if(this.sub==false){
                return ' Вы подписаны'
            } 
            
        },
        saveText: function(){
            
            if(this.save==true){
                return ' Сохранить'
            }
            if(this.save==false){
                return ' Сохранено'
            } 
            
        },
        likeText: function(){
            
            if(this.like==true){
                return ' Спасибо!'
            }
            if(this.like==false){
                return ' Рекомендую'
            } 
            
        },
        
    },
    

    
})