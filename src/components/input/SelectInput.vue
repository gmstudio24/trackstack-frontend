<template>
  <InputWrapper :label-id="id" :label="props.label">
    <div class="relative" ref="modalRef">
      <div
        role="button"
        aria-haspopup="listbox"
        :aria-expanded="opened"
        tabindex="0"
        :aria-labelledby="id"
        v-bind="opened ? {'aria-activedescendant': activeDescendant} : {}"
        @click="toggle"
        @keydown.enter="toggle"
        class="focus:outline-2 input-field flex items-center focus-within:text-primary-500 cursor-pointer"
        :class="{'cursor-not-allowed pointer-events-none text-neutral-500': props.disabled}"
      >
        <div class="flex-1 mx-2">
          {{
            $t(
              options.find((option) => option.value === model)?.label ??
                model.toString()
            )
          }}
        </div>
        <div>
          <Icon name="chevron-down" class="size-4" />
        </div>
      </div>
      <Transition name="fadescale" mode="out-in">
        <div
          v-if="opened"
          class="absolute z-5 t-0 w-full rounded-lg bg-neutral-900 border-1 border-neutral-800 overflow-hidden shadow-md"
        >
          <div
            role="listbox"
            tabindex="-1"
            @keydown.up.prevent="up"
            @keydown.down.prevent="down"
            @keydown.enter.prevent="select(focused ?? model)"
          >
            <div
              v-for="option in props.options"
              :id="`${id}_${option.value}`"
              role="option"
              tabindex="-1"
              :aria-selected="model === option.value"
              @click="select(option.value)"
              :ref="
                (el) => {
                  optionRefs[option.value] = el;
                }
              "
              class="px-4 py-2 cursor-pointer hocus:bg-neutral-800 text-neutral-400 hocus:text-primary-500 hocus:!outline-none"
              :class="{
                'text-primary-500 bg-neutral-800': focused === option.value,
              }"
            >
              {{ $t(option.label) }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </InputWrapper>
</template>

<script setup lang="ts">
import {computed, nextTick, ref, useId, watch} from "vue";
import InputWrapper from "./InputWrapper.vue";
import Icon from "../Icon.vue";
import {onClickOutside} from "@vueuse/core";

const id = useId();

const activeDescendant = computed(() =>
  focused.value ? `${id}_${focused.value}` : `${id}_${model.value}`
);

const props = defineProps({
  options: {
    type: Array as () => Array<{
      value: string | number;
      label: string;
    }>,
    required: true,
  },
  default: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const modalRef = ref<any>(null);

onClickOutside(modalRef, () => {
  hide();
});

const optionRefs = ref<Record<string, any>>({});

const focused = ref<null | string | number>(null);

const opened = ref(false);

const select = (id: string | number) => {
  hide();
  model.value = id;
  focused.value = id;
};

const focus = (elementId: string | number | null) => {
  if (elementId) {
    const el = optionRefs.value[elementId].focus();
    focused.value = elementId;
  }
};

const up = () => {
  const current = props.options.findIndex(
    (option) => option.value === focused.value
  );
  const next = current === 0 ? props.options.length - 1 : current - 1;
  focus(props.options[next].value);
};

const down = () => {
  const current = props.options.findIndex(
    (option) => option.value === focused.value
  );
  const next = current === props.options.length - 1 ? 0 : current + 1;
  console.log("next", next);
  focus(props.options[next].value);
};

const expand = () => {
  opened.value = true;
};

const hide = () => {
  opened.value = false;
};

const toggle = () => {
  opened.value = !opened.value;
};

watch(opened, (newValue) => {
  if (newValue) {
    nextTick(() => {
      focused.value = model.value;
      focus(focused.value);
    });
  }
});

const model = defineModel<string | number>({
  type: String,
  default: "",
});

watch(
  () => props.options,
  (newOptions) => {
    optionRefs.value = {};
    // On the change of options, the model value behaves like:
    // 1. If the model value is in the options, it remains unchanged.
    // 2. if there is a default value that matches one of the options, set it
    // 3. If there is no match, set the model to the first option's value.

    if (newOptions.some((option) => option.value === model.value)) {
      return; // Model value is already valid
    }
    if (
      props.default &&
      newOptions.some((option) => option.value === props.default)
    ) {
      select(props.default); // Set to default if it matches an option
    } else if (newOptions.length > 0) {
      select(newOptions[0].value);
    }
  },
  {immediate: true, deep: true}
);
</script>

<style scoped></style>
