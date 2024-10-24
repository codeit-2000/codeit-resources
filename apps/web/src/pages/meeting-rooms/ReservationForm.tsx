import { zodResolver } from "@hookform/resolvers/zod";
import TIME_SLOT from "@repo/constants/constants/timeSlot";
import {
  createReservation,
  updateReservation,
} from "@repo/lib/api/reservation";
import { getResourceList } from "@repo/lib/api/resource";
import { Reservation, Resource } from "@repo/lib/api/utils";
import {
  getAvailableTimeSlots,
  getCurrentTime,
} from "@repo/lib/utils/timeUtils";
import { reservationSchema } from "@repo/lib/zod-schema/reservation";
import Button from "@src/components/commons/Button";
import Dropdown from "@src/components/commons/Dropdown";
import Input from "@src/components/commons/Input";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

const TIME_SLOT_ITEMS = getAvailableTimeSlots(TIME_SLOT, getCurrentTime());

type CreateReservation = Omit<Reservation, "resource">;
type CreateReservationData = Pick<
  Reservation,
  "title" | "resourceId" | "startTime" | "endTime" | "participants"
>;
type ReservationFormData = CreateReservation & { id?: string };

interface ReservationFormProps {
  actionType: "create" | "update";
  reservationData?: ReservationFormData;
}

function ReservationForm({
  actionType,
  reservationData,
}: ReservationFormProps) {
  const [roomList, setRoomList] = useState<Resource[]>([]);

  const methods = useForm<CreateReservationData>({
    defaultValues: {
      title: reservationData?.title || "",
      resourceId: reservationData?.resourceId || "",
      startTime: reservationData?.startTime || "",
      endTime: reservationData?.endTime || "",
      // TODO: 멀티셀렉드롭다운 연결
      participants: reservationData?.participants || [],
    },
    resolver: zodResolver(reservationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data: CreateReservationData) => {
    const formData = {
      title: data.title,
      resourceId: data.resourceId,
      startTime: data.startTime,
      endTime: data.endTime,
      participants: [
        "f488fd4c-30d1-70c9-0cb6-13e25754b919",
        "c4d80dbc-50f1-70a3-d651-cca949d01276",
      ],
      date: "2024-10-25", // TODO: 실제 날짜로 변경 필요
    };

    // actionType에 따라 예약 생성 또는 업데이트
    if (actionType === "create") {
      const { data: reservation, errors } = await createReservation(
        formData as CreateReservation,
      );

      if (errors) {
        console.error("예약 실패...", errors);
        return;
      }
      console.log("예약 성공!", reservation);
    } else if (actionType === "update" && reservationData?.id) {
      const updateFormData = { ...formData, id: reservationData.id };
      const { data: updatedReservation, errors } = await updateReservation(
        updateFormData as ReservationFormData,
      );

      if (errors) {
        console.error("예약 수정 실패...", errors);
        return;
      }
      console.log("예약 수정 성공!", updatedReservation);
    }
  };

  // 리소스 목록을 가져와 roomList 업데이트
  useEffect(() => {
    const fetchRooms = async () => {
      // @ts-expect-error eslint-disable-next-line
      const { data: rooms } = await getResourceList({ resourceType: "ROOM" });
      setRoomList(rooms);
    };

    fetchRooms();
  }, []);

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
                {roomList?.map((room) => (
                  <Dropdown.Item itemValue={room.id} label={room.name} />
                ))}
              </Dropdown.Wrapper>
            </Dropdown>
          )}
        />

        {/* 시간 설정 fieldset */}
        <fieldset className="inline-flex gap-16 [&>div]:grow">
          <div className="">
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

          <div className="">
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
            {actionType === "create" ? "예약하기" : "예약 수정"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ReservationForm;
