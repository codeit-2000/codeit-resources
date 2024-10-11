import { ComponentProps, ReactNode } from 'react';
import './index.css';

// 아래처럼 주석 달면, 스토리북에도 반영이 됩니다.
interface ButtonProps extends ComponentProps<'button'> {
  /** 버튼의 스타일 타입을 지정합니다. */
  variant: 'primary' | 'secondary';
  /** 버튼의 활성화 여부를 지정합니다. */
  isDisabled?: boolean;
  /** 버튼의 내용을 지정합니다. */
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  isDisabled = false,
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={`button ${variant}`}
    disabled={isDisabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
