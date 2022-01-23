infra:
	$(call log, "Starting docker containers")
	@echo "Starting docker containers"

	cd tasks-rest-api && docker-compose up 

node_modules:
	$(call log, "Installing dependencies")
	
	@echo "Installing dependencies"
	@echo "Installing front-end dependencies"

	cd tasks-front-end && rm -rf node_modules
	cd tasks-front-end && npm cache clean --force
	cd tasks-front-end && npm install


	@echo "Installing back-end dependencies"

	cd tasks-rest-api && rm -rf node_modules
	cd tasks-rest-api && yarn cache clean --force
	cd tasks-rest-api && yarn install

start-front:
	$(call log, "Starting dev server")

	@echo "Starting front-end server"
	cd tasks-front-end && npm start 

start-back:
	$(call log, "Starting dev server")

	@echo "Starting back-end server"
	cd tasks-rest-api && yarn start:dev 



rules := \
	infra \
	node_modules \
	start-front \
	start-back \

.PHONY: $(rules)
