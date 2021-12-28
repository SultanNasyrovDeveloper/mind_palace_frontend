<template>
    <v-breadcrumbs
            :items="getItems()"
            class="ma-0 pa-0 text-caption"
    >
        <template v-slot:item="{ item }">
            <router-link
                  :to="{name: 'node.detail', params: {nodeId: item.id}}"
                  class="text-decoration-none"
            >
                <span 
                        class="body-2 grey--text text--darken-1 "
                >{{ item.text }}</span>
            </router-link>

        </template>
    </v-breadcrumbs>
</template>

<script>
    export default {
        name: "Breadcrumbs",
        props: ['items'],
        methods: {
            getItems() {
                if (!this.items) return [];
                return this.items.map(item => {
                    return {
                        id: item.id,
                        text: item.text,
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>