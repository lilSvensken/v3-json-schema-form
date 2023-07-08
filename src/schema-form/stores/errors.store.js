import { defineStore } from "pinia";

export const useErrorsStore = defineStore("errors", {
  state: () => ({
    errors: {},
  }),
  actions: {
    setError(inputName, error) {
      this.errors[inputName] = error;
    },
    deleteError(inputName) {
      if (this.errors[inputName]) {
        delete this.errors[inputName];
      }
    },
  },
  getters: {
    getErrors() {
      return this.errors;
    },
  },
});
