import artificial_intelligence from "../../../public/Assets/artificial_intelligence.jpg";
import mechine_language from "../../../public/Assets/mechine_language.webp";
import ui_ux from "../../../public/Assets/ui_ux.avif";
import web_development from "../../../public/Assets/web_development.avif";

interface Course {
  name: string;
  url: string;
  thumbnail: any;
  trainer: string;
  duration: string;
}

export const courseCategory: Array<{
  name: string;
  courses: Array<Course>;
}> = [
  {
    name: "web Development",
    courses: [
      {
        name: "Mern",
        url: "https://www.google.com/",
        thumbnail: web_development,
        trainer: "john doe",
        duration: "15h",
      },
      {
        name: "Mean",
        url: "https://www.google.com/",
        thumbnail: web_development,
        trainer: "john doe",
        duration: "15h",
      },
      {
        name: "Django",
        url: "https://www.google.com/",
        thumbnail: web_development,
        trainer: "john doe",
        duration: "15h",
      },
    ],
  },
  {
    name: "ui ux",
    courses: [
      {
        name: "Mern",
        url: "https://www.google.com/",
        thumbnail: ui_ux,
        trainer: "john doe",
        duration: "15h",
      },
      {
        name: "Mean",
        url: "https://www.google.com/",
        thumbnail: ui_ux,
        trainer: "john doe",
        duration: "15h",
      },
      {
        name: "Django",
        url: "https://www.google.com/",
        thumbnail: ui_ux,
        trainer: "john doe",
        duration: "15h",
      },
    ],
  },
  {
    name: "ai",
    courses: [
      {
        name: "Mern",
        url: "https://www.google.com/",
        thumbnail: artificial_intelligence,
        trainer: "john doe",
        duration: "15h",
      },
      {
        name: "Mean",
        url: "https://www.google.com/",
        thumbnail: artificial_intelligence,
        trainer: "john doe",
        duration: "15h",
      },
      {
        name: "Django",
        url: "https://www.google.com/",
        thumbnail: artificial_intelligence,
        trainer: "john doe",
        duration: "15h",
      },
    ],
  },
  // {
  //   name: "Mechine learning",
  //   courses: [
  //     {
  //       name: "Mern",
  //       url: "https://www.google.com/",
  //       thumbnail: mechine_language,
  //       trainer: "john doe",
  //       duration: "15h",
  //     },
  //     {
  //       name: "Mean",
  //       url: "https://www.google.com/",
  //       thumbnail: mechine_language,
  //       trainer: "john doe",
  //       duration: "15h",
  //     },
  //     {
  //       name: "Django",
  //       url: "https://www.google.com/",
  //       thumbnail: mechine_language,
  //       trainer: "john doe",
  //       duration: "15h",
  //     },
  //   ],
  // },
];
