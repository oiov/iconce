import Picker from "@emoji-mart/react";

export default function EmojiPicker({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string, src?: string) => void;
}) {
  const custom = [
    {
      id: "gifs",
      name: "GIFs",
      emojis: [
        {
          id: "party_parrot",
          name: "Party Parrot",
          keywords: ["dance", "dancing"],
          skins: [{ src: `${window.origin}/icon/gif/parrot.gif` }],
        },
      ],
    },
  ];

  return (
    <Picker
      theme="dark"
      data={async () => {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
        );
        return response.json();
      }}
      custom={custom}
      onEmojiSelect={(e: any) => {
        onEmojiSelect(e.native, e.src);
      }}
    />
  );
}
