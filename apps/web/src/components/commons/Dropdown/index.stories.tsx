import {
  ORDER_OPTIONS,
  ROLE_OPTIONS,
} from "@repo/constants/constants/dropdownConstants";
import Dropdown from "@src/components/commons/Dropdown";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = {
  title: "Web Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  subcomponents: {
    Toggle: Dropdown.Toggle,
    Wrapper: Dropdown.Wrapper,
    Item: Dropdown.Item,
    ManualItem: Dropdown.ManualItem,
  },
} as Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RoleDropdown: Story = {
  render: () => {
    const [role, setRole] = useState("MEMBER");

    return (
      <div className="flex">
        <Dropdown
          variant="role"
          value={role}
          onChange={(newValue) => setRole(newValue)}
        >
          <Dropdown.Toggle />
          <Dropdown.Wrapper>
            {Object.entries(ROLE_OPTIONS).map(([itemValue, label]) => (
              <Dropdown.Item
                key={itemValue}
                itemValue={itemValue as string}
                label={label as string}
              />
            ))}
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
    );
  },
};

export const OrderDropdown: Story = {
  render: () => {
    const [orderBy, setOrderBy] = useState("latest");

    return (
      <div className="px-100 flex">
        <Dropdown
          variant="order"
          value={orderBy}
          onChange={(newValue) => setOrderBy(newValue)}
        >
          <Dropdown.Toggle />
          <Dropdown.Wrapper>
            {Object.entries(ORDER_OPTIONS).map(([itemValue, label]) => (
              <Dropdown.Item
                key={`dropdown_item_${itemValue}`}
                itemValue={itemValue as string}
                label={label as string}
              />
            ))}
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
    );
  },
};

export const TimeDropdown: Story = {
  render: () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startError, setStartError] = useState({
      isError: false,
      errorMessage: "",
    });
    const [endError, setEndError] = useState({
      isError: false,
      errorMessage: "",
    });

    const validateTimeFormat = (time: string) => {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      return timeRegex.test(time);
    };

    const handleStartTimeChange = (value: string) => {
      setStartTime(value);
      if (!validateTimeFormat(value)) {
        setStartError({
          isError: true,
          errorMessage: "시간 형식이 올바르지 않아요.",
        });
      } else {
        setStartError({ isError: false, errorMessage: "" });
      }
    };

    const handleEndTimeChange = (value: string) => {
      setEndTime(value);
      if (!validateTimeFormat(value)) {
        setEndError({
          isError: true,
          errorMessage: "시간 형식이 올바르지 않아요.",
        });
      } else {
        setEndError({ isError: false, errorMessage: "" });
      }
    };

    return (
      <div className="flex gap-20">
        {/* 시작 시간 Dropdown */}
        <div className="w-200">
          <Dropdown
            variant="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
          >
            <Dropdown.Toggle
              isError={startError.isError}
              errorMessage={startError.errorMessage}
            />
            <Dropdown.Wrapper>
              <Dropdown.ManualItem>직접 입력</Dropdown.ManualItem>
              <Dropdown.Item itemValue="10:00" />
              <Dropdown.Item itemValue="11:00" />
            </Dropdown.Wrapper>
          </Dropdown>
        </div>

        {/* 종료 시간 Dropdown */}
        <div className="w-200">
          <Dropdown
            variant="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
          >
            <Dropdown.Toggle
              isError={endError.isError}
              errorMessage={endError.errorMessage}
            />
            <Dropdown.Wrapper>
              <Dropdown.ManualItem>직접 입력</Dropdown.ManualItem>
              <Dropdown.Item itemValue="12:00" />
              <Dropdown.Item itemValue="13:00" />
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </div>
    );
  },
};

export const MeetingRoomDropdown: Story = {
  render: () => {
    const [meetingRoom, setMeetingRoom] = useState("");

    return (
      <div className="flex">
        <div className="w-320">
          <Dropdown
            variant="meetingRoom"
            value={meetingRoom}
            onChange={(newValue) => setMeetingRoom(newValue)}
          >
            <Dropdown.Toggle />
            <Dropdown.Wrapper>
              <Dropdown.Item itemValue="회의실 1" />
              <Dropdown.Item itemValue="회의실 2" />
              <Dropdown.Item itemValue="회의실 3" />
              <Dropdown.Item itemValue="회의실 4" />
              <Dropdown.Item itemValue="회의실 5" />
              <Dropdown.Item itemValue="회의실 6" />
              <Dropdown.Item itemValue="회의실 7" />
              <Dropdown.Item itemValue="회의실 8" />
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </div>
    );
  },
};
