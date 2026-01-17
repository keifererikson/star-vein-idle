import { ComponentProps } from 'react';

export const HamburgerIcon = ({
  className = 'w-4 h-4',
  ...props
}: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      {...props}
    >
      {/* Icon from Game Icons by GameIcons - https://github.com/game-icons/icons/blob/master/license.txt */}
      <path
        fill="currentColor"
        d="M32 96v64h448V96zm0 128v64h448v-64zm0 128v64h448v-64z"
      />
    </svg>
  );
};
