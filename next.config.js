/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ixqwzlejpwbxpkrxhwke.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/avatar_image/**",
      },
    ],
  },
};

https: module.exports = nextConfig;
