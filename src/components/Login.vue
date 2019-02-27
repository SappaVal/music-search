<template>
    <div class="login">
        <h3>Connectez-vous</h3>
        <md-field md-clearable>
            <label>Email</label>
            <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
            <label>Mot de passe</label>
            <md-input v-model="mdp" type="password"></md-input>
        </md-field>
        <md-field>
            <md-button class="md-raised md-primary" v-on:click="login">Connexion</md-button>
            <p>Pas encore de compte ? <router-link to="/signUp">Inscrivez-vous</router-link></p>
        </md-field>
    </div>
</template>

<script>
    import * as firebase from 'firebase/app';
    import 'firebase/database';

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                mdp: ''
            }
        },
        methods: {
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.mdp).then(
                    (user) => {
                        this.$router.replace('accueil');
                    },
                    (err) => {
                        alert('Dommage... ' + err.message);
                    }
                );
            }
        }
    }
</script>

<style>
    p {
        margin-top: 20px;
        font-size: 13px;
    }
</style>