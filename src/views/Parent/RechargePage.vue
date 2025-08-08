<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 p-6 font-[Tajawal]">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">إدارة الاشتراكات</h1>
          <p class="text-gray-600">متابعة وإدارة اشتراكات الطلاب</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="flex items-center gap-4 mb-6">
        <div class="relative flex-1 max-w-md">
          <InputText
            v-model="searchQuery"
            placeholder="بحث"
            class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
          />
          <i
            class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></i>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Subscription Offer Card -->
      <div class="lg:col-span-1">
        <Card
          class="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white border-0 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
        >
          <template #content>
            <div class="p-6 relative overflow-hidden">
              <!-- Floating background shapes -->
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-16 -mt-16"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full blur-xl -ml-12 -mb-12"
              ></div>

              <div class="relative z-10">
                <h3 class="text-2xl font-bold mb-4 leading-relaxed">نهنئ راحة بالك طوال السنة</h3>
                <div class="flex items-center gap-4 mb-4">
                  <!-- Icon with layered coins -->
                  <div class="flex-shrink-0 relative">
                    <div
                      class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transform rotate-12"
                    >
                      <i class="pi pi-dollar text-yellow-800 text-xl"></i>
                    </div>
                    <div
                      class="w-12 h-12 bg-yellow-300 rounded-full absolute -top-2 -right-2 opacity-80 transform -rotate-12"
                    ></div>
                    <div
                      class="w-8 h-8 bg-yellow-500 rounded-full absolute top-4 -left-2 opacity-60"
                    ></div>
                  </div>

                  <div>
                    <p class="text-teal-100 text-sm mb-1">
                      اشترك في الباقة السنوية واحصل على خصومات
                    </p>
                    <p class="text-3xl font-bold tracking-wide">تصل إلى 25%</p>
                  </div>
                </div>

                <p class="text-teal-100 text-sm mb-6">قدمت الأرقام الحديثة نمواً كبيراً ومتوقعاً</p>

                <Button
                  label="اشترك الآن"
                  class="bg-white text-teal-700 hover:bg-gray-100 border-0 font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  @click="showSubscriptionDialog = true"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Statistics Chart -->
      <div class="lg:col-span-1">
        <Card
          class="h-full shadow-xl border-0 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
        >
          <template #header>
            <div class="p-6 pb-0">
              <h3 class="text-xl font-bold text-gray-800 mb-2">إحصائية سريعة لاشتراكات الطلاب</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6 pt-0">
              <div class="flex items-center justify-center mb-6">
                <!-- Custom Donut Chart -->
                <div class="relative w-48 h-48">
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <!-- Background circle -->
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="8" />
                    <!-- Progress circles with animations -->
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f59e0b"
                      stroke-width="8"
                      stroke-dasharray="87.96 251.33"
                      stroke-dashoffset="0"
                      class="transition-all duration-1000 ease-out"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      stroke-width="8"
                      stroke-dasharray="62.83 251.33"
                      stroke-dashoffset="-87.96"
                      class="transition-all duration-1000 ease-out delay-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      stroke-width="8"
                      stroke-dasharray="50.27 251.33"
                      stroke-dashoffset="-150.79"
                      class="transition-all duration-1000 ease-out delay-300"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#8b5cf6"
                      stroke-width="8"
                      stroke-dasharray="25.13 251.33"
                      stroke-dashoffset="-201.06"
                      class="transition-all duration-1000 ease-out delay-500"
                    />
                  </svg>
                  <!-- Center text -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <p class="text-4xl font-bold text-gray-800">2000</p>
                      <p class="text-sm text-gray-600">طالب</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Legend with hover highlights -->
              <div class="space-y-3">
                <div
                  v-for="(item, index) in [
                    { color: 'bg-yellow-500', label: '1 شهر', value: '35%' },
                    { color: 'bg-green-500', label: '3 شهور', value: '25%' },
                    { color: 'bg-blue-500', label: '6 شهور', value: '20%' },
                    { color: 'bg-purple-500', label: 'سنوي', value: '10%' },
                    { color: 'bg-indigo-500', label: 'غير مشتركين', value: '9%' },
                  ]"
                  :key="index"
                  class="flex items-center justify-between hover:bg-gray-50 px-3 py-2 rounded-lg transition"
                >
                  <div class="flex items-center gap-2">
                    <div :class="`w-3 h-3 rounded-full ${item.color}`"></div>
                    <span class="text-sm text-gray-600">{{ item.label }}</span>
                  </div>
                  <span class="text-sm font-bold text-gray-800">
                    {{ item.value }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Subscriptions Table -->
    <Card class="shadow-lg border-0 rounded-2xl">
      <template #header>
        <div class="flex justify-between items-center p-6 pb-0">
          <div class="flex items-center gap-3">
            <div class="bg-indigo-100 p-3 rounded-xl">
              <i class="pi pi-list text-indigo-600 text-lg"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">قائمة اشتراكات الطلاب</h3>
          </div>
          <div class="flex gap-2">
            <Button
              icon="pi pi-filter"
              label="ترتيب حسب الاشتراك"
              class="p-button-outlined p-button-sm"
              @click="showSortOptions = !showSortOptions"
            />
            <Button icon="pi pi-download" label="تصدير" class="p-button-outlined p-button-sm" />
          </div>
        </div>
      </template>
      <template #content>
        <DataTable
          :value="subscriptionsData"
          class="p-datatable-sm"
          dir="rtl"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="عرض {first} إلى {last} من {totalRecords} اشتراك"
          responsiveLayout="scroll"
        >
          <Column field="name" header="الاسم" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-3">
                <Avatar :image="slotProps.data.avatar" class="w-10 h-10" shape="circle" />
                <div>
                  <p class="font-semibold text-gray-800">{{ slotProps.data.name }}</p>
                  <p class="text-sm text-gray-500">{{ slotProps.data.email }}</p>
                </div>
              </div>
            </template>
          </Column>
          <Column field="subscriptionType" header="نوع الباقة" sortable>
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.subscriptionType"
                :severity="getSubscriptionSeverity(slotProps.data.subscriptionType)"
                class="px-3 py-1 font-semibold"
              />
            </template>
          </Column>
          <Column field="progress" header="رصيد التقدم" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <ProgressBar
                  :value="slotProps.data.progress"
                  class="flex-1 h-3"
                  :showValue="false"
                />
                <span class="text-sm font-semibold text-gray-700"
                  >{{ slotProps.data.progress }}%</span
                >
              </div>
            </template>
          </Column>
          <Column field="status" header="الاشتراكات" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <i
                  :class="getStatusIcon(slotProps.data.status)"
                  :style="{ color: getStatusColor(slotProps.data.status) }"
                ></i>
                <span :style="{ color: getStatusColor(slotProps.data.status) }" class="font-medium">
                  {{ slotProps.data.status }}
                </span>
              </div>
            </template>
          </Column>
          <Column header="الإجراءات" class="w-32">
            <template #body="slotProps">
              <div class="flex gap-1">
                <Button
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="viewSubscription(slotProps.data)"
                  v-tooltip.top="'عرض التفاصيل'"
                />
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="editSubscription(slotProps.data)"
                  v-tooltip.top="'تعديل'"
                />
                <Button
                  icon="pi pi-refresh"
                  class="p-button-rounded p-button-text p-button-sm p-button-success"
                  @click="renewSubscription(slotProps.data)"
                  v-tooltip.top="'تجديد'"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Subscription Dialog -->
    <Dialog
      v-model:visible="showSubscriptionDialog"
      modal
      header="اشتراك جديد"
      :style="{ width: '600px' }"
      dir="rtl"
    >
      <div class="space-y-6">
        <div class="text-center">
          <h4 class="text-2xl font-bold text-gray-800 mb-2">اختر باقة الاشتراك</h4>
          <p class="text-gray-600">اختر الباقة التي تناسب احتياجاتك</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="plan in subscriptionPlans"
            :key="plan.id"
            class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg"
            :class="
              selectedPlan?.id === plan.id
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-200 hover:border-gray-300'
            "
            @click="selectedPlan = plan"
          >
            <div class="text-center">
              <h5 class="font-bold text-lg text-gray-800 mb-2">{{ plan.name }}</h5>
              <div class="mb-3">
                <span class="text-3xl font-bold text-teal-600">{{ plan.price }}</span>
                <span class="text-gray-600"> ريال</span>
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <div
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-center gap-2"
                >
                  <i class="pi pi-check text-green-500 text-xs"></i>
                  <span>{{ feature }}</span>
                </div>
              </div>
              <div v-if="plan.discount" class="mt-3">
                <Tag :value="`خصم ${plan.discount}%`" severity="success" class="px-3 py-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="إلغاء"
          icon="pi pi-times"
          class="p-button-text"
          @click="showSubscriptionDialog = false"
        />
        <Button
          label="اشترك الآن"
          icon="pi pi-check"
          class="p-button-success"
          @click="subscribe"
          :disabled="!selectedPlan"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const showSubscriptionDialog = ref(false)
const showSortOptions = ref(false)
const selectedPlan = ref(null)

// Subscription plans
const subscriptionPlans = ref([
  {
    id: 1,
    name: 'الباقة الشهرية',
    price: 99,
    features: ['وصول لجميع الكورسات', 'دعم فني 24/7', 'شهادات معتمدة'],
    discount: null,
  },
  {
    id: 2,
    name: 'الباقة ربع السنوية',
    price: 249,
    features: ['وصول لجميع الكورسات', 'دعم فني 24/7', 'شهادات معتمدة', 'جلسات مباشرة'],
    discount: 15,
  },
  {
    id: 3,
    name: 'الباقة نصف السنوية',
    price: 449,
    features: [
      'وصول لجميع الكورسات',
      'دعم فني 24/7',
      'شهادات معتمدة',
      'جلسات مباشرة',
      'مشاريع عملية',
    ],
    discount: 20,
  },
  {
    id: 4,
    name: 'الباقة السنوية',
    price: 799,
    features: [
      'وصول لجميع الكورسات',
      'دعم فني 24/7',
      'شهادات معتمدة',
      'جلسات مباشرة',
      'مشاريع عملية',
      'استشارات شخصية',
    ],
    discount: 25,
  },
])

// Sample subscriptions data
const subscriptionsData = ref([
  {
    id: 1,
    name: 'زيد الخطابي',
    email: 'zaid@example.com',
    subscriptionType: '1 شهر',
    progress: 85,
    status: 'مشترك',
    avatar: 'https://via.placeholder.com/40',
    startDate: '2024/6/1',
    endDate: '2024/7/1',
  },
  {
    id: 2,
    name: 'جنى أسامة',
    email: 'jana@example.com',
    subscriptionType: '6 شهور',
    progress: 65,
    status: 'مشترك',
    avatar: 'https://via.placeholder.com/40',
    startDate: '2024/1/1',
    endDate: '2024/7/1',
  },
  {
    id: 3,
    name: 'فيصل عادل',
    email: 'faisal@example.com',
    subscriptionType: 'غير مشترك',
    progress: 0,
    status: 'اشتراك',
    avatar: 'https://via.placeholder.com/40',
    startDate: null,
    endDate: null,
  },
  {
    id: 4,
    name: 'سارة محمد',
    email: 'sara@example.com',
    subscriptionType: '3 شهور',
    progress: 92,
    status: 'مشترك',
    avatar: 'https://via.placeholder.com/40',
    startDate: '2024/4/1',
    endDate: '2024/7/1',
  },
  {
    id: 5,
    name: 'أحمد علي',
    email: 'ahmed@example.com',
    subscriptionType: '1 شهر',
    progress: 45,
    status: 'مشترك',
    avatar: 'https://via.placeholder.com/40',
    startDate: '2024/6/15',
    endDate: '2024/7/15',
  },
  {
    id: 6,
    name: 'فاطمة حسن',
    email: 'fatima@example.com',
    subscriptionType: 'سنوي',
    progress: 78,
    status: 'مشترك',
    avatar: 'https://via.placeholder.com/40',
    startDate: '2024/1/1',
    endDate: '2025/1/1',
  },
])

// Computed properties
const filteredSubscriptions = computed(() => {
  if (!searchQuery.value) return subscriptionsData.value

  return subscriptionsData.value.filter(
    (subscription) =>
      subscription.name.includes(searchQuery.value) ||
      subscription.email.includes(searchQuery.value) ||
      subscription.subscriptionType.includes(searchQuery.value),
  )
})

// Methods
const getSubscriptionSeverity = (type) => {
  switch (type) {
    case 'سنوي':
      return 'success'
    case '6 شهور':
      return 'info'
    case '3 شهور':
      return 'warning'
    case '1 شهر':
      return 'secondary'
    case 'غير مشترك':
      return 'danger'
    default:
      return 'info'
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'مشترك':
      return 'pi pi-check-circle'
    case 'اشتراك':
      return 'pi pi-plus-circle'
    case 'منتهي':
      return 'pi pi-times-circle'
    default:
      return 'pi pi-circle'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'مشترك':
      return '#10b981'
    case 'اشتراك':
      return '#3b82f6'
    case 'منتهي':
      return '#ef4444'
    default:
      return '#6b7280'
  }
}

const viewSubscription = (subscription) => {
  console.log('عرض تفاصيل الاشتراك:', subscription.name)
}

const editSubscription = (subscription) => {
  console.log('تعديل الاشتراك:', subscription.name)
}

const renewSubscription = (subscription) => {
  console.log('تجديد الاشتراك:', subscription.name)
  // Here you would typically open renewal dialog
}

const subscribe = () => {
  if (selectedPlan.value) {
    console.log('اشتراك في الباقة:', selectedPlan.value.name)
    showSubscriptionDialog.value = false
    selectedPlan.value = null
    // Here you would typically handle the subscription process
  }
}

onMounted(() => {
  console.log('صفحة إدارة الاشتراكات محملة بنجاح')
})
</script>

<style scoped>
/* Custom animations and transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* RTL specific styles */
[dir='rtl'] .p-datatable .p-datatable-thead > tr > th {
  text-align: right;
}

[dir='rtl'] .p-datatable .p-datatable-tbody > tr > td {
  text-align: right;
}

/* Enhanced card hover effects */
.p-card:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Custom button styles */
.p-button {
  font-family: 'Tajawal', sans-serif;
}

/* Custom progress bar */
.p-progressbar {
  border-radius: 10px;
  overflow: hidden;
}

.p-progressbar .p-progressbar-value {
  border-radius: 10px;
}

/* Enhanced card styles */
.p-card {
  border-radius: 1rem;
  overflow: hidden;
}

/* Custom donut chart animations */
circle {
  transition:
    stroke-dasharray 1s ease-in-out,
    stroke-dashoffset 1s ease-in-out;
}

/* Custom table styles */
.p-datatable .p-datatable-tbody > tr:hover {
  background-color: #f8fafc;
}

/* Custom dialog styles */
.p-dialog .p-dialog-header {
  font-family: 'Tajawal', sans-serif;
  border-bottom: 1px solid #e5e7eb;
}

.p-dialog .p-dialog-content {
  font-family: 'Tajawal', sans-serif;
}

/* Subscription plan selection styles */
.subscription-plan {
  transition: all 0.3s ease;
}

.subscription-plan:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.subscription-plan.selected {
  border-color: #14b8a6;
  background-color: #f0fdfa;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(20, 184, 166, 0.2);
}
</style>
