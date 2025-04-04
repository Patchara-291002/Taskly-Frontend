/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        esmExternals: true
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'profile.line-scdn.net'
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true // Only for development
    }
};

export default nextConfig;
