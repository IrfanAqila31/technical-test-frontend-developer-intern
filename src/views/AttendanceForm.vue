<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAttendance } from '../composables/useAttendance'

const router = useRouter()
const route = useRoute()
const { addAttendance, updateAttendance, getAttendanceById, loadAttendances } = useAttendance()

const formData = ref({
  nama: '',
  alamat: '',
  jenisKelamin: '',
  tanggalAbsen: '',
  jamMasuk: '',
  jamKeluar: '',
})

const isEditMode = ref(false)

onMounted(() => {
  loadAttendances()

  if (route.params.id) {
    isEditMode.value = true
    const existingData = getAttendanceById(route.params.id)

    if (existingData) {
      formData.value = { ...existingData }
    } else {
      alert('Data tidak ditemukan!')
      router.push('/attendance')
    }
  }
})

const handleSubmit = () => {
  if (isEditMode.value) {
    updateAttendance(route.params.id, formData.value)
  } else {
    addAttendance(formData.value)
  }

  router.push('/attendance')
}
</script>

<template>
  <div class="card mt-4 shadow-sm">
    <div class="card-header bg-white py-3">
      <h4 class="mb-0 text-primary">
        {{ isEditMode ? 'Edit Data Kehadiran' : 'Input Data Kehadiran' }}
      </h4>
    </div>

    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.nama"
            required
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Alamat</label>
          <textarea
            class="form-control"
            v-model="formData.alamat"
            rows="3"
            required
            placeholder="Masukkan alamat lengkap"
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label d-block">Jenis Kelamin</label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="formData.jenisKelamin"
              value="Laki-laki"
              required
              name="jk"
            />
            <label class="form-check-label">Laki-laki</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="formData.jenisKelamin"
              value="Perempuan"
              required
              name="jk"
            />
            <label class="form-check-label">Perempuan</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Tanggal Absen</label>
            <input type="date" class="form-control" v-model="formData.tanggalAbsen" required />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Jam Masuk</label>
            <input type="time" class="form-control" v-model="formData.jamMasuk" required />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Jam Keluar</label>
            <input type="time" class="form-control" v-model="formData.jamKeluar" required />
          </div>
        </div>

        <div class="d-flex gap-3 justify-content-end mt-4">
          <div class="wadah-button">
            <button type="button" class="btn btn-secondary" @click="router.push('/attendance')">
              Batal
            </button>
            <button type="submit" class="btn btn-primary">Simpan Data</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wadah-button {
  display: flex;
  gap: 10px;
}
</style>
