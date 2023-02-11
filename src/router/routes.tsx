import { Main } from "pages/main/main";

interface Props {
  name: string;
}
const Dummy = ({ name }: Props) => <p>{name}</p>;

export const routes = () => [
  {
    path: "/",
    element: <Main />,
  },

  {
    path: "*",
    element: <Dummy name="404" />,
  },
];
