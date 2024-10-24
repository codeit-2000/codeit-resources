import { zodResolver } from "@hookform/resolvers/zod";
import TIME_SLOT from "@repo/constants/constants/timeSlot";
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

function ReservationForm() {
  const methods = useForm({
    defaultValues: {
      title: "",
      resourceId: "",
      startTime: "",
      endTime: "",
      // startTimeOption: "", // 시작 시간 옵션 (드롭다운 값)
      // startTimeManual: "", // 시작 시간 수동 입력 값
      // endTimeOption: "", // 종료 시간 옵션 (드롭다운 값)
      // endTimeManual: "", // 종료 시간 수동 입력 값
      participants: "",
    },
    resolver: zodResolver(reservationSchema),
    // mode: "onChange",
    // reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  // 폼 제출 시 처리 함수
  // ts-ignore
  // eslint-disable-next-line
  const onSubmit = (data: any) => {
    // // 드롭다운에서 "직접 입력"을 선택했는지 확인하고, 해당 값을 사용
    const startTime =
      data.startTimeOption === "manual"
        ? data.startTimeManual
        : data.startTimeOption;
    const endTime =
      data.endTimeOption === "manual" ? data.endTimeManual : data.endTimeOption;

    // 최종 제출 데이터 구성
    const formData = {
      title: data.title,
      resourceId: data.resourceId,
      startTime,
      endTime,
      participants: data.participants,
    };

    console.log(formData);
    // 여기에 폼 데이터를 서버로 전송하거나 추가적인 처리를 구현
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
          {...methods.register("title", {
            required: "미팅 제목을 입력해주세요.",
          })}
          // error={errors.title?.message}
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
                      <Dropdown.Item itemValue={item} />
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
                      <Dropdown.Item itemValue={item} />
                    ))}
                  </Dropdown.Wrapper>
                </Dropdown>
              )}
            />
          </div>
        </fieldset>
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
