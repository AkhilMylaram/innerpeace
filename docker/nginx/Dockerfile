# Minimal nginx with optimizations
FROM nginx:alpine-slim
RUN apk add --no-cache wget && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
