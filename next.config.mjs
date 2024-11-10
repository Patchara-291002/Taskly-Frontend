/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
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
        ],
    },
};

export default nextConfig;
