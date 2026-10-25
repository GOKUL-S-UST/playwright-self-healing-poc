import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export default function Button({ className = '', variant = 'primary', ...props }: Props) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props} />;
}
