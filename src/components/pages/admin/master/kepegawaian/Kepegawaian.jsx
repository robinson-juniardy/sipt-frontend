import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import Http from "../../../../utils/HttpServices";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import FormInputPegawai from "./FormInputPegawai";
import { Cancel, Delete, LibraryAdd, ModeEdit } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const Kepegawaian = () => {
  const [pegawai, setPegawai] = React.useState([]);
  const [formIsActive, setFormIsActive] = React.useState(false);
  const [editValue, setEditValue] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function FormatNip(nip) {
    return (
      String(nip).slice(0, 8) +
      " " +
      String(nip).slice(8, 14) +
      " " +
      String(nip).slice(14, 15) +
      " " +
      String(nip).slice(15, 18)
    );
  }

  const GetPegawai = () => {
    Http.get("/master/pegawai")
      .then((response) => {
        setPegawai(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formToggleAction = () => {
    setFormIsActive(!formIsActive);
  };

  const handleGetEditValue = (row) => {
    setEditValue(row);
    setEditMode(true);
    console.log(row);
  };

  const HandleDeleteAction = (id) => {
    console.log(id);
    Http.post("/master/pegawai/delete", { nip: id })
      .then((data) => {
        enqueueSnackbar("Data Berhasil Dihapus", {
          variant: "success",
          persist: false,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        GetPegawai();
      })
      .catch((error) => {
        enqueueSnackbar("Data Gagal Dihapus", {
          variant: "error",
          persist: false,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };

  React.useEffect(() => {
    GetPegawai();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <FormInputPegawai
          editMode={editMode}
          setEditMode={setEditMode}
          editValue={editValue}
          setIsActive={setFormIsActive}
          display={GetPegawai}
        />
      </Grid>

      <Grid item xs={9}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={pegawai}
            getRowId={(rows) => rows.id_pegawai}
            columns={[
              {
                field: "action",
                headerName: "Action",
                renderCell: (params) => (
                  <>
                    <Tooltip title="Ubah">
                      <IconButton
                        onClick={(event) => handleGetEditValue(params.row)}
                        color="primary"
                      >
                        <ModeEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
                        onClick={(e) => HandleDeleteAction(params.row.nip)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </>
                ),
              },
              {
                field: "nip",
                headerName: "NIP",
                flex: 1,
                valueGetter: (params) => {
                  return FormatNip(params.row.nip);
                },
              },
              { field: "nama", headerName: "Nama", flex: 2 },
              {
                field: "jabatan",
                headerName: "Jabatan",
                flex: 2,
                valueGetter: (params) => params.row.jabatan_raw.nama_jabatan,
              },
              {
                field: "golongan",
                headerName: "Golongan",
                flex: 1,
                valueGetter: (params) => params.row.golongan_raw.nama_golongan,
              },
              {
                field: "pangkat",
                headerName: "Pangkat",
                flex: 1,
                valueGetter: (params) => params.row.pangkat_raw.nama_pangkat,
              },
            ]}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Kepegawaian;
