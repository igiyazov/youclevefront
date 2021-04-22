<template>
        <div class="container ">
            <div class="row ">
                <div class="col-sm-10 login-box">
                    <div class="row">
                        <div class="col-lg-8 col-md-7 log-det">
                            <div class="small-logo">
                                <i class="fab fa-asymmetrik"></i> Style Login
                            </div>
                            <h2>Sign in to Smarteyeapps</h2>
                            <div class="row">
                                <ul>
                                    <li><i class="fab fa-facebook-f"></i></li>
                                    <li><i class="fab fa-twitter"></i></li>
                                    <li><i class="fab fa-linkedin-in"></i></li>
                                </ul>
                            </div>
                            <div class="row">
                                <p class="small-info">or use your email account</p>
                            </div>


                            <div class="text-box-cont">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input v-model="params.email" type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
                                </div>
                                 <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
                                    </div>
                                    <input v-model="params.password" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
                                </div>
                                <div class="row">
                                    <p class="forget-p">Forget Password ?</p>
                                </div>
                                <div class="input-group center mb-3">
                                    <button v-on:click="formSubmit" class="btn btn-success btn-round">SIGN IN</button>
                                </div>    
                            </div>
                            


                        </div>
                        <div class="col-lg-4 col-md-5 box-de">
                            <div class="ditk-inf">
                                <h2 class="w-100">Din't Have an Account </h2>
                                <p>Simply Create your account by clicking the Signup Button</p>
                                <a href="signup.html">
                                <button type="button" class="btn btn-outline-light">SIGN UP</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:'Signin',
    data(){
        return{
            response:null,
            params:{
                email:"",
                password:""
            }
        }        
    },
    methods: {
        formSubmit(){
            console.log(this.params)
            this.axios
            .post(`${this.$store.getters.getServerUrl}/api/accounts/user/login/`)
            .then(response => console.log(response))
        }
    }
}
</script>

<style scoped>
    /*@import "../assets/forms/assets/css/bootstrap.min.css";
    @import "../assets/forms/assets/css/fontawsom-all.min.css";
    @import "../assets/forms/assets/css/style.css";*/
</style>

