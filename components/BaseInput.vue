<template>
    <div class="flex flex-col items-start gap-1">
        <label v-if="label" :for="nameId">
            {{ label }}
            <span
                class="text-alert dark:text-alert-light"
                v-if="required"
            >*</span>
        </label>
        <input
            class="shadow border-2 border-main-200 dark:border-main-600
                text-main-700 dark:text-main-300 p-2 rounded font-text
                focus:border-primary focus:outline focus:outline-primary
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200 w-full"
            :class="error ?
                'text-alert dark:text-alert-light border-alert dark:border-alert-light'
                : ''"
            :id="nameId"
            :name="nameId"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"

            @input="$emit('update:modelValue', $event.target.value)"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
        >
        <span
            v-if="error"
            class="font-text text-error dark:text-error-light"
        >{{ error }}</span>
    </div>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    const props = defineProps({
        label: {
            type: String,
            default: null
        },
        nameId: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String,
            default: 'text',
            validator: (value) => [
                'text',
                'password',
                'email',
                'number',
                'tel',
                'url',
                'search',
                'date',
                'datetime-local', 
                'time',
                'month',
                'week',
                'color'
            ].includes(value)
        },
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        }
    })

    defineEmits(['update:modelValue', 'blur', 'focus'])
</script>