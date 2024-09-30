/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true, //SWC is generally faster than the traditional Terser minifier.
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: 'upgrade-insecure-requests',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
