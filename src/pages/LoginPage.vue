<template>
	<div id="app">
		<div id="login">
			<div id="login__header">
				<h1>반갑습니다.</h1>
			</div>
			<div id="login__body">
				<h1>로그인하기</h1>
				<button>로그인하기</button>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
#app {
	width: 100%;
	height: 100vh;
	position: relative;
}

#login {
	position: absolute;
	width: 80%;
	height: 80%;
	border: 1px solid red;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 30px;
}
</style>
