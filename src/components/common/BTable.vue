<template>
  <div class="card">
    <DataTable
      :value="records"
      dataKey="id"
      responsiveLayout="scroll"
      scrollable
      removableSort
      :selectionMod="false"
      :metaKeySelection="false"
      class="border border-gray-200 rounded-lg overflow-hidden"
    >
      <template v-if="isLoading">
        <div class="flex justify-center items-center h-64 bg-white">
          <div class="flex justify-center items-center gap-4">
            <ProgressSpinner
              strokeWidth="4"
              animationDuration=".5s"
              style="width: 48px; height: 48px"
              :pt="{
                circle: {
                  class: '!stroke-primary stroke-4'
                }
              }"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <!-- <Column
          selectionMode="multiple"
          style="width: 10rem"
          v-if="selectionMode && selectionMode !== 'single'"
        ></Column> -->

        <template v-for="(col, index) in columns" :key="index">
          <Column
            :field="col.field"
            :header="col.header"
            :sortable="col.sortable"
            :filterMatchMode="col.filterMatchMode"
            :class="col.class"
            style="min-width: fit-content"
          >
            <template #sorticon="{ sortOrder }">
              <div class="flex flex-col gap-0">
                <i
                  class="pi pi-angle-up icon-color"
                  :class="{ 'opacity-0': sortOrder < 0 }"
                  style="font-size: 0.8rem"
                ></i>
                <i
                  class="pi pi-angle-down icon-color"
                  :class="{ 'opacity-0': sortOrder > 0 }"
                  style="font-size: 0.8rem"
                ></i>
              </div>
            </template>
            <template #body="slotProps">
              <slot :name="col.field" v-bind="slotProps">
                {{ slotProps.data[col.field] }}
              </slot>
            </template>
          </Column>
        </template>
      </template>

      <template #empty>
        <b-empty-status v-if="isEmpty" />
      </template>

      <template #footer v-if="pagination">
        <Paginator
          :page="current_page"
          :rows="Number(meta.per_page)"
          :totalRecords="meta.total"
          :first="firstRecordNumber"
          @page="onPageChange"
          class="bg-transparent"
        >
          <template #start>
            {{ $t('global.table.show') }} {{ firstRecordNumber }}
            {{ $t('global.table.to') }} {{ lastRecordNumber }}
            {{ $t('global.table.from') }} {{ meta.total }}
            {{ $t('global.table.data') }}
          </template>
        </Paginator>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { useRoute, useRouter } from 'vue-router';

// Define props
const props = defineProps({
  records: { type: Array, required: true },
  columns: { type: Array, required: true },
  selectionMode: { type: String, default: 'multiple' }, // '', 'single', 'multiple'
  pagination: { type: Boolean, default: true },
  meta: {
    type: Object,
    default: () => ({
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1
    })
  },
  isLoading: { type: Boolean, default: false },
  selectedItems: { type: Array, default: () => [] }
});

// Emit events
const emit = defineEmits(['update:selectedItems', 'onPageChange']);

// State
const current_page = ref(props.meta.current_page || 1);

// Computed properties
const isEmpty = computed(() => !props.records?.length && !props.isLoading);
const isLastPage = computed(
  () => props.meta.current_page === props.meta.last_page
);

const firstRecordNumber = computed(
  () => (props.meta.current_page - 1) * props.meta.per_page + 1
);

const lastRecordNumber = computed(() =>
  isLastPage.value
    ? props.meta.total
    : +firstRecordNumber.value + +props.meta.per_page - 1
);

const router = useRouter();
const route = useRoute();

// Page change handler
const onPageChange = ({ page }) => {
  if (current_page.value !== page + 1) {
    current_page.value = page + 1;

    router.push({
      query: {
        ...route.query,
        page: current_page.value
      }
    });

    emit('onPageChange', current_page.value);
  }
};
</script>

<style lang="scss" scoped>
.empty-message {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.p-datatable-header-cell) {
  background: #f8f8f8;
}

:deep(
    .p-datatable-column-title,
    .p-datatable-sort-icon,
    .p-datatable-sort-badge
  ) {
  display: block;
  width: max-content;
}

:deep(.p-datatable-table-container) {
  max-width: 100%;
}
</style>
