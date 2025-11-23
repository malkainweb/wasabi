"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forumFont, notoSansFont } from "@/app/utils/font";

// Generate times in 30min intervals (customize as needed)
function generateTimeOptions(interval = 30) {
  const options: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += interval) {
      const date = new Date();
      date.setHours(h, m, 0, 0);
      options.push(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
  }
  return options;
}
const timeOptions = generateTimeOptions();

const fields = [
  { name: "name", placeholder: "YOUR NAME", type: "text" },
  { name: "email", placeholder: "YOUR MAIL", type: "email" },
  { name: "event", placeholder: "EVENT NAME", type: "text" },
];

// PickerBox for date & time
function PickerBox({
  value,
  onChange,
  placeholder,
  type,
  variants,
  icon = "calendar",
}: {
  value: string | Date | null;
  onChange: (val: any) => void;
  placeholder: string;
  type: "date" | "time";
  variants?: any;
  icon?: "calendar" | "clock";
}) {
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    if (!openTime) return;
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenTime(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openTime]);

  // Format for date display
  const formatDate = (dateVal: Date | null) =>
    dateVal
      ? dateVal.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : placeholder;

  return (
    <motion.div
      ref={wrapperRef}
      variants={variants}
      className="w-full flex items-center bg-[#E9DECA] rounded-xl px-6 py-4 font-light tracking-widest mb-1 cursor-pointer select-none relative"
      tabIndex={0}
      role="button"
      aria-label={placeholder}
      onClick={() => {
        if (type === "date") setOpenDate(true);
        else setOpenTime(true);
      }}
    >
      {type === "date" ? (
        <>
          {/* Display selected date or placeholder */}
          <span className="flex-1 text-[#3E2E1C] text-sm pointer-events-none select-none">
            {formatDate(value as Date | null)}
          </span>
          <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <Calendar className="w-6 h-6 text-[#a8916f]" />
          </span>
          <DatePicker
            selected={value as Date | null}
            onChange={(date) => {
              onChange(date);
              setOpenDate(false);
            }}
            onSelect={() => setOpenDate(false)}
            placeholderText={placeholder}
            dateFormat="MMMM d, yyyy"
            open={openDate}
            onClickOutside={() => setOpenDate(false)}
            popperPlacement="bottom"
            calendarClassName="!bg-white !rounded-xl !shadow-xl !p-2 custom-datepicker"
            wrapperClassName="absolute left-0 top-0 w-full h-full"
            withPortal={false}
            customInput={
              <input
                style={{
                  opacity: 0,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
                tabIndex={-1}
              />
            }
          />
          {/* Calendar custom styling */}
          <style jsx global>{`
            .custom-datepicker .react-datepicker__day--selected,
            .custom-datepicker .react-datepicker__day--keyboard-selected {
              background-color: #b59166 !important;
              color: #fff9ee !important;
            }
            .custom-datepicker .react-datepicker__day--today {
              border-color: #b59166 !important;
            }
            .custom-datepicker .react-datepicker__header {
              background-color: #f4efe1 !important;
              border-bottom: 1px solid #b59166;
            }
            .custom-datepicker .react-datepicker__day {
              font-family: inherit;
            }
          `}</style>
        </>
      ) : (
        <>
          {/* Time Picker Dropdown */}
          <span className="flex-1 text-[#3E2E1C] text-sm pointer-events-none select-none">
            {placeholder}
          </span>
          <Clock className="w-6 h-6 text-[#a8916f] ml-2 pointer-events-none" />
          {openTime && (
            <div
              data-lenis-prevent
              className="absolute z-50 left-0 top-full w-full mt-2 bg-[#F4EFE1] border border-[#C0A079]/50 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scroll"
            >
              {timeOptions.map((opt) => (
                <div
                  key={opt}
                  className={`px-6 py-2 hover:bg-[#b59166] hover:text-white text-[#3E2E1C] tracking-widest cursor-pointer select-none ${
                    value === opt ? "bg-[#b59166] text-white" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt);
                    setOpenTime(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function ReserveForm() {
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [extra, setExtra] = useState("");
  const [form, setForm] = useState({ name: "", email: "", event: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.13 } },
  };

  const item = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.14 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full mt-[7.5rem] flex items-center justify-center px-3 lg:px-4"
    >
      {/* stack on mobile; two columns on lg+ */}
      <motion.div className="w-full max-w-[940px] lg:max-w-[90%] lg:w-[150rem] flex flex-col lg:flex-row items-stretch gap-6">
        {/* Left column */}
        <motion.div
          variants={item}
          className="w-full items-center lg:items-start flex flex-col justify-center lg:pl-4 text-center lg:text-left"
        >
          <motion.h1
            variants={item}
            className={`text-[25px]  lg:text-[60px] tracking-[0.2em] lg:tracking-[1rem] text-[#3E2E1C] font-light leading-[1.15] mb-4 lg:mb-6 ${forumFont.className}`}
          >
            HAVE AN EVENT ? <br />
            RESERVE A SPOT
          </motion.h1>
          <motion.p
            variants={item}
            className={`${notoSansFont.className} text-[0.81rem] sm:text-base lg:text-[1.1rem] font-normal text-center lg:text-left`}
          >
            Join Us Monday Through Sunday | 12 PM – 11 PM
            <br />
            Fine Dining, Anytime You Desire.
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.form
          variants={item}
          className={`lg:w-full w-[40rem] mx-auto max-w-full font-light  lg:mx-5 bg-[#F4EFE1] rounded-[24px] lg:rounded-3xl  lg:px-10 py-6  lg:py-8 flex flex-col items-center shadow-sm ${notoSansFont.className}`}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <motion.div
            variants={item}
            className={` ${forumFont.className} text-[1.2rem]  text-center  tracking-[0.35rem] lg:tracking-[0.4rem] mb-4 font-[350] text-[#31291B]`}
          >
            FILL OUT THE FORM
          </motion.div>
          <div className="border-b mb-3 lg:hidden border-[#C0A079]/50" />
          <div className="w-full px-4 flex itc flex-col gap-3   lg:px-0 ">
            {/* Inputs */}
            {fields.map(({ name, placeholder, type }) => (
              <motion.input
                key={name}
                variants={item}
                name={name}
                type={type}
                value={form[name as keyof typeof form]}
                placeholder={placeholder}
                autoComplete="on"
                onChange={handleChange}
                className="w-full rounded-2xl lg:rounded-xl bg-[#E9DECA] placeholder-[#554636] text-[#3E2E1C] px-5 sm:px-6 py-4 text-sm tracking-widest outline-none focus:ring-2 focus:ring-[#D5C5A6] border-none mb-1"
              />
            ))}

            {/* People Count */}
            <motion.div
              variants={item}
              className="w-full flex items-center justify-between bg-[#E9DECA] rounded-2xl px-5 sm:px-6 py-4 font-medium text-lg tracking-[0.25em] mb-1"
            >
              <span className="uppercase  text-[#3E2E1C] text-xs sm:text-sm tracking-[0.22em] font-light">
                HOW MANY PEOPLE ARE YOU EXPECTING
              </span>
              <div className="flex items-center gap-3 ml-4">
                <button
                  type="button"
                  aria-label="Add one"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F9F4E9] text-xl text-[#3E2E1C] cursor-pointer font-semibold shadow-sm hover:bg-white/40 transition"
                  onClick={() => setPeople((p) => Math.min(p + 1, 99))}
                >
                  <i className="bi bi-plus w-[20px]" />
                </button>
                <span className="min-w-[1rem] text-center text-lg font-semibold text-[#3E2E1C]">
                  {people}
                </span>
                <button
                  type="button"
                  aria-label="Remove one"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F9F4E9] text-xl text-[#3E2E1C] cursor-pointer font-semibold shadow-sm hover:bg-white/40 transition"
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                >
                  <i className="bi bi-dash w-[20px]" />
                </button>
              </div>
            </motion.div>

            {/* Date & Time */}
            <PickerBox
              value={date}
              onChange={setDate}
              placeholder="SELECT DATE"
              type="date"
              icon="calendar"
              variants={item}
            />
            <PickerBox
              value={time}
              onChange={setTime}
              placeholder="SELECT TIME"
              type="time"
              icon="clock"
              variants={item}
            />

            {/* Extra */}
            <motion.textarea
              variants={item}
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              rows={3}
              placeholder="ENTER EXTRA DETAILS"
              className="w-full rounded-2xl lg:rounded-xl bg-[#ECE3D2] placeholder-[#554636] text-[#49382A] px-6 py-4 font-light text-sm tracking-widest outline-none focus:ring-2 focus:ring-[#D5C5A6] border-none mb-1 resize-none"
            />
          </div>

          <motion.button
            variants={item}
            type="submit"
            className={`mt-3 w-[68%] lg:w-fit mx-auto px-[2rem] py-[0.85rem] bg-[#C0A078] text-[#020604] font-semibold rounded-full tracking-widest hover:bg-[#997b53] transition-colors ${notoSansFont.className}`}
          >
            BOOK NOW
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
