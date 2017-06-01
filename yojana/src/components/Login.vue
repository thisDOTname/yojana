<template>
<div>
<section id="lg--section">
    <div class="lg--bottom-triangle primary-color"></div>
	<!-- // HEADER -->
    <header class="primary-text-color">
        <h1 class="accent-text-color">WELCOME TO YOJNA</h1>
        <h4 class="accent-text-color">PLAN YOUR PROJECTS</h4>

        <div class="wrapper">
            <div class="lg--box-container primary-color">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="content">
                <div class="lg--box-heading accent-text-color">Log-in</div>
                <v-container fluid>
                    <v-layout row>
                    <v-flex xs12>
                        <v-text-field
                        name="username"
                        label="Username"
                        id="username"
                        ></v-text-field>
                    </v-flex>
                    </v-layout>
                    <v-layout row>
                    <v-flex xs12>
                        <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        ></v-text-field>
                    </v-flex>
                    </v-layout>
                    <div row class="text-xs-center">
                        <v-btn round outline light class="accent-text-color">Log-in</v-btn>
                    </div>
                </v-container>
                </div>
            </div>
        </div>
    </header>
</section>
</div>
</template>

<script src="./login.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/css/login.css';
</style>
