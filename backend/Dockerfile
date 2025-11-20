# Use Node 20 LTS (recommended)
FROM node:20-bullseye

# set working directory
WORKDIR /app

# install netcat (nc) so wait-for-mysql.sh works
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# copy package files first for better caching
COPY package*.json ./

# install dependencies (use npm ci if you have package-lock.json)
RUN npm ci --production || npm install --production

# copy rest of the app
COPY . .

# make wait script executable (ensure it exists)
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# expose the port (informational)
EXPOSE 5000

# optional healthcheck (useful in some platforms)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD nc -z ${DB_HOST:-127.0.0.1} ${DB_PORT:-3306} || exit 1

# final command: wait for DB then start
CMD ["sh", "-c", "/wait-for-mysql.sh && npm start"]
