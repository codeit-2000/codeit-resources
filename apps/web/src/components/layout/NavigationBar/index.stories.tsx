import { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "@src/components/layout/NavigationBar";
import { Provider, createStore } from "jotai";
import isMobileAtom from "@src/store/mobileAtom";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof NavigationBar> = {
  title: "Components/NavigationBar",
  component: NavigationBar,
  decorators: [
    (Story, context) => {
      const isMobile = context.parameters.isMobile ?? false;
      const store = createStore();
      store.set(isMobileAtom, isMobile);

      return (
        <Provider store={store}>
          <MemoryRouter>
            <div>
              <Story />
            </div>
          </MemoryRouter>
        </Provider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof NavigationBar>;

const customViewports = {
  mobile: {
    name: "Mobile",
    styles: {
      width: "375px",
    },
  },
  tablet: {
    name: "Tablet",
    styles: {
      width: "768px",
    },
  },
  desktop: {
    name: "Desktop",
    styles: {
      width: "1280px",
    },
  },
};

export const Mobile: Story = {
  parameters: {
    isMobile: true,
    viewport: {
      defaultViewport: customViewports.mobile,
    },
  },
};

export const Desktop: Story = {
  parameters: {
    isMobile: false,
    viewport: {
      defaultViewport: customViewports.desktop,
    },
  },
};
