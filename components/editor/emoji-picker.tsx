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
          id: "party_parrot_gif",
          name: "Party Parrot",
          keywords: ["dance", "dancing", "gif"],
          skins: [{ src: `${window.origin}/icon/gif/parrot.gif` }],
        },
        {
          id: "party_face_gif",
          name: "Party Face",
          keywords: ["Party", "Face", "gif"],
          skins: [{ src: `${window.origin}/icon/gif/party-face.gif` }],
        },
      ],
    },
  ];

  return (
    <Picker
      theme="dark"
      custom={custom}
      data={async () => {
        const response = await fetch(
          "https://img.aoau.top/iconce/data.json" // "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
        );
        return response.json();
      }}
      onEmojiSelect={(e: any) => {
        onEmojiSelect(e.native, e.src);
      }}
    />
  );
}
