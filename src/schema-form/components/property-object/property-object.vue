<template>
  <div class="property-object">
    <main-title :text="title" />
    <main-description :text="schema.description" />
    <ul class="property-object__container">
      <template v-for="(propertyItem, key) in schema.properties" :key="key">
        <li
          v-if="showByDependencies(propertyItem, key)"
          class="property-object__item"
          :style="getStyleGrid(propertyItem)"
        >
          <property-object
            v-if="isObjectProperty(propertyItem)"
            :schema="propertyItem"
            :form-control="formControl[key]"
            :full-form-control="fullFormControl[key]"
            :form-data="formData"
            :object-key="key"
            :name-prefix="getNamePrefix(key)"
            @on-change-control="onChangeControl($event, key)"
          />
          <property-array
            v-else-if="isArrayProperty(propertyItem)"
            :schema="propertyItem"
            :form-arr="formControl[key]"
            :full-form-control="fullFormControl[key]"
            :form-data="formData"
            :name-prefix="getNamePrefix(key)"
            @on-change-control="onChangeControl($event, key)"
          />
          <property
            v-else
            :property="propertyItem"
            :property-key="key"
            :value="formControl[key]"
            :name="getNamePrefix(key)"
            :keyName="key"
            @on-change-control="onChangeControl($event, key)"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import MainTitle from "@/schema-form/components/common/main-title/main-title.vue";
import property from "@/schema-form/components/property/property.vue";
import MainDescription from "@/schema-form/components/common/main-description/main-description.vue";
import { defineAsyncComponent } from "vue";
import { isValidByDependencies } from "@/schema-form/helpers/getFormByDependencies";
import {
  isArrayProperty,
  isObjectProperty,
} from "@/schema-form/helpers/typesProperty";
import { getStyleGrid } from "@/schema-form/components/property-object/helpers/getStyleGrid";
import { useErrorsStore } from "@/schema-form/stores/errors.store";

const PropertyArray = defineAsyncComponent(() =>
  import("@/schema-form/components/property-array/property-array.vue")
);

export default {
  name: "property-object",
  components: { PropertyArray, MainDescription, property, MainTitle },
  props: {
    schema: Object,
    formData: Object,
    formControl: Object,
    fullFormControl: Object,
    objectKey: [String, Number],
    namePrefix: String,
  },
  emits: ["onChangeControl", "onChangeCurrentForm"],
  data() {
    return {
      timeout: undefined,
      windowSize: window.innerWidth,
    };
  },
  setup() {
    const storeErrors = useErrorsStore();
    return { storeErrors };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.windowSize = window.innerWidth;
      }, 100);
    },
    getNamePrefix(key) {
      return `${this.namePrefix}_${key}`;
    },
    showByDependencies({ depends }, key) {
      if (depends) {
        let isValid = true;
        isValid = isValidByDependencies(this.formData, depends);
        const formControl = this.formControl;
        if (isValid) {
          // возвращение скрытого поля в основную форму
          if (!(key in this.formControl) && !(key in this.fullFormControl)) {
            formControl[key] = this.fullFormControl[key];
            this.$emit("onChangeControl", formControl);
          }
        } else {
          // удаление поля из основной формы
          if (key in this.formControl) {
            delete formControl[key];
            this.storeErrors.deleteError(this.getNamePrefix(key));
            this.$emit("onChangeControl", formControl);
          }
        }

        return isValid;
      }
      return true;
    },
    getStyleGrid({ grid }) {
      return getStyleGrid(grid, this.windowSize);
    },
    isObjectProperty(propertyItem) {
      return isObjectProperty(propertyItem);
    },
    isArrayProperty(propertyItem) {
      return isArrayProperty(propertyItem);
    },
    onChangeControl(newValue, key) {
      const formControl = this.formControl;
      formControl[key] = newValue;

      this.$emit("onChangeControl", formControl);
    },
  },
  computed: {
    title() {
      return this.schema.title ?? this.objectKey;
    },
  },
};
</script>

<style scoped src="./style.scss"></style>
