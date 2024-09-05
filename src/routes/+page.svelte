<script lang="ts">
	import { type Project, loadProjects, saveProjects } from "$lib/projects";

	let projects: Project[] = loadProjects();
	let searchQuery = "";
	let showModal = false;
	let newProjectName = "";
	let newProjectDescription = "";

	$: filteredProjects = projects.filter((project) =>
		project.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function handleSettings() {
		console.log("Settings clicked");
	}

	function addProject() {
		if (newProjectName.trim() && newProjectDescription.trim()) {
			const newProject: Project = {
				name: newProjectName.trim(),
				description: newProjectDescription.trim()
			};
			projects = [...projects, newProject];
			saveProjects(projects);
			newProjectName = "";
			newProjectDescription = "";
			showModal = false;
		}
	}

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		newProjectName = "";
		newProjectDescription = "";
	}
</script>

<main>
	<div class="topboi">
		<div class="topboi__left">
			<h1>Project Dashboard</h1>
		</div>
		<div class="topboi__right">
			<button on:click={handleSettings}>Settings</button>
		</div>
	</div>

	<div class="sidebar">
		<div class="sidebar-content">
			<div class="search-container">
				<input type="text" placeholder="Search projects..." bind:value={searchQuery} />
				<button class="add-button" on:click={openModal}>+</button>
			</div>
			<ul>
				{#each filteredProjects as project}
					<li>
						<strong>{project.name}</strong>
						<p>{project.description}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="canvas-container">
		<canvas> </canvas>
	</div>

	{#if showModal}
		<div class="modal-overlay" on:click={closeModal}>
			<div class="modal" on:click|stopPropagation>
				<h2>Add New Project</h2>
				<input type="text" placeholder="Project Name" bind:value={newProjectName} />
				<textarea placeholder="Project Description" bind:value={newProjectDescription}></textarea>
				<div class="modal-buttons">
					<button on:click={addProject}>Add Project</button>
					<button on:click={closeModal}>Cancel</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	:root {
		--header-height: 50px;
		--sidebar-width: 300px;
		--sidebar-padding: 1rem;
	}

	main {
		display: flex;
		height: 100vh;
		padding-top: var(--header-height);
	}

	.topboi {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 var(--sidebar-padding);
		background-color: #f0f0f0;
		z-index: 10;
		height: var(--header-height);
	}

	.topboi__left h1 {
		margin: 0;
		font-size: 1.2rem;
	}

	.topboi__right {
		display: flex;
		gap: 0.5rem;
	}

	.topboi__right button {
		padding: 0.25rem 0.75rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.sidebar {
		width: var(--sidebar-width);
		height: calc(100vh - var(--header-height));
		position: fixed;
		left: 0;
		top: var(--header-height);
		background-color: #f8f9fa;
		overflow: hidden;
	}

	.sidebar-content {
		height: 100%;
		padding: var(--sidebar-padding);
		overflow-y: auto;
		box-sizing: border-box;
	}

	.sidebar-content input {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid #ced4da;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.sidebar-content ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.sidebar-content li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #e9ecef;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.canvas-container {
		flex-grow: 1;
		margin-left: var(--sidebar-width);
		height: calc(100vh - var(--header-height));
		overflow: hidden;
	}

	canvas {
		width: 100%;
		height: 100%;
	}

	.search-container {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.search-container input {
		flex-grow: 1;
	}

	.add-button {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		font-size: 1.2rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sidebar-content li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #e9ecef;
	}

	.sidebar-content li strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.sidebar-content li p {
		margin: 0;
		font-size: 0.9rem;
		color: #6c757d;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		background-color: white;
		padding: 2rem;
		border-radius: 8px;
		width: 80%;
		max-width: 500px;
	}

	.modal h2 {
		margin-top: 0;
	}

	.modal input,
	.modal textarea {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid #ced4da;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.modal textarea {
		height: 100px;
		resize: vertical;
	}

	.modal-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.modal-buttons button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.modal-buttons button:first-child {
		background-color: #007bff;
		color: white;
	}

	.modal-buttons button:last-child {
		background-color: #6c757d;
		color: white;
	}
</style>
