import { ref } from "vue";

export type Alert = {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  timeout?: number;
  onClose?: () => void;
};

const alerts = ref<Alert[]>([]);

export const useAlert = () => {
  const add = (alert: Alert) => {
    alerts.value.push(alert);
  };

  const remove = (alert: Alert) => {
    alerts.value = alerts.value.filter(a => a !== alert)
  };

  return {
    alerts,
    add,
    remove,
  };
}