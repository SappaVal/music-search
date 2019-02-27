<template>
    <div class="signup">
        <h3>Inscrivez-vous</h3>
        <md-field md-clearable>
            <label>Email</label>
            <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
            <label>Mot de passe</label>
            <md-input v-model="mdp" type="password"></md-input>
        </md-field>
        <md-field>
            <md-button class="md-raised md-primary" v-on:click="signUp">Valider</md-button>
            <span class="md-helper-text">Retour à la <router-link to="/">connexion</router-link></span>
        </md-field>
    </div>
</template>

<script>
    import * as firebase from 'firebase/app';
    import 'firebase/database';

    export default {
        name: 'signUp',
        data() {
            return {
                email: '',
                mdp: ''
            }
        },
        methods: {
            signUp: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.mdp).then(
                    (user) => {
                        alert('Compte créé !');
                        this.$router.replace('accueil');
                    },
                    (err) => {
                        alert('Essaye encore ... ' + err.message);
                    }
                );
            }
        }
    }
</script>

<style scoped>
    div {
        width: 350px;
    }
</style>