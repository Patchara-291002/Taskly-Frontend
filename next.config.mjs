// /** @type {import('next').NextConfig} */
// const nextConfig = {};

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
