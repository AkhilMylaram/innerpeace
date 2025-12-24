# Multi-stage build for minimal image
FROM alpine:latest AS builder
RUN apk add --no-cache wget ca-certificates
COPY healthcheck.sh /healthcheck.sh
RUN chmod +x /healthcheck.sh

# Minimal runtime
FROM alpine:latest
RUN apk add --no-cache wget ca-certificates && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/* && \
    adduser -D -s /bin/sh healthcheck
COPY --from=builder /healthcheck.sh /healthcheck.sh
USER healthcheck
CMD ["/healthcheck.sh"]
