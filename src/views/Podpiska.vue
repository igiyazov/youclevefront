<template>
    <div class="lk-presentation ">
        <div class="lk-present-row" >
            <!-- <div class="lk-present-choice">
                <div class="lk-present-text-wrapper">
                    <div class="lk-present-title">
                        <span>Знаю чего хочу</span>
                    </div>
                    <div class="lk-present-disc">
                        <span>Подписка на одну Категорию (Магазин курсов не входит в подписки)
                        </span>
                    </div>
                    <div class="podpiska-cat-price">
                        <span class="lk-price" v-show="FirOnePr">3.99$</span>
                        -- <span class="lk-price" v-show="SecOnePr" style="text-decoration:line-through;">9.99$</span><br> --
                        -- <span class="lk-discont-price" v-show="SecOnePr">7.99$</span><br> --
                        -- <span class="price-disc">Без учета скидки промокода 20%</span> --
                    </div><br>
                    <div class="selsect-cat">
                        <select>
                            <option>Информационные технологии</option>
                            <option>Иностранные языки</option>
                        </select>
                    </div>
                    -- <div class="podpiska-promo-wrapper">
                        <input type="text" placeholder="Введите промокод">
                        <div class="promo-btn" @click="FirOnePr=false, SecOnePr=true">Применить</div>
                    </div> --
                </div>
                <div class="lk-presentation-btn-wrapper">
                    <div class="lk-presentation-btn">Перейти к оплате</div> 
                </div>
            </div> -->
            <div class="lk-present-choice">
                <div class="lk-present-text-wrapper">
                    <div class="lk-present-title">
                        <span>Изучайте ВСË</span>
                    </div>
                    <div class="lk-present-disc">
                        <span>
                           Подписка на все Категории без ограничений
                        </span>
                    </div>
                    <img src="../assets/img/subs.png" alt="sub" class="sub-img">
                    <div class="podpiska-cat-price">
                        <!-- <span class="lk-price">9.99$</span><br><br><br><br> -->
                        <span class="lk-price" style="text-decoration:line-through;">1499 р./месяц</span><br>
                        <span class="lk-discont-price">999 р./месяц</span><br>
                        <!-- <span class="price-disc">Без учета скидки промокода 20%</span><br><br><br> -->
                    </div>
                    
                    <!-- <div class="podpiska-promo-wrapper">
                        <input type="text" placeholder="Введите промокод">
                        <div class="promo-btn" @click="FirAllPr=false, SecAllPr=true">Применить</div>
                    </div> -->
                </div>
                <div class="lk-presentation-btn-wrapper">
                    <div class="lk-presentation-btn"
                    @click="checkAuthForSub()">{{paymentText}}</div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data(){
        return {
            isSubed:false,
        }
    },
    async mounted() {
        const user_id = this.$store.getters.getId
        const res = await this.isUserSubscribe(user_id);
        this.isSubed = res
        // console.log(res.detail);
    },
    computed: {
        paymentText(){
            return this.isSubed ? 'Вы уже подписаны' : 'Перейти к оплате';
        },

        ...mapGetters('subscription', ['getIsSubscribed'])
    },
    methods: {
        checkAuthForSub: function(){
            if (this.$store.getters.getIsAuthenticated){
                this.$awn.warning('Здесь будет оплата', this.$options)
            }else{
                // this.show=true
                this.$awn.warning('Для покупки, пожалуйста авторизуйтесь', this.$options)
            }
        },
        ...mapActions('subscription', ['isUserSubscribe'])
    },
}
</script>
<style scoped>
</style>