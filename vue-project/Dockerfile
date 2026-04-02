# ─── Stage 1 : Build ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ─── Stage 2 : Serve (Nginx) ────────────────────────────────────────────────
FROM nginx:stable-alpine

# Copie le build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie la config Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
