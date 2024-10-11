import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '.';

const meta = {
  title: 'Common Components/Button', // 스토리북 폴더 구조라 생각하시면 됩니다.
  component: Button,
  tags: ['autodocs'],
  args: {
    isDisabled: false, // 이렇게 기본값 설정할 수 있습니다.
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본적으로 이런식으로만 적어도 될 거 같아요.
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '어렵다',
  },
};

// 여기까진 안 적어도 되는데 그냥 이런식으로 render 하는 게 있다~ 정도만
export const Secondary: Story = {
  render: () => (
    <div>
      <Button variant="secondary">안녕</Button>
    </div>
  ),
};

// 이것도 그냥 이런식으로 할 수 있다~ 근데 모달 같은 거는 이렇게 만들면 될 듯?!?
export const Disabled: Story = {
  render: () => {
    const ButtonActive = () => {
      const [isActive, setIsActive] = useState(true);

      const handleActive = () => {
        setIsActive(!isActive);
      };

      return (
        <div>
          <Button variant="primary" isDisabled={isActive}>
            {isActive ? '비활성화' : '활성화'}
          </Button>
          <Button variant="secondary" onClick={handleActive}>
            버튼 상태 변경하기
          </Button>
        </div>
      );
    };
    return <ButtonActive />;
  },
};
