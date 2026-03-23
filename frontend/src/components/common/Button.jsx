export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const styles =
    variant === 'secondary'
      ? 'border border-white/20 bg-transparent text-pavilion-text hover:bg-white/5'
      : 'bg-pavilion-accent text-black hover:brightness-105';
  return (
    <button className={`rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};
