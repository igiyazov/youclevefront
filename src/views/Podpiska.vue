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
                    <div class="lk-presentation-btn">Перейти к оплате</div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
</style>