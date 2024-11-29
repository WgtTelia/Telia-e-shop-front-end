/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true, //SWC is generally faster than the traditional Terser minifier.
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ];
    },
};

export default nextConfig;
