<template>
    <div class="flex flex-col items-start gap-1">
        <label v-if="label" :for="nameId">
            {{ label }}
            <span
                class="text-alert dark:text-alert-light"
                v-if="required"
            >*</span>
        </label>
        <div class="w-full relative">
            <textarea
                class="shadow border-2 border-main-200 dark:border-main-800
                    placeholder:text-main-500 dark:placeholder:text-main-400
                    text-main-900 dark:text-main-100 p-2 rounded font-text
                    focus:border-primary focus:outline focus:outline-primary
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors duration-200 w-full resize-y"
                :class="error ?
                    'text-alert dark:text-alert-light border-alert dark:border-alert-light'
                    : ''"
                :id="nameId"
                :name="nameId"
                :rows="rows" :cols="cols"
                :value="modelValue"
                :placeholder="placeholder"
                :maxlength="maxlength"
                :required="required"
                :disabled="disabled"

                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('blur', $event)"
                @focus="$emit('focus', $event)"
            />
            <span
                v-if="maxlength"
                class="text-sm text-main-500 dark:text-main-400 self-end z-2 absolute
                    bottom-2 right-2 pointer-events-none font-title"
            >
                {{ charCount }}/{{ maxlength }}
            </span>
        </div>

        <span
            v-if="error"
            class="font-text text-alert dark:text-alert-light"
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
        rows: {
            type: Number,
            default: null,
            required: true
        },
        cols: {
            type: Number,
            default: null,
            required: true
        },
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number,
            default: null
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

    // LÓGICA PRINCIPAL --------------------------------------------------------
    const charCount = computed(() => props.modelValue.length)
</script>