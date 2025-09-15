<template>
  <Card :title="$t('common.actions')">
    <Button class="m-1" primary icon="document-check" @click="saveCall"
      >{{ $t('common.save') }}</Button
    >
    <Button class="m-1" icon="x-mark" @click="exitCall">{{$t('common.exit')}}</Button>
    <Button class="m-1" icon="trash" @click="deleteCall">{{ $t('common.delete') }}</Button>
  </Card>
  <Card
    v-for="fieldgroup in props.setup?.fieldgroups"
    :key="fieldgroup.name"
    :title="fieldgroup.label"
  >
    <div class="flex gap-2">
      <component
        :is="inputMap[field.type] ?? TextInput"
        v-for="field in fieldgroup.fields"
        :label="field.label"
        :key="field.name"
        :disabled="field.readonly"
        v-model="(values ?? {})[field.name]"
        @change="onValueChange"
        @setlocation="(id: string) => {setLocation(id, field.baseName)}"
      >
        {{ field.label }}
      </component>
    </div>
  </Card>
  <slot></slot>
</template>

<script setup lang="ts">
import Card from "../blocks/Card.vue";
import TextInput from "../input/TextInput.vue";
import Button from "../buttons/Button.vue";
import {
  DialogButtonsType,
  DialogResponse,
  useDialog,
} from "@/composables/useDialog";
import {onMounted, ref} from "vue";
import {useSafeLock} from "@/composables/useSafeLock";
import {useRouter} from "vue-router";
import LocationSelector from "./LocationSelector.vue";
import DataTable from "../datatable/DataTable.vue";

const {openDialog} = useDialog();

const {lock, unlock, isLocked} = useSafeLock();

const {push} = useRouter();

const values = defineModel<{[key: string]: string | number}>({});

const setLocation = (id: string, field = "location_id") => {
  if (!values.value) return;
  console.log(field, id);
  values.value[field] = id;
};

const saveCall = () => {
  if (props.save)
    props
      .save()
      .then((res: any) => {
        unlock();
      })
      .catch(() => {
        console.log("Cannot save");
      });
};

const onValueChange = (value: any) => {
  lock();
};

const exitCall = () => {
  const makeExit = () => {
    unlock();
    goBack();
  };

  if (!isLocked()) {
    makeExit();
    return;
  }

  openDialog(
    "Are you sure?",
    "It will discard all of the changes.",
    DialogButtonsType.YES_NO
  ).then((response) => {
    switch (response) {
      case DialogResponse.YES:
        if (props.exit) props.exit();
        makeExit();
        break;
      case DialogResponse.NO:
        break;
    }
  });
};

const deleteCall = () => {
  openDialog(
    "Are you sure?",
    "It will delete the item.",
    DialogButtonsType.YES_NO
  ).then((response) => {
    switch (response) {
      case DialogResponse.YES:
        if (props.delete) props.delete();
        unlock();
        goBack();
        break;
      case DialogResponse.NO:
        break;
    }
  });
};

const goBack = () => {
  if (props.routeBack) push(props.routeBack);
};

const inputMap: Record<string, any> = {
  text: TextInput,
  textarea: TextInput,
  date: TextInput,
  location: LocationSelector,
};

type editorSetup = {
  fieldgroups: Array<{
    name: string;
    label: string;
    fields: Array<{
      name: string;
      label: string;
      type: string;
      baseName?: string;
      readonly?: boolean;
    }>;
  }>;
};
const props = defineProps({
  setup: {
    type: Object,
  },
  exit: {
    type: Function,
  },
  save: {
    type: Function,
  },
  delete: {
    type: Function,
  },
  routeBack: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
