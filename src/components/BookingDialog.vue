<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue';

const dialog = ref(null);
const guestInput = ref(null);
const minimumDate = ref('');
const bookingResult = ref('');
const booking = reactive({ guest: '', date: '', guests: '2 位', time: '11:30' });
const times = ['11:30', '12:30', '13:30', '17:30', '18:30', '19:30', '20:30'];

function localDate() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function open() {
  minimumDate.value = localDate();
  booking.date = minimumDate.value;
  bookingResult.value = '';
  guestInput.value?.setCustomValidity('');
  dialog.value.showModal();
  document.body.classList.add('modal-open');
}

function close() {
  dialog.value.close();
}

function releaseScroll() {
  document.body.classList.remove('modal-open');
}

function closeOnBackdrop(event) {
  if (event.target !== dialog.value) return;
  const bounds = dialog.value.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
}

function submitBooking() {
  if (!booking.guest.trim()) {
    guestInput.value.setCustomValidity('请输入您的称呼');
    guestInput.value.reportValidity();
    return;
  }
  bookingResult.value = `${booking.guest.trim()}，这是您的预订信息：\n${booking.date} ${booking.time} · ${booking.guests}\n\n此为演示，预订未发送，尚未确认席位。`;
}

onBeforeUnmount(releaseScroll);
defineExpose({ open });
</script>

<template>
  <dialog id="booking-dialog" ref="dialog" aria-labelledby="booking-title" @click="closeOnBackdrop" @close="releaseScroll">
    <button class="dialog-close" aria-label="关闭订位窗口" @click="close">×</button>
    <div class="kicker">期待与你同桌</div>
    <h2 id="booking-title">预订一席</h2>
    <p class="dialog-intro">演示表单，仅在此页面展示预订信息，不会向餐馆发送。</p>
    <form v-show="!bookingResult" id="booking-form" @submit.prevent="submitBooking">
      <label>称呼<input ref="guestInput" v-model="booking.guest" name="guest" autocomplete="name" placeholder="怎么称呼您" required maxlength="40" @input="guestInput.setCustomValidity('')"></label>
      <div class="form-row">
        <label>用餐日期<input v-model="booking.date" name="date" type="date" :min="minimumDate" required></label>
        <label>用餐人数<select v-model="booking.guests" name="guests"><option v-for="guests in [2, 1, 3, 4, 5, 6]" :key="guests">{{ guests }} 位</option></select></label>
      </div>
      <label>用餐时段<select v-model="booking.time" name="time"><option v-for="time in times" :key="time">{{ time }}</option></select></label>
      <button class="button" type="submit">查看预订信息 <span aria-hidden="true">↗</span></button>
    </form>
    <div v-show="bookingResult" id="booking-result" role="status">{{ bookingResult }}</div>
  </dialog>
</template>
