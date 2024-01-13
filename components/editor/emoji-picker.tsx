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
          id: "001_1f600_gif",
          name: "1f600 Gif",
          keywords: ["1f600", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif",
            },
          ],
        },
        {
          id: "001_1f600_gif",
          name: "1f600 Gif",
          keywords: ["1f600", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif",
            },
          ],
        },
        {
          id: "001_1f603_gif",
          name: "1f603 Gif",
          keywords: ["1f603", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f603/512.gif",
            },
          ],
        },
        {
          id: "001_1f604_gif",
          name: "1f604 Gif",
          keywords: ["1f604", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f604/512.gif",
            },
          ],
        },
        {
          id: "001_1f601_gif",
          name: "1f601 Gif",
          keywords: ["1f601", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f601/512.gif",
            },
          ],
        },
        {
          id: "001_1f606_gif",
          name: "1f606 Gif",
          keywords: ["1f606", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/512.gif",
            },
          ],
        },
        {
          id: "001_1f605_gif",
          name: "1f605 Gif",
          keywords: ["1f605", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f605/512.gif",
            },
          ],
        },
        {
          id: "001_1f602_gif",
          name: "1f602 Gif",
          keywords: ["1f602", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f602/512.gif",
            },
          ],
        },
        {
          id: "001_1f923_gif",
          name: "1f923 Gif",
          keywords: ["1f923", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f923/512.gif",
            },
          ],
        },
        {
          id: "001_1f62d_gif",
          name: "1f62d Gif",
          keywords: ["1f62d", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif",
            },
          ],
        },
        {
          id: "001_1f609_gif",
          name: "1f609 Gif",
          keywords: ["1f609", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f609/512.gif",
            },
          ],
        },
        {
          id: "001_1f617_gif",
          name: "1f617 Gif",
          keywords: ["1f617", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f617/512.gif",
            },
          ],
        },
        {
          id: "001_1f619_gif",
          name: "1f619 Gif",
          keywords: ["1f619", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f619/512.gif",
            },
          ],
        },
        {
          id: "001_1f61a_gif",
          name: "1f61a Gif",
          keywords: ["1f61a", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61a/512.gif",
            },
          ],
        },
        {
          id: "001_1f618_gif",
          name: "1f618 Gif",
          keywords: ["1f618", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f618/512.gif",
            },
          ],
        },
        {
          id: "001_1f970_gif",
          name: "1f970 Gif",
          keywords: ["1f970", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f970/512.gif",
            },
          ],
        },
        {
          id: "001_1f60d_gif",
          name: "1f60d Gif",
          keywords: ["1f60d", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif",
            },
          ],
        },
        {
          id: "001_1f929_gif",
          name: "1f929 Gif",
          keywords: ["1f929", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif",
            },
          ],
        },
        {
          id: "001_1f973_gif",
          name: "1f973 Gif",
          keywords: ["1f973", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif",
            },
          ],
        },
        {
          id: "001_1fae0_gif",
          name: "1fae0 Gif",
          keywords: ["1fae0", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae0/512.gif",
            },
          ],
        },
        {
          id: "001_1f643_gif",
          name: "1f643 Gif",
          keywords: ["1f643", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f643/512.gif",
            },
          ],
        },
        {
          id: "001_1f642_gif",
          name: "1f642 Gif",
          keywords: ["1f642", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f642/512.gif",
            },
          ],
        },
        {
          id: "001_1f972_gif",
          name: "1f972 Gif",
          keywords: ["1f972", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f972/512.gif",
            },
          ],
        },
        {
          id: "001_1f979_gif",
          name: "1f979 Gif",
          keywords: ["1f979", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f979/512.gif",
            },
          ],
        },
        {
          id: "001_1f60a_gif",
          name: "1f60a Gif",
          keywords: ["1f60a", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60a/512.gif",
            },
          ],
        },
        {
          id: "001_263a_fe0f_gif",
          name: "263a_fe0f Gif",
          keywords: ["263a_fe0f", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/263a_fe0f/512.gif",
            },
          ],
        },
        {
          id: "001_1f60c_gif",
          name: "1f60c Gif",
          keywords: ["1f60c", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60c/512.gif",
            },
          ],
        },
        {
          id: "001_1f60f_gif",
          name: "1f60f Gif",
          keywords: ["1f60f", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60f/512.gif",
            },
          ],
        },
        {
          id: "001_1f924_gif",
          name: "1f924 Gif",
          keywords: ["1f924", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f924/512.gif",
            },
          ],
        },
        {
          id: "001_1f60b_gif",
          name: "1f60b Gif",
          keywords: ["1f60b", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60b/512.gif",
            },
          ],
        },
        {
          id: "001_1f61b_gif",
          name: "1f61b Gif",
          keywords: ["1f61b", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61b/512.gif",
            },
          ],
        },
        {
          id: "001_1f61d_gif",
          name: "1f61d Gif",
          keywords: ["1f61d", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61d/512.gif",
            },
          ],
        },
        {
          id: "001_1f61c_gif",
          name: "1f61c Gif",
          keywords: ["1f61c", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f61c/512.gif",
            },
          ],
        },
        {
          id: "001_1f92a_gif",
          name: "1f92a Gif",
          keywords: ["1f92a", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f92a/512.gif",
            },
          ],
        },
        {
          id: "001_1f974_gif",
          name: "1f974 Gif",
          keywords: ["1f974", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f974/512.gif",
            },
          ],
        },
        {
          id: "001_1f614_gif",
          name: "1f614 Gif",
          keywords: ["1f614", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f614/512.gif",
            },
          ],
        },
        {
          id: "001_1f97a_gif",
          name: "1f97a Gif",
          keywords: ["1f97a", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f97a/512.gif",
            },
          ],
        },
        {
          id: "001_1f62c_gif",
          name: "1f62c Gif",
          keywords: ["1f62c", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62c/512.gif",
            },
          ],
        },
        {
          id: "001_1f611_gif",
          name: "1f611 Gif",
          keywords: ["1f611", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f611/512.gif",
            },
          ],
        },
        {
          id: "001_1f610_gif",
          name: "1f610 Gif",
          keywords: ["1f610", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/512.gif",
            },
          ],
        },
        {
          id: "001_1f636_gif",
          name: "1f636 Gif",
          keywords: ["1f636", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f636/512.gif",
            },
          ],
        },
        {
          id: "001_1f636_200d_1f32b_fe0f_gif",
          name: "1f636_200d_1f32b_fe0f Gif",
          keywords: ["1f636_200d_1f32b_fe0f", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f636_200d_1f32b_fe0f/512.gif",
            },
          ],
        },
        {
          id: "001_1fae5_gif",
          name: "1fae5 Gif",
          keywords: ["1fae5", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae5/512.gif",
            },
          ],
        },
        {
          id: "001_1f910_gif",
          name: "1f910 Gif",
          keywords: ["1f910", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f910/512.gif",
            },
          ],
        },
        {
          id: "001_1fae1_gif",
          name: "1fae1 Gif",
          keywords: ["1fae1", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae1/512.gif",
            },
          ],
        },
        {
          id: "001_1f914_gif",
          name: "1f914 Gif",
          keywords: ["1f914", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.gif",
            },
          ],
        },
        {
          id: "001_1f92b_gif",
          name: "1f92b Gif",
          keywords: ["1f92b", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f92b/512.gif",
            },
          ],
        },
        {
          id: "001_1fae2_gif",
          name: "1fae2 Gif",
          keywords: ["1fae2", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae2/512.gif",
            },
          ],
        },
        {
          id: "001_1f92d_gif",
          name: "1f92d Gif",
          keywords: ["1f92d", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f92d/512.gif",
            },
          ],
        },
        {
          id: "001_1f971_gif",
          name: "1f971 Gif",
          keywords: ["1f971", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f971/512.gif",
            },
          ],
        },
        {
          id: "001_1f917_gif",
          name: "1f917 Gif",
          keywords: ["1f917", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f917/512.gif",
            },
          ],
        },
        {
          id: "001_1fae3_gif",
          name: "1fae3 Gif",
          keywords: ["1fae3", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae3/512.gif",
            },
          ],
        },
        {
          id: "001_1f631_gif",
          name: "1f631 Gif",
          keywords: ["1f631", "gif"],
          skins: [
            {
              src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f631/512.gif",
            },
          ],
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
