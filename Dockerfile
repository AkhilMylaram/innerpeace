# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --cache /tmp/.npm
COPY . .
RUN npm run build

# Runtime stage - using minimal alpine
FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs --ingroup nodejs && \
    apk add --no-cache wget && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/public/* ./public/ 2>/dev/null || true

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME="0.0.0.0" NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["node", "server.js"]
