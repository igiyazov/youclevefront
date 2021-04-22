<template>
    <form class="tab-form">
        <div class="box-input" v-bind:class="{'focus':isFocusEmail}">
            <label class="labelText">Введите E-mail</label>
            <input class="input" type="email" required=""
            v-on:focus="isFocusEmail=true" v-on:blur="onBlur" 
            v-model="emailAut">
        </div>
        <div class="box-input" v-bind:class="{'focus':isFocusPass}">
            <label class="labelText">Введите пароль</label>
            <input class="input" type="password" required=""
            v-on:focus="isFocusPass=true" v-on:blur="onBlur" 
            v-model="passwordAut">
        </div>
        <a type="submit" class="button" @click="callGoodWarnSignIn()">Войти</a>
        <a href="#">Я забыл свой E-mail или пароль</a>
    </form>
</template>