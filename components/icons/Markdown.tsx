export default function Markdown({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 15 15">
      <path
        fill="#999999"
        d="m2.5 5.5l.354-.354A.5.5 0 0 0 2 5.5zm2 2l-.354.354l.354.353l.354-.353zm2-2H7a.5.5 0 0 0-.854-.354zm4 4l-.354.354l.354.353l.354-.353zM1.5 3h12V2h-12zm12.5.5v8h1v-8zm-.5 8.5h-12v1h12zM1 11.5v-8H0v8zm.5.5a.5.5 0 0 1-.5-.5H0A1.5 1.5 0 0 0 1.5 13zm12.5-.5a.5.5 0 0 1-.5.5v1a1.5 1.5 0 0 0 1.5-1.5zM13.5 3a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 13.5 2zm-12-1A1.5 1.5 0 0 0 0 3.5h1a.5.5 0 0 1 .5-.5zM3 10V5.5H2V10zm-.854-4.146l2 2l.708-.708l-2-2zm2.708 2l2-2l-.708-.708l-2 2zM6 5.5V10h1V5.5zm4-.5v4.5h1V5zM8.146 7.854l2 2l.708-.708l-2-2zm2.708 2l2-2l-.708-.708l-2 2z"
      />
    </svg>
  );
}
