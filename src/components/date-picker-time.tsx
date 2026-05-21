"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerTime({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const [open, setOpen] = React.useState(false);

  function handleDateChange(newDate?: Date) {
    if (!date) {
      setDate(newDate);
      return;
    }
    if (!newDate) {
      setDate(undefined);
      return;
    }

    const next = new Date(date);
    next.setFullYear(newDate.getFullYear());
    next.setMonth(newDate.getMonth());
    next.setDate(newDate.getDate());

    setDate(next);
  }

  function handleTimeChange(time: string) {
    if (!date) return;
    console.log({ date });

    const [hours, minutes, seconds] = time.split(":").map(Number);
    const next = new Date(date);
    next.setHours(hours);
    next.setMinutes(minutes);
    next.setSeconds(seconds);
    console.log({ hours, minutes, seconds, next });

    setDate(next);
  }

  return (
    <FieldGroup className="mx-auto max-w-xs flex flex-col gap-1">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Deadline</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          {/* trigger */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                handleDateChange(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32 gap-1">
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={(date && format(date, "HH:mm:ss")) || ""}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          disabled={!date}
          onChange={(e) => {
            e.preventDefault();
            handleTimeChange(e.target.value);
          }}
        />
      </Field>
    </FieldGroup>
  );
}
