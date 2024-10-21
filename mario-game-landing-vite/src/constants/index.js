import {
  mobile,
  backend,
  creator,
  web,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Plot",
  },
  {
    id: "howtoplay",
    title: "How To Play",
  },
  {
    id: "walkthrough",
    title: "Walkthrough",
  },
  {
    id: "donate",
    title: "Donate",
  },
  {
    id: "contact",
    title: "Feedback",
  },
];

const services = [
  {
    title: "Nostalgic Worlds",
    icon: web,
  },
  {
    title: "Unique Characters",
    icon: mobile,
  },
  {
    title: "Innovative Discoveries ",
    icon: backend,
  },
  {
    title: "Entertaining Story Lines",
    icon: creator,
  },
];

const projects = [
  {
    name: "Obstacles",
    description:
      "Navigate through mischievous obstacles that test your reflexes and wit. From quirky creatures to tricky terrain, each challenge brings you closer to your goal.",
    image: carrent,
  },
  {
    name: "Power Ups",
    description:
      "Discover delightful surprises along your journey that boost your abilities. Special items and encounters empower you to overcome greater challenges.",
    image: jobit,
  },
  {
    name: "Friendship",
    description:
      "At its heart, this game celebrates the shared experiences that connect us all. Through triumphs and setbacks, it's a playful reminder that life's journey is best enjoyed together.",
    image: tripguide,
  },
];

export { services, projects };
