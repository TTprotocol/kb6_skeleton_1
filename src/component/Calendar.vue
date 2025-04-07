<template>
	<div id="calendar">
		<FullCalendar :options="calendarOptions" class="milcho-custom-calendar" />
	</div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3"; // fullcalendar import
import dayGridPlugin from "@fullcalendar/daygrid"; // 날짜
import timeGridPlugin from "@fullcalendar/timegrid"; // 시간 그리드 플러그인 추가
import interactionPlugin from "@fullcalendar/interaction";

const calendarOptions = {
	plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
	initialView: "dayGridMonth",
	headerToolbar: {},
	left: "prev,next today",
	center: "title",
	right: "dayGridMonth,timeGridWeek,timeGridDay", // 월별, 주별, 일별 보기 버튼 추가
};
</script>

<style scoped>
#calendar {
	width: 100%;
	height: 100%;
}
</style>
