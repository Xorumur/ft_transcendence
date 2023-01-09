<script>
	import ButtonPopover from "./button_popover.svelte";
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-20 mx-auto">
		<div class="flex flex-wrap -m-4">
			<div class="p-10 lg:w-1/3">
				<div
					class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
				>
					<h2
						class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
					>
						CATEGORY
					</h2>
					<h1
						class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
					>
						Player VS Random
					</h1>
					<ButtonPopover
						class_id="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
						popover_str="Game options"
						button_str="Play !"
					/>
					<div
						class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
					>
						<span
							class="text-gray-400 inline-flex items-center leading-none text-sm py-1"
						>
							<img
								src="./assets/grey_person.svg"
								alt="person svg"
								class="w-4 h-4 mr-2"
							/>0
						</span>
					</div>
				</div>
			</div>
			<div class="p-10 lg:w-1/3">
				<div
					class="flex flex-col h-full bg-gray-100 bg-opacity-75 rounded-lg overflow-hidden text-center relative"
				>
					<h1
						class="title-font mt-auto sm:text-2xl text-xl font-medium text-gray-900"
					>
						Player VS Friend
					</h1>
					<button
						class="mx-auto mb-auto mt-5 px-3 bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700 rounded"
					>
						Invite a friend
					</button>

					<div
						class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
					>
						<span
							class="text-gray-400 inline-flex items-center leading-none text-sm py-1"
						>
							<img
								src="./assets/grey_person.svg"
								alt="person svg"
								class="w-4 h-4 mr-2"
							/>0
						</span>
					</div>
				</div>
			</div>
			<div class="p-10 lg:w-1/3">
				<div
					class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
				>
					<h2
						class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
					>
						GAME OPTION
					</h2>
					<h1
						class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
					>
						Player vs Random
					</h1>
					<button
						class="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
					>
						Find a match
					</button>

					<div
						class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
					>
						<span
							class="text-gray-400 inline-flex items-center leading-none text-sm py-1"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
