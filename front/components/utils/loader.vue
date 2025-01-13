<template>
    <div class="fixed top-0 left-0 h-screen w-full backdrop-blur-lg flex items-center justify-center">
        <div class="text-center">
            <h1 class="mb-4">Chargement...</h1>
            <UMeter :value="percentage" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    percentage: {
        type: Number,
        required: true
    }
})
</script>
