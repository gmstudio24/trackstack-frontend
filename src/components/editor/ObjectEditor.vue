<template>
  <Card :title="$t('common.actions')">
    <Button class="m-1" primary icon="document-check" @click="saveCall"
      >{{ $t('common.save') }}</Button
    >
    <Button class="m-1" icon="x-mark" @click="exitCall">{{$t('common.exit')}}</Button>
    <Button v-if="!props.isNew" class="m-1" icon="trash" @click="deleteCall">{{ $t('common.delete') }}</Button>
  </Card>
  <Card
    v-for="fieldgroup in props.setup?.fieldgroups"
    :key="fieldgroup.name"
    :title="fieldgroup.label"
    expandable
  >
    <div v-if="fieldgroup.description" class="ml-1 text-sm text-neutral-500">{{ $t(fieldgroup.description) }}</div>
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
import { useEditor } from "@/composables/useEditor";
import { useAlert } from "@/composables/useAlert";

const {safeExit} = useEditor();

const {openDialog} = useDialog();

const {add} = useAlert()

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
        add({type: 'success', message: 'common.saved', title: 'common.success'})
        unlock();
      })
      .catch(() => {
        add({type: 'error', message: 'common.cannotSave', title: 'common.error'})
      });
};

const onValueChange = (value: any) => {
  lock();
};

const exitCall = () => {
  safeExit().then((canExit) => {
    if (canExit) {
      if (props.exit) props.exit();
      goBack();
    }
  })
};

const deleteCall = () => {
  openDialog(
    'common.delete',
    'common.deleteConfirm',
    DialogButtonsType.YES_NO
  ).then((response) => {
    if(response === DialogResponse.YES) {
      if (props.delete) props.delete().then((res: any) => {
        add({type: 'success', message: 'common.deleted', title: 'common.success'})
        unlock();
        goBack();
      }).catch(() => {
        add({type: 'error', message: 'common.cannotDelete', title: 'common.error'})
      });
      
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
    description?: string;
    fields: Array<{
      name: string;
      label: string;
      type: string;
      baseName?: string;
      readonly?: boolean;
    }>;
  }>;
};
const props = defineProps<{
  setup: editorSetup,
  isNew: boolean,
  exit?: () => void,
  save?: () => Promise<any>,
  delete?: () => Promise<any>,
  routeBack?: string
}>();
</script>

<style scoped></style>
