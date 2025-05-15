<template>
    <div class="flex flex-col items-start gap-1">
        <p v-if="formLabel">
            {{ formLabel }}
            <span
                class="text-alert dark:text-alert-light"
                v-if="isRequired"
            >*</span>
        </p>
        <v-select
            v-bind="$attrs"
            :components="customComponents"
            :multiple="multiple"
            :class="['vs-select-tailwind',
                multiple ? 'vs_multiple' : ''
            ]"
        >
            <template #deselect="{ deselect }">
            <Icon 
                name="lucide:circle-x" 
                @click="deselect"
            />
            </template>
            
            <template #open-indicator="{ attributes }">
            <Icon 
                name="lucide:chevron-down" 
                v-bind="attributes"
            />
            </template>
            
            <template v-for="(_, slot) in $slots" #[slot]="scope">
                <slot :name="slot" v-bind="scope" />
            </template>
        </v-select>
    </div>
</template>

<script setup>
    import { h } from 'vue'
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css'

    const Icon = resolveComponent('Icon')

    const customComponents = {
        Deselect: {
            render: () => h(resolveComponent('Icon'), { 
                name: 'lucide:circle-x',
            })
        },
        OpenIndicator: {
            render: () => h(resolveComponent('Icon'), { 
                name: 'lucide:chevron-down',
            })
        }
    }

    const props = defineProps({
        multiple: {
            type: Boolean,
            default: false
        },
        formLabel: {
            type: String,
            default: null
        },
        isRequired: {
            type: Boolean,
            default: false
        }
    })
</script>

<style>
    @reference 'assets/css/main.css';

    .vs-select-tailwind {
        @apply flex items-center justify-center gap-2 w-full h-auto
    }

    .vs-select-tailwind .vs__dropdown-toggle {
        @apply w-full shadow p-2 border-2 border-main-200 dark:border-main-600 font-text
        flex items-center justify-center
    }

    .vs-select-tailwind.vs_multiple .vs__dropdown-toggle {
        @apply min-h-12 h-auto
    }

    .vs-select-tailwind:not(.vs_multiple) .vs__dropdown-toggle {
        @apply min-h-0 h-12
    }

    .vs-select-tailwind .vs__selected {
        @apply font-text text-main-900 dark:text-main-100
    }

    .vs_multiple .vs__selected {
        @apply bg-primary/20 dark:bg-primary-light/20 text-primary-dark dark:text-primary
        border border-primary-dark dark:border-primary rounded-2xl font-title py-1 px-2 text-sm
    }

    .vs-select-tailwind .vs__dropdown-toggle .vs__selected-options {
        @apply h-full overflow-hidden text-nowrap flex items-center justify-start
    }

    .vs-select-tailwind .vs__dropdown-toggle .vs__actions {
        @apply flex items-center h-full text-main-900 dark:text-main-100
    }

    .vs-select-tailwind	.vs__dropdown-menu {
        @apply absolute z-10 w-full mt-1 bg-main-100 dark:bg-main-900 shadow rounded py-1 border
        border-main-200 dark:border-main-800 max-h-60 overflow-auto;
    }

    .vs-select-tailwind .vs__search {
        @apply h-auto overflow-hidden text-nowrap
    }

    .vs-select-tailwind .vs__selected, .vs-select-tailwind .vs__dropdown-option {
        @apply font-text text-main-900 dark:text-main-100
    }

    .vs-select-tailwind .vs__dropdown-option--highlight {
        @apply bg-primary/20 dark:bg-primary-light/20 text-primary-dark dark:text-primary;
    }
</style>