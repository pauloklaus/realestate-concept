<template>
    <div class="footer-bar p-3 bg-light text-muted text-center text-uppercase">
        {{ appName }} &copy; {{ (new Date()).getFullYear() }} &bullet; criado por <a :href="devSite">{{ devName }}</a> &bullet; <a :href="githubSite">github</a>
    </div>
</template>

<script>
export default {
    computed: {
        appName() {
            return process.env.VUE_APP_NAME;
        },
        githubSite() {
            return process.env.VUE_APP_GITHUB;
        },
        devSite() {
            return process.env.VUE_APP_DEV_SITE;
        },
        devName() {
            return process.env.VUE_APP_DEV;
        }
    }
}
</script>

<style lang="scss" scoped>
.footer-bar {
    font-size: 0.7rem;
}
</style>
