<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 p-6 font-[Tajawal]">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <p class="text-gray-600">مرحباً بك</p>
        </div>
      </div>

      <!-- Enhanced Search with Filters -->
      <div class="flex items-center gap-4 mb-6">
        <div class="relative flex-1 max-w-md">
          <InputText
            v-model="search"
            placeholder="البحث في النظام..."
            class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
          />
          <i
            class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></i>
        </div>
        <Button
          icon="pi pi-filter"
          label="تصفية"
          class="p-button-outlined p-button-secondary"
          @click="showFilters = !showFilters"
        />
        <Button icon="pi pi-download" label="تصدير" class="p-button-success" />
      </div>
    </div>

    <!-- Enhanced Stats Cards with Strong Visible Colors -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Purple Card -->
      <div
        class="relative overflow-hidden rounded-2xl shadow-lg"
        style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
      >
        <div class="p-6 text-white relative z-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm mb-1 font-medium">طلاب جدد خلال شهر</p>
              <p class="text-4xl font-bold mb-2">125+</p>
              <div class="flex items-center gap-1">
                <i class="pi pi-arrow-up text-green-300 text-xs"></i>
                <span class="text-green-300 text-xs font-medium">+12% من الشهر الماضي</span>
              </div>
            </div>
            <div
              class="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm w-12 h-12 flex items-center justify-center"
            >
              <span class="pi pi-users text-3xl text-primary-400"></span>
            </div>
          </div>
        </div>
        <!-- Decorative background pattern -->
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"
        ></div>
      </div>

      <!-- Green Card -->
      <div
        class="relative overflow-hidden rounded-2xl shadow-lg"
        style="background: linear-gradient(135deg, #10b981 0%, #059669 100%)"
      >
        <div class="p-6 text-white relative z-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm mb-1 font-medium">متوسط التقدم</p>
              <p class="text-4xl font-bold mb-2">75%</p>
              <div class="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
                <div class="bg-white h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <div
              class="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm w-12 h-12 flex items-center justify-center"
            >
              <i class="pi pi-chart-line text-3xl text-primary-400"></i>
            </div>
          </div>
        </div>
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"
        ></div>
      </div>

      <!-- Orange Card -->
      <div
        class="relative overflow-hidden rounded-2xl shadow-lg"
        style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
      >
        <div class="p-6 text-white relative z-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-100 text-sm mb-1 font-medium">إجمالي الكورسات</p>
              <p class="text-4xl font-bold mb-2">20</p>
              <div class="flex items-center gap-1">
                <i class="pi pi-plus text-green-300 text-xs"></i>
                <span class="text-green-300 text-xs font-medium">3 كورسات جديدة</span>
              </div>
            </div>
            <div
              class="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm w-12 h-12 flex items-center justify-center"
            >
              <i class="pi pi-desktop text-3xl text-primary-400"></i>
            </div>
          </div>
        </div>
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"
        ></div>
      </div>

      <!-- Blue Card -->
      <div
        class="relative overflow-hidden rounded-2xl shadow-lg"
        style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      >
        <div class="p-6 text-white relative z-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm mb-1 font-medium">إجمالي الطلاب</p>
              <p class="text-4xl font-bold mb-2">2,150</p>
              <div class="flex items-center gap-1">
                <i class="pi pi-arrow-up text-green-300 text-xs"></i>
                <span class="text-green-300 text-xs font-medium">نمو مستمر</span>
              </div>
            </div>
            <div
              class="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm w-12 h-12 flex items-center justify-center"
            >
              <i class="pi pi-graduation-cap text-3xl text-primary-400"></i>
            </div>
          </div>
        </div>
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"
        ></div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Enhanced Popular Courses -->
      <div class="lg:col-span-1">
        <Card class="h-full shadow-lg border-0 rounded-2xl">
          <template #header>
            <div class="flex items-center justify-between p-6 pb-0">
              <div class="flex items-center gap-3">
                <div class="bg-blue-100 p-3 rounded-xl">
                  <i class="pi pi-star text-blue-600 text-lg"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800">الكورسات الأكثر شيوعاً</h3>
              </div>
              <Chip label="+ 1130 طالب" class="bg-green-100 text-green-700 font-semibold" />
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div
                v-for="(course, index) in popularCourses"
                :key="index"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer group border border-gray-100"
              >
                <div class="flex items-center gap-3">
                  <div
                    :class="course.iconBg"
                    class="p-3 rounded-xl group-hover:scale-110 transition-transform duration-200"
                  >
                    <i :class="course.icon" class="text-lg"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800">{{ course.name }}</p>
                    <p class="text-sm text-gray-500">{{ course.instructor }}</p>
                  </div>
                </div>
                <div class="text-left">
                  <p class="font-bold text-gray-800 text-lg">{{ course.students }}</p>
                  <p class="text-xs text-gray-500">طالب</p>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Enhanced Chart Section -->
      <div class="lg:col-span-2">
        <Card class="h-full shadow-lg border-0 rounded-2xl">
          <template #header>
            <div class="flex justify-between items-center p-6 pb-0">
              <div class="flex items-center gap-3">
                <div class="bg-purple-100 p-3 rounded-xl">
                  <i class="pi pi-chart-bar text-purple-600 text-lg"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800">إحصائيات التسجيل</h3>
              </div>
              <div class="flex gap-2">
                <Dropdown
                  v-model="selectedPeriod"
                  :options="periods"
                  optionLabel="label"
                  class="w-32"
                  placeholder="الفترة"
                />
                <Button
                  icon="pi pi-refresh"
                  class="p-button-outlined p-button-sm"
                  @click="refreshChart"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="relative">
              <Chart
                type="line"
                :data="enhancedChartData"
                :options="enhancedChartOptions"
                class="h-64"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Enhanced Students Table -->
    <Card class="shadow-lg border-0 rounded-2xl">
      <template #header>
        <div class="flex justify-between items-center p-6 pb-0">
          <div class="flex items-center gap-3">
            <div class="bg-indigo-100 p-3 rounded-xl">
              <i class="pi pi-users text-indigo-600 text-lg"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800">الطلاب المضافة مؤخراً</h3>
          </div>
          <div class="flex gap-2">
            <Button
              icon="pi pi-plus"
              label="إضافة طالب"
              class="p-button-success"
              @click="showAddStudent = true"
            />
            <Button icon="pi pi-upload" label="استيراد" class="p-button-outlined" />
          </div>
        </div>
      </template>
      <template #content>
        <DataTable
          :value="enhancedStudents"
          class="p-datatable-sm"
          dir="rtl"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="عرض {first} إلى {last} من {totalRecords} طالب"
          responsiveLayout="scroll"
        >
          <Column field="avatar" header="" class="w-16">
            <template #body="slotProps">
              <Avatar :image="slotProps.data.avatar" class="w-10 h-10" shape="circle" />
            </template>
          </Column>
          <Column field="name" header="الاسم" sortable>
            <template #body="slotProps">
              <div>
                <p class="font-semibold text-gray-800">{{ slotProps.data.name }}</p>
                <p class="text-sm text-gray-500">{{ slotProps.data.email }}</p>
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
          <Column field="joinDate" header="تاريخ الانضمام" sortable>
            <template #body="slotProps">
              <span class="text-sm text-gray-600">{{ slotProps.data.joinDate }}</span>
            </template>
          </Column>
          <Column header="الإجراءات" class="w-32">
            <template #body="slotProps">
              <div class="flex gap-1">
                <Button
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="viewStudent(slotProps.data)"
                />
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="editStudent(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-sm p-button-danger"
                  @click="deleteStudent(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Add Student Dialog -->
    <Dialog
      v-model:visible="showAddStudent"
      modal
      header="إضافة طالب جديد"
      :style="{ width: '30vw' }"
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
            :options="levels"
            optionLabel="label"
            optionValue="value"
            class="w-full"
            placeholder="اختر المستوى"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="إلغاء"
          icon="pi pi-times"
          class="p-button-text"
          @click="showAddStudent = false"
        />
        <Button label="حفظ" icon="pi pi-check" class="p-button-success" @click="addStudent" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const search = ref('')
const selectedPeriod = ref({ label: 'شهر', value: 'month' })
const showFilters = ref(false)
const showAddStudent = ref(false)

const periods = [
  { label: 'أسبوع', value: 'week' },
  { label: 'شهر', value: 'month' },
  { label: '3 أشهر', value: 'quarter' },
  { label: 'سنة', value: 'year' },
]

const levels = [
  { label: 'مبتدئ', value: 'beginner' },
  { label: 'متوسط', value: 'intermediate' },
  { label: 'متقدم', value: 'advanced' },
  { label: 'خبير', value: 'expert' },
]

const newStudent = ref({
  name: '',
  email: '',
  level: null,
})

const popularCourses = ref([
  {
    name: 'أساسيات الكيمياء',
    instructor: 'د. أحمد محمد',
    students: 200,
    icon: 'pi pi-flask',
    iconBg: 'bg-red-100 text-red-600',
  },
  {
    name: 'تجربة المستخدم واجهة المستخدم',
    instructor: 'م. سارة أحمد',
    students: 160,
    icon: 'pi pi-palette',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'مبادئ الفيزياء',
    instructor: 'د. محمد علي',
    students: 125,
    icon: 'pi pi-bolt',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'البرمجة الأساسية',
    instructor: 'م. فاطمة حسن',
    students: 95,
    icon: 'pi pi-code',
    iconBg: 'bg-green-100 text-green-600',
  },
])

const enhancedStudents = ref([
  {
    name: 'فهد محمد الأحمد',
    email: 'fahad@example.com',
    level: 'الفضي',
    progress: 9,
    points: 75,
    joinDate: '2024/6/28',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    name: 'ثورة علي السالم',
    email: 'thawra@example.com',
    level: 'الفضي',
    progress: 6,
    points: 64,
    joinDate: '2024/6/23',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    name: 'عبد الله سالم',
    email: 'abdullah@example.com',
    level: 'الذهبي',
    progress: 4,
    points: 50,
    joinDate: '2024/6/20',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    name: 'نورا أحمد',
    email: 'nora@example.com',
    level: 'البرونزي',
    progress: 8,
    points: 82,
    joinDate: '2024/6/25',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    name: 'خالد محمود',
    email: 'khalid@example.com',
    level: 'الذهبي',
    progress: 7,
    points: 68,
    joinDate: '2024/6/22',
    avatar: 'https://via.placeholder.com/40',
  },
])

const enhancedChartData = ref({
  labels: ['الأسبوع الأول', 'الأسبوع الثاني', 'الأسبوع الثالث', 'الأسبوع الرابع'],
  datasets: [
    {
      label: 'طلاب جدد',
      data: [60, 40, 70, 50],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
    },
    {
      label: 'طلاب نشطين',
      data: [80, 65, 85, 75],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10B981',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
    },
  ],
})

const enhancedChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: 'Tajawal',
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#3B82F6',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      titleFont: {
        family: 'Tajawal',
      },
      bodyFont: {
        family: 'Tajawal',
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'Tajawal',
          size: 11,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          family: 'Tajawal',
          size: 11,
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
})

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

const refreshChart = () => {
  console.log('تحديث البيانات...')
}

const viewStudent = (student) => {
  console.log('عرض تفاصيل الطالب:', student.name)
}

const editStudent = (student) => {
  console.log('تعديل الطالب:', student.name)
}

const deleteStudent = (student) => {
  console.log('حذف الطالب:', student.name)
}

const addStudent = () => {
  if (newStudent.value.name && newStudent.value.email && newStudent.value.level) {
    enhancedStudents.value.push({
      ...newStudent.value,
      progress: Math.floor(Math.random() * 10) + 1,
      points: Math.floor(Math.random() * 100) + 1,
      joinDate: new Date().toLocaleDateString('ar-SA'),
      avatar: 'https://via.placeholder.com/40',
    })

    newStudent.value = { name: '', email: '', level: null }
    showAddStudent.value = false
  }
}

onMounted(() => {
  console.log('لوحة التحكم محملة بنجاح')
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

/* RTL specific styles */
[dir='rtl'] .p-datatable .p-datatable-thead > tr > th {
  text-align: right;
}

[dir='rtl'] .p-datatable .p-datatable-tbody > tr > td {
  text-align: right;
}

/* Enhanced card hover effects */

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

/* Custom gradient backgrounds for better visibility */
.gradient-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.gradient-green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.gradient-orange {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.gradient-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}
</style>
