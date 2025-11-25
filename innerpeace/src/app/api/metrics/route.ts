import { NextResponse } from 'next/server';

export async function GET() {
  const metrics = `
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 1

# HELP app_uptime_seconds Application uptime in seconds
# TYPE app_uptime_seconds gauge
app_uptime_seconds ${Math.floor(process.uptime())}

# HELP nodejs_memory_usage_bytes Node.js memory usage
# TYPE nodejs_memory_usage_bytes gauge
nodejs_memory_usage_bytes{type="rss"} ${process.memoryUsage().rss}
nodejs_memory_usage_bytes{type="heapTotal"} ${process.memoryUsage().heapTotal}
nodejs_memory_usage_bytes{type="heapUsed"} ${process.memoryUsage().heapUsed}
`;

  return new NextResponse(metrics, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
