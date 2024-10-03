.PHONY: default

default: clean start open attachlogs

open:
	@until nc -z localhost 5173 > /dev/null 2>&1; do sleep 0.2; done
	@echo "Opening dashboard server - http://localhost:5173"
	@open http://localhost:5173

start:
	docker-compose -f __declare__/docker-compose.yml up --build -d
	@echo "Monitoring models/**/*.sql to hot reload as views"

attachlogs:
	docker-compose -f __declare__/docker-compose.yml logs --follow

stop:
	docker-compose -f __declare__/docker-compose.yml stop

restart:
	docker-compose -f __declare__/docker-compose.yml restart

clean:
	docker-compose -f __declare__/docker-compose.yml down
	docker-compose -f __declare__/docker-compose.yml rm -f

dev: clean dev-up

dev-up:
	docker-compose -f __declare__/docker-compose.yml up --build