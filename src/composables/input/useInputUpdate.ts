import {ref} from "vue";

export const useInputUpdate = (time: number = 700) => {
  const changeHook = ref<() => void>(() => {});

  const timeout = ref<number | null>(null);

  const removeTimeout = () => {
    if (!timeout.value) throw Error("timeout is not set");
    clearTimeout(timeout.value);
    timeout.value = null;
  };

  const onTimeout = () => {
    changeHook.value();
    removeTimeout();
  };

  const resetTimeout = (time: number = 700) => {
    if(timeout.value) removeTimeout();
    timeout.value = setTimeout(onTimeout, time);
  }

  const registerChange = (e: any) => {
    resetTimeout(time);
  };

  const onChange = (f: () => void) => {
    changeHook.value = f;
  };

  return {registerChange, onChange};
};
