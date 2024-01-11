import Picker from "@emoji-mart/react";

export default function EmojiPicker({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string) => void;
}) {
  return (
    <Picker
      theme="dark"
      data={async () => {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
        );
        return response.json();
      }}
      onEmojiSelect={(e: any) => {
        onEmojiSelect(e.native);
      }}
    />
  );
}
