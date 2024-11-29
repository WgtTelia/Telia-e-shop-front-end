/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true, //SWC is generally faster than the traditional Terser minifier.
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
