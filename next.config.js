/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoBasePath = '/Arne-Slot-OUT-Petition';

const nextConfig = {
    ...(isGitHubPages
        ? {
            output: 'export',
            basePath: repoBasePath,
            assetPrefix: `${repoBasePath}/`,
            trailingSlash: true,
        }
        : {}),
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
