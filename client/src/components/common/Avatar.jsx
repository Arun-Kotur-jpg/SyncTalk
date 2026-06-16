import { getInitials } from '../../utils/formatDate';

const Avatar = ({ name, src, size = 'md', online, className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const dotSizes = {
    sm: 'w-2.5 h-2.5 border',
    md: 'w-3 h-3 border-2',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-4 h-4 border-2',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-dark-700`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary-500 to-primary-700
            flex items-center justify-center font-semibold text-white ring-2 ring-dark-700`}
        >
          {getInitials(name)}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full border-dark-900
            ${online ? 'bg-emerald-500' : 'bg-dark-500'}`}
        />
      )}
    </div>
  );
};

export default Avatar;
