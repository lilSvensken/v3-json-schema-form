import { defineStore } from "pinia";
import { generateRandomString } from "@/schema-form/helpers/generateRandomString";

export const useSubmitStore = defineStore("submit", {
  state: () => ({
    isSubmit: false,
  }),
  actions: {
    setStatusSubmit() {
      this.isSubmit = generateRandomString();
    },
  },
  getters: {
    isLeastOneSubmit() {
      return !!this.isSubmit;
    },
  },
});
