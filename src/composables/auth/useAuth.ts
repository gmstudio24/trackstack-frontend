import { computed, ref } from "vue";
import { useApi } from "../useApi";

const authenticated = ref<boolean>(sessionStorage.getItem("auth.authenticated") === "true");

export const useAuth = () => {
  const {post} = useApi();

  const auth = ({password, email}: {password: string; email: string}) => {
    return post("login", {email, password}).then(() => {
      authenticated.value = true;
      sessionStorage.setItem("auth.authenticated", "true");
    });
  };

  const unauth = () => {
    return post("logout", {}).then(() => {
      authenticated.value = false;
      sessionStorage.removeItem("auth.authenticated");
    });
  };

  const isAuthenticated = computed(() => {
    return authenticated.value;
  })

  const setUnauthenticated = () => {
    authenticated.value = false;
  }

  return {auth, unauth, isAuthenticated, setUnauthenticated};
}