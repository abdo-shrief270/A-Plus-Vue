<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 p-6 font-[Tajawal]">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">تحليلات الطلاب</h1>
          <p class="text-gray-600">إحصائيات شاملة عن أداء الطلاب</p>
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

    <!-- Action Buttons -->
    <div class="flex gap-4 mb-8">
      <Button
        icon="pi pi-trash"
        label="حذف طالب"
        class="p-button-danger p-button-outlined"
        @click="showDeleteDialog = true"
      />
      <Button
        icon="pi pi-user-plus"
        label="إضافة طالب"
        class="p-button-success p-button-outlined"
        @click="showAddDialog = true"
      />
    </div>

    <!-- Stats Cards and Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Stats Cards -->
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Average Progress Card -->
          <div class="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <div class="bg-yellow-500 p-3 rounded-full mb-4 w-fit">
                  <i class="pi pi-chart-pie text-white text-xl"></i>
                </div>
                <p class="text-yellow-800 text-sm font-medium mb-1">متوسط التقدم</p>
                <p class="text-4xl font-bold text-yellow-900">75%</p>
              </div>
            </div>
          </div>

          <!-- Total Students Card -->
          <div class="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <div class="bg-blue-500 p-3 rounded-full mb-4 w-fit">
                  <i class="pi pi-users text-white text-xl"></i>
                </div>
                <p class="text-blue-800 text-sm font-medium mb-1">إجمالي الطلاب</p>
                <p class="text-4xl font-bold text-blue-900">2150</p>
              </div>
            </div>
          </div>

          <!-- Inactive Students Card -->
          <div class="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <div class="bg-red-500 p-3 rounded-full mb-4 w-fit">
                  <i class="pi pi-times-circle text-white text-xl"></i>
                </div>
                <p class="text-red-800 text-sm font-medium mb-1">طلاب غير منتظمون</p>
                <p class="text-4xl font-bold text-red-900">650</p>
              </div>
            </div>
          </div>

          <!-- Active Students Card -->
          <div class="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <div class="bg-green-500 p-3 rounded-full mb-4 w-fit">
                  <i class="pi pi-check-circle text-white text-xl"></i>
                </div>
                <p class="text-green-800 text-sm font-medium mb-1">طلاب منتظمون</p>
                <p class="text-4xl font-bold text-green-900">1500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="lg:col-span-1">
        <Card class="h-full shadow-lg border-0 rounded-2xl">
          <template #content>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800 mb-6 text-center">توزيع المستويات</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">المستوى البرونزي</span>
                  <span class="text-sm font-bold text-gray-800">700</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-8">
                  <div
                    class="bg-blue-500 h-8 rounded-full flex items-center justify-center"
                    style="width: 35%"
                  >
                    <span class="text-white text-xs font-bold">35%</span>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">المستوى الفضي</span>
                  <span class="text-sm font-bold text-gray-800">250</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-8">
                  <div
                    class="bg-teal-500 h-8 rounded-full flex items-center justify-center"
                    style="width: 25%"
                  >
                    <span class="text-white text-xs font-bold">25%</span>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">المستوى الذهبي</span>
                  <span class="text-sm font-bold text-gray-800">1200</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-8">
                  <div
                    class="bg-yellow-500 h-8 rounded-full flex items-center justify-center"
                    style="width: 60%"
                  >
                    <span class="text-white text-xs font-bold">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Students Data Table -->
    <Card class="shadow-lg border-0 rounded-2xl">
      <template #header>
        <div class="flex justify-between items-center p-6 pb-0">
          <div class="flex items-center gap-3">
            <div class="bg-indigo-100 p-3 rounded-xl">
              <i class="pi pi-table text-indigo-600 text-lg"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">قائمة بيانات الطلاب</h3>
          </div>
          <div class="flex gap-2">
            <Button
              icon="pi pi-filter"
              label="ترتيب"
              class="p-button-outlined p-button-sm"
              @click="showSortOptions = !showSortOptions"
            />
            <Button icon="pi pi-download" label="تصدير" class="p-button-outlined p-button-sm" />
          </div>
        </div>
      </template>
      <template #content>
        <DataTable
          :value="studentsData"
          class="p-datatable-sm"
          dir="rtl"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="عرض {first} إلى {last} من {totalRecords} طالب"
          responsiveLayout="scroll"
          :sortField="sortField"
          :sortOrder="sortOrder"
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
          <Column field="level" header="المستوى" sortable>
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.level"
                :severity="getLevelSeverity(slotProps.data.level)"
                class="px-3 py-1 font-semibold"
              />
            </template>
          </Column>
          <Column field="progress" header="رصيد التقدم" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <ProgressBar
                  :value="slotProps.data.progress * 10"
                  class="flex-1 h-3"
                  :showValue="false"
                />
                <span class="text-sm font-semibold text-gray-700">{{
                  slotProps.data.progress
                }}</span>
              </div>
            </template>
          </Column>
          <Column field="points" header="عدد النقاط" sortable>
            <template #body="slotProps">
              <div class="flex items-center gap-1">
                <i class="pi pi-star-fill text-yellow-500 text-sm"></i>
                <span class="font-bold text-gray-800">{{ slotProps.data.points }}</span>
              </div>
            </template>
          </Column>
          <Column header="الإجراءات" class="w-32">
            <template #body="slotProps">
              <div class="flex gap-1">
                <Button
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="viewStudent(slotProps.data)"
                  v-tooltip.top="'عرض التفاصيل'"
                />
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="editStudent(slotProps.data)"
                  v-tooltip.top="'تعديل'"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-sm p-button-danger"
                  @click="confirmDelete(slotProps.data)"
                  v-tooltip.top="'حذف'"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Add Student Dialog -->
    <Dialog
      v-model:visible="showAddDialog"
      modal
      header="إضافة طالب جديد"
      :style="{ width: '500px' }"
      dir="rtl"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
          <InputText v-model="newStudent.name" class="w-full" placeholder="أدخل الاسم الكامل" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
          <InputText
            v-model="newStudent.email"
            class="w-full"
            placeholder="أدخل البريد الإلكتروني"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
          <Dropdown
            v-model="newStudent.level"
            :options="levelOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
            placeholder="اختر المستوى"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">النقاط الأولية</label>
          <InputNumber
            v-model="newStudent.points"
            class="w-full"
            placeholder="أدخل النقاط"
            :min="0"
            :max="5000"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="إلغاء"
          icon="pi pi-times"
          class="p-button-text"
          @click="showAddDialog = false"
        />
        <Button label="حفظ" icon="pi pi-check" class="p-button-success" @click="addStudent" />
      </template>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      v-model:visible="showDeleteDialog"
      modal
      header="تأكيد الحذف"
      :style="{ width: '400px' }"
      dir="rtl"
    >
      <div class="flex items-center gap-3 mb-4">
        <i class="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
        <span>هل أنت متأكد من حذف هذا الطالب؟</span>
      </div>
      <template #footer>
        <Button
          label="إلغاء"
          icon="pi pi-times"
          class="p-button-text"
          @click="showDeleteDialog = false"
        />
        <Button label="حذف" icon="pi pi-trash" class="p-button-danger" @click="deleteStudent" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const showSortOptions = ref(false)
const selectedStudent = ref(null)
const sortField = ref('name')
const sortOrder = ref(1)

const newStudent = ref({
  name: '',
  email: '',
  level: null,
  points: 0,
})

const levelOptions = ref([
  { label: 'البرونزي', value: 'البرونزي' },
  { label: 'الفضي', value: 'الفضي' },
  { label: 'الذهبي', value: 'الذهبي' },
])

// Sample students data
const studentsData = ref([
  {
    id: 1,
    name: 'فهد محمد',
    email: 'fahad@example.com',
    level: 'الذهبي',
    progress: 9,
    points: 3200,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    name: 'نورة علي',
    email: 'nora@example.com',
    level: 'الفضي',
    progress: 6,
    points: 2700,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 3,
    name: 'عبد الله عامر',
    email: 'abdullah@example.com',
    level: 'البرونزي',
    progress: 7,
    points: 2000,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 4,
    name: 'زيد الخطابي',
    email: 'zaid@example.com',
    level: 'الذهبي',
    progress: 9,
    points: 3120,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 5,
    name: 'زيد الخطابي',
    email: 'zaid2@example.com',
    level: 'الذهبي',
    progress: 2,
    points: 3095,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 6,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    level: 'الفضي',
    progress: 8,
    points: 2850,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 7,
    name: 'محمد حسن',
    email: 'mohamed@example.com',
    level: 'البرونزي',
    progress: 5,
    points: 1800,
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 8,
    name: 'فاطمة سالم',
    email: 'fatima@example.com',
    level: 'الذهبي',
    progress: 10,
    points: 3500,
    avatar: 'https://via.placeholder.com/40',
  },
])

// Computed properties
// const filteredStudents = computed(() => {
//   if (!searchQuery.value) return studentsData.value

//   return studentsData.value.filter(
//     (student) =>
//       student.name.includes(searchQuery.value) ||
//       student.email.includes(searchQuery.value) ||
//       student.level.includes(searchQuery.value),
//   )
// })

// Methods
const getLevelSeverity = (level) => {
  switch (level) {
    case 'الذهبي':
      return 'warning'
    case 'الفضي':
      return 'info'
    case 'البرونزي':
      return 'secondary'
    default:
      return 'success'
  }
}

const viewStudent = (student) => {
  console.log('عرض تفاصيل الطالب:', student.name)
  // Here you would typically navigate to student details page
}

const editStudent = (student) => {
  console.log('تعديل الطالب:', student.name)
  // Here you would open edit dialog with student data
}

const confirmDelete = (student) => {
  selectedStudent.value = student
  showDeleteDialog.value = true
}

const deleteStudent = () => {
  if (selectedStudent.value) {
    const index = studentsData.value.findIndex((s) => s.id === selectedStudent.value.id)
    if (index > -1) {
      studentsData.value.splice(index, 1)
    }
  }
  showDeleteDialog.value = false
  selectedStudent.value = null
}

const addStudent = () => {
  if (newStudent.value.name && newStudent.value.email && newStudent.value.level) {
    const newId = Math.max(...studentsData.value.map((s) => s.id)) + 1
    studentsData.value.push({
      id: newId,
      ...newStudent.value,
      progress: Math.floor(Math.random() * 10) + 1,
      avatar: 'https://via.placeholder.com/40',
    })

    // Reset form
    newStudent.value = {
      name: '',
      email: '',
      level: null,
      points: 0,
    }
    showAddDialog.value = false
  }
}

onMounted(() => {
  console.log('تحليلات الطلاب محملة بنجاح')
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

/* Custom gradient backgrounds */
.gradient-yellow {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.gradient-blue {
  background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);
}

.gradient-red {
  background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
}

.gradient-green {
  background: linear-gradient(135deg, #dcfce7 0%, #86efac 100%);
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
</style>
