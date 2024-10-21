import Button from "@src/components/commons/Button";
import Input from "@src/components/commons/Input";
import { FormProvider, useForm } from "react-hook-form";

function ReservationForm() {
  const method = useForm({});

  return (
    <FormProvider {...method}>
      <form className="md:w-414 h-600 p-30 [&_input]:text-16-400 flex w-full flex-col gap-y-16">
        <Input id="title" label="미팅 제목" />
        <Input id="name" label="회의실" />
        <fieldset className="inline-flex gap-16 [&>div]:grow">
          <Input id="startTime" label="시작 시간" />
          <Input id="endTime" label="종료 시간" />
        </fieldset>
        <Input id="p" label="참여자" />

        <div className="mt-auto">
          <Button variant="primary">예약하기</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ReservationForm;
