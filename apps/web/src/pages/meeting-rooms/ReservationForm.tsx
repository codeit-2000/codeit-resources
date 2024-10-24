import { zodResolver } from "@hookform/resolvers/zod";
import type { Schema } from "@repo/backend/amplify/data/resource";
import TIME_SLOT from "@repo/constants/constants/timeSlot";
import { createReservation } from "@repo/lib/api/reservation";
import {
  getAvailableTimeSlots,
  getCurrentTime,
} from "@repo/lib/utils/timeUtils";
import { reservationSchema } from "@repo/lib/zod-schema/reservation";
import Button from "@src/components/commons/Button";
import Dropdown from "@src/components/commons/Dropdown";
import Input from "@src/components/commons/Input";
import { Controller, FormProvider, useForm } from "react-hook-form";

const TIME_SLOT_ITEMS = getAvailableTimeSlots(TIME_SLOT, getCurrentTime());

type Reservation = Schema["Reservation"]["type"];
type CreateReservation = Omit<Reservation, "resource">;

function ReservationForm() {
  const methods = useForm({
    defaultValues: {
      title: "",
      resourceId: "",
      startTime: "",
      endTime: "",
      // TODO: 멀티셀렉드롭다운 연결
      participants: "f488fd4c-30d1-70c9-0cb6-13e25754b919",
    },
    resolver: zodResolver(reservationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = methods;

  // ts-ignore
  // eslint-disable-next-line
  const onSubmit = async (data: CreateReservation) => {
    // TODO 실제 데이터 처리
    const formData = {
      title: data.title,
      resourceId: "49eeb727-2660-4ea2-9cd9-a2be93184fb9",
      startTime: data.startTime,
      endTime: data.endTime,
      participants: data.participants,
      status: "CONFIRMED",
      date: "2024-10-24",
    };

    console.log(formData);
    const dd = await createReservation(formData);

    console.log(dd);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="md:w-414 h-600 p-30 [&_input]:text-16-400 flex w-full flex-col gap-y-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="title"
          label="미팅 제목"
          register={methods.register("title", {
            required: "미팅 제목을 입력해주세요.",
          })}
        />
        <Controller
          name="resourceId"
          control={control}
          rules={{ required: "회의실을 선택해주세요." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Dropdown variant="meetingRoom" value={value} onChange={onChange}>
              <Dropdown.Toggle
                isError={!!error}
                errorMessage={error ? error.message : ""}
              />
              <Dropdown.Wrapper>
                {/* TODO 타입과 일치하는 리소스 정보 모두 렌더링 */}
                <Dropdown.Item itemValue="" label="선택" />
                <Dropdown.Item
                  itemValue="회의실A의resourceId"
                  label="회의실A"
                />
                <Dropdown.Item
                  itemValue="회의실B의resourceId"
                  label="회의실B"
                />
              </Dropdown.Wrapper>
            </Dropdown>
          )}
        />

        {/* 시간 설정 fieldset */}
        <fieldset className="inline-flex gap-16 [&>div]:grow">
          <div className="w-200">
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "시작 시간을 선택해주세요." }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown variant="startTime" value={value} onChange={onChange}>
                  <Dropdown.Toggle
                    isError={!!error}
                    errorMessage={error ? error.message : ""}
                  />
                  <Dropdown.Wrapper>
                    <Dropdown.ManualItem>직접 입력</Dropdown.ManualItem>
                    {TIME_SLOT_ITEMS.map((item) => (
                      <Dropdown.Item key={item} itemValue={item} />
                    ))}
                  </Dropdown.Wrapper>
                </Dropdown>
              )}
            />
          </div>

          <div className="w-200">
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "종료 시간을 선택해주세요." }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown variant="endTime" value={value} onChange={onChange}>
                  <Dropdown.Toggle
                    isError={!!error}
                    errorMessage={error ? error.message : ""}
                  />
                  <Dropdown.Wrapper>
                    <Dropdown.ManualItem>직접 입력</Dropdown.ManualItem>
                    {TIME_SLOT_ITEMS.map((item) => (
                      <Dropdown.Item key={item} itemValue={item} />
                    ))}
                  </Dropdown.Wrapper>
                </Dropdown>
              )}
            />
          </div>
        </fieldset>

        {/* TODO 멀티 셀렉으로 변경 */}
        <Input id="p" label="참여자" />

        <div className="mt-auto">
          <Button variant="primary" type="submit">
            예약하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ReservationForm;
