<script>
	export let class_id = "";
	export let popover_str = "";
	export let button_str = "";
</script>

<button
	data-popover-target="popover-click"
	data-popover-trigger="click"
	type="button"
	data-popover-placement="bottom"
	class={class_id}>{button_str}</button
>
<div
	data-popover
	id="popover-click"
	role="tooltip"
	class="absolute z-10 invisible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
>
	<div
		class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
	>
		<h3 class="font-semibold text-gray-900 dark:text-white">
			{popover_str}
		</h3>
	</div>
	<div class="px-3 py-2">
		<p>And here's some amazing content. It's very engaging. Right?</p>
	</div>
	<div data-popper-arrow />
</div>
