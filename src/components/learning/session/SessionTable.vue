<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :page="page"
            :items-per-page="itemsPerPage"
            :items="$store.getters.getLearningSessions"
            :server-items-length="serverItemsLength"
            @update:page="onPageUpdate"
        ></v-data-table>
    </v-container>
</template>

<script>


    export default {
        name: "SessionList",
        data() {
            return {
                headers: [
                    {text: 'Id', value: 'id', sortable: true},
                    {text: 'Status', value: 'status', sortable: true},
                    {text: 'Target', value: 'root', sortable: true},
                    {text: 'Strategy', value: 'strategy_name', sortable: true},
                    {text: 'Started', value: 'start_datetime', sortable: true},
                    {text: 'Finished', value: 'finish_datetime', sortable: true},
                    {text: '*', sortable: false},
                ],
                page: 1,
                itemsPerPage: 15,
                serverItemsLength: -1,
            }
        },
        methods: {
            async fetchSessions() {
                const data = await this.$store.dispatch(
                    'fetchSessionList',
                    [this.page, this.itemsPerPage, {}]
                );
                this.serverItemsLength = data.count;
            },
            async onPageUpdate(newPage) {
                this.page = newPage;
                await this.fetchSessions();
            }
        },
        async mounted() {
            await this.fetchSessions();

        }
    }
</script>

<style scoped>

</style>