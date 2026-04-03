# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install Python and dependencies
RUN apk add --no-cache python3 py3-pip
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt --break-system-packages

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.ts ./
COPY --from=build /app/backend ./backend

RUN npm install --omit=dev
RUN npm install -g tsx

EXPOSE 3000

CMD ["tsx", "server.ts"]
