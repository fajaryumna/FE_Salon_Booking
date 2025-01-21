// next.config.mjs
export default {
  images: {
    domains: ["127.0.0.1"], // Menambahkan domain untuk gambar
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login', // Redirect dari root ke login
        permanent: true, // `true` untuk pengalihan permanen (301), `false` untuk sementara (302)
      },
    ];
  },
};
