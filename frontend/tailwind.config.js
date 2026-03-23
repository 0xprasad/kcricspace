export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pavilion: {
          DEFAULT: '#071910',
          elevated: '#10261b',
          panel: '#143123',
          accent: '#ffbd59',
          text: '#e8f5ea',
          muted: '#93ab97',
          success: '#7ae582'
        }
      },
      boxShadow: {
        panel: '0 25px 50px -12px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
};
