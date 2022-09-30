import { Typography } from "@mui/material";
import { Link } from "../Link";

type CopyrightProps = {
  title: string;
};

export function Copyright({ title }: CopyrightProps) {
  return (
    <Typography fontSize="sm" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        {title}
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
