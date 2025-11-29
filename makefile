help:
	@echo "Read makefile"

dev_up:
	docker compose -f ./docker-compose.dev.yml up -d --build

dev_down:
	docker compose -f ./docker-compose.dev.yml down

frontend_dev:
	@echo 'Run Frontend Dev Server'
	pnpm --prefix ./frontend run dev

backend_dev:
	@echo 'Run Backend Dev Server'
	cd backend && air
