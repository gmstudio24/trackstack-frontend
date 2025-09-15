<template>
  <div>
    <a
      :href="props.to"
      @click.native.prevent="clicked"
      :class="{
        '!border-primary-700 !text-primary-500 !bg-primary-900':
          $route.path.includes(props.to),
      }"
      class="block no-underline text-inherit flex flex-row items-center border-neutral-800 text-neutral-500 p-2 mx-2 my-4 rounded-lg border-1 hover:scale-105 hover:!bg-primary-500 hover:!border-primary-400 hover:!text-primary-100 transition-all"
    >
      <div class="p-2">
        <Icon :name="props.icon" class="size-6" />
      </div>
      <div ref="navItem">
        <div v-if="props.expanded" class="text-md font-bold mx-4">
          {{ props.label }}
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import {
  DialogButtonsType,
  DialogResponse,
  useDialog,
} from "@/composables/useDialog";
import { useSafeLock } from "@/composables/useSafeLock";
import autoAnimate from "@formkit/auto-animate";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Icon from "../Icon.vue";

const emit = defineEmits(["click"]);

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "home",
  },
  label: {
    type: String,
    default: "",
  },
  expanded: {
    type: Boolean,
    default: false,
  },
});

const { isLocked, unlock } = useSafeLock();
const { openDialog } = useDialog();
const { push } = useRouter();

const clicked = () => {
  console.log("clicked");
  if (isLocked()) {
    openDialog(
      "Are you sure?",
      "You will lose all of your changes.",
      DialogButtonsType.YES_NO
    ).then((response) => {
      if (response === DialogResponse.YES) {
        push(props.to);
        emit("click");
        unlock();
      }
    });
  } else {
    push(props.to);
    emit("click");
  }
};

const navItem = ref(null);

onMounted(() => {
  if (navItem.value) autoAnimate(navItem.value, {});
  else console.warn("navItem is not defined");
});
</script>
