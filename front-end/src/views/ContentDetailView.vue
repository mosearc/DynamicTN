<template>
    <div id="page-wrap">
        <div id="img-wrap">
            <img v-bind:src="content.imageUrl" />
        </div>
        <div id="content-details">
            <h1>{{ content.title }}</h1>
            <h3 id="location">📍{{ content.location }}</h3>
            <p>{{ content.description }}</p>
            <button id="add-vote">✔️</button>
            <button id="add-vote">❌</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ContentDetailView',
    data() {
        return {
            content: [],
        };
    },
    async created() {
        const result = await axios.get(`/api/contents/${this.$route.params.id}`);
        const content = result.data;
        this.content = content;
    }
};
</script>

<style scoped>
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

#add-vote {
    width: 100%;
    margin: 1px;
}

#location {
    position: absolute;
    top: 24px;
    right: 16px;
}
</style>
