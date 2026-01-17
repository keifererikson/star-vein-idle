import { ComponentProps } from 'react';

export const CargoHoldIcon = ({
  className = 'w-4 h-4',
  ...props
}: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      {/* Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License */}
      <path
        fill="currentColor"
        d="M20.502 5.922L12 1L3.498 5.922L12 10.845zM2.5 7.656V17.5l8.5 4.921v-9.844zM13 22.42l8.5-4.921V7.656l-8.5 4.92z"
      />
    </svg>
  );
};
