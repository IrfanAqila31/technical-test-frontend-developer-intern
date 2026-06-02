<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAttendance } from '../composables/useAttendance'

const router = useRouter()
const { attendances, loadAttendances, deleteAttendance } = useAttendance()

onMounted(() => {
  try {
    loadAttendances()
  } catch {
    attendances.value = []
  }
})

const sortKey = ref('id')
const sortOrder = ref('asc')

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const currentPage = ref(1)
const itemsPerPage = 5

const displayedAttendances = computed(() => {
  let result = Array.isArray(attendances.value) ? [...attendances.value] : []

  result.sort((a, b) => {
    let valA = a[sortKey.value].toLowerCase()
    let valB = b[sortKey.value].toLowerCase()

    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })

  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return result.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(attendances.value.length / itemsPerPage) || 1
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleEdit = (id) => {
  router.push(`/attendance/edit/${id}`)
}

const handleDelete = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    deleteAttendance(id)
    if (displayedAttendances.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  }
}
</script>

<template>
  <div class="card mt-4 shadow-sm">
    <div class="card-header bg-white d-flex justify-content-between align-items-center py-3">
      <h4 class="mb-0 text-primary">Daftar Kehadiran Karyawan</h4>
      <button class="btn btn-primary" @click="router.push('/attendance/create')">
        + Tambah Data
      </button>
    </div>

    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover table-bordered mb-0">
          <thead class="table-light">
            <tr>
              <th>No</th>
              <th @click="toggleSort('nama')" style="cursor: pointer" class="text-primary">
                Nama
                <span v-if="sortKey === 'nama'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th @click="toggleSort('tanggalAbsen')" style="cursor: pointer" class="text-primary">
                Tanggal Absen
                <span v-if="sortKey === 'tanggalAbsen'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th>Jam Masuk</th>
              <th>Jam Keluar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="displayedAttendances.length === 0">
              <td colspan="6" class="text-center py-4 text-muted">Belum ada data absensi.</td>
            </tr>
            <tr v-for="(item, index) in displayedAttendances" :key="item.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.tanggalAbsen }}</td>
              <td>{{ item.jamMasuk }}</td>
              <td>{{ item.jamKeluar }}</td>
              <td>
                <div class="wadah-button">
                  <button
                    class="btn btn-sm btn-warning me-2 text-white"
                    @click="handleEdit(item.id)"
                  >
                    Edit
                  </button>
                  <button class="btn btn-sm btn-danger" @click="handleDelete(item.id)">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="d-flex justify-content-between align-items-center mt-3"
        v-if="attendances.length > 0"
      >
        <small class="text-muted">
          Menampilkan halaman {{ currentPage }} dari {{ totalPages }}
        </small>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Sebelumnya</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Selanjutnya</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wadah-button {
  display: flex;
  gap: 10px;
}
</style>
