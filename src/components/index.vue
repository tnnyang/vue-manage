<template>
<div>
	<top></top>
	<div class="container">
		<div class="row">
			<slider-bar></slider-bar>
			<router-view></router-view>
		</div>
	</div>
	<foot></foot>
</div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import foot from '@/components/footer'

export default {
	components: {
		top,
		sliderBar,
		foot
	}
}
</script>