export default function Publications() {
  return (
    <div
      className="
        w-full
        h-[150vh]                /* mobile height: adjust as needed */
        h-[320vh]
        bg-no-repeat
        bg-contain               /* mobile: show full image without cropping */
        sm:bg-cover              /* from small screens upward: cover */
        bg-top sm:bg-center      /* mobile: focus top, desktop: center */
      "
      style={{ backgroundImage: "url('/assets/publicattions.jpg')" }}
    />
  );
}