/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    REST_API_ENDPOINT: 'http://localhost:8000/api/v1/'
    // REST_API_ENDPOINT: 'https://flynar-rest-api-production.up.railway.app/api/v1/'
  }
}

module.exports = nextConfig
