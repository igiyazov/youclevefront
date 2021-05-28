<template>
    <div id="app-lk"> 
    
    <div class="lk-wrapper">
        <Slide :closeOnNavigation="true" @click.native="loadsubscribesList()">
        
        <div class="lk-info-wrapper">
            <div class="lk-logo-wrapper">
                <router-link to="/" class="lk-header-logo"><span>YOU</span><br><span>CLEVE</span></router-link>
            </div>
            <!-- <div class="promocode-wrapper">
                <div class="promocode">Ваш промокод:</div>
                <div class="promo">{{user.promocode}}</div>
            </div> -->
            <!-- <div class="lk-counter-wrapper"> -->
                <div class="lk-fol-count">
                    <div class="lk-fol-count-item fa fa-group"><span class="otstup-lk">{{user.followers_count}}</span><span class="otstup-lk"> подп.</span></div>
                </div>
                <div class="lk-courses-count">
                    <div class="lk-fol-count-item fa fa-graduation-cap"><span class="otstup-lk">{{user.courses_count}}</span><span class="otstup-lk"> курсов(a)</span></div>
                </div>
            <!-- </div> -->
            <!-- <div class="none-promo-info"> -->
                <!-- <div class="wallet-info">
                    <div class="bonus">К выплате: </div>
                    <div class="wallet">{{user.bonus}} руб.</div>
                </div> -->
                <!-- <div class="sub-info">
                    <div class="count">Подписка закончится:</div>
                    <div class="count-time">{{user.follow_end}}</div>
                </div> -->
            <!-- </div> -->
        </div>
        <div class="sub-item-wrapper">
            <div 
            v-for="sub in subscribesList" :key="sub.custom_user.id"
            class="sub-item" :class="{isactiveSub:sub.custom_user.id == selectedSub}"
            @click="selectedSub = sub.custom_user.id, SubClicked(sub), podpiskiLkClicked()">
                <div class="sub-logo">
                    <img src="@/assets/img/avatar.png" alt="author-avatar">
                </div>
                <div class="sub-author">{{sub.custom_user.username}}</div>
            </div>
            
        </div>
        </Slide>
        
        <div class="page-choise-wrapper">
            <swiper class="page-choise" :options="swiperOption">
                <swiper-slide v-on:click.native="podpiski=true, 
                    myCourses=false,
                    aboutMe=false,
                    AddCourse=false,
                    pokPod=false,
                    bankAcc=false,
                    bought=false,
                    loadlistSubCourses()">
                    <button autofocus class="choise-item"
                    >
                    Подписки
                    </button>
                </swiper-slide>
                <swiper-slide v-on:click.native="AddCourse=true,
                    myCourses=false, 
                    podpiski=false,
                    aboutMe=false,
                    pokPod=false,
                    bankAcc=false,
                    bought=false,
                    deleteBtn=false,
                    catParams.title='',
                    catParams.overview='',
                    catParams.price='',
                    catParams.category='',
                    catParams.subcategory='',
                    catParams.level='',
                    addOrEditCourseText='Добавить',
                    addCourseTitle='Добавление курса',
                    removeFilepondFile()">
                    <button class="choise-item" 
                    >
                    Добавить курс
                    </button>
                </swiper-slide>
                <!-- <swiper-slide v-on:click.native="bought=true,
                    myCourses=false, 
                    podpiski=false,
                    AddCourse=false,
                    pokPod=false,
                    bankAcc=false,
                    aboutMe=false,
                    loadlistBoughtCourses()">
                    <button class="choise-item" 
                    >
                    Купленные
                    </button>
                </swiper-slide> -->
                <swiper-slide v-on:click.native="myCourses=true, 
                    podpiski=false,
                    aboutMe=false,
                    AddCourse=false,
                    pokPod=false,
                    bankAcc=false,
                    bought=false,
                    loadlistMyCourses()">
                    <button class="choise-item" 
                    >
                    Мои курсы
                    </button>
                </swiper-slide>
                
                <swiper-slide v-on:click.native="aboutMe=true,
                    myCourses=false, 
                    podpiski=false,
                    AddCourse=false,
                    pokPod=false,
                    bankAcc=false,
                    bought=false">
                    <button class="choise-item" 
                    >
                    Обо мне
                    </button>
                </swiper-slide>
                
                <!-- <swiper-slide v-on:click.native="pokPod=true,
                    myCourses=false, 
                    podpiski=false,
                    aboutMe=false,
                    AddCourse=false,
                    bankAcc=false">
                    <button class="choise-item" 
                    >
                    Подписка на сервис
                    </button>
                </swiper-slide> -->
                <!-- <swiper-slide v-on:click.native="bankAcc=true,
                    myCourses=false, 
                    podpiski=false,
                    aboutMe=false,
                    AddCourse=false,
                    pokPod=false,
                    bought=false"> 
                    <button class="choise-item"
                    >
                    Вывод бонусов
                    </button>
                </swiper-slide> -->
            </swiper>
        </div>

        <!--HEAD END-->
        
        <!--PODPISKI START-->
        
        
        <div class="subscribes-wrapper" v-show="podpiski">
            <div class="no-podpiski" v-show="noPodpiski">
                <span class="buy-desc">Вы еще ни на кого не подписаны, 
                    либо авторы еще не выложили курсы
                </span>
                <div class="no-course-wrapper">
                    <!-- <span class="no-course-info">Вы пока не добавили ни одного курса</span> -->
                    <div class="add-course-btn-wrapper">
                        <router-link to="/catalog" class="add-course-btn-mycourses"
                        @click.native="toCatalogClicked()"
                        >В каталог</router-link>
                    </div>
                </div>
                
            </div>
            <div class="lk-courses-wrapper">
                <div class="lk-courses">
                    <router-link :to="`/course/${courseSub.id}`" class="author-video-item" 
                    v-for="courseSub in listSubCourses" :key="courseSub.id"
                    @click.native="courseClicked(courseSub)">
                        <!-- <div class="price-info">
                            <span class="author-price-video">{{courseSub.price}} руб.</span>
                        </div> -->
                        <div class="course-img-wrapper">
                            <img class="video-img" :src="`${courseSub.photo}`" alt="course-img">
                        </div>
                        <div class="views fa fa-eye">
                            <div class="v-counter">{{courseSub.views}}</div>
                        </div>
                        <div class="author-course-title">
                        <span>{{courseSub.title}}</span>
                        </div>
                        <div class="author-course-info">
                            <div class="author-col-time">
                                <div class="author-video-info">
                                    <span class="author-col-video">{{courseSub.lessons_count}}</span>
                                    <span class="author-video">Видеоуроков(а)</span>
                                </div>
                                <div class="author-time-info">
                                    <!-- <span class="author-sum-time">Время курса</span> -->
                                    <span class="author-time">{{courseSub.course_duration}}</span>
                                </div>
                            </div>
                            <!-- <div class="author-raiting">
                                <span class="author-star fa fa-star"></span>
                                <span class="author-sr-raiting">{{courseSub.rating}}</span>
                            </div> -->
                        </div>
                        <div class="author-course-info">
                            <div class="author-author">
                                <router-link :to="`/author/${courseSub.owner}`"
                                @click.native="authorClicked(courseSub)"
                                class="author-item-author-name">{{courseSub.username}}
                                </router-link>
                            </div>
                            <div class="author-item-recomended">
                                <span class="author-col-like fa fa-thumbs-o-up"></span>
                                <span class="author-col-rec">{{courseSub.likes_count}}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <!--PODPISKI END-->

        <!--BOUGHT START-->

        <!-- <div class="my-courses-wrapper" v-show="bought">
            <div class="no-podpiski" v-show="noBoughtCourses">
                <span class="buy-desc">Вы еще не купили ни одного курса
                </span>
                <div class="no-course-wrapper">
                    !-- <span class="no-course-info">Вы пока не добавили ни одного курса</span> --
                    <div class="add-course-btn-wrapper">
                        <router-link to="/catalog" class="add-course-btn-mycourses"
                        @click.native="toCatalogClicked()"
                        >В каталог</router-link>
                    </div>
                </div>
            </div>
            <div class="my-courses">
                    <div class="author-video-item" 
                    v-for="courseMy in listBoughtCourses" :key="courseMy.id">
                    <router-link :to="`/course/${courseMy.id}`" 
                    @click.native="courseClicked(courseMy)">
                        <div class="course-img-wrapper">
                            <img class="video-img" :src="`${courseMy.photo}`" alt="course-img">
                        </div>
                        <div class="views fa fa-eye">
                            <div class="v-counter">{{courseMy.views}}</div>
                        </div>
                        <div class="author-course-title">
                        <span>{{courseMy.title}}</span>
                        </div>
                        <div class="author-course-info">
                            <div class="author-col-time">
                                <div class="author-video-info">
                                    <span class="author-col-video">{{courseMy.lessons_count}}</span>
                                    <span class="author-video">Видеоуроков(а)</span>
                                </div>
                                <div class="author-time-info">
                                    !-- <span class="author-sum-time">Время курса</span> --
                                    <span class="author-time">{{courseMy.course_duration}}</span>
                                </div>
                            </div>
                            !-- <div class="author-raiting">
                                <span class="author-star fa fa-star"></span>
                                <span class="author-sr-raiting">{{courseMy.rating}}</span>
                            </div> --
                        </div>
                        <div class="author-course-info">
                            <div class="author-author">
                                <router-link :to="`/author/${courseMy.owner}`"
                                @click.native="authorClicked(courseMy)"
                                class="author-item-author-name">{{courseMy.username}}
                                </router-link>
                            </div>
                            <div class="author-item-recomended">
                                <span class="author-col-like fa fa-thumbs-o-up"></span>
                                <span class="author-col-rec">{{courseMy.likes_count}}</span>
                            </div>
                        </div>
                    </router-link>
                    </div>
                </div>    
        </div> -->

        <!--BOUGHT END-->

        <!--MY COURSES START-->

        <div class="my-courses-wrapper" v-show="myCourses">
            <div class="no-podpiski" v-show="noMyCourses">
                <span class="buy-desc">У Вас пока нет курсов
                </span>
            
                <div class="no-course-wrapper">
                    <!-- <span class="no-course-info">Вы пока не добавили ни одного курса</span> -->
                    <div class="add-course-btn-wrapper">
                        <div class="add-course-btn-mycourses" v-on:click="myCourses=false,
                        addOrEditCourseText='Добавить',
                        catParams.title='',
                        catParams.overview='',
                        catParams.price='',
                        catParams.category='',
                        catParams.subcategory='',
                        catParams.level='',
                        addCourseTitle='Добавление курса',
                        AddCourse=true,
                        deleteBtn=false
                        ">Добавить курс</div>
                    </div>
                </div>
            </div>
                <div class="my-courses">
                    <div class="author-video-item" 
                    v-for="courseMy in listMyCourses" :key="courseMy.id">
                        <!-- <div class="lk-price-info">
                            <div class="price-wr">
                                <span @click="AddCourse=true, myCourses=false,
                                addOrEditCourseText='Обновить',
                                addCourseTitle='Редактирование курса',
                                deleteBtn=true,
                                loadForEditCourse(courseMy),scrollToTop()
                                " class="edit fa fa-pencil"></span>
                                <span class="author-price-video">{{courseMy.price}} руб.</span>
                            </div>
                        </div> -->
                        <router-link :to="`/course/${courseMy.id}`" 
                        @click.native="courseClicked(courseMy)">
                            <div class="course-img-wrapper">
                                <img class="video-img" :src="`${courseMy.photo}`" alt="course-img">
                            </div>
                            <div class="views fa fa-eye">
                                <div class="v-counter">{{courseMy.views}}</div>
                            </div>
                            <div class="author-course-title">
                                <span>{{courseMy.title}}</span>
                            </div>
                            
                            <div class="author-course-info">
                                <div class="author-col-time">
                                    <div class="author-video-info">
                                        <span class="author-col-video">{{courseMy.lessons_count}}</span>
                                        <span class="author-video">Видеоуроков(а)</span>
                                    </div>
                                    <div class="author-time-info">
                                        <!-- <span class="author-sum-time">Время курса</span> -->
                                        <span class="author-time">{{courseMy.course_duration}}</span>
                                    </div>
                                </div>
                                <!-- <div class="author-raiting">
                                    <span class="author-star fa fa-star"></span>
                                    <span class="author-sr-raiting">{{courseMy.rating}}</span>
                                </div> -->
                            </div>
                            <div class="author-course-info">
                                <div class="author-author">
                                    <router-link :to="`/author/${courseMy.owner}`"
                                    @click.native="authorClicked(courseMy)"
                                    class="author-item-author-name">{{courseMy.username}}
                                    </router-link>
                                </div>
                                <div class="author-item-recomended">
                                    <span class="author-col-like fa fa-thumbs-o-up"></span>
                                    <span class="author-col-rec">{{courseMy.likes_count}}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
        </div>

        <!--MY COURSES END-->

        <!--ABOUT ME START-->

        <div class="about-me-wrapper" v-show="aboutMe">
            <h2>Информация об авторе</h2>
            <div class="inputs-wrapper">
                <!-- <div class="photo-wrapper">
                    <h1>Ваше фото</h1>
                    <Upload />
                </div> -->
                <!-- <div class="info-text-wrapper">
                    
                    
                    <div class="photo-wrapper">
                        <div class="photo">
                            
                        </div>
                    </div>
                </div> -->
                <div class="info-text-wrapper">
                    <h1>Ваше имя</h1>
                    <div class="input-text">
                        <input type="text" placeholder="Имя или никнейм" v-model="userParams.userName">
                    </div>
                </div>
                <div class="info-text-wrapper">
                    <h1>Откуда Вы</h1>
                    <div class="input-text">
                        <input type="text" placeholder="Город" v-model="userParams.geo">
                    </div>
                </div>
                <div class="info-text-wrapper">
                    <h1>Email</h1>
                    <div class="input-text">
                        <input type="email" placeholder="example@gmail.com" v-model="userParams.email">
                    </div>
                </div>
                <div class="info-text-about-wrapper">
                    <h1>Расскажите о себе</h1>
                    <div class="input-text-about">
                        <textarea placeholder="Напишите о себе" v-model="userParams.disc"></textarea>
                    </div>
                </div>
                <!-- <div class="info-text-wrapper">
                    <h1>Ваши награды</h1>
                    <div class="nagrada-item-wrapper">
                        <div class="nagrada"></div>
                        <div class="nagrada"></div>
                        <div class="nagrada">
                            <div class="fa fa-camera"></div>
                        </div>
                    </div>
                    
                </div> -->
                <!-- <div class="info-text-wrapper">
                    <h1>Ваш сайт</h1>
                    <div class="input-text">
                        <input type="text" placeholder="www.examle.com" v-model="userParams.site">
                    </div>
                </div>
                <div class="info-soc-wrapper">
                    <h1>Ссылки на соцсети</h1>
                    <div class="input-soc">
                        <div class="fa fa-facebook">
                            <input type="text" placeholder="facebook">
                        </div>
                        <div class="fa fa-twitter">
                            <input type="text" placeholder="twitter">
                        </div>
                        <div class="fa fa-instagram">
                            <input type="text" placeholder="instagram">
                        </div>
                        <div class="fa fa-vk">
                            <input type="text" placeholder="vkontakte">
                        </div>
                        <div class="fa fa-youtube">
                            <input type="text" placeholder="youtube">
                        </div>
                    </div>
                </div> -->
                
                
                
            </div>
            <div class="save-btn-wrapper">
                <div class="lk-save-btn" @click="callGoodWarnProfile(),scrollToTop()">Сохранить</div>
            </div>
        </div>

        <!--ABOUT ME END-->

        <!--ADD COURSE START-->

        <div class="add-course-wrapper" v-show="AddCourse">
            <h2>{{addCourseTitle}}</h2>
            <div class="inputs-wrapper">
                <div class="photo-wrapper">
                    <h1>Обложка курса <span class="obz">*</span></h1>
                    <UploadPoster :course="course"/>
                </div>
                <div class="info-text-wrapper">
                    <h1>Название курса <span class="obz">*</span></h1>
                    <div class="input-text">
                        <input type="text" placeholder="Название" 
                        v-model="catParams.title"
                        :class="applyInputStyleCourse(catParams.title)">
                    </div>
                </div>
                <div class="info-text-wrapper">
                    <h1>Категория <span class="obz">*</span></h1>
                    <div class="input-text">
                        <select @change="loadSub()" v-model="catParams.category"
                        :class="applyInputStyleCourse(catParams.category)">
                            <option v-for="categLk in listLkCategory" :key="categLk.id"
                            :value="categLk.id">
                            {{categLk.title}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="info-text-wrapper">
                    <h1>Подкатегория <span class="obz">*</span></h1>
                    <div class="input-text">
                        <select v-model="catParams.subcategory" :class="applyInputStyleCourse(catParams.subcategory)">
                            <option v-for="subCategLk in listLkSubCoteg" :key="subCategLk.id"
                            :value="subCategLk.id">
                            {{subCategLk.title}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="about-price">
                    <span>Если Вы не нашли нужной Категории или Подкатегории, напишите Нам на почту .... Мы обязательно добавим</span>
                </div>
                <div class="info-text-about-wrapper">
                    <h1>Описание Курса <span class="obz">*</span></h1>
                    <div class="input-text-about">
                        <textarea placeholder="Опишите Онлайн-курс" 
                        v-model="catParams.overview"
                        :class="applyInputStyleCourse(catParams.overview)"
                        ></textarea>
                    </div>
                </div>
                <div class="info-text-wrapper">
                    <h1>Подборки <span class="obz">*</span></h1>
                    <div class="input-text">
                        <select v-model="catParams.level" 
                        :class="applyInputStyleCourse(catParams.level)">
                            <option
                            v-for="levelLk in listLevelLk" :key="levelLk.id"
                            :value="levelLk.id"
                            >
                            {{levelLk.body}}</option>
                            
                        </select>
                    </div>
                </div>
                <div class="info-text-wrapper">
                    <h1>Уроки Курса <span class="obz">*</span></h1>
                    <UploadVideo :course="course"/>
                    
                </div>
                <!-- <div class="info-text-wrapper">
                    <h1>Дополнительные материалы</h1>
                    <UploadMaterials />
                    
                </div>
                <div class="info-text-wrapper">
                    <h1>Цена, руб. <span class="obz">*</span></h1>
                    <div class="input-text">
                        <input type="text" placeholder="Цена"
                        v-model="catParams.price"
                        :class="applyInputStyleCourse(catParams.price)">
                    </div>
                </div> -->
                <!-- <div class="about-price">
                    <span>По указанной цене посетители будут покупать Ваш курс, комиссия сервиса 30%, 
                        НО, если покупатель зарегестрировался по Вашей ссылке-приглашению, то комиссия
                         с продажи Ваших курсов не взимается!
                    </span>
                </div>  -->
            </div>
            <div class="save-btn-wrapper">
                <div class="lk-save-btn" @click="(catParams.title.length>0
                    && catParams.overview.length>0
                    && catParams.category>0
                    && catParams.subcategory>0
                    && catParams.level>0)? (callGoodWarnCourse(),scrollToTop()):callBadWarnCourse()">{{addOrEditCourseText}}
                </div>
                <div @click="deleteCourse(),scrollToTop()" 
                class="lk-delete-btn" v-show="deleteBtn">Удалить</div>
            </div>
        </div>

        <!--ADD COURSE END-->

        <!--PODPISKA START-->

    <div class="lk-presentation " v-show="pokPod">
        <div class="lk-present-row" >
            <div class="lk-present-choice">
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
                        <!-- <span class="lk-price" v-show="SecOnePr" style="text-decoration:line-through;">9.99$</span><br> -->
                        <!-- <span class="lk-discont-price" v-show="SecOnePr">7.99$</span><br> -->
                        <!-- <span class="price-disc">Без учета скидки промокода 20%</span> -->
                    </div><br>
                    <div class="selsect-cat">
                        <select>
                            <option>Информационные технологии</option>
                            <option>Иностранные языки</option>
                        </select>
                    </div>
                    <!-- <div class="podpiska-promo-wrapper">
                        <input type="text" placeholder="Введите промокод">
                        <div class="promo-btn" @click="FirOnePr=false, SecOnePr=true">Применить</div>
                    </div> -->
                </div>
                <div class="lk-presentation-btn-wrapper">
                    <div class="lk-presentation-btn">Перейти к оплате</div> 
                </div>
            </div>
            <div class="lk-present-choice">
                <div class="lk-present-text-wrapper">
                    <div class="lk-present-title">
                        <span>Хочу изучать ВСЕ</span>
                    </div>
                    <div class="lk-present-disc">
                        <span>
                           Подписка на все Категории без ограничений (Магазин курсов не входит в подписки)
                        </span>
                    </div>
                    <div class="podpiska-cat-price">
                        <span class="lk-price" v-show="FirAllPr">9.99$</span><br><br><br><br>
                        <!-- <span class="lk-price" v-show="SecAllPr" style="text-decoration:line-through;">14.99$</span><br>
                        <span class="lk-discont-price" v-show="SecAllPr">11.99$</span><br> -->
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

        <!--PODPISKA END-->

        <!--BANK ACCOUNT START-->

        <!-- <div class="bank-acc-wrapper" v-show="bankAcc">
            <div class="bank-disc">Вывод бонусов производится в конце каждого месяца по указанному номеру карты</div>
            <input class="bank-acc-input" type="text" placeholder="Номер Карты" v-model="billNumber">
            <div class="save-btn-wrapper">
                <div class="lk-save-btn">Сохранить</div>
            </div>
        </div> -->

        <!--BANK ACCOUNT END-->
        
    </div>
</div>




    <!--CONTENT END-->
</template>
<script>
import 'vue-awesome-notifications/dist/styles/style.css';

// import Upload from "../components/lk/Upload.vue";
import UploadPoster from "../components/lk/UploadPoster.vue";
// import UploadMaterials from "../components/lk/UploadMaterials.vue";
import UploadVideo from "../components/lk/UploadVideo.vue";
import { Swiper, SwiperSlide  } from 'vue-awesome-swiper'
import { Slide } from 'vue-burger-menu'
import { mapGetters } from 'vuex';
import 'swiper/css/swiper.css'
export default {
    name: 'Lk',
    title: 'Multiple slides per view',
    data(){
        return {
            listBoughtCourses:[],
            addOrEditCourseText:'Добавить',
            addCourseTitle:'Добавление курса',
            noBoughtCourses:false,
            noMyCourses:false,
            noPodpiski:false,
            billNumber:'',
            deleteBtn:false,
            listLevelLk:[],
            listLkSubCoteg:[],
            listLkCategory:[],
            selectedSub:undefined,
            listSubCourses:[],
            listMyCourses:[],
            subscribesList:[],
            bankAcc:false,
            FirOnePr:true,
            SecOnePr:false,
            FirAllPr:true,
            SecAllPr:false,
            podpiski:true,
            myCourses:false,
            aboutMe:false,
            bought:false,
            AddCourse:false,
            pokPod:false,
            user:{},
            course:{},
            swiperOption: {
                slidesPerView: "auto",
                spaceBetween: 5,
                freeMode:true,
            },
            catParams:{
                title:"",
                category:"5",
                subcategory:"",
                overview:"",
                level:"",
                owner:"",
                price:"",
                posterId:'',
                videoId:[],
                docsId:[],
            },
            userParams:{
                userName:'',
                geo:'',
                disc:'',
                // site:'',
                email:'',
            }
        }
    },
    components: {
        Slide,
        Swiper,
        SwiperSlide,
        // Upload,
        UploadPoster,
        // UploadMaterials,
        UploadVideo
    },
    async created(){
        this.$root.$refs.Lk=this
        
        this.loadUser()
        this.listLevelLk=await this.loadList("/api/levels")
        this.listLkCategory=await this.loadList("/api/categories")
        this.listLkSubCoteg=await this.loadList(`/api/allsubcategories/${this.catParams.category}`)
        this.listMyCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/courses`)
        this.listBoughtCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/purchases`)
        if (this.$store.getters.getIsAuthenticated==true)
        {
            this.subscribesList=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/followings`)
            this.loadlistSubCourses()
        }
        
        
        
    },
    computed:{
        baseUrl(){
        return this.$store.getters.getServerUrl
        },
        ...mapGetters([
            "getIsAuthenticated"
        ])
    },
    watch: {
        getIsAuthenticated: {
            deep: true,
            async handler() {
                this.listMyCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/courses`)
                this.listLevelLk=await this.loadList("/api/levels")
                this.listLkCategory=await this.loadList("/api/categories")
                this.listLkSubCoteg=await this.loadList(`/api/allsubcategories/${this.catParams.category}`)
                if (this.$store.getters.getIsAuthenticated==true)
                {
                    this.subscribesList=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/followings`)
                    this.listSubCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/following-courses`)
                }
            }
        }
    },
    methods:{
        removeFilepondFile(){
            this.$root.$refs.UploadPoster.removeFile()
            this.$root.$refs.UploadVideo.removeFile()
            this.$root.$refs.UploadMaterials.removeFile()
        },
        scrollToTop() {
            window.scrollTo(0,0)
        },
        async deleteCourse() { 
            if (this.$store.getters.getIsAuthenticated==true)
            {
                this.axios
                .delete(`${this.$store.getters.getServerUrl}/api/course/${this.course.id}/delete`)
                .then((result) => {
                    this.$awn.success('Курс успешно удален', this.$options)
                    this.myCourses=true
                    this.AddCourse=false
                    this.loadlistMyCourses()
                    this.scrollBehavior()
                    return result.data
                })
            }
        },
        toCatalogClicked(){
            this.$root.$refs.Catalog.loadListBy()
        },
        async loadsubscribesList() { 
            if (this.$store.getters.getIsAuthenticated==true)
            {
                this.subscribesList=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/followings`)
            }
        },
        async loadlistBoughtCourses() { 
            if (this.$store.getters.getIsAuthenticated==true)
            {
                this.listBoughtCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/purchases`)                
                if(this.listBoughtCourses.length==0){
                    this.noBoughtCourses=true
                }else{
                    this.noBoughtCourses=false
                }
            }
        },
        async loadlistSubCourses() { 
            if (this.$store.getters.getIsAuthenticated==true)
            {
                this.listSubCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/following-courses`)
                if(this.listSubCourses.length==0){
                    this.noPodpiski=true
                }else{
                    this.noPodpiski=false
                }
            }
        },
        async loadlistMyCourses() { 
            this.listMyCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/courses`)
            if(this.listMyCourses.length==0){
                this.noMyCourses=true
            }else{
                this.noMyCourses=false
            }
        },
        
        callGoodWarnCourse: function () { 
            this.patchOrPostCourse()
            if(this.addOrEditCourseText=='Добавить'){
                this.$awn.success('Курс успешно добавлен', this.$options)
            }else{
                this.$awn.success('Курс успешно обновлен', this.$options)
            }
            this.catParams.title=''
            this.catParams.overview=''
            this.catParams.price=''
            this.myCourses=true
            this.AddCourse=false
            this.loadlistMyCourses()
        },
        callBadWarnCourse: function () { 
            this.$awn.warning('Заполните обязательные поля', this.$options)
        },
        callGoodWarnProfile: function () { 
            this.patchProfile()
            this.$awn.success('Информация обновлена', this.$options)
        },
        applyInputStyleCourse: function (targetInputCourse) { 
            return [(targetInputCourse) ? ('input-has-value')
             : ('input-no-value')]
        },
        loadSub:async function(){
            this.listLkSubCoteg=await this.loadList(`/api/allsubcategories/${this.catParams.category}`)
        },
        async loadList(pathUrl)
		{
            // const base = this.$store.getters.getBase
            // const axios = this.axios.create(base)
			// const listA = await axios
            // .get(`${pathUrl}`)
            // .then(response => {
            //     return response.data
            // })

            let res = await this.$store.dispatch('authenticatedRequest', {
                method:'get',
                path: pathUrl,
            })

            console.log(res.status)

            return res.data
        },
        async loadUser()
        {
            this.user=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}`)
            this.userParams.userName=this.user.username,
            this.userParams.geo=this.user.geo,
            this.userParams.disc=this.user.description,
            // this.userParams.site=this.user.site,
            this.userParams.email=this.user.email
        },
        // async loadCourse()
        // {
        //     this.course=await this.loadList(`/api/course/${this.$route.params.id}`)
            
        // },
        courseClicked:async function(courseSub){
            this.$root.$refs.Presentation.loadCourseByClick(courseSub.id)
        },
        authorClicked:async function(courseSub){
            this.$root.$refs.Author.loadAuthorByClick(courseSub.owner)
        },
        SubClicked:async function(sub){
            this.listSubCourses=await this.loadList(`/api/accounts/profile/${sub.custom_user.id}/courses`)
        },
        podpiskiLkClicked(){
            
            this.$root.$refs.Lk.podpiski=true
            this.$root.$refs.Lk.myCourses=false
            this.$root.$refs.Lk.aboutMe=false
            this.$root.$refs.Lk.AddCourse=false
            this.$root.$refs.Lk.bankAcc=false
        },
        loadPosterId(value){
            this.catParams.posterId = value
        },
        loadVideoId(value){
            this.catParams.videoId.push(value)
        },
        loadDocsId(value){
            this.catParams.docsId.push(value)
        },
        patchOrPostCourse: function () { 
            if(this.addOrEditCourseText=='Добавить'){
                this.postCourse()
                
            }else{
                this.patchCourse()
            }
        },
        postCourse()
        {
            const params={
                poster:this.catParams.posterId,
                videos:this.$root.$refs.UploadVideo.lessonList,
                docs:this.catParams.docsId,
                category:this.catParams.category,
                subcategory:this.catParams.subcategory,
                overview:this.catParams.overview,
                title:this.catParams.title,
                level:this.catParams.level,
                price:this.catParams.price,
                owner:this.$store.getters.getId
            }
            const base = this.$store.getters.getBase
            const axios = this.axios.create(base)
            axios
            .post(`${this.$store.getters.getServerUrl}/api/course/create`, params)
            .then((result) => {
                this.loadlistMyCourses()
                return result.data
                })
            
        },
        patchCourse()
        {
            const params={
                poster:this.catParams.posterId,
                videos:this.$root.$refs.UploadVideo.lessonList,
                docs:this.catParams.docsId,
                category:this.catParams.category,
                subcategory:this.catParams.subcategory,
                overview:this.catParams.overview,
                title:this.catParams.title,
                level:this.catParams.level,
                price:this.catParams.price,
                owner:this.$store.getters.getId
            }
            const base = this.$store.getters.getBase
            const axios = this.axios.create(base)
            axios
            .put(`${this.$store.getters.getServerUrl}/api/course/${this.course.id}/put`, params)
            .then((result) => {
                this.loadlistMyCourses()
                return result.data
                })
        },
        patchProfile()
        {
            const params={
                // poster:this.posterId,
                username:this.userParams.userName,
                email:this.userParams.email,
                geo:this.userParams.geo,
                // site:this.userParams.site,
                description:this.userParams.disc,
            }
            this.axios
            .put(`${this.$store.getters.getServerUrl}/api/accounts/profile/${this.user.custom_user}`, params)
            .then((result) => result.data)
        },
        loadForEditCourse: async function(courseMy){
            
            this.course=await this.loadList(`/api/course/${courseMy.id}`)
            const file={
                source:this.course.photo,
                options:{
                    type: 'local',
                }
            }
            this.$root.$refs.UploadPoster.myFiles.push(file)
            this.catParams.title=this.course.title
            this.catParams.overview=this.course.overview
            this.catParams.category=this.course.category
            this.catParams.subcategory=this.course.subcategory
            this.catParams.price=this.course.price
            this.catParams.level=this.course.level
            this.loadSub()
            // if(this.course.level==1){
            //     this.catParams.level='Для детей'
            // }else if(this.course.level==2){
            //     this.catParams.level=this.course.level
            // }else{
            //     this.catParams.level='Для продвинутых'
            // }
            // this.sub=await this.loadList(`/api/category/${courseMy.category}`)
        }
        
    }
}
</script>
<style scoped>
@import "../assets/css/user-lk.css";
@import "../assets/css/author.css";
</style>