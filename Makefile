.PHONY: default

default: start open

open:
	@until nc -z localhost 5173 > /dev/null 2>&1; do sleep 0.2; done
	@# Pause 200ms to wait for the server to start
	@sleep 0.2
	@echo "Opening dashboard server - http://localhost:5173"
	@open http://localhost:5173

start:
	docker-compose -f .declare/docker-compose.yml up -d
	@echo "Monitoring models/**/*.sql to hot reload as views"

stop:
	docker-compose -f .declare/docker-compose.yml stop

restart:
	docker-compose -f .declare/docker-compose.yml restart

clean:
	docker-compose -f .declare/docker-compose.yml down
	docker-compose -f .declare/docker-compose.yml rm -f