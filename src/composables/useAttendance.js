import { ref } from 'vue'

export function useAttendance() {
  const attendances = ref([])

  const loadAttendances = () => {
    const data = localStorage.getItem('attendances')
    if (data) {
      attendances.value = JSON.parse(data)
    }
  }

  const saveAttendances = () => {
    localStorage.setItem('attendances', JSON.stringify(attendances.value))
  }

  const addAttendance = (attendance) => {
    const newAttendance = { ...attendance, id: Date.now().toString() }
    attendances.value.push(newAttendance)
    saveAttendances()
  }

  const updateAttendance = (id, updatedData) => {
    const index = attendances.value.findIndex(a => a.id === id)
    if (index !== -1) {
      attendances.value[index] = { ...updatedData, id }
      saveAttendances()
    }
  }

  const deleteAttendance = (id) => {
    attendances.value = attendances.value.filter(a => a.id !== id)
    saveAttendances()
  }

  const getAttendanceById = (id) => {
    return attendances.value.find(a => a.id === id) || null
  }

  return {
    attendances,
    loadAttendances,
    addAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendanceById
  }
}