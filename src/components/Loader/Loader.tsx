import CircularProgress from "@mui/material/CircularProgress";

export function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ marginRight: "0.5rem" }} />
      <p>Carregando...</p>
    </div>
  );
}
