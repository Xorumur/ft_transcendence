# Launch the front of the project
front:
	@cd frontend && npm run dev
# The --watch option make it so that the server restarts when a file changes.
back:
	@cd backend && npm run --watch start:dev