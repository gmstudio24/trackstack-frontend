<template>
    <nav class="p-2 bg-neutral-900 rounded-r-lg">
        <div class="pb-2">
          <IconButton role="button" tabindex="0" @keydown.enter="toggleExpanded()" @click="toggleExpanded()">
            <Bars3Icon class="size-6" />
          </IconButton>
        </div>
        <div>
            <NavItem
                @click="hide()"
                v-for="option in props.options"
                :key="option.to"
                :to="option.to"
                :icon="option.icon"
                :label="option.label"
                :expanded="expanded"
            />
        </div>
    </nav>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/buttons/Button.vue";
import { ref } from "vue";
import NavItem from "@/components/nav/NavItem.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";

interface NavOption {
    to: string;
    icon?: string;
    label: string;
}

const expanded = ref(false);

const props = defineProps<{
    options: NavOption[];
}>();

const toggleExpanded = () => {
    expanded.value = !expanded.value;
};

const hide = () => {
    expanded.value = false;
};
</script>
