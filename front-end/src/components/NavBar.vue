<template>
    <div id="nav-bar">
        <router-link to="/feed" id="contents-link">
            <h1>DynamicTN</h1>
        </router-link>
        <router-link to="/account" id="account-link">
            <button>Account</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style scoped>
#nav-bar {
    border-bottom: 1px solid #ddd;
    height: 75px;
    width: 100%;
}

#contents-link {
    text-align: center;
    display: block;
    color: black;
    font-size: 22px;
    left: 32px;
    position: absolute;
    top: 16px;
    text-decoration: none;
}

#contents-link h1 {
    margin: 0;
}

#account-link {
    position: absolute;
    right: 16px;
    top: 16px;
}
</style>
