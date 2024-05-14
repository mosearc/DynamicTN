<template>
    <div id="page-wrap">
        <div id="img-wrap">
            <img v-bind:src="content.imageUrl" />
        </div>
        <div id="content-details">
            <h1>{{ content.title }}</h1>
            <p id="location">📍{{ content.location }}</p>
            <p>{{ content.description }}</p>
			<div v-if="logged">
            <button class="option">✔️</button>
            <button class="option">❌</button>
			</div>
				<router-link to="/">
					<button class="option">Indietro</button>
				</router-link>
			</div>
    </div>
</template>

<script>
import axios from 'axios';
import {logged, setLogged} from "@/global";

export default {
    name: 'ContentDetailView',
    data() {
        return {
            content: [],
        };
    },
    async created() {
        const result = await axios.get(`http://localhost:3000/posts/${this.$route.params.id}`);
        const content = result.data.post;
        this.content = content;
    }
};
</script>

<style>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
}

#img-wrap {
    text-align: center;
}

img {
    width: 400px;
    max-height: 100%;
}

#content-details {
    padding: 16px;
    position: relative;
}

#description {
    position: absolute;
    top: 24px;
    right: 16px;
}

button.option {
    width: 100%;
    margin: 1px;
}

#location {
    position: absolute;
    top: 24px;
    right: 16px;
}
</style>
