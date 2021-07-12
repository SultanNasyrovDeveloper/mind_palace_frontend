<template>
    <v-menu offset-y left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn plain v-on="on" v-bind="attrs">
                <v-icon small class="mr-2">mdi-{{ getTypeIcon(value) }}</v-icon>
                {{ value }}
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item
                    v-for="(type, index) in types"
                    :key="index"
                    @click="type[0] !== value ? $emit('change', { type: type[0] }) : null"
            >
                <v-list-item-avatar>
                    <v-icon small>mdi-{{ getTypeIcon(type[0]) }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    <span class="text-caption">{{ type[0] }}</span>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    const nodeTypeIconMap = {
        text: 'calendar-text',
        chess: 'chess-queen',
        code: 'code-tags',
        translation: 'web',
        microexpression: 'emoticon-excited-outline'

    };

    export default {
        name: "NodeType",
        props: ['value', 'types'],
        data() {
            return {
                nodeTypeIconMap
            }
        },
        methods: {
            getTypeIcon(type) {
                return this.nodeTypeIconMap[type]
            }
        }
    }
</script>

<style scoped>

</style>