# ============ 构建阶段 ============
FROM node:22-alpine AS build
WORKDIR /app

# 先装依赖（利用 Docker 层缓存）
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# 再拷源码构建
COPY . .
RUN npm run build

# ============ 运行阶段 ============
FROM nginx:1.27-alpine AS runtime

# 自定义 nginx 配置：gzip、缓存、SPA 回退
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5585
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:5585/ > /dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
