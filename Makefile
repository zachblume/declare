.PHONY: default

default: start open

open:
	@until nc -z localhost 5173 > /dev/null 2>&1; do sleep 0.2; done
	@echo "Opening http://localhost:5173"
	@open http://localhost:5173

start:
	docker-compose -f config/docker-compose.yml up -d

stop:
	docker-compose -f config/docker-compose.yml stop

restart:
	docker-compose -f config/docker-compose.yml restart

clean:
	docker-compose -f config/docker-compose.yml down
	docker-compose -f config/docker-compose.yml rm -f